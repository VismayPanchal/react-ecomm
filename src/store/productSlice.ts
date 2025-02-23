import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../API/config";

export interface Product {
title:string
description:string;
price:number
category:string;
image:string
}


export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
});

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: string) => {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],  
    selectedProduct: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;  
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      });
  },
});

export default productSlice.reducer;
