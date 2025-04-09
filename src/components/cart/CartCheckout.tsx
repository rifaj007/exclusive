"use client";
import { useAppSelector } from "@/hooks/redux-hooks";
import useHasMounted from "@/hooks/useHasMounted";
import { couponCodeSchema } from "@/libs/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const CartCheckout = () => {
  const hasMounted = useHasMounted();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof couponCodeSchema>>({
    resolver: zodResolver(couponCodeSchema),
  });

  async function onSubmit(values: z.infer<typeof couponCodeSchema>) {
    try {
      console.log(values);
    } catch {
      toast.error("Something went wrong!. Please try again.");
    }
  }

  if (!hasMounted) return null;

  return (
    <div className="flex lg:flex-row flex-col lg:items-start items-end lg:justify-between gap-6">
      {/* Coupon code form */}
      <form onSubmit={handleSubmit(onSubmit)} className="inline-flex justify-end flex-wrap gap-4">
        {/* Coupon code */}
        <div className="inline-block">
          <input
            {...register("couponCode")}
            placeholder="Coupon Code"
            className="border border-black px-6 py-4 text-border-2 placeholder:text-border-2 focus:outline-none rounded"
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
            disabled={isSubmitting}
            type="submit"
            className="button-primary px-8 "
          >
            {isSubmitting ? "Applying coupon" : "Apply coupon"}
          </button>
        </div>
      </form>

      {/* Cart Total */}
      <div className="py-8 px-6 border-[1.5px] border-black rounded max-w-[470px] w-full">
        <h6 className="font-medium mb-6">Cart Total</h6>

        <div className="mb-4">
          {/* Sub Total */}
          <div className="flex justify-between border-b border-text-4 pb-4 mb-4">
            <span>Subtotal:</span>
            <span>$1750</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between border-b border-text-4 pb-4 mb-4">
            <span>Shipping:</span>
            <span>Free</span>
          </div>

          {/* Total */}
          <div className="flex justify-between">
            <span>Total:</span>
            <span>$1750</span>
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

export default CartCheckout;
