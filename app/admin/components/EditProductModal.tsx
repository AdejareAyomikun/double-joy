"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Package, Tag, CreditCard, Hash } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: number;
  tag: string;
}

interface Props {
  open: boolean;
  product: Product | null;
  categories: any[];
  onClose: () => void;
  onSave: (data: FormData) => Promise<void>;
  className?: string;
}

export default function EditProductModal({
  open,
  product,
  categories,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [stock, setStock] = useState(product?.stock || 0);
  const [category, setCategory] = useState(product?.category || "");
  const [tag, setTag] = useState(product?.tag || "");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open || !product) return null;

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("category", category.toString());
    if (image) formData.append("image", image);

    await onSave(formData);
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-[#360212]/40 backdrop-blur-sm flex items-center justify-center z-100 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-none shadow-2xl w-full max-w-lg overflow-hidden border-t-8 border-[#fe5457]"
        >
          <div className="p-6 border-b border-[#fcf9f6] flex justify-between items-center bg-white">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#360212]">
                Edit Inventory
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-[#89547c]">
                Updating SKU: {product.id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#89547c] hover:text-[#360212] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                <Package size={12} /> Product Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b-2 border-[#fcf9f6] p-3 focus:border-[#fe5457] outline-none transition-colors text-[#360212] font-medium"
                placeholder="e.g. Silk Evening Gown"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                  <CreditCard size={12} /> Price (₦)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full border-b-2 border-[#fcf9f6] p-3 focus:border-[#fe5457] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                  <Hash size={12} /> Current Stock
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full border-b-2 border-[#fcf9f6] p-3 focus:border-[#fe5457] outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                <Tag size={12} /> Placement Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#fcf9f6] border-none p-3 outline-none text-[#360212] font-medium appearance-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                <Tag size={12} /> Product Tag
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-[#fcf9f6] border-none p-3 outline-none text-[#360212] font-medium appearance-none cursor-pointer"
              >
                <option value=""></option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                <Upload size={12} /> Update Product Image
              </label>
              <div className="relative border-2 border-dashed border-[#d791be]/30 p-4 text-center group hover:border-[#fe5457] transition-colors">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <p className="text-xs text-[#89547c] group-hover:text-[#fe5457]">
                  {image ? image.name : "Click to upload or drag & drop"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#fcf9f6] flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#89547c] hover:text-[#360212] transition-colors cursor-pointer"
            >
              Discard
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg transition-all cursor-pointer
                 ${
                   loading
                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                     : "bg-[#360212] text-white hover:bg-[#9f002b]"
                 }`}
            >
              {loading ? "Synchronizing..." : "Commit Changes"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
