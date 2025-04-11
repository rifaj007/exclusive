"use client";
import { CartIcon, DeleteIcon, ViewIcon } from "@/icons";
import { ProductCardProps } from "@/types/product";
import Image from "next/image";
import StarRating from "./StarRating";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { removeProductFromWishlist } from "@/store/features/WishlistState/WishlistSlice";
import toast from "react-hot-toast";
import { addProductToCart } from "@/store/features/CartState/CartSlice";

const WishlistProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const {
    _id,
    imageUrl,
    name,
    price,
    original_price,
    rating,
    reviews,
    discount,
  } = data;

  const handleAddToCart = () => {
    dispatch(
      addProductToCart({
        product: { ...data },
        quantity: 1,
        selectedSize: "S",
        color: 0,
      })
    );

    dispatch(removeProductFromWishlist(_id));

    toast.success("Product added to cart!");
  };

  // remove from wishlist
  const handleRemoveFromWishlist = () => {
    dispatch(removeProductFromWishlist(_id));
    toast.error("Product removed from wishlist!");
  };

  return (
    <div>
      <div className="bg-secondary-2 h-[200px] sm:h-[250px] rounded relative group z-20">
        <Image
          src={imageUrl}
          alt={name}
          width={600}
          height={500}
          className="object-contain h-full group-hover:scale-100 scale-90 transition duration-300 ease-in-out"
        />

        {/* wishlist and view button */}
        <div className="absolute top-1 sm:top-3 right-1 sm:right-3 flex flex-col gap-2">
          <button
            onClick={handleRemoveFromWishlist}
            className="bg-white hover:bg-secondary-3 transition duration-200 rounded-full p-[5px]"
          >
            <DeleteIcon className="hover:text-white" />
          </button>

          <Link
            href={`/products/${_id}`}
            className="bg-white hover:bg-secondary-3 transition duration-200 rounded-full p-[5px] inline-block"
          >
            <ViewIcon className="hover:text-white" />
          </Link>
        </div>

        {/* discount */}
        {discount && (
          <div className="absolute top-3 left-3 bg-secondary-3 px-3 rounded">
            <span className="text-[12px] text-text-1">{discount}</span>
          </div>
        )}
      </div>

      {/* add to cart button */}
      <button
        onClick={handleAddToCart}
        className="bg-black text-white py-2 w-full rounded-b mb-4 flex-center gap-2 sm:text-base text-sm"
      >
        <CartIcon className="sm:w-8 sm:h-8 h-6 w-6" /> Add To Cart
      </button>

      <div>
        <span className="font-medium mb-3 text-[14px] sm:text-base">
          {name}
        </span>

        <div className="font-medium space-x-3 sm:mb-2 text-[14px] sm:text-base">
          <span className="text-secondary-3">${price}</span>
          {original_price && (
            <span className="text-border-2 line-through">
              ${original_price}
            </span>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <StarRating rating={rating} />
          <span className="font-semibold text-[14px] text-border-2">
            ({reviews})
          </span>
        </div>
      </div>
    </div>
  );
};

export default WishlistProductCard;
