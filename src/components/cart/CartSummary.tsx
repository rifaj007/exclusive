"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useCurrentUser } from "@/hooks/use-session";
import useHasMounted from "@/hooks/useHasMounted";
import { couponCodeSchema } from "@/libs/validator";
import {
  addCoupon,
  clearCart,
  removeCoupon,
} from "@/store/features/CartState/CartSlice";
import { calculateCartSummary } from "@/utils/cart-calculation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/libs/actions/checkout/order.action";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartSummary = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const hasMounted = useHasMounted();
  const { cartItems, coupon } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof couponCodeSchema>>({
    resolver: zodResolver(couponCodeSchema),
  });

  // Calculate cart summary
  const { subTotal, shipping, totalAfterDiscount, discount, total } =
    calculateCartSummary(cartItems, coupon);

  // handling coupon code apply
  const onSubmit = async (values: z.infer<typeof couponCodeSchema>) => {
    const code = values.couponCode.trim();

    // coupon
    const validCoupons = [
      { code: "save10", discountPercentage: 10 },
      { code: "SUMMER20", discountPercentage: 20 },
    ];

    const matchedCoupon = validCoupons.find((coupon) => coupon.code === code);

    if (matchedCoupon) {
      dispatch(addCoupon(matchedCoupon));
      toast.success(`Coupon ${code} applied successfully!`);
      reset();
    } else {
      toast.error("Invalid coupon code!");
    }
  };

  // handling checkout
  const handleCheckout = async () => {
    if (!user) {
      router.push("log-in?callbackUrl=%2Fcart");
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe is not initialized");
      }
      const session = await checkoutOrder(cartItems);

      dispatch(clearCart());
      window.location.href = session!;
    } catch (error) {
      console.error("Checkout failed", error);
    }
  };

  if (!hasMounted) return null;

  if (cartItems.length === 0) return null;

  return (
    <div className="flex lg:flex-row flex-col lg:items-start items-end lg:justify-between gap-6">
      {/* Coupon code form */}
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="inline-flex justify-end flex-wrap gap-4"
        >
          {/* Coupon code */}
          <div className="inline-block">
            <input
              {...register("couponCode")}
              placeholder={coupon ? `${coupon.code} applied!` : "Coupon Code"}
              className={`border border-black px-6 py-4 text-border-2 placeholder:text-border-2 focus:outline-none rounded ${
                coupon ? "opacity-50" : ""
              }`}
              disabled={!!coupon}
            />
            {errors.couponCode && (
              <p className="form-validation-error ">
                {errors.couponCode.message}
              </p>
            )}
          </div>

          {/* Apply button */}
          <div className="inline-block">
            <button
              disabled={!!coupon || isSubmitting}
              type="submit"
              className="button-primary px-8 "
            >
              {isSubmitting ? "Applying coupon" : "Apply coupon"}
            </button>
          </div>
        </form>

        {coupon && (
          <div className="flex gap-3 items-center mt-3 sm:justify-start justify-end">
            <p className="text-sm">Remove coupon?</p>
            <button
              className="text-red-500"
              onClick={() => dispatch(removeCoupon())}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Cart Total */}
      <div className="py-8 px-6 border-[1.5px] border-black rounded max-w-[470px] w-full">
        <h6 className="font-medium mb-6">Cart Total</h6>

        <div className="mb-4">
          {/* Sub Total */}
          <div className="flex justify-between border-b border-text-4 pb-4 mb-4">
            <span>Subtotal:</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>

          {/* Discount */}
          {discount > 0 && (
            <div className="flex justify-between border-b border-text-4 pb-4 mb-4 text-red-500">
              <span>Discount:</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
          )}

          {/* Total after discount */}
          {discount > 0 && (
            <div className="flex justify-between border-b border-text-4 pb-4 mb-4">
              <span>Total after discount:</span>
              <span>${totalAfterDiscount.toFixed(2)}</span>
            </div>
          )}

          {/* Shipping */}
          <div className="border-b border-text-4 pb-4 mb-4">
            <div className="flex justify-between mb-1">
              <span>Shipping:</span>
              <p>
                {shipping === 0 ? (
                  <span className="text-red-600">Free</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </p>
            </div>

            {shipping === 10 && (
              <p className="text-xs text-end">
                (Shipping is free if you order more than $250)
              </p>
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleCheckout}
            className="button-primary inline-block"
          >
            Process to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
