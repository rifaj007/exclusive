import { ProductCardSkeleton } from "@/components";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const SkeletonGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] mt-[60px] sm:mb-0 mb-[40px]">
    {Array(4)
      .fill(0)
      .map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
  </div>
);

const Loading = () => {
  return (
    <section className="pt-4 lg:pt-8 xl:pt-20 pb-20 lg:pb-[100px] xl:pb-[140px]">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs mb-8 xl:mb-12">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">Collections</span>
        </nav>

        {/* sort by */}
        <div className="text-end mb-6">
          <Skeleton height={35} width={200} containerClassName="flex-1" />
        </div>

        <SkeletonGrid />
      </div>
    </section>
  );
};

export default Loading;
