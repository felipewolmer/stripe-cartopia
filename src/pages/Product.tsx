import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Cart } from "@/components/Cart";
import { useToast } from "@/components/ui/use-toast";

const products = [
  {
    id: "1",
    name: "Produto 1",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "Descrição detalhada do produto 1",
  },
  {
    id: "2",
    name: "Produto 2",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "Descrição detalhada do produto 2",
  },
  {
    id: "3",
    name: "Produto 3",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    description: "Descrição detalhada do produto 3",
  },
];

const Product = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast({
      title: "Produto adicionado ao carrinho",
      description: `${product.name} foi adicionado ao seu carrinho`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">Loja</h1>
          <Cart />
        </div>
      </header>
      <main className="container pt-24">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-2xl font-semibold text-primary">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </p>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product;