"use client";

import { useEffect, useState } from "react";
import Header from "@/app/admin/components/Header";
import Footer from "@/app/admin/components/Footer";
import { getOrders, updateOrderStatus } from "@/api/order";
import {
  Search,
  Filter,
  Package,
  Truck,
  Printer,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  user: string;
  email: string;
  address: string;
  city: string;
  state: string;
  status: string;
  total_amount: number;
  delivery_fee: number;
  created_at: string;
  items: OrderItem[];
}

const STATUS_FLOW: Record<string, string[]> = {
  pending: ["paid", "cancelled"],
  paid: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: ["completed"],
  completed: [],
  cancelled: [],
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  paid: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-gray-50 text-gray-700 border-gray-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    getOrders()
      .then((data) => {
        // FIX: Cast the incoming data to our local Order interface
        setOrders(data as unknown as Order[]);
      })
      .catch(err => console.error("Fetch failed", err))
      .finally(() => setLoading(false));
  }, []);

  const changeStatus = async (id: number, nextStatus: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;

    try {
      setUpdatingId(id);
      const updatedOrder = await updateOrderStatus(id, nextStatus);
      setOrders((prev) => prev.map((o) => (o.id === id ? (updatedOrder as unknown as Order) : o)));
    } catch (err) {
      console.error("Failed to update order status", err);
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const normalize = (value: unknown): string => {
    if (!value) return "";

    if (typeof value === "string") {
      return value.toLowerCase();
    }

    if (typeof value === "object") {
      return JSON.stringify(value).toLowerCase();
    }

    return String(value).toLowerCase();
  };

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase().trim();
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesSearch =
      !searchText ||
      normalize(order.user).includes(searchText) ||
      normalize(order.email).includes(searchText) ||
      normalize(order.address).includes(searchText) ||
      normalize(order.city).includes(searchText) ||
      normalize(order.state).includes(searchText) ||
      normalize(order.id).includes(searchText);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-[#fcf9f6] min-h-screen font-sans text-[#360212]">
      <Header />

      <div className="p-4 md:p-8 max-w-6xl mx-auto py-10">
        <header className="mb-5 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-serif font-bold mb-2">
            Order Management
          </h1>
          <p className="text-[#89547c]">
            Review and fulfill customer requests.
          </p>
        </header>

        {/* ===== FILTER BAR ===== */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-10 bg-white p-6 shadow-sm border border-[#d791be]/10">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d791be]"
              size={18}
            />
            <input
              className="w-full bg-[#fcf9f6] border-none p-3 pl-10 focus:ring-1 focus:ring-[#fe5457] outline-none text-sm"
              placeholder="Search by ID, name, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d791be]"
              size={16}
            />
            <select
              className="bg-[#fcf9f6] border-none p-3 pl-10 pr-8 appearance-none focus:ring-1 focus:ring-[#fe5457] outline-none text-sm font-bold uppercase tracking-wider cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {Object.keys(STATUS_FLOW).map((s) => (
                <option key={s} value={s}>
                  {s.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center animate-pulse text-[#89547c] uppercase tracking-widest text-xs font-bold">
            Synchronizing Records...
          </div>
        ) : (
          <div className="space-y-8">
            <AnimatePresence>
              {filteredOrders.map((order) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={order.id}
                  className="bg-white border border-[#d791be]/20 shadow-sm overflow-hidden"
                >
                  {/* TOP STRIP */}
                  <div className="bg-[#360212] text-white p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-lg font-bold tracking-tight">
                        Order #{order.id}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${STATUS_COLORS[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest opacity-70">
                      {new Date(order.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#fcf9f6]">
                    {/* CUSTOMER INFO */}
                    <div className="p-6">
                      <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#89547c] mb-4">
                        Customer Details
                      </h3>
                      <p className="font-bold text-[#360212]">{order.user}</p>
                      <p className="text-sm text-[#89547c] mb-4">
                        {order.email}
                      </p>
                      <div className="flex items-start gap-2 text-xs text-[#360212]/70">
                        <Truck size={14} className="mt-0.5 shrink-0" />
                        <p>
                          {order.address}, {order.city}, {order.state}
                        </p>
                      </div>
                    </div>

                    {/* ITEMS LIST */}
                    <div className="p-6">
                      <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#89547c] mb-4">
                        Inventory
                      </h3>
                      <ul className="space-y-3">
                        {order.items.map((item) => (
                          <li
                            key={item.id}
                            className="text-sm flex justify-between group"
                          >
                            <span className="text-[#360212] font-medium">
                              {item.product_name}{" "}
                              <span className="text-[#d791be] italic">
                                x{item.quantity}
                              </span>
                            </span>
                            <span className="text-[#89547c]">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-[#fcf9f6] flex justify-between font-bold">
                        <span className="text-xs uppercase">Total</span>
                        <span className="text-[#9f002b]">
                          ₦{Number(order.total_amount).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="p-6 bg-[#fcf9f6]/30">
                      <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#89547c] mb-4">
                        Fulfillment
                      </h3>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-[#89547c]">
                          Advance Status To:
                        </label>
                        <select
                          value={order.status}
                          disabled={
                            updatingId === order.id ||
                            STATUS_FLOW[order.status].length === 0
                          }
                          onChange={(e) =>
                            changeStatus(order.id, e.target.value)
                          }
                          className="w-full bg-white border border-[#d791be]/30 p-3 text-sm focus:ring-1 focus:ring-[#fe5457] outline-none rounded-none cursor-pointer"
                        >
                          <option value={order.status} disabled>
                            Select next phase...
                          </option>
                          {(STATUS_FLOW[order.status] || []).map((s) => (
                            <option key={s} value={s}>
                              {s.toUpperCase()}
                            </option>
                          ))}
                        </select>

                        {order.status !== "cancelled" &&
                          order.status !== "completed" && (
                            <button
                              onClick={() =>
                                changeStatus(order.id, "cancelled")
                              }
                              className="w-full text-[10px] uppercase tracking-[0.2em] text-[#9f002b] font-bold py-2 hover:bg-red-50 transition-colors mt-2 cursor-pointer"
                              disabled={updatingId === order.id}
                            >
                              Terminate Order
                            </button>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mx-5">
                    <button
                      onClick={() =>
                        window.open(
                          `/admin/orders/invoice/${order.id}`,
                          "_blank",
                        )
                      }
                      className="flex items-center justify-center gap-2 w-full border border-[#360212] text-[#360212] py-2 px-4 text-[10px] font-bold uppercase tracking-widest hover:bg-[#360212] hover:text-white transition-all cursor-pointer"
                    >
                      <Printer size={14} /> View Invoice
                    </button>
                    <select
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredOrders.length === 0 && (
              <div className="text-center py-20 bg-white border border-dashed border-[#d791be]">
                <Package
                  size={40}
                  className="mx-auto text-[#d791be] mb-4 opacity-50"
                />
                <p className="text-[#89547c] italic">
                  No orders match your current criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
