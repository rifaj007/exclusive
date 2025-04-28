"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import ProductCard from "../product/ProductCard";
import { Autoplay, Keyboard } from "swiper/modules";
import SliderNavButton from "../elements/SliderNavButton";
import { Suspense, useState } from "react";
import { IProduct } from "@/libs/database/models/product.model";

const FlashSaleSlider = ({ products }: { products: IProduct[] }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="relative mb-[60px]">
      <Swiper
        autoplay={{
          delay: 1200,
          pauseOnMouseEnter: true,
        }}
        speed={150}
        onSwiper={setSwiperInstance}
        keyboard={{
          enabled: true,
        }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
        }}
        modules={[Autoplay, Keyboard]}
      >
        {products.map((data) => (
          <SwiperSlide key={data._id}>
            <ProductCard product={data} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* flash sales slider navigation button */}
      <SliderNavButton swiper={swiperInstance} />
      </div>
    </Suspense>
  );
};

export default FlashSaleSlider;
