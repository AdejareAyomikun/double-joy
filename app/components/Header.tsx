"use client";

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  User,
  CircleQuestionMark,
  ShoppingCart,
  LogOut,
  ListOrdered,
  Heart,
  Store,
  Car,
  Menu,
  X,
  CircleHelp,
  Search,
} from "lucide-react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);
  const [mobileHelpOpen, setMobileHelpOpen] = useState(false);

  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  const helpDropdownRef = useRef<HTMLLIElement>(null);
  const accountDropdownRef = useRef<HTMLLIElement>(null);
  const shopDropdownRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // --- Search Logic ---
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) setIsAccountDropdownOpen(false);
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target as Node)) setIsHelpDropdownOpen(false);
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target as Node)) setIsShopDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleAccountDropdown = (e: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const toggleHelpDropdown = (e: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    setIsHelpDropdownOpen(!isHelpDropdownOpen);
  };

  const toggleShopDropdown = (e: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    setIsShopDropdownOpen(!isShopDropdownOpen);
  };

  // -------------------- Mobile Controls --------------------
  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);

  // close mobile menu when route changes
  useEffect(() => {
    // only run when pathname changes (navigation)
    closeMobileMenu();
  }, [pathname]);

  // Click outside mobile menu to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        closeMobileMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close on ESC key
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMobileMenu();
        setIsAccountDropdownOpen(false);
        setIsHelpDropdownOpen(false);
        setIsShopDropdownOpen(false);
      }
    }
    const anyOpen = isMobileMenuOpen || isAccountDropdownOpen || isHelpDropdownOpen || isShopDropdownOpen;

    if (anyOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isMobileMenuOpen, isAccountDropdownOpen, isHelpDropdownOpen, isShopDropdownOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    Cookies.remove("user_access", { path: "/" });
    Cookies.remove("refresh", { path: "/" });

    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header
      className="w-full sticky top-0 z-50 bg-white/90 border-b border-[#d791be]/30 backdrop-blur-md shadow-sm font-sans"
      ref={shopDropdownRef}
    >
      <div className="container mx-auto">
        <nav className="hidden lg:flex items-center justify-between py-5 lg:px-10">
          <div className="shrink-0 font-serif font-bold text-2xl text-[#9f002b]">
            <Link href="/">Double-Joy</Link>
          </div>
          <div className="flex flex-1 justify-center px-10">
            <form onSubmit={handleSearch} className="flex items-center space-x-2 font-sans">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="p-2 lg:w-55 xl:w-100 rounded-sm border border-[#9973a0]/40 bg-white text-[#360212] placeholder-[#7A6A63] focus:outline-none focus:ring-2 focus:ring-[#89547c]"
              />
              <button type="submit" className="p-2 bg-[#fe5457] text-white rounded-sm hover:bg-[#9f002b] transition-colors flex items-center cursor-pointer">
                Search
              </button>
            </form>
          </div>
          <div className="shrink-0">
            <ul className="flex space-x-5 text-[#360212] font-semibold uppercase tracking-wide text-xs">
              <li className="relative" ref={accountDropdownRef}>
                <button onClick={toggleAccountDropdown} className="flex items-center hover:text-[#9f002b] transition outline-none cursor-pointer">
                  <User size={18} className="mr-2" />
                  Account
                  <ChevronDown size={16} className={`ml-1 transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {/* Dropdown Menu Content (hidden by default) */}
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-white rounded-lg shadow-xl border border-[#d791be]/20 py-1 z-20">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-xs hover:bg-[#d791be]/10 text-[#360212]"
                    >
                      <User size={18} className="mr-2 h-4 w-4" /> Profile
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center px-4 py-2 text-xs hover:bg-[#d791be]/10 text-[#360212]"
                    >
                      <User size={18} className="mr-2 h-4 w-4" /> Login
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-xs hover:bg-[#d791be]/10 text-[#360212]"
                    >
                      <ListOrdered size={18} className="mr-2 h-4 w-4" /> Orders
                    </Link>
                    <Link
                      href="/profile/wishlist"
                      className="flex items-center px-4 py-2 text-xs hover:bg-[#d791be]/10 text-[#360212]"
                    >
                      <Heart size={18} className="mr-2 h-4 w-4" /> Wishlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 w-full py-2 text-xs text-[#9f002b] hover:bg-red-50 cursor-pointer"
                    >
                      <LogOut size={18} className="mr-2 h-4 w-4" /> Log Out
                    </button>
                  </div>
                )}
              </li>
              <li className="relative" ref={shopDropdownRef}>
                <button onClick={toggleShopDropdown} className="flex items-center hover:text-[#9f002b] transition outline-none cursor-pointer">
                  <Store size={18} className="mr-2" />
                  Shop
                  <ChevronDown size={16} className={`ml-1 transition-transform ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </li>
              <li className="relative" ref={helpDropdownRef}>
                <button onClick={toggleHelpDropdown} className="flex items-center hover:text-[#9f002b] transition outline-none cursor-pointer">
                  <CircleQuestionMark size={18} className="mr-2" />
                  Help
                  <ChevronDown size={16} className={`ml-1 transition-transform ${isHelpDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isHelpDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-[#d791be]/20">
                    <Link href="/help" className="flex items-center px-4 py-2 text-sm hover:bg-[#d791be]/10 text-[#360212]">Help Center</Link>
                    <Link href="/orders" className="flex items-center px-4 py-2 text-sm hover:bg-[#d791be]/10 text-[#360212]">Place an order</Link>
                    <Link href="/track" className="flex items-center px-4 py-2 text-sm hover:bg-[#d791be]/10 text-[#360212]">Track an Order</Link>
                    <Link href="/cancel" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cancel an order</Link>
                  </div>
                )}
              </li>
              <li>
                <Link href="/cart" className="flex items-center hover:text-[#9f002b] transition outline-none">
                  <ShoppingCart size={18} className="mr-2" />
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* ---------------- MOBILE / TABLET NAV ---------------- */}
      <nav className="lg:hidden px-6 py-5 flex justify-between items-center bg-[#fcf9f6] border-b border-[#d791be]/20 sticky top-0 z-40">
        <Link href="/" className="font-serif text-2xl font-black text-[#360212] tracking-tighter">
          Double-Joy
        </Link>

        <div className="flex items-center space-x-5">
          <Link href="/cart" aria-label="Open cart" className="text-[#360212] relative">
            <ShoppingCart size={22} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 bg-[#fe5457] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
              0
            </span>
          </Link>

          <button
            onClick={toggleMobileMenu}
            className="text-[#360212] p-1"
          >
            {isMobileMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* MOBILE SLIDE-IN DRAWER */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 left-0 h-full bg-[#360212] w-[85%] max-w-sm shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="px-6 py-6 flex justify-between items-center border-b border-[#d791be]/10 bg-[#360212]">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fcf9f6]">Navigation</span>
          {/* <button onClick={closeMobileMenu} aria-label="Close menu" className="text-[#360212] hover:rotate-90 transition-transform duration-300">
            <X size={20} />
          </button> */}
        </div>

        <div className="px-6 py-8 space-y-8 overflow-auto h-[calc(100vh-80px)] scrollbar-hide bg-[#360212] backdrop-blur-sm">
          {/* Mobile Search - Redesigned to be more minimal */}
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH COLLECTIONS..."
              className="w-full bg-white border-b border-[#fcf9f6]/30 py-3 px-4 text-[10px] font-bold tracking-widest text-[#360212] outline-none focus:border-[#fe5457] transition-all placeholder:text-[#d791be]/50"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#360212] text-[10px] font-black tracking-widest px-2">
              GO
            </button>
          </form>

          {/* Navigation Links */}
          <div className="space-y-2">
            {/* Shop Category */}
            <div className="py-2">
              <button
                onClick={() => setMobileShopOpen((s) => !s)}
                className="w-full flex justify-between items-center py-2 group"
              >
                <span className="flex items-center font-serif text-xl font-bold text-[#fcf9f6] group-hover:text-[#fe5457] transition-colors">
                  <Store className="mr-4 text-[#fe5457]" size={18} strokeWidth={1.5} /> Shop
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#fcf9f6] transition-transform duration-300 ${mobileShopOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${mobileShopOpen ? "max-h-60 mt-4" : "max-h-0"}`}>
                <div className="pl-10 space-y-4 border-l border-[#d791be]/20">
                  {["Men's Collection", "Women's Collection", "Phones", "Accessories"].map((item) => (
                    <a key={item} href="" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#fcf9f6] hover:text-[#360212] transition-colors">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Cars Category */}
            <div className="py-2 border-t border-[#d791be]/10">
              <a href="#" className="flex items-center py-2 font-serif text-xl font-bold text-[#fcf9f6] hover:text-[#fe5457] transition-colors">
                <Car className="mr-4 text-[#fe5457]" size={18} strokeWidth={1.5} /> Cars
              </a>
            </div>

            {/* Account Category */}
            <div className="py-2 border-t border-[#d791be]/10">
              <button
                onClick={() => setMobileAccountOpen((s) => !s)}
                className="w-full flex justify-between items-center py-2"
              >
                <span className="flex items-center font-serif text-xl font-bold text-[#fcf9f6]">
                  <User className="mr-4 text-[#fe5457]" size={18} strokeWidth={1.5} /> Account
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#d791be] transition-transform duration-300 ${mobileAccountOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${mobileAccountOpen ? "max-h-60 mt-4" : "max-h-0"}`}>
                <div className="pl-10 space-y-4 border-l border-[#d791be]/20">
                  {["Profile", "Orders", "Wishlist", "Logout", "Login"].map((item) => (
                    <a key={item} href={`/${item.toLowerCase()}`} className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#fcf9f6] hover:text-[#360212]">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Help Category */}
            <div className="py-2 border-t border-[#d791be]/10">
              <button
                onClick={() => setMobileHelpOpen((s) => !s)}
                className="w-full flex justify-between items-center py-2"
              >
                <span className="flex items-center font-serif text-xl font-bold text-[#fcf9f6]">
                  <CircleHelp className="mr-4 text-[#fe5457]" size={18} strokeWidth={1.5} /> Help
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#d791be] transition-transform duration-300 ${mobileHelpOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${mobileHelpOpen ? "max-h-60 mt-4" : "max-h-0"}`}>
                <div className="pl-10 space-y-4 border-l border-[#d791be]/20">
                  {["Support", "FAQ", "Contact"].map((item) => (
                    <a key={item} href={`/${item.toLowerCase()}`} className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#fcf9f6] hover:text-[#360212]">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer of the Sidebar */}
          <div className="pt-8 border-t border-[#d791be]/10">
            <div className="grid grid-cols-2 gap-4">
              {["About", "Terms", "Privacy", "Shipping"].map((link) => (
                <a key={link} href={`/${link.toLowerCase()}`} className="text-[9px] font-black uppercase tracking-widest text-[#fcf9f6] hover:text-[#fe5457]">
                  {link}
                </a>
              ))}
            </div>
            <p className="mt-8 text-[8px] font-bold uppercase tracking-[0.3em] text-[#fcf9f6]/60 text-center">
              © 2026 Double-Joy Collective
            </p>
          </div>
        </div>
      </div>
      {/* Overlay when mobile menu open */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={closeMobileMenu}
          aria-hidden
        />
      )}

      {isShopDropdownOpen && (
        <div className="absolute left-0 w-full bg-white shadow-2xl py-10 z-20 border-t border-[#d791be]/10 animate-in fade-in slide-in-from-top-2">
          <div className="container mx-auto px-10 grid grid-cols-4 gap-8">
            <div className="space-y-4">
              <p className="font-serif text-xl font-bold text-[#9f002b]">Women's Collection</p>
              <div className="flex flex-col space-y-2 text-sm text-[#360212]">
                <Link href="#" className="hover:text-[#fe5457]">Dresses</Link>
                <Link href="#" className="hover:text-[#fe5457]">Casual Wears</Link>
                <Link href="#" className="hover:text-[#fe5457]">Official Dresses</Link>
                <Link href="#" className="hover:text-[#fe5457]">Heels and shoes</Link>
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-serif text-xl font-bold text-[#9f002b]">Men's Collection</p>
              <div className="flex flex-col space-y-2 text-sm text-[#360212]">
                <Link href="#" className="hover:text-[#fe5457]">Jean Pants</Link>
                <Link href="#" className="hover:text-[#fe5457]">Shirts and polos</Link>
                <Link href="#" className="hover:text-[#fe5457]">Suits and Official</Link>
                <Link href="#" className="hover:text-[#fe5457]">Chinos</Link>
              </div>
            </div>
            <div className="space-y-2 grid">
              <p className="font-serif text-xl font-bold text-[#9f002b]">Car's Collection</p>
              <div className="flex flex-col space-y-2 text-sm text-[#360212]">
                <Link href="#" className="hover:text-[#fe5457]">Lexus</Link>
                <Link href="#" className="hover:text-[#fe5457]">Toyota</Link>
                <Link href="#" className="hover:text-[#fe5457]">Benz</Link>
                <Link href="#" className="hover:text-[#fe5457]">Tesla</Link>
              </div>
            </div>
            <div className="space-y-2 grid">
              <p className="font-serif text-xl font-bold text-[#9f002b]">Phone Collections</p>
              <div className="flex flex-col space-y-2 text-sm text-[#360212]">
                <Link href="#" className="hover:text-[#fe5457]">iPhones</Link>
                <Link href="#" className="hover:text-[#fe5457]">Samsung</Link>
                <Link href="#" className="hover:text-[#fe5457]">Infinix</Link>
                <Link href="#" className="hover:text-[#fe5457]">Oppo</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}