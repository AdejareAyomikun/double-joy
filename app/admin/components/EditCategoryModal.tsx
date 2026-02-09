"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, FolderEdit, Save } from "lucide-react";

interface Props {
  open: boolean;
  category: any; // Using singular 'category' as it represents the item being edited
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
}

export default function EditCategoryModal({
  open,
  category,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Sync state with selected category when modal opens
  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setPreview(category.image || null);
      setImage(null);
    }
  }, [category, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#360212]/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden border border-[#d791be]/20"
          >
            {/* Header */}
            <div className="bg-[#360212] p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="font-serif text-2xl font-bold">Edit Collection</h2>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#fe5457] mt-1 font-bold">
                  Catalog ID: #{category?.id}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="hover:rotate-90 transition-transform text-[#d791be]"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c] flex items-center gap-2">
                  <FolderEdit size={14} /> Collection Identity
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-[#d791be]/30 p-3 focus:border-[#fe5457] outline-none text-[#360212] font-bold text-xs uppercase tracking-widest transition-all"
                  required
                />
              </div>

              {/* Image Upload Area */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#89547c]">
                  Collection Cover
                </label>
                <div className="relative aspect-video group overflow-hidden border-2 border-dashed border-[#d791be]/20 flex flex-col items-center justify-center bg-[#fcf9f6] hover:border-[#fe5457] transition-colors">
                  {preview ? (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-40" 
                    />
                  ) : (
                    <Upload size={32} className="text-[#d791be] mb-2" />
                  )}
                  
                  <div className={`relative z-10 flex flex-col items-center gap-2 ${preview ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} transition-opacity duration-300`}>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#360212] bg-white px-3 py-2 shadow-sm">
                      Change Imagery
                    </p>
                  </div>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-[#fcf9f6]">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 text-[10px] font-bold uppercase tracking-widest text-[#89547c] border border-[#d791be]/20 hover:bg-[#fcf9f6] transition-colors"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#360212] text-white py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#fe5457] transition-all disabled:bg-gray-300 shadow-lg shadow-[#360212]/10"
                >
                  <Save size={16} />
                  {loading ? "SAVING..." : "SYNC CHANGES"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}