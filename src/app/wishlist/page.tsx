"use client";
import { Loading, WishlistProductCard } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import useHasMounted from "@/hooks/useHasMounted";
import { clearWishlist } from "@/store/features/WishlistState/WishlistSlice";
import Link from "next/link";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const hasMounted = useHasMounted();
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useAppDispatch();

  // handle all product to cart
  const handleClearWishlist = () => {
    dispatch(clearWishlist());

    toast.success("Cleared Wishlist!");
  };

  if (!hasMounted) return <Loading />;

  return (
    <section className="pt-8 lg:pt-12 xl:pt-20 pb-20 lg:pb-[100px] xl:pb-[140px]">
      <div className="container">
        {wishlistItems.length > 0 ? (
          <div>
            {/* Wishlist heading */}
            <div className="flex-between mb-14">
              <span>Wishlist ({wishlistItems.length})</span>

              {/* move all product to cart */}
              <button
                onClick={handleClearWishlist}
                className="button-secondary"
              >
                Clear Wishlist
              </button>
            </div>

            {/* Wishlist table */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {wishlistItems.map((product) => (
                <WishlistProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          /* if cart is empty  */
          <div className="sm:w-[400px] mx-auto pt-12 xl:pt-20 ">
            <div className="text-center">
              <h6 className="mb-4">Your Wishlist Is Currently Empty!</h6>

              <p className="mb-6">
                You don‘t have any items to your wishlist, to continue shopping,
                please! click the below Return To Shop button and add items to
                your wishlist.
              </p>

              <Link className="button-primary inline-block" href="/collections">
                Return to Shop page
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
