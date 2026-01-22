import api from "./axios";

interface LoginResponse {
  access: string;
  refresh: string;
}

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const res = await api.post<LoginResponse>("/auth/login/", {
      username,
      password,
    });

    console.log("AXIOS RESPONSE:", res.data);

    if (typeof window !== "undefined") {
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      console.log("TOKEN SAVED:", localStorage.getItem("token"));
    }

    return res.data;
  } catch (err: any) {
    console.error("LOGIN ERROR:", err.response?.data || err.message);
    throw err;
  }
};

export const decodeToken = (token: string) => {
  return JSON.parse(atob(token.split(".")[1]));
};

export const registerUser = async (userData: any) => {
  try {
    const res = await api.post("/auth/register/", userData);
    return res.data;
  } catch(err: any){
    console.log("REGISTERATION ERROR", err.response?.data || err.message);
    throw err;
  }
 
};

export const refreshToken = async (refresh: string) => {
  const res = await api.post("/auth/token/refresh/", { refresh });
  return res.data;
};
