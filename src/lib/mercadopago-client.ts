import { loadMercadoPago } from "@mercadopago/sdk-js";

export const initMercadoPago = async () => {
  try {
    const mp = await loadMercadoPago();
    if (!mp || typeof mp.init !== 'function') {
      throw new Error('Failed to initialize MercadoPago SDK');
    }
    
    await mp.init({
      publicKey: process.env.MERCADOPAGO_PUBLIC_KEY || ''
    });
    
    return mp;
  } catch (error) {
    console.error('Error initializing MercadoPago:', error);
    throw error;
  }
};