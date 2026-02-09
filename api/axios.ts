import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_URL = "https://doublejoy-backend.onrender.com/api";
// const API_URL = "http://127.0.0.1:8000//api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const token = pathname.startsWith('/admin')
        ? Cookies.get("admin_access")
        : Cookies.get("user_access");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const pathname = typeof window !== "undefined" ? window.location.pathname : "";

      if (pathname === "/admin" || pathname === "/login") {
        return Promise.reject(error);
      }

      Cookies.remove("admin_access", { path: '/' });
      Cookies.remove("user_access", { path: '/' });
      Cookies.remove("refresh", { path: '/' });

      if (typeof window !== "undefined") {
        if (pathname.startsWith("/admin")) {
          window.location.href = "/admin?error=session_expired";
        } else {
          window.location.href = "/login?error=session_expired";
        }
      }
    }
    return Promise.reject(error);
  }
);
export default api