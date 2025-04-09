import { ProductData } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends ProductData {
  quantity: number;
  selectedSize: string;
  color: number;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
}

interface CartState {
  cartItems: CartItem[];
  coupon: Coupon | null;
}

const initialState: CartState = {
  cartItems: [],
  coupon: null,
};

interface AddToCartPayload {
  product: ProductData;
  quantity: number;
  selectedSize: string;
  color: number;
}
interface ChangeQuantityPayload {
  _id: string;
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // set cart from storage
    setCartFromStorage: (state, action: PayloadAction<CartState>) => {
      state.cartItems = action.payload.cartItems;
      state.coupon = action.payload.coupon;
    },

    // add to cart
    addProductToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, quantity, selectedSize, color } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === product._id
      );
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        existingItem.quantity = Math.min(newQuantity, 10);
      } else {
        state.cartItems.push({
          ...product,
          quantity: Math.min(quantity, 10),
          selectedSize,
          color,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // remove from cart
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // clear cart
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },

    // change quantity (increase or decrease)
    changeQuantity: (state, action: PayloadAction<ChangeQuantityPayload>) => {
      const { _id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === _id);

      if (existingItem) {
        const newQuantity = quantity;
        existingItem.quantity = newQuantity;
      } else return;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // add coupon
    addCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupon = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // remove coupon
    removeCoupon: (state) => {
      state.coupon = null;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  setCartFromStorage,
  addProductToCart,
  removeProductFromCart,
  clearCart,
  changeQuantity,
  addCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
