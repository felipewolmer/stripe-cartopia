import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro no pagamento",
          description: error.message,
        });
      } else {
        clearCart();
        navigate("/success");
      }
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
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
        <PaymentElement />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={!stripe || loading}
      >
        {loading ? "Processando..." : "Pagar"}
      </Button>
    </form>
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
            <Elements stripe={stripePromise}>
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