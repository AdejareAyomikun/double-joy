import api from "./axios";
import { Order } from "@/types/admin";

export const getOrders = async () => {
  try {
    const res = await api.get<Order[]>("/orders/");
    return res.data;
  } catch (err: any) {
    console.log("Error fetching orders", err.response || err);
    throw err;
  }
}

export const updateOrderStatus = async (
  id: number,
  status: string
): Promise<Order> => {
  try {
    const res = await api.patch<Order>(`/orders/${id}/`, { status });
    return res.data;
  } catch (err: any) {
    console.log("Error updating order status", err.response || err);
    throw err;
  }
};