// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import Products from "./Products";
// import { getCategories } from "@/api/products";

// export default function Main() {
//   const [current, setCurrent] = useState(0);
//   const [categories, setCategories] = useState<any[]>([]);

//   useEffect(() => {
//     getCategories().then(setCategories);
//   }, []);

//   const slides = [
//     {
//       src: "/images/slide1.png",
//       title: "Step Into the Future",
//       description:
//         "Experience unparalleled comfort and style with our new minimalist line.",
//       url: "/shop/new-arrivals",
//     },
//     {
//       src: "/images/slide2.png",
//       title: "Deals of the Week",
//       description: "Don't miss out on massive discounts across all categories!",
//       url: "/deals",
//     },
//     {
//       src: "/images/slide4.png",
//       title: "Deals of the Week",
//       description: "Don't miss out on massive discounts across all categories!",
//       url: "/deals",
//     },
//   ];

//   const nextSlide = () =>
//     setCurrent(current === slides.length - 1 ? 0 : current + 1);
//   const prevSlide = () =>
//     setCurrent(current === 0 ? slides.length - 1 : current - 1);

//   useEffect(() => {
//     const timer = setInterval(nextSlide, 5000);
//     return () => clearInterval(timer);
//   }, [current]);

//   return (
//     <main className="bg-[#fcf9f6] font-sans">
//       {/* HERO SECTION */}
//       <section className="hero-section">
//         <div className="relative w-full mx-auto overflow-hidden h-screen">
//           <div
//             className="flex transition-transform ease-in-out duration-700 h-full"
//             style={{ transform: `translateX(-${current * 100}%)` }}
//           >
//             {slides.map((slide, i) => (
//               <div key={i} className="relative w-full shrink-0 h-full">
//                 <Image
//                   src={slide.src}
//                   alt={slide.title}
//                   fill
//                   className="object-cover"
//                   priority={i === 0}
//                 />
//                 {/* Overlay with Gradient for Readability */}
//                 <div className="absolute inset-0 bg-linear-to-r from-[#360212]/60 to-transparent flex flex-col justify-center items-start p-10 md:p-24 text-white">
//                   <motion.h1
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="font-serif text-5xl md:text-7xl font-bold mb-4 drop-shadow-md"
//                   >
//                     {slide.title}
//                   </motion.h1>
//                   <motion.p
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="text-lg md:text-2xl mb-8 max-w-lg text-[#d791be]"
//                   >
//                     {slide.description}
//                   </motion.p>

//                   <Link
//                     href={slide.url}
//                     className="bg-[#fe5457] text-white px-8 py-4 rounded-sm shadow-xl font-bold uppercase tracking-widest hover:bg-[#9f002b] transition duration-300"
//                   >
//                     Shop Collection
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             onClick={prevSlide}
//             className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-[#fe5457] transition-all z-10"
//           >
//             <ChevronLeft size={30} />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-[#fe5457] transition-all z-10"
//           >
//             <ChevronRight size={30} />
//           </button>
//         </div>
//       </section>

//       {/* CATEGORIES SECTION */}
//       <section className="product-groups py-20 px-6 container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="font-serif text-4xl text-[#360212] font-bold">
//             Browse by Category
//           </h2>
//           <div className="w-24 h-1 bg-[#fe5457] mx-auto mt-4"></div>
//         </div>

//         <div className="grid gap-4 md:gap-8 grid-cols-2 lg:grid-cols-3">
//           {categories.map((cat) => (
//             <motion.div
//               key={cat.id}
//               whileHover={{ y: -10 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Card className="border-none shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white group">
//                 <CardContent className="p-0 relative">
//                   <img
//                     src={cat.image}
//                     alt={cat.name}
//                     className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   {/* <div className="absolute inset-0 bg-[#360212]/20 group-hover:bg-[#360212]/40 transition-colors" /> */}
//                 </CardContent>
//                 <CardFooter className="flex flex-col items-center p-8 bg-white">
//                   <h3 className="font-serif text-2xl text-[#360212] mb-4">
//                     {cat.name}
//                   </h3>
//                   <Link
//                     href={`/products/category/${cat.id}`}
//                     className="text-sm font-bold uppercase tracking-widest text-[#9f002b] hover:text-[#fe5457] transition-colors border-b-2 border-[#d791be]/30 pb-1"
//                   >
//                     Explore Products
//                   </Link>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* FEATURED PRODUCTS */}
//       <div className="bg-[#fcf9f6] pb-20">
//         <Products />
//       </div>
//     </main>
//   );
// }
// VERSION 1

"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Products from "./Products";
import { getCategories } from "@/api/products";

export default function Main() {
  const [current, setCurrent] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const slides = [
    {
      src: "/images/slide1.png",
      title: "Step Into the Future",
      description: "Experience unparalleled comfort and style.",
      url: "/shop/new-arrivals",
    },
    {
      src: "/images/slide2.png",
      title: "Deals of the Week",
      description: "Massive discounts across all categories!",
      url: "/deals",
    },
  ];

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <main className="bg-[#fcf9f6] font-sans">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="relative w-full mx-auto overflow-hidden h-[60vh] md:h-screen">
          <div
            className="flex transition-transform ease-in-out duration-700 h-full"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="relative w-full shrink-0 h-full">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#360212]/80 via-[#360212]/40 to-transparent flex flex-col justify-center items-start p-6 md:p-24 text-white">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif text-4xl md:text-7xl font-bold mb-2 md:mb-4 drop-shadow-md"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm md:text-2xl mb-6 md:mb-8 max-w-xs md:max-w-lg text-[#d791be]"
                  >
                    {slide.description}
                  </motion.p>
                  <Link
                    href={slide.url}
                    className="bg-[#fe5457] text-white px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm rounded-sm shadow-xl font-bold uppercase tracking-widest hover:bg-[#9f002b] transition duration-300"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="product-groups py-12 md:py-20 px-4 container mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#360212] font-bold">
            Browse Categories
          </h2>
          <div className="w-20 h-1 bg-[#fe5457] mx-auto mt-3"></div>
        </div>

        <div className="grid gap-3 md:gap-8 grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-white group rounded-sm">
                <CardContent className="p-0 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-32 sm:h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-center p-3 md:p-6 bg-white text-center">
                  <h3 className="font-serif text-base md:text-xl text-[#360212] mb-1 md:mb-2 line-clamp-1">
                    {cat.name}
                  </h3>
                  <Link
                    href={`/products/category/${cat.id}`}
                    className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#9f002b] hover:text-[#fe5457] transition-colors border-b-2 border-[#d791be]/20 pb-0.5"
                  >
                    Explore Products
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="bg-[#fcf9f6] pb-20">
        <Products />
      </div>
    </main>
  );
}