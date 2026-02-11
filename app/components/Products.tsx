"use client";

import api from "@/api/axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import CartPopup from "@/app/components/CartPopup";

type ProductTag = "new_arrival" | "best_seller" | "top_rate" | "special_sales";

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  tag: ProductTag;
};

export async function getProducts(): Promise<Product[]> {
  const res = await api.get<Product[]>("/products/");
  return res.data;
}

export default function Products() {
  const [activeProduct, setActiveProduct] = useState<ProductTag>("new_arrival");

  const [products, setProducts] = useState<Product[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
    const interval = setInterval(
      () => {
        getProducts().then(setProducts).catch(console.error);
      },
      5 * 60 * 1000,
    );
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (productId: number) => {
    addToCart(productId, 1);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500); // hide after 1.5s
  };

  const filteredProducts = products.filter(
    (product) => product.tag === activeProduct,
  );

  const tabs: { label: string; value: ProductTag }[] = [
    { label: "New Arrival", value: "new_arrival" },
    { label: "Best Seller", value: "best_seller" },
    { label: "Top Rate", value: "top_rate" },
    { label: "Special Sales", value: "special_sales" },
  ];

  return (
    <section className="text-center py-5 bg-[#fcf9f6] font-sans">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl text-[#360212] font-bold">
          Products
        </h1>
        <div className="w-24 h-1 bg-[#fe5457] mx-auto mt-4"></div>
      </div>
      <header className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-2 md:gap-8 border-b border-[#d791be]/20 mb-10 md:mx-auto max-w-4xl">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveProduct(tab.value)}
            className={`pb-4 px-2 md:px-4 font-bold text-xs md:text-sm uppercase tracking-widest transition-all cursor-pointer ${
              activeProduct === tab.value
                ? "border-b-2 border-[#9f002b] text-[#9f002b]"
                : "text-[#89547c] hover:text-[#9f002b]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </header>

      <div className="container mx-auto px-6">
        <div className="grid gap-3 md:gap-8 grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="border-none bg-white shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="p-0 relative group overflow-hidden"
                >
                  <CardContent>
                    <img
                      src={product.image}
                      // width={300}
                      // height={100}
                      alt=""
                      loading="lazy"
                      className="w-full h-40 md:80 object-contain P-4 md:p-8 group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle Overlay Badge for Tags */}
                    <span className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#9973a0] text-white text-[10px] px-3 py-1 uppercase tracking-tighter font-bold">
                      {product.tag.replace("_", " ")}
                    </span>
                  </CardContent>
                </Link>
                <CardFooter className="flex flex-col p-6 text-center">
                  <h3 className="font-serif text-sm md:text-xl text-[#360212] line-clamp-1 font-semibold md:mb-2">
                    {product.name}
                  </h3>
                  <p className="hidden md:block text-[#89547c] text-sm line-clamp-2 mb-4 h-10 px-4 font-medium">
                    {product.description}
                  </p>
                  <div className="mb-3 md:mb-4">
                    <span className="text-sm md:text-2xl font-bold text-[#360212]">
                      ₦{Number(product.price).toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full py-3 bg-[#fe5457] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#9f002b] transition-colors duration-300 shadow-lg shadow-[#fe5457]/20 cursor-pointer"
                  >
                    Add To Cart
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <CartPopup show={showPopup} />
    </section>
  );
}
