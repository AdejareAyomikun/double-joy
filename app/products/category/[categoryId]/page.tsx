"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProducts } from "@/api/products";
import { useCart } from "@/app/context/CartContext";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function CategoryPage({ params }: any) {
  const { addToCart } = useCart();

  const handleAddToCart = (productId: number) => {
    addToCart(productId, 1);
  };

  const { categoryId } = useParams();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      const filtered = data.filter(
        (p: any) => String(p.category) === String(categoryId)
      );
      setProducts(filtered);
    });
  }, [categoryId]);

  return (
    <>
      <Header />
      <section className="mx-auto p-5 text-center">
        <h1 className="text-3xl font-bold mb-5">Products</h1>
        {products.length === 0 && (
          <p className="text-gray-500 min-h-screen">
            No products in this category yet.
          </p>
        )}
        <div className="grid gap-8 grid-cols-2 lg:grid-cols-3 mx-10">
          {products.map((p) => (
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 lg:p-10">
              <Link key={p.id} href={`/product/${p.id}`} className="block">
                <CardContent>
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={300}
                    height={200}
                    loading="lazy"
                    className="mx-auto block"
                    unoptimized
                  />
                </CardContent>
                <CardFooter className="block justify-center gap-6">
                  <p className="text-gray-600 line-clamp-2">{p.name}</p>
                  <p className="line-clamp-2">#{p.price}</p>
                </CardFooter>
              </Link>
              <button
                onClick={() => handleAddToCart(p.id)}
                className="mt-2 bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 cursor-pointer w-full"
              >
                Add to Cart
              </button>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
