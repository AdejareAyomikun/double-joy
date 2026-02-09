"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/api/axios";

interface CartItem {
  id: number;
  product: number;
  product_name: string;
  price: number;
  quantity: number;
  product_image: string;
}

interface Cart {
  id: number;
  items: CartItem[];
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  successMessage: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  clearCart: () => Promise<void>;
  updateQuantity: (
    itemId: number,
    action: "increment" | "decrement"
  ) => Promise<void>;
  clearMessage: () => void;
  removeItem: (itemId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const clearMessage = () => setSuccessMessage(null);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart/");
      setCart(res.data as Cart);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      const res = await api.post("/cart/", { product_id: productId, quantity });
      setCart(res.data as Cart);
      setSuccessMessage("Item added to cart");
      // auto-hide popup after 2 seconds
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const updateQuantity = async (
    itemId: number,
    action: "increment" | "decrement"
  ) => {
    try {
      const res = await api.post("/cart/update_quantity/", {
        item_id: itemId,
        action,
      });
      setCart(res.data as Cart);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (itemId: number) => {
    const res = await api.post("/cart/remove_item/", { item_id: itemId });
    setCart(res.data as Cart);
  };

  const clearCart = async () => {
    try {
      await api.post("/cart/clear/");
      setCart({ id: cart?.id || 0, items: [] });
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        successMessage,
        fetchCart,
        addToCart,
        clearCart,
        updateQuantity,
        clearMessage,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
