"use client";
import { aboutSliderData } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { InstagramIcon, LinkedinIcon, TwitterXIcon } from "@/icons";
import Link from "next/link";

const socialIcons = {
  twitter: TwitterXIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
};

const AboutSlider = () => {
  return (
    <section className="about-slider pb-[140px]">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{
          el: ".about-swiper-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="swiper-bullet ${className}"></span>`;
          },
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2, spaceBetween: "20px" },
          1024: { slidesPerView: 3, spaceBetween: "30px" },
        }}
        modules={[Autoplay, Pagination]}
        className="about-swiper"
      >
        {aboutSliderData.map(({ _id, image, name, position, socialLinks }) => (
          <SwiperSlide key={_id} className="mb-8 md:text-left text-center">
            <div className="bg-[#F5F5F5] h-[350px] xl:h-[430px] flex justify-center pt-8 mb-8">
              <img src={image} alt={name} className="h-full" />
            </div>
            <h4 className="text-2xl xl:text-[32px] font-medium font-inter">{name}</h4>
            <p className="mb-2">{position}</p>

            <ul className="flex gap-4 items-center md:justify-start justify-center">
              {Object.entries(socialLinks).map(([index, link]) => {
                const Icon =
                  socialIcons[index.toLowerCase() as keyof typeof socialIcons];
                return Icon ? (
                  <li key={index}>
                    <Link href={link} target="_blank" rel="noopener noreferrer">
                      <Icon />
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </SwiperSlide>
        ))}
      </Swiper>

{/* slider pagination */}
      <div className="flex-center mt-1 h-4">
        <div className="about-swiper-pagination z-10 flex-center"></div>
      </div>
    </section>
  );
};

export default AboutSlider;
