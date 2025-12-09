import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductDetails from "./ProductDetails"
import { categories } from "@/lib/productData";
import { useCart } from "@/app/context/CartContext";

export default async function ProductPage({ params }) {
  const { category, product, image } = await params;
  console.log("PARAMS:", product);
  console.log("CATEGORIES:", categories);

  const categoryData = categories.find((cat) => cat.name === category);
  if (!categoryData) return <p className="p-10">Category not found.</p>;

  const productData = categoryData.products.find((p) => p.product === product);
  if (!productData) return <p className="p-10">Product not found.</p>;

  return (
    <>
      <Header />
      <ProductDetails product={productData} />
      <Footer />
    </>
  );
}
