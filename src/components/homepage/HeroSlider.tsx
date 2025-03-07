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
    <div className="lg:pt-10 lg:pl-11 pt-2 pl-0 mx-auto lg:mx-0 hidden md:block">
      <Swiper
        slidesPerView={1}
        grabCursor={true}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{
          el: ".hero-swiper-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="swiper-bullet ${className}"></span>`;
          },
        }}
        modules={[Autoplay, Pagination]}
        className="hero-swiper w-[670px] xl:w-[890px]"
      >
        {heroSliderData.map(({ _id, title, image, description, ctaLink }) => (
          <SwiperSlide key={_id} className="!h-[345px]">
            <div className="flex-between bg-black h-full">
              <div className="pl-10 lg:pl-16">
                <span className="text-text-1 mb-3">{title}</span>
                <h3 className="text-text-1 font-inter text-[35px] md:text-5xl leading-10 md:leading-[60px] mb-2">
                  {description}
                </h3>

                <Link
                  href={ctaLink}
                  className="text-text-1 underline flex items-center gap-2 font-medium"
                >
                  Shop now <ArrowRightIcon className="text-text-1" />
                </Link>
              </div>

              <div className="xl:w-1/2">
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
      <div className="flex-center -mt-8 h-4">
        <div className="hero-swiper-pagination flex-center z-30"></div>
      </div>
    </div>
  );
};

export default HeroSlider;
