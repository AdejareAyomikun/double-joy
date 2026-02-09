"use client";

import { useState } from "react";
import api from "@/api/axios";
import Header from "@/app/admin/components/Header";
import Footer from "@/app/admin/components/Footer";
import { ChevronRight, FolderPlus, Upload, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      await api.post("/categories/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Collection Added to Catalog");
      setName("");
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

      <main className="p-8 max-w-4xl mx-auto">
        {/* Breadcrumb Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#89547c] mb-2">
            <span>Admin Dashboard</span>
            <ChevronRight size={12} className="text-[#d791be]" />
            <span className="text-[#360212]">Catalog Management</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-[#360212]">
            Create New Collection
          </h1>
          <p className="text-[11px] text-[#89547c] mt-2 italic font-serif">
            Define a new department for the Double-Joy inventory.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl p-10 border border-[#d791be]/10 relative overflow-hidden"
        >
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#fcf9f6] rotate-45 translate-x-12 -translate-y-12 border border-[#d791be]/10" />

          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 gap-8">
              {/* Category Name Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                  <FolderPlus size={14} className="text-[#fe5457]" /> Collection
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. LUXURY TIMEPIECES"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b-2 border-[#fcf9f6] p-4 focus:border-[#fe5457] outline-none transition-colors text-[#360212] font-bold tracking-widest text-xs uppercase placeholder:text-[#d791be]/40 placeholder:font-normal"
                  required
                />
              </div>

              {/* Media Asset Upload */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c]">
                  Collection Cover Imagery
                </label>
                <div className="relative group border-2 border-dashed border-[#d791be]/20 p-12 text-center transition-all hover:border-[#fe5457] bg-[#fcf9f6]/30">
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
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                      <Upload
                        size={20}
                        className="text-[#d791be] group-hover:text-[#fe5457] transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#360212]">
                        {image
                          ? image.name
                          : "Drop imagery here or click to browse"}
                      </p>
                      <p className="text-[9px] text-[#89547c] mt-1">
                        High-resolution JPG or PNG preferred
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Action */}
            <div className="pt-6 border-t border-[#fcf9f6] flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#360212] text-white py-4 px-10 text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl hover:bg-[#9f002b] transition-all flex items-center gap-3 group disabled:bg-gray-200"
              >
                {submitting ? "Synchronizing..." : "Initialize Category"}
                {!submitting && (
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform text-[#fe5457]"
                  />
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
