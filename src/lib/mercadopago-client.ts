import { loadMercadoPago } from "@mercadopago/sdk-js";

export const initMercadoPago = async () => {
  try {
    const mercadopago = await loadMercadoPago();
    const mp = await mercadopago.create({
      publicKey: process.env.MERCADOPAGO_PUBLIC_KEY || ''
    });
    return mp;
  } catch (error) {
    console.error('Error initializing MercadoPago:', error);
    throw error;
  }
};