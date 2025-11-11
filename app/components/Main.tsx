"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

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
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition duration-300">
                    Shop Now
                  </button>
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
    </main>
  );
}
