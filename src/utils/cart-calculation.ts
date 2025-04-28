import { CartItem, Coupon } from "@/store/features/CartState/CartSlice";

export const calculateCartSummary = (
  cartItems: CartItem[],
  coupon?: Coupon | null
) => {
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.offerPrice * item.quantity,
    0
  );

  // Discount
  const discount = coupon ? (subTotal * coupon.discountPercentage) / 100 : 0;

  const totalAfterDiscount = subTotal - discount;

  // Shipping is free if subtotal is over $250
  const shipping = totalAfterDiscount >= 250 ? 0 : 10;

  const total = totalAfterDiscount + shipping;

  return { subTotal, discount, totalAfterDiscount, shipping, total };
};
