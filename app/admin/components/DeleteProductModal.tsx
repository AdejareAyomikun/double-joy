"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

export default function DeleteProductModal({
  open,
  onClose,
  onConfirm,
  productName,
}: Props) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-[#360212]/60 backdrop-blur-sm flex items-center justify-center z-110 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white w-full max-w-md shadow-2xl relative overflow-hidden border-b-8 border-[#9f002b]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#89547c] hover:text-[#360212] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} className="text-[#9f002b]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#360212] mb-3">
              Confirm Deletion
            </h2>

            <p className="text-[#89547c] text-sm leading-relaxed mb-8">
              Are you sure you want to remove{" "}
              <span className="text-[#360212] font-bold">"{productName}"</span>{" "}
              from the catalog? This action is permanent and cannot be reversed.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={onConfirm}
                className="w-full py-4 bg-[#9f002b] text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#360212] transition-all shadow-lg cursor-pointer"
              >
                Permanently Delete SKU
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#89547c] hover:text-[#360212] transition-colors cursor-pointer"
              >
                Keep this Product
              </button>
            </div>
          </div>
          <div className="h-1 w-full flex">
            <div className="h-full w-1/3 bg-[#360212]"></div>
            <div className="h-full w-1/3 bg-[#9f002b]"></div>
            <div className="h-full w-1/3 bg-[#fe5457]"></div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
