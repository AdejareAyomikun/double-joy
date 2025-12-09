"use client";
import { Check } from "lucide-react";

export default function CartPopup({ show }) {
  return (
    <div
      className={`fixed flex top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <Check className="mr-2"/> Added to Cart
    </div>
  );
}
