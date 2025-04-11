import Link from "next/link";
import FlashSaleBannerCountdownTimer from "./FlashSaleBannerCountdownTimer";
import Image from "next/image";

const FlashSaleBanner = () => {
  return (
    <section className="bg-black flex flex-col lg:flex-row items-center pr-0 sm:pr-[40px] xl:pr-[60px] pl-5 sm:pl-10 xl:pl-[60px] mb-[70px] lg:pt-0 sm:pt-10 pt-6 sm:pb-0 pb-8">
      {/* Banner content */}
      <div>
        <p className="text-secondary-4 md:mb-8 mb-4">Categories</p>
        <h2 className="text-text-1 text-4xl md:text-5xl mb-8">
          Enhance Your Music Experience
        </h2>

        {/* Flash sale countdown banner */}
        <FlashSaleBannerCountdownTimer />

        <Link href={`/product/electronics`} className="button-primary bg-secondary-4">Buy Now!</Link>
      </div>

      {/* Banner image */}
      <div className="max-w-[500px] lg:max-w-[600px] max-h-[300px] lg:max-h-[500px] relative hidden sm:block">
        <Image
          className="h-full sm:-mt-20 md:-mt-28 lg:-mt-10 xl:ml-0 lg:ml-10 relative z-10"
          src="/images/category/banner.png"
          alt="banner"
          width={900}
          height={600}
        />
        <div className="bg-[#D9D9D9] opacity-30 blur-[100px] rounded-full absolute top-0 bottom-0 right-0 h-[450px] xl:h-[500px] w-[450px] xl:w-[500px]" />
      </div>
    </section>
  );
};

export default FlashSaleBanner;
