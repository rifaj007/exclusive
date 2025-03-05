"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { heroSliderData } from "@/constants";

const HeroSlider = () => {
  return (
    <div className="flex-1 pt-10 pl-11 !h-[345px]">
      <div className="w-full h-full">
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
          className="about-swiper"
        >
          {heroSliderData.map(({ _id, title, image, description }) => (
            <SwiperSlide key={_id}>
              <div className="flex justify-between bg-black">
                <div className="text-white">
                  <h6 className="text-white">{title}</h6>
                  <p>{description}</p>
                </div>

                <div className="w-1/2">
                  <img src={image} alt={title} />
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
    </div>
  );
};

export default HeroSlider;
