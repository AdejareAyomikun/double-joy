import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import CartPopup from "@/app/components/CartPopup";

const newArrival = [
  {
    name: "Bagpack",
    image: "/images/products/bagpack.png",
    description:
      "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
    price: 1200,
  },
  {
    name: "Wrist Watch",
    image: "/images/products/iphone16pro.png",
    description:
      "Iphone 16 pro max with 16gb ram and 512gb storage capacity available in different colors",
    price: 1200,
    live: "https://orbyt-ai.vercel.app/",
  },
  {
    name: "Latest Cars",
    image: "/images/products/heels.png",
    description:
      "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
    price: 1200,
    live: "https://orbyt-ai.vercel.app/admin",
  },
  {
    name: "Male Shoes",
    image: "/images/product4.png",
    description:
      "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
    price: 1200,
    live: "https://yourportfolio.vercel.app",
  },
  {
    name: "Male Wears",
    image: "/images/products/suits.png",
    description:
      "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
    price: 1200,
    live: "https://yourportfolio.vercel.app",
  },
  {
    name: "Female Wears",
    image: "/images/product6.png",
    description:
      "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
    price: 1200,
    live: "https://yourportfolio.vercel.app",
  },
];

const bestSeller = [
  {
    name: "apple",
    image: "/images/product1.png",
    description:
      "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
    live: "https://orbyt-ai.vercel.app/",
  },
  {
    name: "Wrist Watch",
    image: "/images/product2.png",
    description:
      "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
    live: "https://orbyt-ai.vercel.app/",
  },
  {
    name: "Latest Cars",
    image: "/images/product3.png",
    description:
      "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
    live: "https://orbyt-ai.vercel.app/admin",
  },
  {
    name: "Male Shoes",
    image: "/images/product4.png",
    description:
      "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
    live: "https://yourportfolio.vercel.app",
  },
  {
    name: "Male Wears",
    image: "/images/product5.png",
    description:
      "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
    live: "https://yourportfolio.vercel.app",
  },
  {
    name: "Female Wears",
    image: "/images/product6.png",
    description:
      "Laptop Bag Bagpack For Huawei Lenovo HP Xiaomi MacBook Air Pro M1,13 14 15.6inch",
    live: "https://yourportfolio.vercel.app",
  },
];

export default function Products() {
  const [activeProduct, setActiveProduct] = useState("New Arrival");
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500); // hide after 1.5s
  };

  return (
    <section className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 py-5">Products</h1>
      <header className="gap-4 border-b mb-6">
        {["New Arrival", "Best Seller", "Top Rate", "Special Sales"].map(
          (productType) => (
            <button
              key={productType}
              onClick={() => setActiveProduct(productType)}
              className={`pb-2 px-3 font-medium capitalize cursor-pointer  ${
                activeProduct === productType
                  ? "border-b-2 border-[black text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {productType}
            </button>
          )
        )}
      </header>

      <div className="p-10 text-center">
        {activeProduct === "New Arrival" && (
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-3">
            {newArrival.map((arrival, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 lg:p-10">
                  <CardContent>
                    <Image
                      src={arrival.image}
                      width={300}
                      height={100}
                      alt=""
                      loading="lazy"
                      className="mx-auto block"
                    />
                  </CardContent>
                  <CardFooter className="block justify-center gap-6">
                    <p>{arrival.name}</p>
                    <p className="text-gray-600 line-clamp-2">
                      {arrival.description}
                    </p>
                    <br />
                    <p>${arrival.price}</p>
                    <button
                      onClick={() => handleAddToCart(arrival)}
                      className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                    >
                      Add To Cart
                    </button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeProduct === "Best Seller" && (
          <div className="grid gap-8 grid-cols-3">
            {bestSeller.map((seller, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 lg:p-10">
                  <CardContent>
                    <Image
                      src={seller.image}
                      width={300}
                      height={100}
                      alt=""
                      loading="lazy"
                      className="mx-auto block"
                    />
                  </CardContent>
                  <CardFooter className="block justify-center gap-6">
                    <p className="text-gray-600 line-clamp-2">
                      {seller.description}
                    </p>
                    <br />
                    <a
                      href={seller.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white p-3 rounded-sm transition cursor-pointer"
                    >
                      {seller.name}
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <CartPopup show={showPopup} />
    </section>
  );
}
