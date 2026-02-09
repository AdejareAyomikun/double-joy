"use client";

import api from "@/api/axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";

export default function CartPage() {
  const { cart, loading, clearCart, addToCart, removeItem } = useCart();
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-[#89547c]">
        Loading the items in your selection...
      </div>
    );
  if (!cart || cart.items.length === 0)
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] font-serif">
          <h2 className="text-4xl text-[#360212] mb-6">Your bag is empty</h2>
          <Link
            href="/"
            className="text-[#fe5457] font-sans font-bold uppercase tracking-widest border-b-2 border-[#fe5457] pb-1 hover:text-[#9f002b] hover:border-[#9f002b] transition-all"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleIncrease = async (itemId: number, productId: number) => {
    await addToCart(productId, 1); // increment by 1
  };

  const handleDecrease = async (
    itemId: number,
    productId: number,
    quantity: number,
  ) => {
    if (quantity <= 0) return; // prevent quantity < 1
    await addToCart(productId, -1); // decrement by 1
  };

  return (
    <div className="bg-[#fcf9f6] min-h-screen font-sans">
      <Header />
      <div className="p-8 max-w-5xl mx-auto py-16">
        <h1 className="font-serif text-4xl text-[#360212] mb-12 border-b border-[#d791be]/30 pb-6">
          Shopping Bag
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 p-6 bg-white shadow-sm border border-[#d791be]/10 transition-all"
              >
                <div className="w-28 h-28 relative bg-[#fcf9f6] shrink-0">
                  <Image
                    src={item.product_image}
                    alt={item.product_name}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-serif text-xl text-[#360212] font-semibold">
                    {item.product_name}
                  </h3>
                  <p className="text-[#89547c] text-sm mb-4">
                    Unit Price: ₦{Number(item.price).toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-[#d791be]/40">
                      <button
                        onClick={() =>
                          handleDecrease(item.id, item.product, item.quantity)
                        }
                        className="p-2 hover:bg-[#fcf9f6] text-[#360212] transition-colors cursor-pointer"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-bold text-[#360212]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(item.id, item.product)}
                        className="p-2 hover:bg-[#fcf9f6] text-[#360212] transition-colors cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#9f002b] hover:text-[#fe5457] flex items-center gap-1 text-xs font-bold uppercase tracking-tighter transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-[#89547c] text-xs font-bold uppercase tracking-widest hover:text-[#9f002b] transition-colors mt-4 cursor-pointer"
            >
              Clear Entire Bag
            </button>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-lg border-t-4 border-[#360212]">
              <h2 className="font-serif text-2xl text-[#360212] mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 border-b border-[#d791be]/20 pb-6 mb-6">
                <div className="flex justify-between text-[#89547c]">
                  <span>Subtotal</span>
                  <span>₦{Number(totalPrice).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#89547c]">
                  <span>Shipping</span>
                  <span className="text-xs uppercase tracking-widest">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-xl text-[#360212]">Total</span>
                <span className="text-2xl font-bold text-[#360212]">
                  ₦{Number(totalPrice).toLocaleString()}
                </span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-[#fe5457] text-white text-center py-4 font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#9f002b] transition-all shadow-xl shadow-[#fe5457]/20"
              >
                Checkout Now
              </Link>

              <p className="text-[10px] text-[#89547c] mt-4 text-center uppercase tracking-widest">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
