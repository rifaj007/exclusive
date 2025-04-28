"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons";
import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery = ({ images }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailClick = (img: string, index: number) => {
    setSelectedImage(img);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse md:items-start items-center justify-end gap-6 relative">
      {/* Thumbnails */}
      <div className="flex lg:flex-col flex-row gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(img, index)}
            className={`cursor-pointer border ${
              selectedImage === img ? "border-primary" : "border-gray-300"
            } rounded-lg overflow-hidden`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index}`}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main Image with Zoom and Transition */}
      <div className="lg:flex-1 relative group overflow-hidden">
        <div className="w-full aspect-square relative rounded-lg bg-gray-100">
          <Image
            src={selectedImage}
            alt="Selected Product Image"
            className="object-contain transition-all duration-500 ease-in-out opacity-0 group-hover:scale-105 group-hover:opacity-100 w-[400px] h-[500px] xl:w-[500px] xl:h-[600px]"
            onLoadingComplete={(img) => img.classList.remove("opacity-0")}
            width={500}
            height={600}
          />
        </div>

        {/* Mobile arrows */}
        <div className="sm:hidden absolute top-1/2 -translate-y-1/2 left-2 flex items-center justify-center">
          <button
            onClick={goToPrevious}
            className="bg-white rounded-full p-2 shadow-md"
          >
            <ArrowLeftIcon />
          </button>
        </div>
        <div className="sm:hidden absolute top-1/2 -translate-y-1/2 right-2 flex items-center justify-center">
          <button
            onClick={goToNext}
            className="bg-white rounded-full p-2 shadow-md"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
