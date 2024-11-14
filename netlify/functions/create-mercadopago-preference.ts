import { Handler } from '@netlify/functions';
import MercadoPago from 'mercadopago';

const mercadopago = new MercadoPago(process.env.MERCADOPAGO_ACCESS_TOKEN || '', {
  locale: 'pt-BR'
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { items } = JSON.parse(event.body || '{}');

    const preference = {
      items: items.map((item: any) => ({
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: 'BRL',
        picture_url: item.image,
      })),
      back_urls: {
        success: `${process.env.URL}/success`,
        failure: `${process.env.URL}/checkout`,
        pending: `${process.env.URL}/checkout`,
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        preferenceId: response.body.id,
        initPoint: response.body.init_point 
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};

export { handler };