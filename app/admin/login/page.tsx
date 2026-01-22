// "use client";

// import { useState } from "react";
// import { loginUser } from "@/api/auth";
// import { useRouter } from "next/navigation";

// export default function AdminLogin() {
//   const router = useRouter();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const data = await loginUser(username, password);
//       console.log("DATA RETURNED:", data);               // debug
//       console.log("TOKEN IN LOCALSTORAGE:", localStorage.getItem("token")); // debug

//       if (data.access) {
//         router.push("/admin/dashboard");  // redirect after login
//       } else {
//         setError("Login failed, token not received");
//       }
//     } catch (err: any) {
//       console.log(err);
//       setError("Invalid username or password");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <form
//         onSubmit={handleSubmit}
//         className="w-96 bg-white shadow p-6 rounded"
//       >
//         <h2 className="text-xl font-semibold mb-4">Login</h2>

//         {error && <p className="text-red-500 mb-3">{error}</p>}

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full border p-2 rounded mb-3"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border p-2 rounded mb-4"
//         />

//         <button
//           className="w-full bg-blue-600 text-white py-2 rounded"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }
// version 1

"use client";

import { useState } from "react";
import { loginUser } from "@/api/auth";
import { useRouter } from "next/navigation";

function decodeToken(token: string) {
  return JSON.parse(atob(token.split(".")[1]));
}

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(username, password);
      const token = data.access;

      if (!token) {
        setError("Login failed, token not received");
        return;
      }

      const payload = decodeToken(token);

      // 🚫 BLOCK NON-ADMINS
      if (!payload.is_staff) {
        setError("You are not authorized to access admin panel");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        return;
      }

      // ✅ ADMIN OK
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white shadow p-6 rounded"
      >
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
