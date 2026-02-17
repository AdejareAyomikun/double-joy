"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminAnalytics } from "@/api/adminAnalytics";
import {
  UserCog,
  Bot,
  Bell,
  Layers2Icon,
  Package,
  Clock,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookies from "js-cookie";

interface AnalyticsData {
  summary: {
    total_orders: number;
    pending_orders: number;
    completed_orders: number;
    total_revenue: number;
  };
  daily_sales: any[];
  top_products: any[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<AnalyticsData["summary"] | null>(null);
  const [charts, setCharts] = useState<{
    daily_sales: any[];
    top_products: any[];
  } | null>(null);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("admin_access");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = (await getAdminAnalytics(token)) as AnalyticsData;
        setMetrics(data.summary);
        setCharts({
          daily_sales: data.daily_sales,
          top_products: data.top_products,
        });
        setIsAuthorized(true);
      } catch (err) {
        console.error("Analytics failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-[#fcf9f6] flex items-center justify-center">
        <div className="animate-pulse text-[#360212] font-serif italic">
          Authenticating Secure Session...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf9f6] font-sans text-[#360212]">
      {/* Header */}
      <Header />
      <div className="p-8 max-w-400 mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-[#360212]">
            Executive Overview
          </h1>
          <p className="text-[#89547c] mt-2 italic">
            Welcome back to the command center.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-10">
          {[
            {
              label: "Total Orders",
              value: metrics?.total_orders,
              icon: <Package className="text-[#fe5457]" />,
            },
            {
              label: "Active Orders",
              value: metrics?.pending_orders,
              icon: <Clock className="text-[#89547c]" />,
            },
            {
              label: "Closed Orders",
              value: metrics?.completed_orders,
              icon: <TrendingUp className="text-green-600" />,
            },
            {
              label: "Monthly Revenue",
              value: `₦${metrics?.total_revenue.toLocaleString()}`,
              icon: <DollarSign className="text-[#9f002b]" />,
            },
          ].map((kpi, i) => (
            <div
              key={i}
              className="bg-white p-6 border-l-4 border-[#fe5457] shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-[#89547c] text-xs font-bold uppercase tracking-widest">
                  {kpi.label}
                </h2>
                {kpi.icon}
              </div>
              <p className="text-2xl font-serif font-bold">
                {loading ? "..." : kpi.value}
              </p>
            </div>
          ))}
        </div>
        {/* End of KPI Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-8 mb-10">
          {charts && (
            <div className="bg-white p-3 md:p-8 shadow-sm border border-[#d791be]/10">
              <h2 className="font-serif text-xl font-bold mb-6">
                Revenue Trends (7 Days)
              </h2>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={charts.daily_sales}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#89547c", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#89547c", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "0px",
                        border: "1px solid #d791be",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#fe5457"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#fe5457" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {charts && (
            <div className="bg-white p-3 md:p-8 shadow-sm border border-[#d791be]/10">
              <h2 className="font-serif text-xl font-bold mb-6">
                Best Selling Products
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.top_products}>
                    <XAxis
                      dataKey="product__name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#89547c", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#89547c", fontSize: 12 }}
                    />
                    <Tooltip cursor={{ fill: "#fcf9f6" }} />
                    <Bar
                      dataKey="quantity_sold"
                      fill="#360212"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-xl font-bold mb-6">
              Management Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/admin/dashboard/add-product"
                className="group p-6 bg-white border border-[#d791be]/20 hover:border-[#fe5457] transition-all flex items-center gap-4"
              >
                <div className="p-3 bg-[#fe5457]/10 text-[#fe5457] group-hover:bg-[#fe5457] group-hover:text-white transition-colors">
                  <Layers2Icon size={24} />
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-widest text-xs">
                    Inventory
                  </span>
                  <span className="text-sm text-[#89547c]">
                    Add New Product
                  </span>
                </div>
              </a>

              <a
                href="/admin/dashboard/create-admin"
                className="group p-6 bg-white border border-[#d791be]/20 hover:border-[#fe5457] transition-all flex items-center gap-4"
              >
                <div className="p-3 bg-[#360212]/10 text-[#360212] group-hover:bg-[#360212] group-hover:text-white transition-colors">
                  <UserCog size={24} />
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-widest text-xs">
                    Security
                  </span>
                  <span className="text-sm text-[#89547c]">Add New Admin</span>
                </div>
              </a>
              <a
                href="/admin/dashboard/add-category"
                className="group p-6 bg-white border border-[#d791be]/20 hover:border-[#fe5457] transition-all flex items-center gap-4"
              >
                <div className="p-3 bg-[#fe5457]/10 text-[#fe5457] group-hover:bg-[#fe5457] group-hover:text-white transition-colors">
                  <Layers2Icon size={24} />
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-widest text-xs">
                    Inventory Category
                  </span>
                  <span className="text-sm text-[#89547c]">Add New Category</span>
                </div>
              </a>
            </div>
          </div>

          {/* Smart Alerts */}
          <div className="bg-white p-8 shadow-sm border-t-4 border-[#9f002b]">
            <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
              <Bell size={20} className="text-[#9f002b]" /> Critical Insights
            </h2>
            <ul className="space-y-4">
              <li className="p-4 bg-red-50 text-[#9f002b] text-sm font-medium border-l-2 border-[#9f002b]">
                Low Stock Alert: 4 items remaining in "Handbags"
              </li>
              <li className="p-4 bg-[#fcf9f6] text-[#89547c] text-sm border-l-2 border-[#d791be]">
                New wholesale inquiry received (Pending)
              </li>
            </ul>
          </div>
        </div>

        {/* AI Assistant - Floating-style widget */}
        <div className="mt-12 max-w-2xl bg-[#360212] p-8 text-white shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-[#fe5457] rounded-full">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">
                Business AI Assistant
              </h2>
              <p className="text-[#d791be] text-xs uppercase tracking-widest">
                Powered by Gemini 3 Flash
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder='Try: "Predict next week&apos;s revenue"'
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#fe5457]"
            />
            <button className="px-6 py-3 bg-[#fe5457] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#9f002b] transition-all">
              Consult
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
