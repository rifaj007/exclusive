import { AboutSlider, AboutStats, Services } from "@/components";
import Link from "next/link";

export const metadata = {
  title: "About Us | Exclusive - Best Online Shopping",
  description:
    "Exclusive is a one stop shopping platform for all your needs. Browse our collections, shop our products, and get the best deals.",
};

const AboutPage = () => {
  return (
    <div className="pt-8 lg:pt-12 xl:pt-20 pb-20 lg:pb-[100px] xl:pb-[140px]">
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

      {/* About Details */}
      <section className="relative h-[470px] flex items-center mb-20 xl:mb-[140px]">
        {/* About description */}
        <div className="container">
          <div className="md:w-[525px] mx-auto xl:mx-0">
            <h3 className="font-inter text-4xl md:text-[54px] leading-[64px] font-semibold mb-8">
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
        <div className="absolute top-0 right-0 2xl:right-[12%] hidden xl:block">
          <img
            src="/images/about/about-img.jpeg"
            className="w-[705px]"
            alt="about-img"
          />
        </div>
      </section>

      <div className="container">
        {/* About Stats */}
        <AboutStats />

        {/* About Slider */}
        <AboutSlider />

        {/* Services */}
        <Services />
      </div>
    </div>
  );
};

export default AboutPage;
