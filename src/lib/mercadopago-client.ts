import { loadMercadoPago } from "@mercadopago/sdk-js";

interface MercadoPagoInstance {
  init: (config: { publicKey: string }) => Promise<void>;
}

export const initMercadoPago = async () => {
  try {
    const mp = await loadMercadoPago() as MercadoPagoInstance;
    if (!mp || typeof mp.init !== 'function') {
      throw new Error('Failed to initialize MercadoPago SDK');
    }
    
    const publicKey = process.env.MERCADOPAGO_PUBLIC_KEY;
    if (!publicKey) {
      throw new Error('MERCADOPAGO_PUBLIC_KEY is not configured');
    }

    await mp.init({
      publicKey: publicKey
    });
    
    return mp;
  } catch (error) {
    console.error('Error initializing MercadoPago:', error);
    throw error;
  }
};