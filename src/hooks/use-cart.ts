import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            total: get().total + item.price,
          });
        } else {
          set({
            items: [...currentItems, { ...item, quantity: 1 }],
            total: get().total + item.price,
          });
        }
      },
      updateQuantity: (id, quantity) => {
        const currentItems = get().items;
        const item = currentItems.find((i) => i.id === id);

        if (item) {
          const quantityDiff = quantity - item.quantity;
          set({
            items: currentItems.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
            total: get().total + item.price * quantityDiff,
          });
        }
      },
      removeItem: (id) => {
        const currentItems = get().items;
        const item = currentItems.find((i) => i.id === id);

        if (item) {
          set({
            items: currentItems.filter((i) => i.id !== id),
            total: get().total - item.price * item.quantity,
          });
        }
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: "cart-storage",
    }
  )
);