import {
  BestSellingProduct,
  Categories,
  FlashSaleBanner,
  FlashSales,
  Hero,
  ScrollProgressButton,
  Services,
} from "@/components";

export default function Home() {
  return (
    <>
      <div className="container pb-[100px] md:pb-[140px]">
        <Hero />
        <FlashSales />
        <Categories />
        <BestSellingProduct/>
        <FlashSaleBanner/>
        <Services />
      </div>

      <ScrollProgressButton />
    </>
  );
}
