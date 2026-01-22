import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access");

      if (!config.headers) {
        config.headers = {};
      }

      if (token && token !== "null" && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
