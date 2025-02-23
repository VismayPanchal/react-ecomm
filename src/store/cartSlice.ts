import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://fakestoreapi.com/carts";

// Define Cart Item Interface
interface CartItem {
  image: string;
  id: number;
  title: string;
  price: number;
  quantity: number;
}

// Define Cart State Interface
interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// 🔹 Fetch Cart from API
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get(`${API_URL}/carts`);
  return response.data;
});

// 🔹 Add Item to Cart (API)
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (item: CartItem) => {
    const response = await axios.post(API_URL, { productId: item.id, quantity: item.quantity });
    return { ...item, id: response.data.id }; // Return item with API-generated ID
  }
);

// 🔹 Remove Item from Cart (API)
export const removeItemFromCart = createAsyncThunk("cart/removeItemFromCart", async (itemId: number) => {
  await axios.delete(`${API_URL}/${itemId}`);
  return itemId; // Return deleted item's ID
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })

      // Add Item to Cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add item to cart";
      })

      // Remove Item from Cart
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.error.message || "Failed to remove item from cart";
      });
  },
});

export default cartSlice.reducer;
