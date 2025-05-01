import Link from "next/link";
import SectionTitle from "../pages-component/SectionTitle";
import FlashSaleCountdownTimer from "./FlashSaleCountdownTimer";
import FlashSaleSlider from "./FlashSaleSlider";
import { getFlashSaleProducts } from "@/libs/actions/product";

const FlashSales = async () => {
  const flashSalesProducts = await getFlashSaleProducts();

  return (
    <section className="mb-20 pb-[60px] border-b border-border-1">
      {/* Section title and flash sales timer */}
      <div className="inline-flex flex-col md:flex-row md:items-end gap-5 md:gap-10 lg:gap-20 mb-[60px]">
        <SectionTitle subTitle="Today's" title="Flash Sales" />

        {/* Flash sale countdown */}
        <FlashSaleCountdownTimer />
      </div>

      {/* Flash sales Product card slider */}
        <FlashSaleSlider products={flashSalesProducts} />


      <div className="flex justify-center">
        <Link href="/collections?flash-sale=true" className="button-primary">
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default FlashSales;
