"use client";

export const dynamic = 'force-dynamic';

import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useCart } from "@/app/context/CartContext";
import CartPopup from "@/app/components/CartPopup";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/api/axios";
import { motion } from "framer-motion";
import { ShoppingBag, ShieldCheck, Truck } from "lucide-react";

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = (productId: number) => {
    addToCart(productId, 1);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  useEffect(() => {
    api.get(`/products/${productId}/`).then((res) => {
      setProduct(res.data);
    });
  }, [productId]);
  if (!product)
    return (
      <div className="h-screen flex items-center justify-center font-serif text-[#360212] text-xl">
        Curating details...
      </div>
    );

  return (
    <div className="bg-white min-h-screen font-sans">
      <Header />
      <section className="grid lg:grid-cols-2 grid-cols-1 min-h-[calc(100vh-80px)]">
        <div className="bg-[#fcf9f6] flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-square max-w-xl"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              // loading="lazy"
              priority
              unoptimized
            />
          </motion.div>
        </div>

        <div className="p-8 lg:p-24 flex flex-row md:flex-col items-center justify-center">
          <div className="max-w-md">
            <span className="text-[#89547c] uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
              Premium Collection
            </span>
            <h1 className="font-serif text-2xl md:text-4xl text-[#360212] font-bold mb-6 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl md:text-3xl font-bold text-[#9f002b] mb-8">
              ₦{Number(product.price).toLocaleString()}
            </p>
            <div className="space-y-6 mb-10 text-[#360212]/80 leading-relaxed text-lg">
              <p>{product.description}</p>
            </div>
            <button
              onClick={() => handleAddToCart(product.id)}
              className="w-full bg-[#fe5457] text-white px-8 py-5 font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#360212] transition-all duration-300 shadow-xl shadow-[#fe5457]/20 flex items-center justify-center gap-3"
            >
              <ShoppingBag size={18} /> Add to Bag
            </button>
            <div className="mt-12 grid grid-cols-2 gap-6 pt-10 border-t border-[#d791be]/20">
              <div className="flex items-center gap-3 text-[#89547c]">
                <ShieldCheck size={20} className="text-[#360212]" />
                <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">
                  Authenticity Guaranteed
                </span>
              </div>
              <div className="flex items-center gap-3 text-[#89547c]">
                <Truck size={20} className="text-[#360212]" />
                <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">
                  Nationwide Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CartPopup show={showPopup} />
      <Footer />
    </div>
  );
}
