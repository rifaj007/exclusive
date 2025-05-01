"use client";
import { categoriesSliderData } from "@/constants";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import SliderNavButton from "../elements/SliderNavButton";
import { Autoplay, Keyboard } from "swiper/modules";

const CategorySlider = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <div className="relative mt-[60px]">
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
          320: { slidesPerView: 2, spaceBetween: 15 },
          425: { slidesPerView: 3, spaceBetween: 15 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 30 },
          1280: { slidesPerView: 6, spaceBetween: 30 },
        }}
        modules={[Autoplay, Keyboard]}
      >
        {categoriesSliderData.map(({ _id, icon: Icon, name, link }) => (
          <SwiperSlide
            key={_id}
            className="border border-border-1 rounded transition-all duration-300 hover:bg-secondary-3 hover:border-secondary-3 group"
          >
            <Link
              href={link}
              className="py-6 flex flex-col items-center gap-2 "
            >
              <Icon className="group-hover:text-text-1" />
              <span className="group-hover:text-text-1 text-[14px] sm:text-base transition-all duration-200">
                {name}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* category navigation button */}
      <SliderNavButton swiper={swiperInstance} />
    </div>
  );
};

export default CategorySlider;
