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
    if (!mp) {
      throw new Error('Falha ao carregar SDK do Mercado Pago');
    }

    return mp as MercadoPagoSDK;
  } catch (error) {
    console.error('Erro ao inicializar MercadoPago:', error);
    throw error;
  }
};

export const createPreference = async (items: Array<{ 
  name: string; 
  quantity: number; 
  price: number;
  image?: string;
}>) => {
  try {
    const response = await fetch('/.netlify/functions/create-mercadopago-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar preferência de pagamento');
    }

    const data = await response.json();
    
    if (!data.initPoint) {
      throw new Error('URL de pagamento não encontrada na resposta');
    }

    return data;
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    throw error;
  }
};