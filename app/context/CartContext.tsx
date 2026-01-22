// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { API_URL } from "@/lib/utils";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     axios
//       .get(`${API_URL}/cart/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setCart(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//    const addToCart = async (productId, quantity = 1) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const res = await axios.post(
//       `${API_URL}/cart/`,
//       { product_id: productId, quantity },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     // Reload cart after update
//     const updated = await axios.get(`${API_URL}/cart/`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setCart(updated.data);
//   };

//   // Remove item
//   const removeItem = async (itemId) => {
//     const token = localStorage.getItem("token");

//     await axios.delete(
//       `${API_URL}/cart/`,
//       {
//         data: { item_id: itemId },
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     // Reload the cart
//     const updated = await axios.get(`${API_URL}/cart/`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setCart(updated.data);
//   };

// const updateQty = (productId, quantity) => {
//   setCart((prevCart) =>
//     prevCart.map((item) =>
//       item.product === productId ? { ...item, quantity } : item
//     )
//   );
// };

// Load cart from localStorage on first load
// useEffect(() => {
//   const saved = localStorage.getItem("cart");
//   if (saved) setCart(JSON.parse(saved));
// }, []);

// Save cart anytime it changes
// useEffect(() => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }, [cart]);

// const addToCart = (product) => {
//   setCart((prevCart) => {
//     const existing = prevCart.find(
//       (item) => item.product === product.product
//     );

//     if (existing) {
//       // Increment quantity
//       return prevCart.map((item) =>
//         item.product === product.product
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//     }

//     // Add new item with quantity 1
//     return [...prevCart, { ...product, quantity: 1 }];
//   });
// };

// const removeFromCart = (productId) => {
//   setCart((prevCart) =>
//     prevCart.filter((item) => item.product !== productId)
//   );
// };

// const clearCart = () => {
//   setCart([]);
// };
// version 1

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeItem }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }
// version 2

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
      setCart(res.data);
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
      setCart(res.data);
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
      setCart(res.data);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (itemId: number) => {
    const res = await api.post("/cart/remove_item/", { item_id: itemId });
    setCart(res.data);
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
