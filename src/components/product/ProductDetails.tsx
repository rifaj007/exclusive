"use client";
import { ProductParams } from "@/types/product";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import { HeartIcon } from "@/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import toast from "react-hot-toast";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/store/features/CartState/CartSlice";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/store/features/WishlistState/WishlistSlice";

const ProductDetails = ({ product }: ProductParams) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isExistingToCart, setIsExistingToCart] = useState(false);
  const [isExistingToWishlist, setIsExistingToWishlist] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlistItems);

  const {
    _id,
    name,
    rating,
    reviews,
    availability,
    offerPrice,
    originalPrice,
    description,
    size,
    colors,
  } = product;

  // checking product is existing in cart or not
  useEffect(() => {
    const isExisting = cartItems.some((item) => item._id === _id);
    setIsExistingToCart(isExisting);
  }, [cartItems, _id]);

  // checking product is existing in wishlist or not
  useEffect(() => {
    const isExisting = wishlistItems.some((item) => item._id === _id);
    setIsExistingToWishlist(isExisting);
  }, [wishlistItems, _id]);

  // set quantity if product is already in cart
  useEffect(() => {
    const existingItem = cartItems.find((item) => item._id === _id);
    if (existingItem) {
      setQuantity(existingItem.quantity);
      setSelectedColor(existingItem.color);
      setSelectedSize(existingItem.selectedSize);
    }
  }, [cartItems, _id]);

  // add to cart
  const handleAddToCart = () => {
    // check if color and size are selected
    if (
      (colors?.length ?? 0) > 0 &&
      !selectedColor &&
      (size?.length ?? 0) > 0 &&
      !selectedSize
    ) {
      toast.error("Please select a color and a size");
      return;
    }

    if ((colors?.length ?? 0) > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    if ((size?.length ?? 0) > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    dispatch(
      addProductToCart({
        product,
        quantity,
        selectedSize,
        color: selectedColor,
      })
    );

    toast.success("Product added to cart!");
  };

  // remove from cart
  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart(_id));
    setQuantity(1);
    setSelectedColor("");
    setSelectedSize("");

    toast.error("Product removed from cart!");
  };

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
    <div className="flex-1">
      {/* name */}
      <h5 className="font-inter mb-3">{name}</h5>

      <div className="flex items-center gap-4 text-border-2 mb-3">
        {/* rating and reviews */}
        <div className="flex gap-2 items-center">
          <StarRating rating={rating} />
          <span className="text-[14px] text-border-2">({reviews} Reviews)</span>
        </div>
        <span>|</span>
        {/* availability */}
        <span
          className={`${
            availability === "In Stock" ? "text-secondary-4" : "text-red-600"
          }`}
        >
          {availability}
        </span>
      </div>

      {/* price */}
      <div className="flex gap-3 font-inter mb-6">
        <h5 className="font-normal">${offerPrice}</h5>
        <h6 className="text-border-2 line-through font-normal">
          ${originalPrice}
        </h6>
      </div>

      {/* description */}
      <p className="text-sm border-b border-border-2 pb-6 mb-6">
        {description}
      </p>

      {/* colors */}
      {(colors ?? []).length > 0 && (
        <div className="flex gap-3 items-center mb-6">
          <h6 className="font-inter">Colors:</h6>
          <div className="flex gap-1">
            {(colors ?? []).map((color, index) => (
              <div
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 flex-center rounded-full cursor-pointer ${
                  selectedColor === color ? "border-[3px] border-black" : ""
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: color,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* size */}
      {(size ?? []).length > 0 && (
        <div className="flex gap-3 items-center mb-6">
          <h6 className="font-inter">Size:</h6>
          <div className="flex gap-2">
            {(size ?? []).map((s, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(s)}
                className={`w-8 h-8 flex-center rounded-md border border-border-2 ${
                  selectedSize === s ? "bg-secondary-3 text-white border-0" : ""
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 items-center">
        {/* quantity */}
        <div className="flex items-center">
          {/* Decrease Quantity Button */}
          <button
            className="rounded-l border border-r-0 border-border-2 h-11 w-10 duration-100 hover:bg-secondary-3 hover:text-white hover:border-secondary-3 disabled:hover:border-border-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary-2 disabled:hover:text-black"
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>

          {/* Quantity Display */}
          <input
            className="border border-border-2 w-11 lg:w-20 h-11 bg-white text-center text-xs outline-none"
            type="number"
            value={quantity}
            readOnly
          />

          {/* Increase Quantity Button */}
          <button
            className="rounded-r border border-l-0 border-border-2 h-11 w-10 duration-100 hover:bg-secondary-3 hover:text-white hover:border-secondary-3 disabled:hover:border-border-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary-2 disabled:hover:text-black"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>

        {/* add to cart button */}
        {isExistingToCart ? (
          <button
            onClick={handleRemoveFromCart}
            className="button-secondary text-red-500 text-sm px-4 font-normal"
          >
            Remove From Cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="button-primary text-sm font-normal px-5"
          >
            Add To Cart
          </button>
        )}

        {/* add to wishlist button */}
        {isExistingToWishlist ? (
          <button
            onClick={handleRemoveFromWishlist}
            className="button-secondary p-1 bg-secondary-3 border-secondary-3"
          >
            <HeartIcon className="text-white w-8 h-8" />
          </button>
        ) : (
          <button
            onClick={handleAddToWishlist}
            className="button-secondary p-1 hover:bg-secondary-3 transition duration-200 hover:border-secondary-3"
          >
            <HeartIcon className="hover:text-white w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
