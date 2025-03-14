import Link from "next/link";
import SectionTitle from "../pages-component/SectionTitle";
import ExploreProductSlider from "./ExploreProductSlider";

const ExploreProducts = () => {
  return (
    <section className="mb-[140px]">
      {/* Section Title */}
      <SectionTitle subTitle="Our Products" title="Explore Our Products" />

      {/* Explore our products slider */}
      <ExploreProductSlider />

      <div className="flex justify-center">
        <Link href="/products" className="button">
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default ExploreProducts;
