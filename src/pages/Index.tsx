import { Cart } from "@/components/Cart";
import { ProductCard } from "@/components/ProductCard";

const products = [
  {
    id: "1",
    name: "Produto 1",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Produto 2",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Produto 3",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">Loja</h1>
          <Cart />
        </div>
      </header>
      <main className="container pt-24">
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Nossos Produtos</h2>
            <p className="text-muted-foreground">
              Confira nossa seleção de produtos exclusivos
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;