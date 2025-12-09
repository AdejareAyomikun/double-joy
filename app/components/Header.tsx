"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);
  const [mobileHelpOpen, setMobileHelpOpen] = useState(false);

  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  const helpDropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const shopDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleAccountDropdown = (e) => {
    e.preventDefault();
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        helpDropdownRef.current &&
        !helpDropdownRef.current.contains(event.target)
      ) {
        setIsHelpDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleHelpDropdown = (e) => {
    e.preventDefault();
    setIsHelpDropdownOpen(!isHelpDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shopDropdownRef.current &&
        !shopDropdownRef.current.contains(event.target)
      ) {
        setIsShopDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleShopDropdown = (e) => {
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
    function handleClickOutside(e) {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        closeMobileMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close on ESC key
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Lock body scroll when mobile menu is open
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

  return (
    <header className="bg-white mx-auto" ref={shopDropdownRef}>
      <nav className="hidden lg:flex container lg:items-center py-5 lg:px-10 justify-between">
        <Link href="/">Double-Joy</Link>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 w-100 rounded-sm border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-2 text-white bg-blue-600 rounded-sm hover:bg-blue-700 cursor-pointer">
            Search
          </button>
        </div>
        <ul className="flex space-x-5">
          <li className="relative" ref={accountDropdownRef}>
            <a href="#" onClick={toggleAccountDropdown} className="flex">
              <User className="mr-2" />
              Account
              <ChevronDown className="pt-1" />
            </a>
            {/* Dropdown Menu Content (hidden by default) */}
            {isAccountDropdownOpen && (
              <div className="absolute right--35 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <a
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="mr-2 h-4 w-4" /> Profile
                </a>
                <a
                  href="/authentication"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="mr-2 h-4 w-4" /> Login
                </a>
                <a
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <ListOrdered className="mr-2 h-4 w-4" /> Orders
                </a>
                <a
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Heart className="mr-2 h-4 w-4" /> Wishlist
                </a>
                <a
                  href="/logout"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </a>
              </div>
            )}
          </li>
          <li className="relative" ref={shopDropdownRef}>
            <a href="#" onClick={toggleShopDropdown} className="flex">
              <Store className="mr-2" />
              Shop
              <ChevronDown className="pt-1" />
            </a>
          </li>
          <li className="relative" ref={helpDropdownRef}>
            <a href="#" onClick={toggleHelpDropdown} className="flex">
              <CircleQuestionMark className="mr-2" />
              Help
              <ChevronDown className="pt-1" />
            </a>

            {isHelpDropdownOpen && (
              <div className="absolute right--35 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <a
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Help Center
                </a>
                <a
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Place an orders
                </a>
                <a
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Track an Order
                </a>
                <a
                  href="/logout"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cancel an order
                </a>
              </div>
            )}
          </li>
          <li>
            <Link href="/cart" className="flex">
              <ShoppingCart className="mr-2" />
              Cart
            </Link>
          </li>
        </ul>
      </nav>

      {/* ---------------- MOBILE / TABLET NAV ---------------- */}
      <nav className="lg:hidden px-5 py-4 flex justify-between items-center border-b">
        <Link href="/" className="text-xl font-semibold">
          Double-Joy
        </Link>

        <div className="flex items-center space-x-4">
          <a href="/cart" aria-label="Open cart">
            <ShoppingCart />
          </a>

          <button
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMobileMenu}
            className="p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE SLIDE-IN DRAWER */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 left-0 h-full bg-white w-72 shadow-xl z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="px-5 py-5 flex justify-between items-center border-b">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={closeMobileMenu} aria-label="Close menu">
            <X />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4 overflow-auto h-[calc(100vh-72px)]">
          {/* Mobile Search */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <button className="p-2 bg-blue-600 text-white rounded">Go</button>
          </div>

          {/* Shop */}
          <div>
            <button
              onClick={() => setMobileShopOpen((s) => !s)}
              className="w-full flex justify-between items-center py-2"
            >
              <span className="flex items-center">
                <Store className="mr-2" /> Shop
              </span>
              <ChevronDown
                className={`${
                  mobileShopOpen ? "rotate-180" : ""
                } transition-transform`}
              />
            </button>

            {mobileShopOpen && (
              <div className="pl-6 space-y-2 text-sm text-gray-600">
                <a href="">Men's Collection</a>
                <a href="">Women's Collection</a>
                <a href="">Phones</a>
                <a href="">Accessories</a>
              </div>
            )}
          </div>

          {/* Cars */}
          <div>
            <a href="#" className="flex items-center py-2">
              <Car className="mr-2" /> Cars
            </a>
          </div>

          {/* Account */}
          <div>
            <button
              onClick={() => setMobileAccountOpen((s) => !s)}
              className="w-full flex justify-between items-center py-2"
            >
              <span className="flex items-center">
                <User className="mr-2" /> Account
              </span>
              <ChevronDown
                className={`${
                  mobileAccountOpen ? "rotate-180" : ""
                } transition-transform`}
              />
            </button>

            {mobileAccountOpen && (
              <div className="pl-6 space-y-2 text-sm text-gray-600">
                <a href="/profile">Profile</a>
                <a href="/orders">Orders</a>
                <a href="/wishlist">Wishlist</a>
                <a href="/logout">Logout</a>
              </div>
            )}
          </div>

          {/* Help */}
          <div>
            <button
              onClick={() => setMobileHelpOpen((s) => !s)}
              className="w-full flex justify-between items-center py-2"
            >
              <span className="flex items-center">
                <CircleQuestionMark className="mr-2" /> Help
              </span>
              <ChevronDown
                className={`${
                  mobileHelpOpen ? "rotate-180" : ""
                } transition-transform`}
              />
            </button>

            {mobileHelpOpen && (
              <div className="pl-6 space-y-2 text-sm text-gray-600">
                <a href="/support">Support</a>
                <a href="/faq">FAQ</a>
                <a href="/contact">Contact</a>
              </div>
            )}
          </div>

          {/* Extra quick links */}
          <div className="pt-4 border-t">
            <a href="/about" className="block py-2 text-sm text-gray-700">
              About
            </a>
            <a href="/contact" className="block py-2 text-sm text-gray-700">
              Contact
            </a>
            <a href="/terms" className="block py-2 text-sm text-gray-700">
              Terms
            </a>
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
        <div className="absolute left-0 px-5 w-full bg-white shadow-lg py-5 z-20 grid grid-cols-4 overflow-hidden">
          <div className="space-y-2 grid">
            <p>Women's Collection</p>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Dresses
            </a>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Casual Wears
            </a>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Dresses
            </a>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Official Dresses
            </a>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Heals and shoes
            </a>
          </div>
          <div className="space-y-2 grid">
            <p>Men's Collection</p>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Jean Pants
            </a>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Shirts and polos
            </a>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Suits and Official wears
            </a>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Official Shoes
            </a>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Chinos
            </a>
          </div>
          <div className="space-y-2 grid">
            <p>Car's Collection</p>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Lexus
            </a>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Toyota
            </a>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Benz
            </a>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Nissan
            </a>
            <a href="" className=" text-gray-500 hover:text-gray-900">
              Tesla
            </a>
          </div>
          <div className="space-y-2 grid">
            <p>Phone Collections</p>
            <a href="">Iphones</a>
            <a href="">Samsung</a>
            <a href="">Infinix</a>
            <a href="">Techno</a>
            <a href="">Oppo</a>
          </div>
        </div>
      )}
    </header>
  );
}
