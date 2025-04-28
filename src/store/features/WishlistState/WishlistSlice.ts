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

    // clear wishlist
    clearWishlist: (state) => {
      state.wishlistItems = [];
      localStorage.setItem("wishlist", JSON.stringify(state));
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
  setWishlistFromStorage,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
