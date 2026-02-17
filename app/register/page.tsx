"use client";

import { useState } from "react";
import { registerUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function ClientRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(form);
      alert("Account created successfully!");
      router.push("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Registration failed. Please check your inputs.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fcf9f6] font-sans">
      <div className="hidden lg:flex lg:w-1/2 bg-[#360212] relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-72 h-72 rounded-full bg-[#fe5457] blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-[#9f002b] blur-[150px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 text-white max-w-md"
        >
          <h1 className="font-serif text-6xl font-bold leading-tight mb-6">
            Join the <br /> <span className="text-[#fe5457]">Double-Joy</span>{" "}
            <br /> Collective.
          </h1>
          <p className="text-sm tracking-[0.2em] uppercase opacity-70 font-light leading-loose">
            Access exclusive collections, personalized styling, and the finest
            craftsmanship in the region.
          </p>
        </motion.div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="font-serif text-3xl font-bold text-[#360212] mb-2">
              Create Account
            </h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#89547c]">
              Start your journey with us
            </p>
          </div>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-[#9f002b] p-4 text-xs font-bold uppercase tracking-wider mb-6 border-l-4 border-[#9f002b]"
            >
              {error}
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <input
                  name="first_name"
                  placeholder="First Name"
                  value={form.first_name}
                  onChange={handleChange}
                  className="w-full bg-white border-b border-[#d791be]/30 p-4 text-[10px] font-bold tracking-widest outline-none focus:border-[#fe5457] transition-all"
                />
              </div>
              <div className="relative group">
                <input
                  name="last_name"
                  placeholder="Last Name"
                  value={form.last_name}
                  onChange={handleChange}
                  className="w-full bg-white border-b border-[#d791be]/30 p-4 text-[10px] font-bold tracking-widest outline-none focus:border-[#fe5457] transition-all"
                />
              </div>
            </div>

            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d791be]"
                size={16}
              />
              <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full bg-white border-b border-[#d791be]/30 p-4 pl-12 text-[10px] font-bold tracking-widest outline-none focus:border-[#fe5457] transition-all"
                required
              />
            </div>

            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d791be]"
                size={16}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-white border-b border-[#d791be]/30 p-4 pl-12 text-[10px] font-bold tracking-widest outline-none focus:border-[#fe5457] transition-all"
              />
            </div>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d791be]"
                size={16}
              />
              <input
                name="password"
                type="password"
                placeholder="Choose Password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-white border-b border-[#d791be]/30 p-4 pl-12 text-[10px] font-bold tracking-widest outline-none focus:border-[#fe5457] transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#360212] text-white py-5 px-8 text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl hover:bg-[#9f002b] transition-all flex items-center justify-center gap-3 group disabled:bg-gray-400 cursor-pointer"
            >
              {loading ? "AUTHENTICATING..." : "CREATE ACCOUNT"}
              {!loading && (
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              )}
            </button>
          </form>
          <div className="mt-10 text-center">
            <p className="text-[10px] text-[#89547c] uppercase tracking-widest">
              Already a member?{" "}
              <Link
                href="/login"
                className="text-[#360212] font-black border-b border-[#360212] ml-2 pb-1 hover:text-[#fe5457] hover:border-[#fe5457] transition-colors"
              >
                SIGN IN
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
