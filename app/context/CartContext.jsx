"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/lib/utils";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${API_URL}/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  }, []);

   const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await axios.post(
      `${API_URL}/cart/`,
      { product_id: productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Reload cart after update
    const updated = await axios.get(`${API_URL}/cart/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCart(updated.data);
  };

  // Remove item
  const removeItem = async (itemId) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `${API_URL}/cart/`,
      {
        data: { item_id: itemId },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Reload the cart
    const updated = await axios.get(`${API_URL}/cart/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCart(updated.data);
  };


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

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
