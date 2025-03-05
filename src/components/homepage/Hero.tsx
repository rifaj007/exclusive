import HeroNav from "./HeroNav";
import HeroSlider from "./HeroSlider";

const Hero = () => {

  return (
    <section className="mb-[140px] flex justify-between">
      <HeroNav/>
      <HeroSlider/>
    </section>
  );
};

export default Hero;
