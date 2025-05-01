"use client";
import { useState } from "react";
import { Grid, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import SliderNavButton from "../elements/SliderNavButton";
import ProductCard from "../product/ProductCard";
import 'swiper/css/grid';
import { IProduct } from "@/libs/database/models/product.model";

const ExploreProductSlider = ({ products }: { products: IProduct[] }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <div className="relative mt-[60px] mb-[60px]">
      <Swiper
        autoplay={{
          delay: 1200,
          pauseOnMouseEnter: true,
        }}
        grid={{
          rows: 2,
          fill: "row",
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
        modules={[Grid, Autoplay, Keyboard]}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Explore products slider navigation button */}
      <SliderNavButton swiper={swiperInstance} />
    </div>
  );
};

export default ExploreProductSlider;
