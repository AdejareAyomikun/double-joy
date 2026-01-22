"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import api from "@/api/axios";
import Image from "next/image";
import Header from "../components/Header";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, fetchCart } = useCart();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleCheckout = async () => {
    try {
      const res = await api.post("/cart/checkout/", {
        address,
        city,
        state,
      });
      window.location.href = res.data.payment_url;
    } catch (err) {
      console.error("Checkout failed", err);
    }
  };

  if (!cart || cart.items.length === 0) {
    return <div className="p-6">Your cart is empty</div>;
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <div className="p-5 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <ul className="space-y-3 mb-6">
          {cart.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            >
              <span>
                <Image
                  src={item.product_image}
                  alt={item.product_name}
                  width={60}
                  height={60}
                  className="object-cover rounded"
                  unoptimized
                />
              </span>
              <span>
                {item.product_name} × {item.quantity}
              </span>
              <span>₦{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="bg-white p-5 rounded-lg shadow mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Delivery Address</h2>

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border p-3 rounded"
          >
            <option value="">Select State</option>
            <option value="Lagos">Lagos</option>
            <option value="Ogun">Ogun</option>
            <option value="Oyo">Oyo</option>
          </select>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">Total: ₦{total}</span>
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 cursor-pointer"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
