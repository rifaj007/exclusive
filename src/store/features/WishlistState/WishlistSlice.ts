import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../CartState/CartSlice";
import { IProduct } from "@/libs/database/models/product.model";
import { WritableDraft } from "immer";

interface WishlistState {
  wishlistItems: IProduct[];
}

const initialState: WishlistState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // add to wishlist
    addProductToWishlist: (state, action: PayloadAction<IProduct>) => {
      const exists = state.wishlistItems.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.wishlistItems.push(JSON.parse(JSON.stringify(action.payload)));
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },

    // remove from wishlist
    removeProductFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("wishlist", JSON.stringify(state));
    },

    // move all to cart
    moveAllToCart: (state) => {
      const cartFromStorage = localStorage.getItem("cart");
      const parsedCart = cartFromStorage ? JSON.parse(cartFromStorage) : null;

      const existingCartItems: CartItem[] = parsedCart?.cartItems || [];

      const mergedCartItems: CartItem[] = [...existingCartItems];

      state.wishlistItems.forEach((wishlistItem) => {
        const existingItem = mergedCartItems.find(
          (item) => item._id === wishlistItem._id
        );

        if (existingItem) {
          // Increase quantity, but max 10
          existingItem.quantity = Math.min(existingItem.quantity + 1, 10);
        } else {
          // Add as new item with default values
          mergedCartItems.push({
            ...JSON.parse(JSON.stringify(wishlistItem)),
            quantity: 1,
            selectedSize: "S",
            color: 0,
          });
        }
      });

      const updatedCart = {
        cartItems: mergedCartItems,
        coupon: parsedCart?.coupon || null,
      };

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Clear wishlist
      state.wishlistItems = [];
      localStorage.removeItem("wishlist");
    },

    // set wishlist from local storage
    setWishlistFromStorage: (state, action: PayloadAction<WishlistState>) => {
      state.wishlistItems = action.payload
        .wishlistItems as unknown as WritableDraft<CartItem>[];
    },
  },
});

export const {
  addProductToWishlist,
  removeProductFromWishlist,
  moveAllToCart,
  setWishlistFromStorage,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
