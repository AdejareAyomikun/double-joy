"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Products from "./Products";

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

export default function Main() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [current]);

  const slides = [
    {
      src: "/images/slide1.png",
      title: "Step Into the Future",
      description:
        "Experience unparalleled comfort and style with our new minimalist line.",
      textColor: "text-white",
      url: "/shop/new-arrivals",
    },
    {
      src: "/images/slide2.png",
      title: "Deals of the Week",
      description: "Don't miss out on massive discounts across all categories!",
      textColor: "text-white",
      url: "/deals",
    },
    {
      src: "/images/slide4.png",
      title: "Deals of the Week",
      description: "Don't miss out on massive discounts across all categories!",
      textColor: "text-white",
      url: "/deals",
    },
  ];

  return (
    <main>
      <section className="hero-section">
        <div className="col-span-8 relative w-full mx-auto overflow-hidden">
          <div
            className="flex transition-transform ease-in-out duration-100"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="relative w-full shrink-0">
                <Image
                  src={slide.src}
                  alt={`Slide ${i + 1}`}
                  width={1300}
                  height={800}
                  className="w-full h-screen object-cover"
                  priority={i === 0}
                />

                {/* Overlay Text Container */}
                <div
                  className={`absolute inset-0 flex flex-col justify-center items-start p-10 md:p-20 ${slide.textColor}`}
                >
                  <h1 className="text-4xl text-black md:text-5xl font-extrabold mb-3 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-black md:text-xl mb-6 drop-shadow-md max-w-md">
                    {slide.description}
                  </p>

                  {/* Clickable Button */}
                  <a href={slide.url} className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition duration-300 cursor-pointer">
                    Shop Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition z-10"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition z-10"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition ${
                  current === i ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="product-groups">
        <div className="mx-auto lg:p-10 py-5 text-center">
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-3 mx-10">
            {productGroup.map((product, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 lg:p-10">
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
      <Products />
    </main>
  );
}
