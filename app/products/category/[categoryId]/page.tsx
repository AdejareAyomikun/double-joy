"use client";

export const dynamic = 'force-dynamic';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProducts } from "@/api/products";
import { useCart } from "@/app/context/CartContext";
import CartPopup from "@/app/components/CartPopup";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: number | string;
}

export default function CategoryPage() {
  const { addToCart } = useCart();
  const { categoryId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = (productId: number) => {
    addToCart(productId, 1);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  useEffect(() => {
    getProducts().then((data) => {
      const productData = data as Product[];
      const filtered = productData.filter(
        (p: any) => String(p.category) === String(categoryId),
      );
      setProducts(filtered);
    });
  }, [categoryId]);

  return (
    <div className="bg-[#fcf9f6] min-h-screen font-sans">
      <Header />

      <section className="container mx-auto py-10 px-3 md:px-6">
        {/* Category Heading */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-2xl md:text-4xl text-[#360212] font-bold capitalize">
            {/* {categoryId?.toString().replace("-", " ") || "Collection"} */}
            Products
          </h1>
          <div className="w-20 h-1 bg-[#fe5457] mx-auto mt-6"></div>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#89547c] text-lg italic">
              Our curators are currently selecting new pieces for this category.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block text-[#9f002b] font-bold border-b border-[#9f002b] pb-1"
            >
              Return to Gallery
            </Link>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid gap-3 md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
            >
              <Card className="border-none bg-white shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <Link
                  href={`/product/${p.id}`}
                  className="p-0 relative group overflow-hidden"
                >
                  <CardContent className="p-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-40 md:h-64 object-contain P-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </CardContent>
                </Link>

                <CardFooter className="flex flex-col p-6 text-center">
                  <h3 className="font-serif text-sm md:text-xl text-[#360212] line-clamp-1 font-semibold mb-2">
                    {p.name}
                  </h3>
                  <p className="text-sm md:text-2xl font-bold text-[#9f002b] mb-6">
                    ₦{Number(p.price).toLocaleString()}
                  </p>

                  <button
                    onClick={() => handleAddToCart(p.id)}
                    className="w-full bg-[#fe5457] text-white py-2 font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#360212] transition-colors duration-300 shadow-lg shadow-[#fe5457]/20"
                  >
                    Add to Bag
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      <CartPopup show={showPopup} />
      <Footer />
    </div>
  );
}
