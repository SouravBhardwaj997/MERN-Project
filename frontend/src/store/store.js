import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "../store/featues/products/productSlice.js";

// console.log(productSliceReducer);
const store = configureStore({
  reducer: productSliceReducer,
});

export default store;
