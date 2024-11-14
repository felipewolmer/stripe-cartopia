import { loadMercadoPago } from "@mercadopago/sdk-js";

export const initMercadoPago = async () => {
  try {
    const publicKey = process.env.MERCADOPAGO_PUBLIC_KEY;
    if (!publicKey) {
      throw new Error('MERCADOPAGO_PUBLIC_KEY não configurada');
    }
    
    await loadMercadoPago();
    const mp = await loadMercadoPago();
    await mp.init({
      locale: 'pt-BR',
      advancedFraudPrevention: true,
      publicKey: publicKey
    });
    
    return mp;
  } catch (error) {
    console.error('Erro ao inicializar MercadoPago:', error);
    throw error;
  }
};