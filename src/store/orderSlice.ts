import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../API/config";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
});

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }: { orderId: number; status: string }) => {
    const response = await axios.patch(`${API_URL}/orders/${orderId}`, { status });
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex((order:any) => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index].status = action.payload.status;
        }
      });
  },
});

export default orderSlice.reducer;
