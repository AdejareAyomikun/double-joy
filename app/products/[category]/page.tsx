import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/productData";
import { getProductsByCategory } from"@/lib/productData";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";

export default async function CategoryPage({ params }: any) {
  const { category } = await params;
  const products = await getProductsByCategory(params.category);

  const categoryData = categories.find((cat) => cat.name === category);

  if (!categoryData) {
    return <p className="p-10">Category not found.</p>;
  }

  return (
    <>
      <Header />
      <section className="mx-auto p-5 text-center">
        <h1 className="text-3xl font-bold mb-5">{categoryData.label}</h1>
        <div className="grid gap-8 grid-cols-2 lg:grid-cols-3 mx-10">
          {categoryData.products.map((product) => (
            <Link
              key={product.name}
              href={`/products/${categoryData.name}/${product.product}`}
              className="block"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 lg:p-10">
                <CardContent>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    loading="lazy"
                    className="mx-auto block"
                  />
                </CardContent>
                <CardFooter className="block justify-center gap-6">
                  <p className="text-gray-600 line-clamp-2">{product.name}</p>
                  <p className="line-clamp-2">${product.price}</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="grid gap-8 grid-cols-2 lg:grid-cols-3 mx-10">
          {products.map((p: any) => (
            <Link
              key={p.id}
              href={`/products/${p.category.slug}/${p.slug}`}
              className="block"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 lg:p-10">
                <CardContent>
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={300}
                    height={200}
                  />
                </CardContent>
                <CardFooter>
                  <h3 className="mt-3 font-semibold text-xl">{p.name}</h3>
                  <p>{p.price}</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
