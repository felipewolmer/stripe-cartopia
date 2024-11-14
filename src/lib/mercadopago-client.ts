import { loadMercadoPago } from "@mercadopago/sdk-js";

export const mercadopago = loadMercadoPago();

export const initMercadoPago = async () => {
  try {
    await mercadopago.init({
      publicKey: process.env.MERCADOPAGO_PUBLIC_KEY || ''
    });
    return mercadopago;
  } catch (error) {
    console.error('Error initializing MercadoPago:', error);
    throw error;
  }
};