"use client";

import { useRouter } from "next/navigation";
import { loginUser } from "@/api/auth";
import { decodeToken } from "@/api/auth";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { access } = await loginUser(username, password);
      const payload = decodeToken(access);

      if (payload.is_staff) {
        setError("Access denied. Admins must use the administrative portal.");
        Cookies.remove("user_access");
        return;
      }

      window.location.href = "/";
    } catch (err) {
      setError("Access denied. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fcf9f6] font-sans">
      <div className="hidden lg:flex lg:w-1/2 bg-[#360212] relative items-center justify-center p-12 overflow-hidden">
        {/* Subtle Brand Texture */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#9f002b] blur-[140px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <h1 className="font-serif text-5xl font-bold text-white mb-6 tracking-tighter">
            Welcome Back <br /> to{" "}
            <span className="text-[#fe5457]">Double-Joy</span>
          </h1>
          <div className="h-1 w-20 bg-[#fe5457] mx-auto mb-6" />
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#d791be] font-bold">
            The Curator's Portal
          </p>
        </motion.div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#360212] mb-3 text-center lg:text-left">
              Sign In
            </h2>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <ShieldCheck size={14} className="text-[#fe5457]" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#89547c] font-bold">
                Secure Authentication
              </p>
            </div>
          </div>
          {error && (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-[#9f002b]/5 text-[#9f002b] p-4 text-[10px] font-bold uppercase tracking-widest mb-8 border-l-2 border-[#9f002b]"
            >
              {error}
            </motion.div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#d791be] ml-1">
                Username
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-[#360212]"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Enter your username or email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border-b border-[#d791be]/40 p-4 pl-10 text-[11px] font-bold tracking-widest text-[#360212] outline-none focus:border-[#fe5457] transition-all placeholder:text-[#d791be]/60"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#89547c]">
                Password
              </label>
              <input
                type="password"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b-2 border-[#fcf9f6] bg-transparent p-3 focus:border-[#fe5457] outline-none transition-all placeholder:text-gray-300 text-[#360212]"
                required
              />
            </div>
            <button
              className={`w-full bg-[#fe5457] text-white py-4 font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#9f002b] transition-all shadow-lg shadow-[#fe5457]/20 mt-4 ${loading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#360212] text-white hover:bg-[#9f002b] shadow-[#360212]/20"
                }`}
              disabled={loading}
            >
             {loading ? "Verifying...." : "Sign In"}
            </button>
            <div className="pt-6 text-center border-t border-[#fcf9f6]">
              <p className="text-sm text-[#89547c]">
                New to Double-Joy?{" "}
                <Link
                  href="/register"
                  className="text-[#360212] font-bold hover:text-[#fe5457] transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>
          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-[#d791be] text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
              ← Return to Store
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
