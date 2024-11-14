import { Handler } from "@netlify/functions";
import MercadoPago from "mercadopago";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { items } = JSON.parse(event.body || "{}");

    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      throw new Error("MERCADOPAGO_ACCESS_TOKEN is required");
    }

    MercadoPago.configure({
      access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
    });

    const preference = {
      items: items.map((item: any) => ({
        title: item.name,
        unit_price: Number(item.price),
        quantity: Number(item.quantity),
      })),
      back_urls: {
        success: `${process.env.URL}/success`,
        failure: `${process.env.URL}/failure`,
      },
      auto_return: "approved",
    };

    const response = await MercadoPago.preferences.create(preference);

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: response.body.id,
        init_point: response.body.init_point,
      }),
    };
  } catch (error: any) {
    console.error("Error creating preference:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { handler };