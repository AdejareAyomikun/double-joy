"use client";

import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, loading, clearCart } = useCart();

  if (loading) return <div>Loading cart...</div>;
  if (!cart || cart.items.length === 0) return <div>Your cart is empty</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id} className="mb-2">
            {item.product_name} x {item.quantity} - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <button
        onClick={clearCart}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Clear Cart
      </button>
    </div>
  );
}
