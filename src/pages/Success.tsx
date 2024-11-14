import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

const Success = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mb-4 text-3xl font-bold">Pagamento Confirmado!</h1>
        <p className="mb-8 text-muted-foreground">
          Obrigado por sua compra. Você receberá um e-mail com os detalhes do pedido.
        </p>
        <Button onClick={() => navigate("/")}>
          Voltar para a Loja
        </Button>
      </div>
    </div>
  );
};

export default Success;