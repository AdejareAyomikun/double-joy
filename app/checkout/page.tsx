"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import api from "@/api/axios";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CreditCard, MapPin, ShoppingBag } from "lucide-react";

import { useState } from "react";

interface CheckoutResponse {
  payment_url: string;
  order_id?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();

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
      const data = res.data as CheckoutResponse;
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        console.error("No payment URL received");
      }
    } catch (err) {
      console.error("Checkout failed", err);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-[#89547c]">
        Your bag is empty.
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-[#fcf9f6] min-h-screen font-sans text-[#360212]">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl mb-12 border-b border-[#d791be]/20 pb-6">
          Finalize Your Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT COLUMN: FORM */}
          <div className="space-y-10">
            <section>
              <div className="flex items-center gap-3 mb-6 text-[#9f002b]">
                <MapPin size={20} />
                <h2 className="font-serif text-2xl font-semibold">
                  Shipping Details
                </h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest font-bold text-[#89547c]">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 123 Luxury Lane"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white border border-[#d791be]/30 p-4 focus:outline-none focus:ring-1 focus:ring-[#fe5457] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest font-bold text-[#89547c]">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-[#d791be]/30 p-4 focus:outline-none focus:ring-1 focus:ring-[#fe5457] transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest font-bold text-[#89547c]">
                      State
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-white border border-[#d791be]/30 p-4 focus:outline-none focus:ring-1 focus:ring-[#fe5457] transition-all appearance-none"
                    >
                      <option value="">Select State</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Ogun">Ogun</option>
                      <option value="Oyo">Oyo</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 border-l-4 border-[#360212]">
              <div className="flex items-center gap-3 mb-2 text-[#360212]">
                <CreditCard size={20} />
                <h2 className="font-serif text-xl font-semibold">Payment</h2>
              </div>
              <p className="text-sm text-[#89547c]">
                You will be redirected to our secure payment gateway to complete
                your transaction.
              </p>
            </section>

            <button
              onClick={handleCheckout}
              disabled={!address || !city || !state}
              className="w-full bg-[#fe5457] text-white py-5 font-bold uppercase tracking-[0.25em] text-sm hover:bg-[#9f002b] transition-all shadow-xl shadow-[#fe5457]/20 disabled:bg-[#d791be] disabled:cursor-not-allowed"
            >
              Securely Place Order
            </button>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="bg-white p-8 shadow-sm h-fit border border-[#d791be]/10">
            <div className="flex items-center gap-3 mb-8 border-b border-[#fcf9f6] pb-4">
              <ShoppingBag size={20} className="text-[#9f002b]" />
              <h2 className="font-serif text-2xl font-semibold">
                Order Summary
              </h2>
            </div>

            <ul className="divide-y divide-[#fcf9f6]">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="py-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 bg-[#fcf9f6] p-1 shrink-0">
                      <Image
                        src={item.product_image}
                        alt={item.product_name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold line-clamp-1">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-[#89547c]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    ₦{Number(item.price * item.quantity).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-[#360212]/10 space-y-2">
              <div className="flex justify-between text-[#89547c]">
                <span>Shipping</span>
                <span className="text-xs font-bold uppercase tracking-tighter">
                  Calculated
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 text-[#360212]">
                <span className="font-serif">Total</span>
                <span>₦{Number(total).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
