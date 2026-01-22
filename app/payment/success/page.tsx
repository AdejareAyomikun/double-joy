"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/api/axios";
import Header from "@/app/components/Header";

export default function PaymentSuccess() {
  const params = useSearchParams();
  const reference = params.get("reference");

  useEffect(() => {
    if (reference) {
      api.get(`/cart/verify_payment/?reference=${reference}`);
    }
  }, [reference]);

  return (
   <>
   <Header />
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="mt-4">Thank you for your order.</p>
    </div>
   </>
  );
}
