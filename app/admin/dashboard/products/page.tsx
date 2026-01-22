"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/app/admin/components/Header";
import { getCategories, getProductsByCategory } from "@/api/products";
import api from "@/api/axios";
import EditProductModal from "../../components/EditProductModal";
import DeleteProductModal from "../../components/DeleteProductModal";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: number;
  tag: string;
}

export default function AllProducts() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<
    Record<number, Product[]>
  >({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
        const productsData: Record<number, Product[]> = {};
        for (const category of fetchedCategories) {
          const products = await getProductsByCategory(category.id);
          productsData[category.id] = products;
        }
        setProductsByCategory(productsData);
      } catch (error) {
        console.log("Failed Loading products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const refreshProducts = async () => {
    setLoading(true);
    try {
      const productsData: Record<number, Product[]> = {};
      for (const category of categories) {
        const products = await getProductsByCategory(category.id);
        productsData[category.id] = products;
      }
      setProductsByCategory(productsData);
    } catch (err) {
      console.error("Failed to refresh products", err);
    } finally {
      setLoading(false);
    }
  };

  // const handleUpdateProduct = async (formData: FormData) => {
  //   if (!selectedProduct) return;

  //   await api.patch(`/products/${selectedProduct.id}/`, formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });

  //   setSelectedProduct(null);
  //   refreshProducts();
  // };

  const handleUpdateProduct = async (formData: FormData) => {
    if (!selectedProduct) return;

    // Create a new FormData with only filled fields
    const patchData = new FormData();
    for (let [key, value] of formData.entries()) {
      if (value) patchData.append(key, value);
    }

    try {
      await api.patch(`/products/${selectedProduct.id}/`, patchData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSelectedProduct(null);
      refreshProducts();
    } catch (err: any) {
      console.error("❌ UPDATE ERRORS:", err.response?.data);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteProduct) return;

    await api.delete(`/products/${deleteProduct.id}/`);
    setDeleteProduct(null);
    refreshProducts();
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="p-6">Loading products...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex lg:gap-120 md:gap-20">
          <h1 className="text-3xl font-bold mb-8">Products (Admin)</h1>
          <a
            href="/admin/dashboard/add-product"
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
          >
            Add Product
          </a>
        </div>
        {categories.map((category) => {
          const products = productsByCategory[category.id] || [];
          if (products.length === 0) return null;
          return (
            <section key={category.id} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">{category.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="lg:w-full lg:h-48 lg:object-cover rounded-md mb-4"
                      unoptimized
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">#{product.price}</p>
                    <p
                      className={`mt-1 font-medium ${
                        product.stock == 0
                          ? "text-red-600"
                          : product.stock <= 5
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {product.stock == 0
                        ? "Out of stock"
                        : product.stock <= 5
                        ? `Low stock: ${product.stock}`
                        : `In stock: ${product.stock}`}
                    </p>
                    <p>{product.tag}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteProduct(product)}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <EditProductModal
        open={!!selectedProduct}
        product={selectedProduct}
        categories={categories}
        onClose={() => setSelectedProduct(null)}
        onSave={handleUpdateProduct}
      />

      <DeleteProductModal
        open={!!deleteProduct}
        productName={deleteProduct?.name || ""}
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleDeleteProduct}
      />
    </>
  );
}
