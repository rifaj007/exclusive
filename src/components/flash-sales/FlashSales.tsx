import Link from "next/link";
import SectionTitle from "../pages-component/SectionTitle";
import FlashSaleCountdownTimer from "./FlashSaleCountdownTimer";
import FlashSaleSlider from "./FlashSaleSlider";

const FlashSales = () => {
  return (
    <section className="mb-20 pb-[60px] border-b border-border-1">
      {/* Section title and flash sales timer */}
      <div className="inline-flex flex-col md:flex-row md:items-end gap-5 md:gap-10 lg:gap-20 mb-[60px]">
        <SectionTitle subTitle="Today's" title="Flash Sales" />

        {/* Flash sale countdown */}
        <FlashSaleCountdownTimer />
      </div>

      {/* Flash sales Product card slider */}
      <FlashSaleSlider />

      <div className="flex justify-center">
        <Link href={`/products/category`} className="button">
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default FlashSales;
