import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import useHasMounted from "@/hooks/useHasMounted";
import { HeartIcon } from "@/icons";
import { setWishlistFromStorage } from "@/store/features/WishlistState/WishlistSlice";
import Link from "next/link";
import { useEffect } from "react";

const WishlistLink = () => {
  const hasMounted = useHasMounted();
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    const parsedWishlist = storedWishlist
      ? JSON.parse(storedWishlist)
      : { wishlistItems: [] };
    dispatch(setWishlistFromStorage(parsedWishlist));
  }, [dispatch]);

  return (
    <Link href="/wishlist" className="relative">
      {hasMounted && wishlistItems.length > 0 && (
        <p className="absolute -top-1.5 -right-1.5 rounded-full bg-secondary-3 text-white text-xs size-5 flex-center">
          {wishlistItems.length}
        </p>
      )}
      <HeartIcon />
    </Link>
  );
};

export default WishlistLink;
