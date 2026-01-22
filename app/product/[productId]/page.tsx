"use client";

import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useCart } from "@/app/context/CartContext";
import CartPopup from "@/app/components/CartPopup";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/api/axios";

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
  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <section className="grid lg:grid-cols-2 sm:grid-cols-1">
        <div className="bg-gray-200">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={400}
            loading="lazy"
            unoptimized
          />
        </div>

        <div className="p-20">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl mb-2">#{product.price}</p>
          <p className="text-gray-700">{product.description}</p>

          <button
            onClick={() => handleAddToCart(product.id)}
            className="mt-2 bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </section>
      <CartPopup show={showPopup} />
      <Footer />
    </>
  );
}
