"use client";

import React from "react";
import Image from "next/image";
import api from "@/api/axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import CartPopup from "@/app/components/CartPopup";
// import { getProducts } from "@/api/products";
import { get } from "axios";
import { label } from "framer-motion/client";

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

// const newArrival = [
//   {
//     name: "Bagpack",
//     image: "/images/products/bagpack.png",
//     description:
//       "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
//     price: 1200,
//   },
//   {
//     name: "Wrist Watch",
//     image: "/images/products/iphone16pro.png",
//     description:
//       "Iphone 16 pro max with 16gb ram and 512gb storage capacity available in different colors",
//     price: 1200,
//     live: "https://orbyt-ai.vercel.app/",
//   },
//   {
//     name: "Latest Cars",
//     image: "/images/products/heels.png",
//     description:
//       "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
//     price: 1200,
//     live: "https://orbyt-ai.vercel.app/admin",
//   },
//   {
//     name: "Male Shoes",
//     image: "/images/product4.png",
//     description:
//       "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
//     price: 1200,
//     live: "https://yourportfolio.vercel.app",
//   },
//   {
//     name: "Male Wears",
//     image: "/images/products/suits.png",
//     description:
//       "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
//     price: 1200,
//     live: "https://yourportfolio.vercel.app",
//   },
//   {
//     name: "Female Wears",
//     image: "/images/product6.png",
//     description:
//       "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
//     price: 1200,
//     live: "https://yourportfolio.vercel.app",
//   },
// ];

// const bestSeller = [
//   {
//     name: "apple",
//     image: "/images/product1.png",
//     description:
//       "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
//     live: "https://orbyt-ai.vercel.app/",
//   },
//   {
//     name: "Wrist Watch",
//     image: "/images/product2.png",
//     description:
//       "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
//     live: "https://orbyt-ai.vercel.app/",
//   },
//   {
//     name: "Latest Cars",
//     image: "/images/product3.png",
//     description:
//       "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
//     live: "https://orbyt-ai.vercel.app/admin",
//   },
//   {
//     name: "Male Shoes",
//     image: "/images/product4.png",
//     description:
//       "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
//     live: "https://yourportfolio.vercel.app",
//   },
//   {
//     name: "Male Wears",
//     image: "/images/product5.png",
//     description:
//       "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
//     live: "https://yourportfolio.vercel.app",
//   },
//   {
//     name: "Female Wears",
//     image: "/images/product6.png",
//     description:
//       "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
//     live: "https://yourportfolio.vercel.app",
//   },
// ];

export default function Products() {
  const [activeProduct, setActiveProduct] = useState<ProductTag>("new_arrival");

  const [products, setProducts] = useState<Product[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
    const interval = setInterval(() => {
      getProducts().then(setProducts).catch(console.error);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (productId: number) => {
    addToCart(productId, 1);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500); // hide after 1.5s
  };

  const filteredProducts = products.filter(
    (product) => product.tag === activeProduct
  );

  const tabs: { label: string; value: ProductTag }[] = [
    { label: "New Arrival", value: "new_arrival" },
    { label: "Best Seller", value: "best_seller" },
    { label: "Top Rate", value: "top_rate" },
    { label: "Special Sales", value: "special_sales" },
  ];

  return (
    <section className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 py-5">Products</h1>
      <header className="gap-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveProduct(tab.value)}
            className={`pb-2 px-3 font-medium capitalize cursor-pointer  ${
              activeProduct === tab.value
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </header>

      <div className="p-10 text-center">
        <div className="grid gap-8 grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 lg:p-10">
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="block"
                >
                  <CardContent>
                    <img
                      src={product.image}
                      width={300}
                      height={100}
                      alt=""
                      loading="lazy"
                      className="mx-auto"
                    />
                  </CardContent>
                </Link>
                <CardFooter className="block justify-center gap-6">
                  <p>{product.name}</p>
                  <p className="text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <br />
                  <p>#{product.price}</p>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
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
