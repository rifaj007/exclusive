import { Hero, ScrollProgressButton, Services } from "@/components";

export default function Home() {
  return (
    <>
      <div className="container pb-[140px]">
        <Hero/>
        <Services />
      </div>

      <ScrollProgressButton />
    </>
  );
}
