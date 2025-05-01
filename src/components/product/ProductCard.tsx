"use client";
import { ProductParams } from "@/types/product";
import Image from "next/image";
import StarRating from "./StarRating";
import Link from "next/link";
import { HeartIcon, ViewIcon } from "@/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/store/features/WishlistState/WishlistSlice";

const ProductCard = ({ product }: ProductParams) => {
  const [isExistingToWishlist, setIsExistingToWishlist] = useState(false);
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlistItems);

  const {
    _id,
    image,
    name,
    offerPrice,
    originalPrice,
    rating,
    reviews,
    discount,
    isNew,
  } = product;

  // checking product is existing in wishlist or not
  useEffect(() => {
    const isExisting = wishlistItems.some((item) => item._id === _id);
    setIsExistingToWishlist(isExisting);
  }, [wishlistItems, _id]);

  // add to wishlist
  const handleAddToWishlist = () => {
    dispatch(addProductToWishlist(product));
    toast.success("Product added to wishlist!");
  };

  // remove from wishlist
  const handleRemoveFromWishlist = () => {
    dispatch(removeProductFromWishlist(_id));
    toast.error("Product removed from wishlist!");
  };

  return (
    <div>
      <div className="border-2 border-secondary-2 h-[200px] sm:h-[250px] rounded mb-4 relative group z-20 shadow-custom">
        {/* product image */}
        <Image
          src={image[0]}
          alt={name}
          width={600}
          height={500}
          className="object-contain h-full group-hover:scale-100 scale-90 transition duration-300 ease-in-out"
        />

        <div className="absolute top-1 sm:top-3 right-1 sm:right-3 flex flex-col gap-2">
          {/* wishlist button */}
          {isExistingToWishlist ? (
            <button
              onClick={handleRemoveFromWishlist}
              className="bg-secondary-3 rounded-full p-[5px]"
            >
              <HeartIcon className="w-7 h-7 text-white" />
            </button>
          ) : (
            <button
              onClick={handleAddToWishlist}
              className="bg-white hover:bg-secondary-3 transition duration-200 rounded-full p-[5px]"
            >
              <HeartIcon className="w-7 h-7 hover:text-white" />
            </button>
          )}
          {/* view details link */}
          <Link
            href={`/collections/${_id}`}
            className="bg-white hover:bg-secondary-3 transition duration-200 rounded-full p-[5px] inline-block"
          >
            <ViewIcon className="hover:text-white" />
          </Link>
        </div>

        {/* discount */}
        {discount && (
          <div className="absolute top-3 left-3 bg-secondary-3 px-3 rounded">
            <span className="text-[12px] text-text-1">-{discount}%</span>
          </div>
        )}

        {/* new tag */}
        {isNew && (
          <div className="absolute top-3 left-3 bg-secondary-4 px-3 rounded">
            <span className="text-[12px] text-text-1">New</span>
          </div>
        )}
      </div>

      <div>
        {/* product name */}
        <span className="font-medium mb-3 text-[14px] sm:text-base">
          {name}
        </span>

        {/* price */}
        <div className="font-medium space-x-3 sm:mb-2 text-[14px] sm:text-base">
          <span className="text-secondary-3">${offerPrice}</span>
          {originalPrice && (
            <span className="text-border-2 line-through">${originalPrice}</span>
          )}
        </div>

        {/* rating and reviews */}
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

export default ProductCard;
