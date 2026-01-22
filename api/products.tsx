import api from "./axios";
import { Category, Product } from "@/types/admin";

export const createProduct = async (productData: FormData) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const res = await api.post("/products/", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err: any) {
    console.error("Error creating product:", err.response || err);
    throw err;
  }
};

export const getProducts = async () => {
  try {
    const res = await api.get("/products/");
    return res.data;
  } catch (err: any) {
    console.error("Error fetching products:", err.response || err);
    throw err;
  }
};

export const getProductsByCategory = async (
  categoryId: number,
): Promise<Product[]> => {
  try {
    const res = await api.get<Product[]>(`/products/?category=${categoryId}`);
    return res.data;
  } catch (err: any) {
    console.error("Error fetching category products:", err.response || err);
    throw err;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await api.get<Category[]>("/categories/");
    return res.data;
  } catch (err: any) {
    console.error("API Error fetching categories:", err.response || err);
    throw err;
  }
};
