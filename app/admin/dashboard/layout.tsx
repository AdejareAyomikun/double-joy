"use client";

import { useState } from "react";
import "../../globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  UserCog,
  Wallet,
  Settings,
  ShieldCheck,
  MoreHorizontal,
  Layers,
  ShoppingCart,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);
  const navItems = [
    {
      name: "Dashboard",
      icon: Home,
      href: "/admin/dashboard",
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      href: "/admin/dashboard/orders",
    },
    {
      name: "Products",
      icon: Layers,
      href: "/admin/dashboard/products",
    },
    {
      name: "Categories",
      icon: Layers,
      href: "/admin/dashboard/categories",
    },
    {
      name: "Admins",
      icon: UserCog,
      href: "/admin/dashboard/admins",
    },
    {
      name: "Fees",
      icon: Wallet,
      href: "/admin/dashboard/fee",
    },
    {
      name: "System",
      icon: Settings,
      href: "/admin/dashboard/system",
    },
    {
      name: "Security",
      icon: ShieldCheck,
      href: "/admin/dashboard/security",
    },
  ];
  const isActive = (href: string) => {
    const normalize = (str: string) => str.replace(/\/+$/, "");
    return normalize(pathname) === normalize(href);
  };
  return (
    <section className="min-h-screen flex flex-col bg-[#fcf9f6] text-[#360212] relative font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex flex-col gap-6 bg-white  border-r border-[#d791be]/20 w-64 p-4 items-start fixed top-0 left-0 h-full z-20">
        {/* Logo */}
        <div className="px-6 pt-2">
          <Link href="/admin/dashboard">
            <h1 className="font-serif text-2xl font-bold tracking-tighter text-[#360212]">
              Double-Joy
            </h1>
          </Link>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#89547c] mt-1">
            Admin Terminal
          </p>
        </div>

        {/* Desktop Nav */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map(({ name, icon: Icon, href }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 text-11px font-bold uppercase tracking-widest transition-all duration-300 group ${
                isActive(href)
                  ? "bg-[#360212] text-white shadow-lg translate-x-1"
                  : "text-[#89547c] hover:text-[#360212] hover:bg-[#fcf9f6]"
              }`}
            >
              <Icon
                size={18}
                className={`${isActive(href) ? "text-[#fe5457]" : "text-[#d791be]"} transition-colors`}
              />
              <span>{name}</span>
            </Link>
          ))}
        </nav>
        {/* Logout / Footer */}
        <div className="p-4 border-t border-[#fcf9f6]">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#9f002b] hover:bg-red-50 transition-colors cursor-pointer">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 sm:ml-64 min-h-screen">
        <div className="max-w-1600px mx-auto">{children}</div>
      </main>

      {/* Mobile Footer Nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-[#d791be]/20 flex justify-around items-center py-3 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {navItems.slice(0, 3).map(({ name, icon: Icon, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={name}
              href={href}
              className={`relative flex flex-col items-center gap-1 transition-all ${
                active ? "text-[#360212]" : "text-[#d791be]"
              }`}
            >
              {/* Active indicator bar */}
              {active && (
                <span className="absolute -top-2 w-10 h-1 bg-[#fe5457] rounded-full"></span>
              )}
              <Icon size={22} />
              <span className="text-[9px] font-bold uppercase tracking-tighter">
                {name}
              </span>
            </Link>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className={`relative flex flex-col items-center gap-1 transition-all ${
            showMore ? "text-[#fe5457]" : "text-[#d791be]"
          }`}
        >
          {showMore && (
            <span className="absolute -top-2 w-10 h-1 bg-[#fe5457] rounded-full"></span>
          )}
          <MoreHorizontal size={22} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">
            More
          </span>
        </button>
      </nav>

      {/* More Menu (Dropdown) */}
      {showMore && (
        <div className="sm:hidden fixed bottom-14 left-0 w-full bg-white border-t border-[#fcf9f6] shadow-2xl z-40 animate-in slide-in-from-bottom-5">
          <nav className="grid grid-cols-2 gap-px bg-[#fcf9f6]">
            {navItems.slice(3).map(({ name, icon: Icon, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={name}
                  href={href}
                  onClick={() => setShowMore(false)}
                  className={`flex items-center gap-3 px-6 py-4 bg-white transition-colors ${
                    active ? "text-[#fe5457]" : "text-[#360212]"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </section>
  );
}
