"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Package, ChevronRight, Loader2, ShoppingBag, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
  product_image: string;
}

interface Order {
  id: string; // Order Number
  created_at: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total_amount: number;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get<Order[]>("/orders/");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700";
      case "Shipped": return "bg-blue-100 text-blue-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#fcf9f6]">
        <Loader2 className="animate-spin text-[#fe5457]" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-[#fcf9f6] min-h-screen font-sans text-[#360212]">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10">
          <Link href="/profile" className="text-xs font-bold uppercase tracking-widest text-[#fe5457] hover:underline mb-4 inline-block">
            ← Back to Profile
          </Link>
          <h1 className="font-serif text-4xl font-bold">My Orders</h1>
          <p className="text-[#89547c] mt-2">Track and manage your recent purchases.</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-20 text-center border border-[#d791be]/20 shadow-sm">
            <ShoppingBag size={64} className="mx-auto text-[#d791be]/30 mb-6" />
            <h2 className="font-serif text-2xl font-bold mb-4">No orders yet</h2>
            <p className="text-[#89547c] mb-8">It looks like you haven't placed any orders with us yet.</p>
            <Link href="/" className="bg-[#360212] text-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-[#fe5457] transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={order.id} 
                className="bg-white border border-[#d791be]/20 shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-[#360212]/5 p-4 md:p-6 flex flex-wrap justify-between items-center gap-4 border-b border-[#d791be]/10">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#89547c]">Order ID</p>
                      <p className="text-sm font-bold">DJ-ORD-{order.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#89547c]">Date</p>
                      <p className="text-sm font-bold">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#89547c]">Total Amount</p>
                      <p className="text-sm font-bold text-[#9f002b]">₦{Number(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#fcf9f6] border border-[#d791be]/10 p-2 shrink-0">
                          <img src={item.product_image} alt={item.product_name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-[#360212]">{item.product_name}</h4>
                          <p className="text-xs text-[#89547c]">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold">₦{Number(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-white border-t border-[#d791be]/10 flex justify-end">
                   <button  onClick={() =>
                        window.open(
                          `/orders/invoice/${order.id}`,
                          "_blank",
                        )
                      } className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#fe5457] hover:text-[#360212] transition-colors cursor-pointer">
                     View Invoice <ExternalLink size={14} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}