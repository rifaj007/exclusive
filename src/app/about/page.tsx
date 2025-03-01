import { AboutStats } from "@/components";
import Link from "next/link";

const About = () => {
  return (
    <section className="pt-8 lg:pt-12 xl:pt-20 pb-20 lg:pb-[100px] xl:pb-[140px]">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs mb-12 xl:mb-20">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">About</span>
        </nav>
      </div>

      <div className="relative h-[470px] flex items-center mb-[140px]">
        {/* About description */}
        <div className="container">
          <div className="w-[525px]">
            <h3 className="font-inter text-[54px] leading-[64px] font-semibold mb-8">
              Our Story
            </h3>

            <p className="mb-6">
              Launched in 2015, Exclusive is South Asia’s premier online
              shopping marketplace with an active presence in Bangladesh.
              Supported by wide range of tailored marketing, data and service
              solutions, Exclusive has 10,500 sellers and 300 brands and serves
              3 millions customers across the region.
            </p>

            <p>
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
        </div>

        {/* About image */}
        <div className="absolute top-0 right-0">
          <img
            src="/images/about/about-img.jpeg"
            className="w-[705px]"
            alt="about-img"
          />
        </div>
      </div>

      <div className="container">
        {/* Insights */}
        <AboutStats />
      </div>
    </section>
  );
};

export default About;
