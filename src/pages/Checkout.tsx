import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import { stripe } from "@/lib/stripe-client";

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const navigate = useNavigate();
  const { clearCart, items, total } = useCart();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (paymentMethod === "stripe") {
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
      } else if (paymentMethod === "mercadopago") {
        const response = await fetch("/.netlify/functions/create-mercadopago-preference", {
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
          throw new Error("Erro ao criar preferência do Mercado Pago");
        }

        const { initPoint } = await response.json();
        window.location.href = initPoint;
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
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Método de Pagamento
          </label>
          <RadioGroup
            defaultValue="stripe"
            onValueChange={setPaymentMethod}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="stripe" id="stripe" />
              <Label htmlFor="stripe">Cartão de Crédito (Stripe)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mercadopago" id="mercadopago" />
              <Label htmlFor="mercadopago">Mercado Pago</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={loading || items.length === 0}
      >
        {loading ? "Processando..." : "Finalizar Compra"}
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