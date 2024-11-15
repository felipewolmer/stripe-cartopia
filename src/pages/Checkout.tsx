import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import { stripe } from "@/lib/stripe-client";
import { createPreference } from "@/lib/mercadopago-client";

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { clearCart, items, total } = useCart();
  const { toast } = useToast();

  const handleMercadoPago = async () => {
    setLoading(true);
    try {
      const { init_point } = await createPreference(items);
      if (init_point) {
        window.location.href = init_point;
      }
    } catch (error) {
      console.error('Error with MercadoPago:', error);
      toast({
        variant: "destructive",
        title: "Erro no pagamento",
        description: "Ocorreu um erro ao processar seu pagamento com Mercado Pago",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStripeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar sessão de pagamento");
      }

      const { sessionId } = await response.json();
      const stripeInstance = await stripe;
      
      if (!stripeInstance) {
        throw new Error("Erro ao carregar Stripe");
      }

      const { error } = await stripeInstance.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }

      clearCart();
      navigate("/success");
    } catch (err) {
      console.error("Erro ao processar pagamento:", err);
      toast({
        variant: "destructive",
        title: "Erro no pagamento",
        description: "Ocorreu um erro ao processar seu pagamento",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleStripeSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading || items.length === 0}
        >
          {loading ? "Processando..." : "Pagar com Stripe"}
        </Button>
      </form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Ou pague com
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleMercadoPago}
        disabled={loading || items.length === 0}
      >
        {loading ? "Processando..." : "Pagar com Mercado Pago"}
      </Button>
    </div>
  );
};

const Checkout = () => {
  const { items, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
          <p className="mt-2 text-muted-foreground">
            Adicione alguns produtos antes de finalizar a compra
          </p>
          <Button
            className="mt-4"
            onClick={() => window.location.href = "/"}
          >
            Voltar às Compras
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-12">
        <div className="mx-auto max-w-lg space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="mt-2 text-muted-foreground">
              Complete suas informações de pagamento
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <Elements stripe={stripe}>
              <CheckoutForm />
            </Elements>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-lg font-semibold">Resumo do Pedido</h2>
            <div className="mt-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
