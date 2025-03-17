import {
  BestSellingProduct,
  Categories,
  ExploreProducts,
  FlashSaleBanner,
  FlashSales,
  Hero,
  NewArrival,
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
        <BestSellingProduct />
        <FlashSaleBanner />
        <ExploreProducts />
        <NewArrival />
        <Services />
      </div>

      <ScrollProgressButton />
    </>
  );
}
