"use client";
import { useAppSelector } from "@/hooks/redux-hooks";
import useHasMounted from "@/hooks/useHasMounted";
import { calculateCartSummary } from "@/utils/cart-calculation";

const CheckoutPage = () => {
  const hasMounted = useHasMounted();
  const { cartItems, coupon } = useAppSelector((state) => state.cart);

  // Calculate cart summary
  const { total } = calculateCartSummary(cartItems, coupon);

  if (!hasMounted) return null;

  // if cart is empty
  if (cartItems.length === 0) return <div>Cart is empty</div>;

  return <div>CheckoutPage: {total}</div>;
};

export default CheckoutPage;
