import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./reducers";
import cartReducer from "./cartReducer";

const reducer = {
  item: itemsReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer,
});

export default store;
