import { ArrowLeftIcon, ArrowRightIcon } from "@/icons";
import { Swiper as SwiperType } from "swiper/types";

const SliderNavButton = ({ swiper }: { swiper: SwiperType | null }) => {
  if (!swiper) return null;

  return (
    <div className="absolute -top-[88px] right-0 gap-2 hidden md:flex">
      {/* prev button */}
      <button
        onClick={() => swiper.slidePrev()}
        className="bg-secondary-2 rounded-full p-[11px] shadow-lg"
      >
        <ArrowLeftIcon />
      </button>

      {/* next button */}
      <button
        onClick={() => swiper.slideNext()}
        className="bg-secondary-2 rounded-full p-[11px] shadow-lg"
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default SliderNavButton;
