import { Filters } from "@/components";
import Link from "next/link";

const CollectionsPage = () => {
  return (
    <section className="pt-8 lg:pt-12 xl:pt-20 pb-20 lg:pb-[100px] xl:pb-[140px]">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs mb-12 xl:mb-20">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">Collections</span>
        </nav>

        <div className="flex">
          {/* Filters */}
          <Filters/>

          {/* All products */}
          <div className="flex-1">

          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsPage;
