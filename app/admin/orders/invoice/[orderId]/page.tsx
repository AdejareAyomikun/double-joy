"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrders } from "@/api/order";
import { Printer, Scissors, ArrowLeft } from "lucide-react";

export default function InvoicePage() {
  const { orderId } = useParams(); // Grabs the ID from the URL
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // Fetching the specific order data using the ID from the URL
    getOrders().then((data) => {
      const found = data.find((o: any) => o.id.toString() === orderId);
      setOrder(found);
    });
  }, [orderId]);

  if (!order) return (
    <div className="h-screen flex items-center justify-center font-serif italic text-[#89547c]">
      Authenticating Order #{orderId}...
    </div>
  );

  return (
    <div className="bg-white min-h-screen p-4 sm:p-10 font-sans text-[#360212]">
      {/* Action Bar - Hidden on Print */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
        <button 
          onClick={() => window.close()} 
          className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 opacity-60 hover:opacity-100 cursor-pointer"
        >
          <ArrowLeft size={14} /> Close Window
        </button>
        <button 
          onClick={() => window.print()}
          className="bg-[#360212] text-white px-6 py-3 font-bold uppercase tracking-widest text-[10px] hover:bg-[#fe5457] transition-all flex items-center gap-2"
        >
          <Printer size={16} /> Print Official Invoice
        </button>
      </div>

      {/* Main Invoice Card */}
      <div className="max-w-4xl mx-auto border border-[#fcf9f6] shadow-2xl p-8 sm:p-16 relative overflow-hidden">
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
            <p className="font-bold text-lg">{order.user}</p>
            <p className="text-sm leading-relaxed text-[#360212]/70">
              {order.address}<br />
              {order.city}, {order.state}<br />
              {order.email}
            </p>
          </div>
          <div className="text-right space-y-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#89547c] border-b border-[#fcf9f6] pb-2">Logistics</h3>
            <p className="text-sm">Date: <b>{new Date(order.created_at).toLocaleDateString()}</b></p>
            <p className="text-sm">Status: <b>{order.status.toUpperCase()}</b></p>
            <p className="text-sm">Payment: <b>Prepaid / Secure</b></p>
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
            {order.items.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-5 px-4 font-serif text-lg">{item.product_name}</td>
                <td className="py-5 px-4 text-center text-sm">{item.quantity}</td>
                <td className="py-5 px-4 text-right text-sm">₦{item.price.toLocaleString()}</td>
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
              <span>₦{(order.total_amount - order.delivery_fee).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-[#89547c]">
              <span>Shipping & Handling</span>
              <span>₦{Number(order.delivery_fee).toLocaleString()}</span>
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
        </div>
      </div>
    </div>
  );
}