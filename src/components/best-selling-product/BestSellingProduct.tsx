import { getBestSellingProducts } from "@/libs/actions/product";
import SectionTitle from "../pages-component/SectionTitle";
import ProductCard from "../product/ProductCard";
import Link from "next/link";
import { IProduct } from "@/libs/database/models/product.model";

const BestSellingProduct = async () => {
  const bestSellingProductsData = await getBestSellingProducts();

  return (
    <section className="mb-[70px] md:mb-[100px] lg:mb-[140px]">
      <div className="flex justify-between items-end">
        <SectionTitle subTitle="This Month" title="Best Selling Products" />

        <Link
          href={`/products/best-selling`}
          className="button-primary hidden sm:block"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] mt-[60px] sm:mb-0 mb-[40px]">
        {bestSellingProductsData.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href={`/products/best-selling`}
          className="button-primary sm:hidden"
        >
          View All
        </Link>
      </div>
    </section>
  );
};

export default BestSellingProduct;
