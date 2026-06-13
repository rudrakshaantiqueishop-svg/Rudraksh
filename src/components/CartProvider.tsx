"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { CartItem, MAX_CART_QUANTITY, getCartTotals } from "@/lib/cart";
import {
  getCart,
  addCartItem,
  removeCartItem,
  updateCartItemQuantity,
  clearCart as clearCartAction,
  mergeGuestCart,
} from "@/app/actions/cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotalCents: number;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cart";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const isAuthed = status === "authenticated";

  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const mergedRef = useRef(false);

  useEffect(() => {
    if (status === "loading") return;

    let cancelled = false;

    (async () => {
      if (isAuthed) {
        if (!mergedRef.current) {
          mergedRef.current = true;

          let local: CartItem[] = [];
          try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if (stored) local = JSON.parse(stored);
          } catch {
            // ignore malformed storage
          }

          if (local.length > 0) {
            await mergeGuestCart(local);
            window.localStorage.removeItem(STORAGE_KEY);
          }
        }

        const dbItems = await getCart();
        if (!cancelled) setItems(dbItems);
      } else {
        try {
          const stored = window.localStorage.getItem(STORAGE_KEY);
          setItems(stored ? JSON.parse(stored) : []);
        } catch {
          setItems([]);
        }
      }

      if (!cancelled) setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [status, isAuthed]);

  useEffect(() => {
    if (isLoading || isAuthed) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isLoading, isAuthed]);

  const addItem: CartContextValue["addItem"] = (item, quantity = 1) => {
    if (isAuthed) {
      void addCartItem(
        {
          productId: item.productId,
          variantId: item.variantId,
          addOnId: item.addOnId,
          sizeId: item.sizeId,
        },
        quantity
      ).then(setItems);
    } else {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: Math.min(i.quantity + quantity, MAX_CART_QUANTITY) } : i
          );
        }
        return [...prev, { ...item, quantity: Math.min(quantity, MAX_CART_QUANTITY) }];
      });
    }
    setIsOpen(true);
  };

  const removeItem: CartContextValue["removeItem"] = (id) => {
    if (isAuthed) {
      void removeCartItem(id).then(setItems);
    } else {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const qty = Math.min(quantity, MAX_CART_QUANTITY);

    if (isAuthed) {
      void updateCartItemQuantity(id, qty).then(setItems);
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
    }
  };

  const clearCart = () => {
    if (isAuthed) {
      void clearCartAction().then(setItems);
    } else {
      setItems([]);
    }
  };

  const { itemCount, subtotalCents } = useMemo(() => getCartTotals(items), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotalCents,
        isOpen,
        isLoading,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
