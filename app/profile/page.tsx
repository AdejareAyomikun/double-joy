"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { User, Package, Heart, Settings, MapPin, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const user = {
    name: "Alex Johnson",
    email: "alex.j@example.com",
    memberSince: "March 2024"
  };

  const menuItems = [
    { icon: <Package size={20} />, label: "My Orders", href: "/orders" },
    { icon: <Heart size={20} />, label: "Wishlist", href: "/wishlist" },
    { icon: <MapPin size={20} />, label: "Shipping Addresses", href: "/addresses" },
    { icon: <Settings size={20} />, label: "Account Settings", href: "/settings" },
  ];

  return (
    <div className="bg-[#fcf9f6] min-h-screen font-sans text-[#360212]">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="w-full md:w-64 space-y-8">
            <div className="bg-[#360212] p-8 text-white rounded-none shadow-xl">
              <div className="w-16 h-16 bg-[#fe5457] rounded-full flex items-center justify-center mb-4 text-2xl font-serif font-bold">
                {user.name.charAt(0)}
              </div>
              <h2 className="font-serif text-xl font-bold">{user.name}</h2>
              <p className="text-[#d791be] text-xs uppercase tracking-widest mt-1">Gold Member</p>
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
              <button className="w-full flex items-center gap-4 p-4 text-[#9f002b] hover:bg-[#9f002b]/5 transition-all mt-4">
                <LogOut size={20} />
                <span className="text-sm font-bold uppercase tracking-wide">Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* MAIN CONTENT AREA */}
          <section className="flex-1 space-y-10">
            <header>
              <h1 className="font-serif text-4xl font-bold mb-2">Welcome Back, {user.name.split(' ')[0]}</h1>
              <p className="text-[#89547c]">Manage your orders and account preferences here.</p>
            </header>

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Total Orders", value: "12" },
                { label: "Wishlist Items", value: "08" },
                { label: "Points Earned", value: "2,450" }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 border-b-4 border-[#fe5457] shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#89547c] mb-1">{stat.label}</p>
                  <p className="text-3xl font-serif font-bold text-[#360212]">{stat.value}</p>
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
                <Package size={48} className="mx-auto text-[#d791be]/40 mb-4" />
                <p className="text-[#89547c] italic text-sm">Your most recent order #DJ-8829 is currently being processed.</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}