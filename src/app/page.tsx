import {
  Categories,
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
        <Services />
      </div>

      <ScrollProgressButton />
    </>
  );
}
