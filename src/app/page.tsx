import { FlashSales, Hero, ScrollProgressButton, Services } from "@/components";

export default function Home() {
  return (
    <>
      <div className="container pb-[140px]">
        <Hero />
        <FlashSales />
        <Services />
      </div>

      <ScrollProgressButton />
    </>
  );
}
