import axios from "axios";
import { API_URL } from "./config";

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch orders.");
  }
};

export const placeOrder = async (orderData: any) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to place order.");
  }
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  try {
    const response = await axios.patch(`${API_URL}/orders/${orderId}`, { status });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update order status.");
  }
};
