"use client";

import { useState, useEffect } from "react";
import api from "@/api/axios";
import { getCategories } from "@/api/products";
import {
  ChevronRight,
  Upload,
  Package,
  Info,
  Tag,
  CreditCard,
  Hash,
} from "lucide-react";
import Header from "@/app/admin/components/Header";
import Footer from "@/app/admin/components/Footer";
import { Category } from "@/types/admin";
import { motion } from "framer-motion";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">(0);
  const [stock, setStock] = useState<number | "">(0);
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a category");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("category", category.toString()); // must be the category ID
    if (image) formData.append("image", image);

    try {
      const res = await api.post("/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product created:", res.data);
      alert("Inventory Synchronized Successfully!");
      setName("");
      setDescription("");
      setPrice(0);
      setStock(0);
      setCategory("");
      setImage(null);
    } catch (err: any) {
      console.error("Error:", err.response || err);
      alert("Synchronization Error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f6]">
      <Header />
      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        <header className="mb-4 md:mb-10">
          <div className="flex items-center gap-1 md:gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[#89547c] mb-2">
            <span>Admin Dashboard</span>
            <ChevronRight size={12} className="text-[#d791be]" />
            <span className="text-[#360212]">Catalog Management</span>
          </div>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-[#360212]">
            Introduce New Product
          </h1>
        </header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl p-10 border border-[#d791be]/10"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                  <Package size={14} /> Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vintage Silk Kimono"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b-2 border-[#fcf9f6] p-3 focus:border-[#fe5457] outline-none transition-colors text-[#360212] font-medium placeholder:text-[#d791be]/50 placeholder:font-normal"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                  <CreditCard size={14} /> Price (₦)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full border-b-2 border-[#fcf9f6] p-3 focus:border-[#fe5457] outline-none transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                  <Hash size={14} /> Initial Stock Level
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full border-b-2 border-[#fcf9f6] p-3 focus:border-[#fe5457] outline-none transition-colors"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                <Tag size={14} /> Collection Category
              </label>
              {loading ? (
                <div className="h-12 bg-[#fcf9f6] animate-pulse rounded" />
              ) : (
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="w-full bg-[#fcf9f6] border-none p-4 outline-none text-[#360212] font-bold text-xs uppercase tracking-widest appearance-none cursor-pointer hover:bg-[#d791be]/10 transition-colors"
                  required
                >
                  <option value="">Choose a Collection</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                <Info size={14} /> Product Narrative
              </label>
              <textarea
                placeholder="Describe the craftsmanship and material..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border-2 border-[#fcf9f6] p-4 focus:border-[#fe5457] outline-none transition-colors min-h-30 text-sm leading-relaxed"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c]">
                Media Assets
              </label>
              <div className="relative group border-2 border-dashed border-[#d791be]/30 p-8 text-center transition-all hover:border-[#fe5457]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setImage(file);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  required={!image}
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload
                    size={24}
                    className="text-[#d791be] group-hover:text-[#fe5457] transition-colors"
                  />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#89547c]">
                    {image ? image.name : "Select Product Imagery"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#fcf9f6] flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#360212] text-white py-4 px-12 text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl hover:bg-[#9f002b] transition-all disabled:bg-gray-300"
              >
                {submitting ? "Processing..." : "Register Product"}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
