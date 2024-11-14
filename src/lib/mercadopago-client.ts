import { loadMercadoPago, MercadoPago } from "@mercadopago/sdk-js";

export const initMercadoPago = async () => {
  try {
    await loadMercadoPago();
    const mp = new MercadoPago(process.env.MERCADOPAGO_PUBLIC_KEY || '', {
      locale: 'pt-BR'
    });
    return mp;
  } catch (error) {
    console.error('Error initializing MercadoPago:', error);
    throw error;
  }
};