import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const [open, setOpen] = useState(false);
  const { items, total } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full"
        >
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Seu carrinho está vazio
            </p>
          ) : (
            items.map((item) => <CartItem key={item.id} {...item} />)
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between py-4">
              <span className="text-base font-medium">Total</span>
              <span className="text-lg font-semibold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)}
              </span>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                setOpen(false);
                window.location.href = "/checkout";
              }}
            >
              Finalizar Compra
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};