"use client";
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // add to cart
    addToCart: (state, action) => {},

    // increase quantity
    increaseQuantity: (state, action) => {},

    // decrease quantity
    decreaseQuantity: (state, action) => {},

    // remove from cart
    removeFromCart: (state, action) => {},
  },
});

export default cartSlice.reducer;