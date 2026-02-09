// "use client";

// export const dynamic = "force-dynamic";

// import { useEffect, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import api from "@/api/axios";
// import Header from "@/app/components/Header";
// import Footer from "@/app/components/Footer";
// import Link from "next/link";
// import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
// import { motion } from "framer-motion";

// export default function PaymentSuccess() {
//   const params = useSearchParams();
//   const reference = params.get("reference");

//   useEffect(() => {
//     if (reference) {
//       api.get(`/cart/verify_payment/?reference=${reference}`);
//     }
//   }, [reference]);

//   return (
//     <div className="bg-[#fcf9f6] min-h-screen font-sans text-[#360212]">
//       <Suspense>
//       <Header />

//       <main className="max-w-3xl mx-auto px-6 py-24 text-center">
//         {/* Animated Check Icon */}
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
//           className="w-24 h-24 bg-[#fe5457] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#fe5457]/20"
//         >
//           <CheckCircle size={48} className="text-white" />
//         </motion.div>

//         {/* Success Message */}
//         <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-[#360212]">
//           Thank You!
//         </h1>
//         <p className="text-lg text-[#89547c] mb-12 max-w-lg mx-auto leading-relaxed">
//           Your order has been placed successfully. We’re preparing your items
//           for a beautiful delivery experience.
//         </p>

//         {/* Order Info Card */}
//         <div className="bg-white border border-[#d791be]/20 p-8 mb-12 shadow-sm text-left relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-full h-1 bg-[#360212]" />
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex items-center gap-2 text-[#9f002b]">
//               <Package size={20} />
//               <span className="font-bold uppercase tracking-widest text-xs">
//                 Order Confirmed
//               </span>
//             </div>
//             <span className="text-[#89547c] text-sm">
//               #DJ-{Math.floor(Math.random() * 1000000)}
//             </span>
//           </div>

//           <h3 className="font-serif text-xl mb-2">What happens next?</h3>
//           <p className="text-sm text-[#89547c] mb-6">
//             A confirmation email has been sent to your inbox. You will receive
//             another update as soon as your package is dispatched.
//           </p>

//           <Link
//             href="/orders"
//             className="flex items-center gap-2 text-[#fe5457] font-bold text-sm uppercase tracking-widest hover:text-[#360212] transition-colors"
//           >
//             Track your order <ArrowRight size={16} />
//           </Link>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             href="/"
//             className="bg-[#360212] text-white px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#9f002b] transition-all flex items-center justify-center gap-2"
//           >
//             <Home size={16} /> Back to Home
//           </Link>
//           <Link
//             href="/"
//             className="border-2 border-[#360212] text-[#360212] px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#fcf9f6] transition-all"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </main>

//       <Footer />
//       </Suspense>
//     </div>
//   );
// }
// VERSION 1



"use client";

export const dynamic = "force-dynamic";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/api/axios";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import { motion } from "framer-motion";

function SuccessContent() {
  const params = useSearchParams();
  const reference = params.get("reference");

  useEffect(() => {
    if (reference) {
      api.get(`/cart/verify_payment/?reference=${reference}`)
        .catch(err => console.error("Payment verification failed", err));
    }
  }, [reference]);

  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-center">
      {/* Animated Check Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-24 h-24 bg-[#fe5457] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#fe5457]/20"
      >
        <CheckCircle size={48} className="text-white" />
      </motion.div>

      {/* Success Message */}
      <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-[#360212]">
        Thank You!
      </h1>
      <p className="text-lg text-[#89547c] mb-12 max-w-lg mx-auto leading-relaxed">
        Your order has been placed successfully. We’re preparing your items
        for a beautiful delivery experience.
      </p>

      {/* Order Info Card */}
      <div className="bg-white border border-[#d791be]/20 p-8 mb-12 shadow-sm text-left relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#360212]" />
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-[#9f002b]">
            <Package size={20} />
            <span className="font-bold uppercase tracking-widest text-xs">
              Order Confirmed
            </span>
          </div>
          <span className="text-[#89547c] text-sm font-mono">
            REF: {reference ? reference.slice(0, 8).toUpperCase() : "PENDING"}
          </span>
        </div>

        <h3 className="font-serif text-xl mb-2">What happens next?</h3>
        <p className="text-sm text-[#89547c] mb-6">
          A confirmation email has been sent to your inbox. You will receive
          another update as soon as your package is dispatched.
        </p>

        <Link
          href="/orders"
          className="flex items-center gap-2 text-[#fe5457] font-bold text-sm uppercase tracking-widest hover:text-[#360212] transition-colors"
        >
          Track your order <ArrowRight size={16} />
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="bg-[#360212] text-white px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#9f002b] transition-all flex items-center justify-center gap-2"
        >
          <Home size={16} /> Back to Home
        </Link>
        <Link
          href="/shop"
          className="border-2 border-[#360212] text-[#360212] px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#fcf9f6] transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default function PaymentSuccess() {
  return (
    <div className="bg-[#fcf9f6] min-h-screen font-sans text-[#360212]">
      <Header />
      <Suspense fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-[#89547c] animate-pulse">Confirming your order details...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>

      <Footer />
    </div>
  );
}