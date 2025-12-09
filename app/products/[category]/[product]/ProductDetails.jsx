"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import CartPopup from "@/app/components/CartPopup";
import { getProductDetails } from "@app/products/lib/ProductData";

export default function ProductDetails({ product }) {
  //   const { addToCart } = useCart();
  //   const [showPopup, setShowPopup] = useState(false);

  //   const handleAddToCart = () => {
  //   addToCart(product);
  //   setShowPopup(true);
  //   setTimeout(() => setShowPopup(false), 1500); // hide after 1.5s
  // };

  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductDetails(slug).then((data) => setProduct(data));
  }, [slug]);

  if (!product) return <p className="p-10">Loading...</p>;

  return (
    // <section className="grid lg:grid-cols-2 sm:grid-cols-1">
    //   <div className="bg-gray-200">
    //     <Image
    //       src={product.image}
    //       alt={product.name}
    //       width={600}
    //       height={400}
    //       loading="lazy"
    //     />
    //   </div>

    //   <div className="p-20">
    //     <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
    //     <p className="text-xl mb-2">${product.price}</p>
    //     <p className="text-gray-700">{product.description}</p>

    //     <button
    //       onClick={handleAddToCart}
    //       className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
    //     >
    //       Add to Cart
    //     </button>
    //   </div>
    //   <CartPopup show={showPopup} />
    // </section>

    <section className="grid lg:grid-cols-2 sm:grid-cols-1">
      <div className="bg-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={400}
          loading="lazy"
        />
      </div>

      <div className="p-20">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl mb-2">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
      <CartPopup show={showPopup} />
    </section>
  );
}
