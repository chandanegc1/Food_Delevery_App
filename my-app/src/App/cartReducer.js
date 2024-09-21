import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./reducers";
import { toast } from "react-toastify";

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleAddToCart: (state, action) => {
      const { qty, finalPrice, size, name, _id } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.id === _id && item.size === size
      );
      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === _id
            ? {
                ...item,
                qty: parseInt(item.qty) + parseInt(qty),
                price: item.price + finalPrice,
              }
            : item
        );
      } else {
        state.cart.push({
          id: _id,
          name,
          qty: parseInt(qty),
          price: finalPrice,
          size,
        });
      }
      toast.success(`${name} added in Cart`);
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    dropItems: (state) => {
      state.cart = [];
    },
  },
});

export const { handleAddToCart, removeItem, dropItems } = cartSlice.actions;
export default cartSlice.reducer;
