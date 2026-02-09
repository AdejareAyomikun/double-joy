"use client";

import { useCart } from "../context/CartContext";
import { Check, X } from "lucide-react";

type CartPopupProps = {
  show: boolean;
};

export default function CartPopup({ show }: CartPopupProps) {
  const { successMessage, clearMessage } = useCart();

  if (!successMessage || !show) return null;

  return (
    <div className="fixed top-24 right-5 z-100 font-sans">
      <div className="bg-white border-l-4 border-[#fe5457] text-[#360212] px-6 py-4 shadow-2xl flex items-center justify-between gap-6 animate-in slide-in-from-right-10 fade-in duration-300">
        <div className="flex items-center gap-3">
          <div className="bg-[#fe5457] rounded-full p-1">
            <Check size={16} className="text-white" strokeWidth={3} />
          </div>
          <p className="text-sm font-bold uppercase tracking-wider italic">
            {successMessage}
          </p>
        </div>

        <button
          onClick={clearMessage}
          className="text-[#89547c] hover:text-[#360212] transition-colors p-1"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
