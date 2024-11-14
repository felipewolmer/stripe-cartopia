import { loadMercadoPago } from "@mercadopago/sdk-js";

interface MercadoPagoSDK {
  checkout: (config: {
    preference: { id: string };
    render: { container: string };
  }) => Promise<void>;
}

export const initMercadoPago = async (): Promise<MercadoPagoSDK> => {
  try {
    const publicKey = process.env.MERCADOPAGO_PUBLIC_KEY;
    if (!publicKey) {
      throw new Error('MERCADOPAGO_PUBLIC_KEY não configurada');
    }
    
    const mp = await loadMercadoPago();
    await mp.configure({
      locale: 'pt-BR',
      advancedFraudPrevention: true,
      publicKey: publicKey
    });
    
    return mp as MercadoPagoSDK;
  } catch (error) {
    console.error('Erro ao inicializar MercadoPago:', error);
    throw error;
  }
};