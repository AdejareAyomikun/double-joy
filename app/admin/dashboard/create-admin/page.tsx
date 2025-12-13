"use client";

import { useState } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import Header from "../../components/Header";

export default function CreateAdmin() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    admin_key: "", // optional; only set if creating admin via frontend
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/register/",
        form
      );
      alert("Registered successfully! Please login.");
      window.location.href = "/login";
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Registration failed");
    }
  };

  return (
    <>
    <Header />
      <div className="m-5 p-10 bg-gray-100">
        <header className="flex sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="flex text-3xl font-bold text-gray-800">
            <span className="flex text-gray-400">
              Admin Dashboard <ChevronRight size={40} />
            </span>{" "}
            Create Admin
          </h1>
        </header>
        <form className="flex-1" onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="username"
            onChange={handleChange}
            className="border p-3 rounded w-full mb-4"
            required
          />
          <input
            name="email"
            placeholder="email"
            onChange={handleChange}
            className="border p-3 rounded w-full mb-4"
            required
          />
          <input
            name="password"
            placeholder="password"
            type="password"
            onChange={handleChange}
            className="border p-3 rounded w-full mb-4"
            required
          />
          <input
            name="first_name"
            placeholder="first name"
            className="border p-3 rounded w-full mb-4"
            onChange={handleChange}
          />
          <input
            name="last_name"
            placeholder="last name"
            onChange={handleChange}
            className="border p-3 rounded w-full mb-4"
          />
          <input
            name="admin_key"
            placeholder="admin key (optional)"
            onChange={handleChange}
            className="border p-3 rounded w-full mb-4"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-3 px-5 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}
