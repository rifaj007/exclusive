"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import useHasMounted from "@/hooks/useHasMounted";
import { couponCodeSchema } from "@/libs/validator";
import { addCoupon, removeCoupon } from "@/store/features/CartState/CartSlice";
import { calculateCartSummary } from "@/utils/cart-calculation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const CartSummary = () => {
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
  const { subTotal, shipping, discount, total } = calculateCartSummary(
    cartItems,
    coupon
  );

  // handling coupon code apply
  async function onSubmit(values: z.infer<typeof couponCodeSchema>) {
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
  }

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

          {/* Shipping */}
          <div className="border-b border-text-4 pb-4 mb-4">
            <div className="flex justify-between mb-1">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>

            <p className="text-xs text-end">
              (Shipping is free if you order more than $250)
            </p>
          </div>

          {/* Total */}
          <div className="flex justify-between">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Link className="button-primary inline-block" href="/checkout">
            Process to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
