"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/api/axios"; // Using your established axios instance
import { Printer, Scissors, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function InvoicePage() {
  const { id } = useParams(); 
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        // We fetch the specific order directly by ID from your API
        const res = await api.get(`/orders/${id}/`);
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching invoice:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="animate-spin text-[#fe5457] mb-4" size={32} />
      <p className="font-serif italic text-[#89547c]">Authenticating Order #{id}...</p>
    </div>
  );

  if (!order) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#fcf9f6]">
      <p className="font-serif text-[#360212]">Order not found.</p>
      <Link href="/orders" className="mt-4 text-[#fe5457] font-bold uppercase text-[10px] tracking-widest">Return to Orders</Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen p-4 sm:p-10 font-sans text-[#360212]">
      {/* Action Bar - Hidden on Print */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
        <Link 
          href="/orders" 
          className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 opacity-60 hover:opacity-100 cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Orders
        </Link>
        <button 
          onClick={() => window.print()}
          className="bg-[#360212] text-white px-6 py-3 font-bold uppercase tracking-widest text-[10px] hover:bg-[#fe5457] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <Printer size={16} /> Print Official Invoice
        </button>
      </div>

      {/* Main Invoice Card */}
      <div className="max-w-4xl mx-auto border border-[#fcf9f6] shadow-2xl p-8 sm:p-16 relative overflow-hidden print:shadow-none print:border-none">
        {/* Visual Brand Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#fe5457]" />

        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-20">
          <div>
            <h1 className="font-serif text-5xl font-bold tracking-tighter text-[#360212]">Double-Joy</h1>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#89547c] mt-2">Premium Retail & Logistics</p>
          </div>
          <div className="text-right">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#d791be] mb-1">Document Type</h2>
            <p className="font-serif text-2xl font-bold italic">Official Invoice</p>
            <p className="text-sm font-mono mt-1 opacity-60">REF: DJ-ORD-{order.id}</p>
          </div>
        </div>

        {/* Client & Shipping Info */}
        <div className="grid grid-cols-2 gap-10 mb-16">
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#89547c] border-b border-[#fcf9f6] pb-2">Bill To</h3>
            <p className="font-bold text-lg">{order.user_full_name || order.user}</p>
            <p className="text-sm leading-relaxed text-[#360212]/70 whitespace-pre-line">
              {order.address}<br />
              {order.city}, {order.state}<br />
              {order.email}
            </p>
          </div>
          <div className="text-right space-y-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#89547c] border-b border-[#fcf9f6] pb-2">Logistics</h3>
            <p className="text-sm">Date: <b>{new Date(order.created_at).toLocaleDateString('en-GB')}</b></p>
            <p className="text-sm">Status: <span className="font-bold uppercase">{order.status}</span></p>
            <p className="text-sm">Payment: <b>Verified Secure</b></p>
          </div>
        </div>

        {/* Itemized Table */}
        <table className="w-full mb-12">
          <thead>
            <tr className="bg-[#fcf9f6] text-[#360212]">
              <th className="py-3 px-4 text-left text-[10px] uppercase tracking-widest font-bold">Item Description</th>
              <th className="py-3 px-4 text-center text-[10px] uppercase tracking-widest font-bold">Qty</th>
              <th className="py-3 px-4 text-right text-[10px] uppercase tracking-widest font-bold">Unit Price</th>
              <th className="py-3 px-4 text-right text-[10px] uppercase tracking-widest font-bold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#fcf9f6]">
            {order.items?.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-5 px-4 font-serif text-lg">{item.product_name}</td>
                <td className="py-5 px-4 text-center text-sm">{item.quantity}</td>
                <td className="py-5 px-4 text-right text-sm">₦{Number(item.price).toLocaleString()}</td>
                <td className="py-5 px-4 text-right font-bold text-sm">₦{(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary Block */}
        <div className="flex justify-end pt-8">
          <div className="w-full sm:w-72 space-y-4">
            <div className="flex justify-between text-xs text-[#89547c]">
              <span>Merchandise Subtotal</span>
              {/* Calculating subtotal if not directly provided */}
              <span>₦{(Number(order.total_amount) - Number(order.delivery_fee || 0)).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-[#89547c]">
              <span>Shipping & Handling</span>
              <span>₦{Number(order.delivery_fee || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-2xl font-serif font-bold pt-4 border-t border-[#360212] text-[#360212]">
              <span>Final Total</span>
              <span className="text-[#9f002b]">₦{Number(order.total_amount).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Disclaimer/Footer */}
        <div className="mt-24 text-center">
          <div className="flex items-center gap-4 mb-4 justify-center opacity-20">
            <div className="h-px bg-[#360212] flex-1"></div>
            <Scissors size={14} />
            <div className="h-px bg-[#360212] flex-1"></div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#89547c]">Thank you for your patronage</p>
          <p className="text-[8px] text-gray-400 mt-4 uppercase tracking-widest print:block hidden">Computer Generated Invoice - Double-Joy Online</p>
        </div>
      </div>
    </div>
  );
}