"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import ProductCard from "../product/ProductCard";
import { flashSalesProductsData } from "@/constants";
import { Autoplay, Keyboard } from "swiper/modules";
import SliderNavButton from "../elements/SliderNavButton";
import { useState } from "react";

const FlashSaleSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
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
        {flashSalesProductsData.map((data) => (
          <SwiperSlide key={data._id}>
            <ProductCard data={data} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* flash sales slider navigation button */}
      <SliderNavButton swiper={swiperInstance} />
    </div>
  );
};

export default FlashSaleSlider;
