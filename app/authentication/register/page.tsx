"use client";

import { useState } from "react";
import { registerUser } from "@/api/auth";
import { useRouter } from "next/navigation";

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
      router.push("/authentication/login");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        "Registration failed. Please check your inputs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create Account
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}