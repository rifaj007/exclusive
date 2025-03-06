"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { heroSliderData } from "@/constants";
import Link from "next/link";
import { ArrowRightIcon } from "@/icons";

const HeroSlider = () => {
  return (
    <div className="pt-10 pl-11">
      <Swiper
        slidesPerView={1}
        /* autoplay={{
          delay: 2500,
        }} */
        loop={true}
        pagination={{
          el: ".about-swiper-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="about-swiper-bullet ${className}"></span>`;
          },
        }}
        modules={[Autoplay, Pagination]}
        className="about-swiper w-[890px]"
      >
        {heroSliderData.map(({ _id, title, image, description, ctaLink }) => (
          <SwiperSlide key={_id} className="!h-[345px]">
            <div className="flex-between bg-black h-full">
              <div className="pl-16">
                <span className="text-text-1 mb-3">{title}</span>
                <h3 className="text-text-1 font-inter text-5xl leading-[60px] mb-2">
                  {description}
                </h3>

                <Link
                  href={ctaLink}
                  className="text-text-1 underline flex items-center gap-2 font-medium"
                >
                  Shop now <ArrowRightIcon className="text-text-1" />
                </Link>
              </div>

              <div className="w-1/2">
                <img
                  className="h-full w-full object-contain"
                  src={image}
                  alt={title}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* slider pagination */}
      <div className="flex-center mt-1 h-4">
        <div className="about-swiper-pagination z-10 flex-center"></div>
      </div>
    </div>
  );
};

export default HeroSlider;
