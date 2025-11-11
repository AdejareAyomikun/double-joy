"use client";

import { useState, useRef, useEffect } from "react";
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
} from "lucide-react";

export default function Header() {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const accountDropdownRef = useRef(null);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const helpDropdownRef = useRef(null);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const shopDropdownRef = useRef(null);

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
  return (
    <header className="bg-white" ref={shopDropdownRef}>
      <nav className="container mx-auto flex items-center py-5 px-10">
        <a href="">Double-Joy</a>
        <ul className="flex space-x-4 ml-5">
          <li className="relative" ref={shopDropdownRef}>
            <a href="#" onClick={toggleShopDropdown} className="flex">
              <Store className="mr-2" />
              Shop
              <ChevronDown className="pt-1" />
            </a>
          </li>
          <li>
            <a href="#" className="flex">
              <Car className="mr-2" />
              Cars
              <ChevronDown className="pt-1" />
            </a>
          </li>
        </ul>
        <div className="flex items-center mx-10 space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 w-100 rounded-sm border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-2 text-white bg-blue-600 rounded-sm hover:bg-blue-700">
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
                  <User className="mr-2 h-4 w-4" /> Profile
                </a>
                <a
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Orders
                </a>
                <a
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Wishlist
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
          <li>
            <a href="" className="flex">
              <ShoppingCart className="mr-2" />
              Cart
            </a>
          </li>
        </ul>
      </nav>
      {isShopDropdownOpen && (
        <div className="absolute left--30 px-5 w-screen bg-white rounded-md shadow-lg py-5 z-20 grid grid-cols-4">
          <div className="space-y-2 grid">
            <p>Women's Collection</p>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
          </div>
          <div className="space-y-2 grid">
            <p>Men's Collection</p>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
          </div>
          <div className="space-y-2 grid">
            <p>Men's Collection</p>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
            <a href="" className=" text-gray-500 hover:text-gray-900">Dresses</a>
          </div>
          <div className="space-y-2 grid">
            <p>Phone Collections</p>
            <a href="">Dresses</a>
            <a href="">Dresses</a>
            <a href="">Dresses</a>
            <a href="">Dresses</a>
            <a href="">Dresses</a>
          </div>
        </div>
      )}
    </header>
  );
}
