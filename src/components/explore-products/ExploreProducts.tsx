import Link from "next/link";
import SectionTitle from "../pages-component/SectionTitle";
import ExploreProductSlider from "./ExploreProductSlider";
import { getExploreProducts } from "@/libs/actions/product";

const ExploreProducts = async () => {
  const exploreProductsData = await getExploreProducts();
  return (
    <section className="lg:mb-[140px] mb-[100px]">
      {/* Section Title */}
      <SectionTitle subTitle="Our Products" title="Explore Our Products" />

      {/* Explore our products slider */}
      <ExploreProductSlider products={exploreProductsData} />

      <div className="flex justify-center">
        <Link href="/collections" className="button-primary">
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default ExploreProducts;
