"use client";

import { useEffect, useState } from "react";
import api from "@/api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { User, Package, Heart, Settings, MapPin, LogOut, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import Cookies from "js-cookie";

interface UserData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  total_orders?: number;
  wishlist_count?: number;
  loyalty_points?: number;
}

export default function ProfilePage() {

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // Ensure this matches your Django URL (e.g., path('profile/', UserProfileView.as_view()))
        const response = await api.get<UserData>("/auth/profile/");
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    Cookies.remove("user_access");
    Cookies.remove("refresh");
    localStorage.clear();
    window.location.href = "/login";
  };


  const menuItems = [
    { icon: <Package size={20} />, label: "My Orders", href: "/orders" },
    { icon: <Heart size={20} />, label: "Wishlist", href: "/wishlist" },
    { icon: <MapPin size={20} />, label: "Shipping Addresses", href: "/addresses" },
    { icon: <Settings size={20} />, label: "Account Settings", href: "/settings" },
  ];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#fcf9f6]">
        <Loader2 className="animate-spin text-[#fe5457]" size={40} />
      </div>
    )
  }

  const displayName = user ?.first_name ? `${user.first_name} ${user.last_name|| ""}`.trim() : "Guest";
  const initials = user?.first_name ? user.first_name.charAt(0) : user?.username.charAt(0) || "U";

  return (
    <div className="bg-[#fcf9f6] min-h-screen font-sans text-[#360212]">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-5 md:py-16">
        <div className="flex flex-col md:flex-row gap-12">

          {/* SIDEBAR NAVIGATION */}
          <aside className="w-full md:w-64 space-y-8">
            <div className="bg-[#360212] p-8 text-white rounded-none shadow-xl">
              <div className="w-16 h-16 bg-[#fe5457] rounded-full flex items-center justify-center mb-4 text-2xl font-serif font-bold">
                {initials}
              </div>
              <h2 className="font-serif text-xl font-bold">{user?.username}</h2>
              <p className="text-[#d791be] text-xs uppercase tracking-widest mt-1">{user?.email}</p>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="flex items-center justify-between p-4 bg-white border border-[#d791be]/10 hover:border-[#fe5457] transition-all group"
                >
                  <div className="flex items-center gap-4 text-[#89547c] group-hover:text-[#360212]">
                    {item.icon}
                    <span className="text-sm font-bold uppercase tracking-wide">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-[#d791be]" />
                </Link>
              ))}
              <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 text-[#9f002b] hover:bg-[#9f002b]/5 transition-all mt-4 cursor-pointer">
                <LogOut size={20} />
                <span className="text-sm font-bold uppercase tracking-wide">Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* MAIN CONTENT AREA */}
          <section className="flex-1 space-y-10">
            <header>
              <h1 className="font-serif text-2xl md:text-4xl font-bold mb-2">Welcome Back, {displayName}</h1>
              <p className="text-[#89547c]">Member since {user?.date_joined ? new Date(user.date_joined).getFullYear() : '2024'}</p>
            </header>

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Total Orders", value: user?.total_orders || "0" },
                { label: "Wishlist Items", value: user?.wishlist_count || "0" },
                { label: "Points Earned", value: user?.loyalty_points || "0" }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 border-b-4 border-[#fe5457] shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#89547c] mb-1">{stat.label}</p>
                  <p className="text-xl md:text-3xl font-serif font-bold text-[#360212]">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* RECENT ACTIVITY PLACEHOLDER */}
            <div className="bg-white border border-[#d791be]/20">
              <div className="p-6 border-b border-[#fcf9f6] flex justify-between items-center">
                <h3 className="font-serif text-xl font-bold">Recent Order</h3>
                <Link href="/orders" className="text-xs font-bold uppercase tracking-widest text-[#fe5457] hover:text-[#9f002b]">View All</Link>
              </div>
              <div className="p-12 text-center">
                {user?.total_orders && user.total_orders > 0 ? (
                  <p className="text-[#89547c] italic text-sm">You have {user.total_orders} orders in your history.</p>
                ) : (
                  <>
                    <Package size={48} className="mx-auto text-[#d791be]/40 mb-4" />
                    <p className="text-[#89547c] italic text-sm">No recent orders found.</p>
                  </>
                )}
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}