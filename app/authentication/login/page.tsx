"use client";

import { useRouter } from "next/navigation";
import { loginUser } from "@/api/auth";
import { decodeToken } from "@/api/auth";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { access } = await loginUser(username, password);
    const payload = decodeToken(access);

    // 🚫 Admins should not login here
    if (payload.is_staff) {
      alert("Admins must use admin login");
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="w-96 bg-white shadow p-6 rounded">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
