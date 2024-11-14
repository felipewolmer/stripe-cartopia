import { loadMercadoPago } from "@mercadopago/sdk-js";

export const initMercadoPago = async () => {
  try {
    await loadMercadoPago();
    const mp = await loadMercadoPago();
    await mp.init({
      publicKey: process.env.MERCADOPAGO_PUBLIC_KEY || ''
    });
    return mp;
  } catch (error) {
    console.error('Error initializing MercadoPago:', error);
    throw error;
  }
};