import { loadMercadoPago } from "@mercadopago/sdk-js";

export const initMercadoPago = async () => {
  try {
    const mercadopago = await loadMercadoPago();
    await mercadopago.init({
      publicKey: process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || ''
    });
    return mercadopago;
  } catch (error) {
    console.error('Error initializing MercadoPago:', error);
    throw error;
  }
};