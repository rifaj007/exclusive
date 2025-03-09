import HeroNav from "./HeroNav";
import HeroSlider from "./HeroSlider";

const Hero = () => {

  return (
    <section className="mb-10 md:mb-[140px] flex justify-between lg:flex-row flex-col">
      <HeroNav/>
      <HeroSlider/>
    </section>
  );
};

export default Hero;
