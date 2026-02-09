import api from "./axios";
import Cookies from "js-cookie";

interface LoginResponse {
  access: string;
  refresh: string;
}

export const loginUser = async (username: string, password: string, isAdmin: boolean = false): Promise<LoginResponse> => {
  try {
    const res = await api.post<LoginResponse>("/auth/login/", {
      username,
      password,
    });
    const cookieName = isAdmin ? "admin_access" : "user_access";
    Cookies.set(cookieName, res.data.access, { expires: 7, secure: true, sameSite: "strict", path: "/" });
    Cookies.set("refresh", res.data.refresh, { expires: 7, secure: true, sameSite: "strict", path: "/" });

    return res.data;
  } catch (err: any) {
    console.error("LOGIN ERROR:", err.response?.data || err.message);
    throw err;
  }
};

export const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const registerUser = async (userData: any) => {
  try {
    const res = await api.post("/auth/register/", userData);
    return res.data;
  } catch (err: any) {
    console.log("REGISTERATION ERROR", err.response?.data || err.message);
    throw err;
  }

};

export const refreshToken = async (refresh: string) => {
  const res = await api.post("/auth/token/refresh/", { refresh });
  return res.data;
};
