"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getOrders, updateOrderStatus } from "@/api/order";

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

/* =======================
   STATUS TRANSITION RULES
======================= */

const STATUS_FLOW: Record<string, string[]> = {
  pending: ["paid", "cancelled"],
  paid: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: ["completed"],
  completed: [],
  cancelled: [],
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  /* =======================
     FETCH ORDERS
  ======================= */

  useEffect(() => {
    getOrders()
      .then((data) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  /* =======================
     UPDATE STATUS (GUARDED)
  ======================= */

  const changeStatus = async (id: number, nextStatus: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;

    const allowedNext = STATUS_FLOW[order.status] || [];
    if (!allowedNext.includes(nextStatus)) {
      alert(`Invalid status change: ${order.status} → ${nextStatus}`);
      return;
    }

    try {
      setUpdatingId(id);
      const updatedOrder = await updateOrderStatus(id, nextStatus);

      setOrders((prev) => prev.map((o) => (o.id === id ? updatedOrder : o)));
    } catch (err) {
      console.error("Failed to update order status", err);
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  /* =======================
     FILTERED ORDERS
  ======================= */
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
    <>
      <Header />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>

        {/* ===== FILTER BAR ===== */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            className="border rounded p-2 w-full md:w-1/2"
            placeholder="Search by customer name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {filteredOrders.length === 0 && (
          <p className="text-gray-500">No orders found.</p>
        )}

        {/* ===== ORDERS LIST ===== */}
        {filteredOrders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              {/* ===== LEFT ===== */}
              <div>
                <p className="font-semibold text-lg">Order #{order.id}</p>

                <p className="text-sm text-gray-600">
                  {new Date(order.created_at).toLocaleString()}
                </p>

                <div className="mt-2 text-sm">
                  <p>
                    <span className="font-medium">Customer:</span> {order.user}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {order.email}
                  </p>
                </div>

                <div className="mt-2 text-sm">
                  <p className="font-medium">Delivery Address:</p>
                  <p>
                    {order.address}, {order.city}, {order.state}
                  </p>
                </div>
              </div>

              {/* ===== RIGHT ===== */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Order Status</label>

                <select
                  value={order.status}
                  disabled={updatingId === order.id}
                  onChange={(e) => changeStatus(order.id, e.target.value)}
                  className="border rounded p-2"
                >
                  <option value={order.status}>{order.status}</option>

                  {(STATUS_FLOW[order.status] || []).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                {updatingId === order.id && (
                  <span className="text-xs text-gray-500">Updating...</span>
                )}
              </div>
            </div>

            {/* ===== ITEMS ===== */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Items</h3>

              <ul className="space-y-1 text-sm">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.product_name} × {item.quantity}
                    </span>
                    <span>₦{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===== TOTALS ===== */}
            <div className="mt-4 border-t pt-3 text-sm">
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₦{order.delivery_fee}</span>
              </div>

              <div className="flex justify-between font-semibold text-base mt-1">
                <span>Total</span>
                <span>₦{order.total_amount}</span>
              </div>

              {/* ===== CANCEL ===== */}
              {order.status !== "cancelled" && order.status !== "completed" && (
                <button
                  onClick={() => changeStatus(order.id, "cancelled")}
                  className="mt-3 text-red-600 text-sm hover:underline"
                  disabled={updatingId === order.id}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
