import { loadMercadoPago } from "@mercadopago/sdk-js";

export const initMercadoPago = async () => {
  try {
    const mp = await loadMercadoPago();
    return mp;
  } catch (error) {
    console.error('Error initializing MercadoPago:', error);
    throw error;
  }
};