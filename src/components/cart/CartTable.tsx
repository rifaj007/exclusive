"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import useHasMounted from "@/hooks/useHasMounted";
import { CancelWithBgIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import Loading from "../pages-component/Loading";
import {
  changeQuantity,
  clearCart,
  removeProductFromCart,
} from "@/store/features/CartState/CartSlice";
import toast from "react-hot-toast";

const CartTable = () => {
  const hasMounted = useHasMounted();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  // increase quantity
  const handleIncreaseQuantity = (productId: string, quantity: number) => {
    dispatch(
      changeQuantity({ _id: productId, quantity: Number(quantity) + 1 })
    );
  };

  // decrease quantity
  const handleDecreaseQuantity = (productId: string, quantity: number) => {
    dispatch(
      changeQuantity({ _id: productId, quantity: Number(quantity) - 1 })
    );
  };

  // remove from cart
  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeProductFromCart(productId));

    toast.error("Product removed from cart!");
  };

  // clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!hasMounted) return <Loading />;

  return (
    <div >
      {cartItems.length > 0 ? (
        <div className="pt-12 xl:pt-20 px-2 mb-16 sm:mb-20">
          {/* Table header */}
          <div className="hidden shadow-custom bg-white rounded py-4 md:py-6 px-4 md:px-10 sm:flex-between font-medium mb-10 ">
            <span className="w-[200px] md:w-[340px] lg:w-[400px]">Product</span>
            <div className="flex-1">
              <div className="sm:flex-between flex gap-10">
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
              </div>
            </div>
          </div>

          {/* Table body */}
          <div className="flex flex-col gap-10 pb-6">
            {cartItems.map(({ _id, name, imageUrl, price, quantity }) => (
              // Each cart item
              <div
                key={_id}
                className="shadow-custom bg-white rounded flex items-center py-4 md:py-6 px-4 md:px-8 flex-wrap gap-4"
              >
                {/* Product image, title and remove button */}
                <div className="md:flex items-center gap-5 w-[210px] md:w-[340px] lg:w-[400px] relative">
                  <Image src={imageUrl} alt={name} width={60} height={60} />

                  <button
                    className="absolute -left-2 -top-2"
                    onClick={() => handleRemoveFromCart(_id)}
                  >
                    <CancelWithBgIcon />
                  </button>

                  <Link
                    href={`/product/${_id}`}
                    className="hover:underline pr-3 sm:text-base text-sm"
                  >
                    {name}
                  </Link>
                </div>

                <div className="flex-1">
                  <div className="flex-between gap-7">
                    {/* Price */}
                    <div>
                      <span className="block sm:hidden text-sm">Price:</span> $
                      {price}
                    </div>

                    {/* Quantity */}
                    <div className="w-fit">
                      <span className="block sm:hidden text-center mb-2 text-sm">
                        Quantity:{" "}
                      </span>
                      <div className="flex items-center border-border-1">
                        {/* Decrease Quantity Button */}
                        <button
                          className="rounded-l bg-secondary-2 py-1 px-3.5 duration-100 hover:bg-secondary-3 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary-2 disabled:hover:text-black"
                          onClick={() => handleDecreaseQuantity(_id, quantity)}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>

                        {/* Quantity Display */}
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={quantity}
                          readOnly
                        />

                        {/* Increase Quantity Button */}
                        <button
                          className="rounded-r bg-secondary-2 py-1 px-3.5 duration-100 hover:bg-secondary-3 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary-2 disabled:hover:text-black"
                          onClick={() => handleIncreaseQuantity(_id, quantity)}
                          disabled={quantity >= 10}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Sub total */}
                    <div className="text-right">
                      <span className="block sm:hidden text-sm">
                        Sub Total:
                      </span>{" "}
                      ${price * quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-between">
            <Link href="/collections" className="button-secondary inline-block">
              Return To Shop
            </Link>
            <button onClick={handleClearCart} className="button-secondary">
              Clear Cart
            </button>
          </div>
        </div>
      ) : (
        /* if cart is empty  */
        <div className="sm:w-[400px] mx-auto pt-12 xl:pt-20 ">
          <div className="text-center">
            <h6 className="mb-4">Your Cart Is Currently Empty!</h6>

            <p className="mb-6">
              You don‘t have any items to your cart, to continue shopping,
              please! click the below Return To Shop button and add items to
              your cart.
            </p>

            <Link className="button-primary inline-block" href="/collections">
              Return to Shop page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartTable;
