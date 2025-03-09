import { ProductCardProps } from "@/types";
import Image from "next/image";
import StarRating from "./StarRating";
import Link from "next/link";
import { HeartIcon, ViewIcon } from "@/icons";

const ProductCard = ({ data }: ProductCardProps) => {
  const { _id, imageUrl, name, price, original_price, rating, reviews, discount } = data;
  return (
    <div>
      {/*  */}
      <div className="bg-secondary-2 h-[250px] rounded mb-4 relative group z-20">
        <Image
          src={imageUrl}
          alt={name}
          width={600}
          height={500}
          className="object-contain h-full group-hover:scale-100 scale-90 transition-transform duration-300 ease-in-out"
        />

        {/* wishlist and view button */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="bg-white rounded-full p-[5px]">
            <HeartIcon className="w-7 h-7" />
          </button>
          <Link
            href={`/products/${_id}`}
            className="bg-white rounded-full p-[5px] inline-block"
          >
            <ViewIcon />
          </Link>
        </div>

        {/* add to cart button */}
        <button className="bg-black text-white py-2 w-full rounded-b absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          Add To Cart
        </button>

        {/* discount */}
        {
          discount && (
            <div className="absolute top-3 left-3 bg-secondary-3 px-3 rounded"><span className="text-[12px] text-text-1">{discount}</span></div>
          )
        }
      </div>

      <div className="">
        <span className="font-medium mb-3">{name}</span>

        <div className="font-medium space-x-3 mb-2">
          <span className="text-secondary-3">${price}</span>
          <span className="text-border-2 line-through">${original_price}</span>
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

export default ProductCard;
