import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  className?: string;
}

export const ProductCard = ({ id, name, price, image, className }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${id}`}
      className={cn(
        "group relative overflow-hidden rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <p className="text-sm font-medium text-primary">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </p>
      </div>
    </Link>
  );
};