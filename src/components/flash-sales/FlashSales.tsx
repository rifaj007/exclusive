import { productsData } from "@/constants";
import SectionTitle from "../pages-component/SectionTitle";
import ProductCard from "../product/ProductCard";
import CountdownTimer from "./CountdownTimer";

const FlashSales = () => {
  const flashSaleEndTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // Ends in 3 days
  return (
    <section className="mb-20">
      {/* Section title and flash sales timer */}
      <div className="flex items-end gap-20 mb-10">
        <SectionTitle subTitle="Today's" title="Flash Sales" />

        <CountdownTimer endsAt={flashSaleEndTime} />
      </div>

      {/* Flash sales Product card slider */}
      <div className="grid grid-cols-4 gap-7">
        {productsData.map((data) => (
          <ProductCard key={data._id} data={data} />
        ))}
      </div>
    </section>
  );
};

export default FlashSales;
