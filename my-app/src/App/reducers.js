import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_GET_ITEMS } from "../Utils/APIs";

export const initialState = {
  items: [],
  categoryData: [],
  cart: [],
  status: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk("fetchItems", async () => {
  const response = await axios.get(API_GET_ITEMS);
  return response.data;
});

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload[0];
        state.categoryData = action.payload[1];
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default itemsSlice.reducer;
