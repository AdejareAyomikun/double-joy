"use client";

import { useCart } from "../context/CartContext";
import { Check } from "lucide-react";

type CartPopupProps = {
  show: boolean;
};

export default function CartPopup({ show }: CartPopupProps) {
  const { successMessage, clearMessage } = useCart();

  if (!successMessage) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div className="bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
        <span className="flex">{successMessage} <Check className="p-1 ml-2 border-2 rounded-2xl"/></span>
        <button onClick={clearMessage} className="text-white font-bold">
          ✕
        </button>
      </div>
    </div>
  );
}
