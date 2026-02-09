"use client";

import { useState, useEffect } from "react";
import { loginUser, decodeToken } from "@/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert, Lock, User } from "lucide-react";
import Cookies from "js-cookie";

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const errorType = searchParams.get("error");
    if (errorType === "session_expired") {
      setError("Your session has timed out. Please sign in again.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(username, password, true);
      const payload = decodeToken(data.access);

      if (!payload.is_staff) {
        setError("Access Denied: You do not have administrative privileges.")
        Cookies.remove("admin_access");
        return
      }
      router.push("/admin/dashboard");
      // window.location.href = "/admin/dashboard";

    } catch (err: any) {
      const message = err.response?.data?.detail || "Invalid administrative credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#360212] font-sans px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-white mb-2 tracking-tight">
            Double-Joy
          </h1>
          <p className="text-[#d791be] uppercase tracking-[0.4em] text-[10px] font-bold">
            Administrative Portal
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 shadow-2xl rounded-none border-t-8 border-[#fe5457]"
        >
          <h2 className="font-serif text-2xl text-[#360212] mb-8 font-bold text-center">
            Admin Sign In
          </h2>

          {error && (
            <div className="flex items-center gap-3 bg-red-50 text-[#9f002b] p-4 mb-6 border-l-4 border-[#9f002b] text-xs font-bold uppercase tracking-wider">
              <ShieldAlert size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#89547c]"
                size={18}
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-b border-[#d791be]/30 py-3 pl-12 pr-4 focus:border-[#360212] outline-none transition-all placeholder:text-gray-300"
                required
              />
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#89547c]"
                size={18}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-[#d791be]/30 py-3 pl-12 pr-4 focus:border-[#360212] outline-none transition-all placeholder:text-gray-300"
                required
              />
            </div>

            <button
              className={`w-full py-4 font-bold uppercase tracking-[0.25em] text-xs transition-all shadow-lg flex items-center justify-center gap-2 ${loading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#360212] text-white hover:bg-[#9f002b] shadow-[#360212]/20"
                }`}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Access Dashboard"}
            </button>
          </div>
        </form>
        <p className="mt-8 text-center text-[#d791be] text-[10px] uppercase tracking-widest opacity-60">
          Authorized Personnel Only • Secure 256-bit Encrypted Session
        </p>
      </motion.div>
    </div>
  );
}
