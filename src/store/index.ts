import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/CartState/CartSlice";
import wishlistReducer from "./features/WishlistState/WishlistSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
