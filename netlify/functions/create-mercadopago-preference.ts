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
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      throw new Error('MERCADOPAGO_ACCESS_TOKEN is not configured');
    }

    const { items } = JSON.parse(event.body || '{}');

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Invalid items data');
    }

    const preference = {
      items: items.map((item: any) => ({
        title: item.name,
        unit_price: Number(item.price),
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

    console.log('Creating Mercado Pago preference:', JSON.stringify(preference));

    const response = await mercadopago.preferences.create(preference);

    console.log('Mercado Pago response:', JSON.stringify(response.body));

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        preferenceId: response.body.id,
        initPoint: response.body.init_point 
      }),
    };
  } catch (error: any) {
    console.error('Error creating Mercado Pago preference:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error creating payment preference',
        error: error.message 
      }),
    };
  }
};

export { handler };