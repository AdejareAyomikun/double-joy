"use client";

import Image from "next/image";
import { Search, Download, Settings, Bell, LogOut } from "lucide-react";
import Cookies from "js-cookie";

export default function Header() {

  const handleLogout = () => {
    // 1. Clear admin tokens
    Cookies.remove("admin_access", { path: "/" });
    Cookies.remove("refresh", { path: "/" });

    // 2. Clear local storage if any
    localStorage.clear();

    // 3. Force redirect to break any remaining state
    window.location.href = "/admin";
  };

  return (
    <div className="flex items-center justify-between p-5 border-b border-[#d791be]/20 sticky top-0 bg-white/80 backdrop-blur-md z-10 px-8">
      <div className="flex-1 max-w-md relative group">
        <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#89547c] w-4 h-4 group-focus-within:text-[#fe5457] transition-colors" />
        <input
          type="text"
          placeholder="SEARCH INVENTORY OR ORDERS..."
          className="pl-8 pr-4 py-2 bg-transparent w-full text-[10px] font-bold tracking-[0.2em] uppercase text-[#360212] placeholder:text-[#d791be] outline-none border-b border-transparent focus:border-[#fe5457] transition-all"
        />
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="flex items-center gap-4 border-r border-[#fcf9f6] pr-6">
          <button className="text-[#89547c] hover:text-[#fe5457] transition-colors relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#fe5457] rounded-full border-2 border-white"></span>
          </button>
          <button className="text-[#89547c] hover:text-[#360212] transition-colors">
            <Download size={18} />
          </button>
          <button className="text-[#89547c] hover:text-[#360212] transition-colors">
            <Settings size={18} />
          </button>
          <button
            onClick={handleLogout}
            className="text-[#89547c] hover:text-[#9f002b] transition-colors cursor-pointer border-[#fcf9f6]"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>
        <div className="flex items-center md:gap-3 md:pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#360212]">
              Admin Manager
            </p>
            <p className="text-[9px] text-[#fe5457] font-serif italic">
              Verified Session
            </p>
          </div>
          <div className="relative p-0.5 bg-linear-to-tr from-[#360212] to-[#fe5457] rounded-full">
            <div className="bg-white rounded-full p-0.5">
              <Image
                src="/images/profile-pic.jpg"
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
