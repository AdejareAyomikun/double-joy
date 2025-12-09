"use client";

import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/productData";
import Header from "../components/Header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const productGroup = [
  {
    title: "Sneakers",
    image: "/images/product1.png",
    live: "products/sneakers",
  },
  {
    title: "Wrist Watches",
    image: "/images/product2.png",
    live: "products/wristwatches",
  },
  {
    title: "Latest Cars",
    image: "/images/product3.png",
    live: "products/cars",
  },
  {
    title: "Male Shoes",
    image: "/images/product4.png",
    live: "products/maleshoes",
  },
  {
    title: "Male Wears",
    image: "/images/product5.png",
    live: "products/malewears",
  },
  {
    title: "Female Shoes",
    image: "/images/product6.png",
    live: "products/femaleshoes",
  },
  {
    title: "Female Wears",
    image: "/images/product7.png",
    live: "products/female-wears",
  },
  {
    title: "Phones",
    image: "/images/product8.png",
    live: "products/phones",
  },
  {
    title: "Laptops",
    image: "/images/product9.png",
    live: "products/laptops",
  },
];

export default function ProductsPage() {
  return (
    <>
      <Header />
      {/* <div className="space-y-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/products/${cat.name}`}
            className="block text-blue-600 underline"
          >
            {cat.label}
          </Link>
        ))}
      </div> */}
      <section className="product-groups">
        <div className="mx-auto lg:p-10 py-5 text-center">
          <h1 className="text-3xl font-bold mb-10">Product Categories</h1>
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-3 mx-10">
            {productGroup.map((product, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="overflow-hidden transition-all duration-300 lg:p-10">
                  <CardContent>
                    <Image
                      src={product.image}
                      width={300}
                      height={100}
                      alt=""
                      className="mx-auto block"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-center gap-6">
                    <a
                      href={product.live}
                      // target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white p-3 rounded-sm transition"
                    >
                      {product.title}
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
