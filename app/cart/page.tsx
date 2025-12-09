"use client";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useCart();
  console.log("CART:", cart);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      return sum + Number(item.price) * Number(item.quantity);
    }, 0);
  };

  const total = calculateTotal();

  if (cart.length === 0)
    return (
      <>
        <Header /> <p className="p-10 text-xl min-h-screen">Your cart is empty.</p><Footer />
      </>
    );

  return (
    <>
      <Header />
      <section className="p-10">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-6 border-b pb-4"
            >
              <Image
                src={item.image}
                width={120}
                height={80}
                alt={item.name}
                className="rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-700">${item.price}</p>

                <div className="flex items-center mt-3">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQty(item.product, Number(e.target.value))
                    }
                    className="w-16 border rounded px-2 py-1 mr-4"
                  />

                  <button
                    onClick={() => removeFromCart(item.product)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-10">
          Total: ${total.toLocaleString()}
        </h2>

        <button className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg cursor-pointer">
          Checkout
        </button>
      </section>
      <Footer />
    </>
  );
}
