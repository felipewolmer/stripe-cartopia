declare global {
  interface Window {
    MercadoPago: any;
  }
}

export const initMercadoPago = () => {
  if (typeof window !== 'undefined' && window.MercadoPago) {
    return new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY || '');
  }
  throw new Error('MercadoPago SDK not loaded');
};

export const createPreference = async (items: Array<{ name: string; quantity: number; price: number }>) => {
  try {
    const response = await fetch('/.netlify/functions/create-mercadopago-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      throw new Error('Failed to create preference');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating preference:', error);
    throw error;
  }
};