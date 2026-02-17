"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/app/admin/components/Header";
import Footer from "@/app/admin/components/Footer";
import { getCategories } from "@/api/products";
import api from "@/api/axios";
import EditCategoryModal from "../../components/EditCategoryModal";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Plus, Trash2, FolderOpen } from "lucide-react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  image?: string;
}

export default function ProductCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const openEditModal = (category: Category) => {
    setActiveCategory(category);
    setIsModalOpen(true);
  };

  const handleUpdateCategory = async (formData: FormData) => {
    if (!activeCategory) return;
    try {
      const res = await api.put(`/categories/${activeCategory.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update local state to reflect changes immediately
      setCategories(
        categories.map((cat) =>
          cat.id === activeCategory.id ? (res.data as Category) : cat,
        ),
      );

      alert("Collection Synchronized Successfully");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update collection");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to retire this collection?")) return;
    try {
      await api.delete(`/categories/${id}/`);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      alert("Error removing category");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f6]">
      <Header />

      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-5 md:mb-12">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#89547c] mb-2">
              <span>Admin Dashboard</span>
              <ChevronRight size={12} className="text-[#d791be]" />
              <span className="text-[#360212]">Collections</span>
            </div>
            <h1 className="font-serif text-2xl md:text-4xl font-bold text-[#360212]">
              Boutique Departments
            </h1>
          </div>

          <Link href="/admin/dashboard/add-category">
            <button className="bg-[#360212] text-white py-4 px-8 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 shadow-xl hover:bg-[#fe5457] transition-all group">
              <Plus
                size={16}
                className="group-hover:rotate-90 transition-transform"
              />
              Initialize Collection
            </button>
          </Link>
        </header>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 bg-white/50 animate-pulse border border-[#d791be]/10"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mg:gap-8">
            <AnimatePresence>
              {categories.map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-white border border-[#d791be]/10 overflow-hidden shadow-sm hover:shadow-2xl transition-all h-100"
                >
                  {/* Image Placeholder or Actual Image */}
                  <div className="absolute inset-0 bg-[#360212]">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-20">
                        <FolderOpen size={80} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 bg-liner-to-t from-[#360212] via-transparent to-transparent">
                    <p className="text-[10px] font-bold text-[#fe5457] uppercase tracking-[0.4em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Collection #{cat.id}
                    </p>
                    <h3 className="font-serif text-3xl font-bold text-white mb-6 group-hover:text-[#fcf9f6]">
                      {cat.name}
                    </h3>

                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="text-[9px] font-bold text-white uppercase tracking-widest border-b border-white pb-1 hover:text-[#fe5457] hover:border-[#fe5457]"
                      >
                        Edit Details
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 bg-[#9f002b] text-white hover:bg-[#fe5457] transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        <EditCategoryModal
          open={isModalOpen}
          category={activeCategory}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdateCategory}
        />

        {/* Empty State */}
        {!loading && categories.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-[#d791be]/20">
            <FolderOpen size={48} className="mx-auto text-[#d791be] mb-4" />
            <p className="font-serif text-xl italic text-[#89547c]">
              The catalog is currently empty.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
