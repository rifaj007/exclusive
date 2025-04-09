import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import useHasMounted from "@/hooks/useHasMounted";
import { CartIcon } from "@/icons";
import { setCartFromStorage } from "@/store/features/CartState/CartSlice";
import Link from "next/link";
import { useEffect } from "react";

const CartLink = () => {
  const hasMounted = useHasMounted();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : { cartItems: [] };
    dispatch(setCartFromStorage(parsedCart));
  }, [dispatch]);

  return (
    <Link href="/cart" className="relative">
      {hasMounted && cartItems.length > 0 && (
        <p className="absolute -top-1.5 -right-1.5 rounded-full bg-secondary-3 text-white text-xs size-5 flex-center">
          {cartItems.length}
        </p>
      )}
      <CartIcon />
    </Link>
  );
};

export default CartLink;
