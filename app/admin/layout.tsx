"use client";

import { useState } from "react";
import Image from "next/image";
import "../globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  UserCog,
  Wallet,
  BookOpen,
  MessageSquare,
  BarChart3,
  Settings,
  ShieldCheck,
  MoreHorizontal,
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
        href: "/admin", 
    },
    { 
        name: "Users", 
        icon: Users, 
        href: "/admin/users", 
    },
    { 
        name: "Admins", 
        icon: UserCog, 
        href: "/admin/admins", 
    },
    { 
        name: "Orders", 
        icon: UserCog, 
        href: "/admin/orders" 
    },
    { 
        name: "Products", 
        icon: UserCog, 
        href: "/admin/products" 
    },
    { 
        name: "Fees", 
        icon: Wallet, 
        href: "/admin/fee", 
    },
    { 
        name: "Academics", 
        icon: BookOpen, 
        href: "/admin/academics", 
    },
    {
      name: "Communication",
      icon: MessageSquare,
      href: "/admin/communication",
    },
    { 
        name: "Reports", 
        icon: BarChart3, 
        href: "/admin/reports", 

    },
    { 
        name: "System & Configuration", 
        icon: Settings, 
        href: "/admin/system", 

    },
    {
      name: "Security & Compliance",
      icon: ShieldCheck,
      href: "/admin/security",
    },
  ];
  const isActive = (href: string) => {
    const normalize = (str: string) => str.replace(/\/+$/, "");
    return normalize(pathname) === normalize(href);
  };
  return (
    <section className="min-h-screen  flex flex-col bg-white text-black relative">
      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex flex-col gap-6 bg-white  border-r border-gray-200 w-56 p-4 items-start fixed top-0 left-0 h-full z-20">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          {/* <Image
            src="/images/logo-removebg-preview.png"
            alt="Lunarithm Logo"
            width={32}
            height={32}
            className="object-contain"
          /> */}
          <span className="text-lg text-black font-semibold tracking-wide">
            Double-Joy{" "}
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="flex flex-col gap-3 w-full">
          {navItems.map(({ name, icon: Icon, href }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md w-full transition ${
                isActive(href)
                  ? "text-black bg-gray-200"
                  : "text-gray-700 hover:text-black hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 sm:ml-56 p-4 sm:p-6 pb-20">{children}</main>

      {/* Mobile Footer Nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 z-30">
        {navItems.slice(0, 3).map(({ name, icon: Icon, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={name}
              href={href}
              className={`relative flex flex-col items-center text-xs transition px-3 py-1 rounded-md ${
                active
                  ? "text-[hsl(165,62%,31%)] font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {/* Active indicator bar */}
              {active && (
                <span className="absolute -top-2 w-8 h-1 rounded-full bg-[hsl(165,62%,31%)]"></span>
              )}
              <Icon
                className={`w-6 h-6 mb-1 ${
                  active ? "text-[hsl(165,62%,31%)]" : "text-gray-500"
                }`}
              />
              <span>{name}</span>
            </Link>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className={`relative flex flex-col items-center text-xs transition px-3 py-1 rounded-md ${
            showMore
              ? "text-black font-semibold"
              : "text-gray-600 hover:text-black"
          }`}
        >
          {showMore && (
            <span className="absolute -top-2 w-8 h-1 rounded-full bg-black"></span>
          )}
          <MoreHorizontal
            className={`w-6 h-6 mb-1 ${
              showMore ? "text-black" : "text-gray-500"
            }`}
          />
          <span>More</span>
        </button>
      </nav>

      {/* More Menu (Dropdown) */}
      {showMore && (
        <div className="sm:hidden fixed bottom-14 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-40">
          <nav className="flex flex-col divide-y">
            {navItems.slice(3).map(({ name, icon: Icon, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={name}
                  href={href}
                  onClick={() => setShowMore(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition ${
                    active
                      ? "text-black font-semibold bg-gray-100"
                      : "text-gray-700 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      active ? "text-black" : "text-gray-500"
                    }`}
                  />
                  <span>{name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </section>
  );
}
