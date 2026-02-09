"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/app/admin/components/Header";
import Footer from "@/app/admin/components/Footer";
import { getCategories, getProductsByCategory } from "@/api/products";
import api from "@/api/axios";
import EditProductModal from "../../components/EditProductModal";
import DeleteProductModal from "../../components/DeleteProductModal";
import { Plus, Edit3, Trash2, Package, Tag as TagIcon } from "lucide-react";
import Cookies from "js-cookie";

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

  const handleUpdateProduct = async (formData: FormData) => {
    if (!selectedProduct) return;
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
      console.error("UPDATE ERRORS:", err.response?.data);
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
      <div className="min-h-screen bg-[#fcf9f6]">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <p className="font-serif italic text-[#89547c] animate-pulse">
            Cataloging Inventory...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf9f6] text-[#360212] font-sans">
      <Header />
      <div className="p-8 max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold">Product Catalog</h1>
            <p className="text-[#89547c] mt-1 italic">
              Manage your boutique offerings and stock levels.
            </p>
          </div>

          <a
            href="/admin/dashboard/add-product"
            className="flex items-center gap-2 px-6 py-3 bg-[#360212] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#fe5457] transition-all shadow-lg"
          >
            <Plus size={16} /> Add New Listing
          </a>
        </header>

        {categories.map((category) => {
          const products = productsByCategory[category.id] || [];
          if (products.length === 0) return null;
          return (
            <section key={category.id} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl font-serif font-bold uppercase tracking-widest">
                  {category.name}
                </h2>
                <div className="h-px bg-[#d791be]/30 flex-1"></div>
                <span className="text-[10px] font-bold text-[#d791be] uppercase">
                  {products.length} Items
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white border border-[#d791be]/10 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-64 w-full bg-[#fcf9f6]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      {product.tag && (
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 flex items-center gap-1">
                          <TagIcon size={10} className="text-[#fe5457]" />
                          <span className="text-[9px] font-bold uppercase tracking-tighter">
                            {product.tag}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-bold truncate mb-1">
                        {product.name}
                      </h3>
                      <p className="text-[#9f002b] font-bold mb-3">
                        ₦{Number(product.price).toLocaleString()}
                      </p>

                      <div className="flex items-center gap-2 mb-6">
                        <div
                          className={`w-2 h-2 rounded-full ${product.stock === 0
                              ? "bg-[#9f002b]"
                              : product.stock <= 5
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                        />
                        <p
                          className={`text-[11px] font-bold uppercase tracking-wider ${product.stock === 0
                              ? "text-[#9f002b]"
                              : product.stock <= 5
                                ? "text-amber-600"
                                : "text-[#89547c]"
                            }`}
                        >
                          {product.stock === 0
                            ? "Out of Stock"
                            : product.stock <= 5
                              ? `Limited: ${product.stock} left`
                              : `In Stock: ${product.stock}`}
                        </p>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-[#fcf9f6]">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold uppercase tracking-widest border border-[#360212] text-[#360212] hover:bg-[#360212] hover:text-white transition-all"
                        >
                          <Edit3 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteProduct(product)}
                          className="px-3 py-2 border border-transparent text-[#9f002b] hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
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
      <Footer />
    </div>
  );
}
