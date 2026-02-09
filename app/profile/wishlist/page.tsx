"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Heart, ShoppingBag, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

// Mock Product data (replace with actual API call if needed)
const mockWishlistItems = [
  {
    id: 1,
    name: "Classic Leather Tote",
    image: "/images/products/bagpack.png", // Using existing image for now
    price: 35000,
    category: "Bags",
  },
  {
    id: 2,
    name: "Elegant Pearl Necklace",
    image: "/images/products/heels.png", // Using existing image for now
    price: 18000,
    category: "Jewelry",
  },
  {
    id: 3,
    name: "Designer Silk Scarf",
    image: "/images/products/suits.png", // Using existing image for now
    price: 12500,
    category: "Accessories",
  },
  {
    id: 4,
    name: "Handcrafted Ceramic Mug",
    image: "/images/products/iphone16pro.png", // Using existing image for now
    price: 4500,
    category: "Home Decor",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(mockWishlistItems);

  const handleRemoveFromWishlist = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const handleAddToBag = (item: any) => {
    // Implement actual add to cart logic here
    console.log(`Adding ${item.name} to bag`);
    handleRemoveFromWishlist(item.id); // Optionally remove from wishlist after adding to bag
  };

  return (
    <div className="bg-[#fcf9f6] min-h-screen font-sans text-[#360212]">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl mb-12 border-b border-[#d791be]/20 pb-6 text-center lg:text-left">
          Your Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <Heart size={64} className="text-[#d791be]/50 mb-6" />
            <h2 className="font-serif text-3xl mb-4">Your wishlist is looking a little empty.</h2>
            <p className="text-[#89547c] mb-6">Start saving your favorite items for later!</p>
            <Link 
              href="/shop" 
              className="bg-[#fe5457] text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#9f002b] transition-all"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative bg-white shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <Link href={`/product/${item.id}`} className="block relative overflow-hidden">
                  <div className="aspect-4/5 relative bg-[#fcf9f6]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                
                <button 
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-[#89547c] hover:text-[#fe5457] hover:bg-red-50 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <XCircle size={20} />
                </button>

                <div className="p-6 text-center">
                  <h3 className="font-serif text-lg font-semibold mb-1">
                    <Link href={`/product/${item.id}`} className="hover:text-[#9f002b] transition-colors">{item.name}</Link>
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#89547c] mb-3">{item.category}</p>
                  <p className="font-bold text-xl text-[#9f002b] mb-4">₦{Number(item.price).toLocaleString()}</p>
                  
                  <button
                    onClick={() => handleAddToBag(item)}
                    className="w-full bg-[#360212] text-white py-3 font-bold uppercase tracking-widest text-xs hover:bg-[#fe5457] transition-colors shadow-lg shadow-[#360212]/20"
                  >
                    Add to Bag
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}