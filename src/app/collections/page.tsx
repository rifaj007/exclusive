import { Pagination, ProductCard, SortDropdown } from "@/components";
import { getAllProducts } from "@/libs/actions/product";
import { IProduct } from "@/libs/database/models/product.model";
import { SearchParams } from "@/types";
import Link from "next/link";

export const metadata = {
  title: "Collections | Exclusive - Best Online Shopping",
};

const CollectionsPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const category = (searchParams?.category as string) || "";
  const type = (searchParams?.type as string) || "";
  const query = (searchParams?.query as string) || "";
  const page = Number(searchParams?.page) || 1;
  const sort = (searchParams?.sort as string) || "default";

  const flashSale = searchParams["flash-sale"] === "true";
  const bestSelling = searchParams["best-selling"] === "true";
  const explore = searchParams["explore"] === "true";

  const { products, totalPages } = await getAllProducts({
    category,
    type,
    query,
    sort,
    page,
    flashSale,
    bestSelling,
    explore,
  });

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
          {category && (
            <>
              <span>/</span>
              <Link
                href={`/collections?category=${category}`}
                className="hover:underline"
              >
                {category}
              </Link>
            </>
          )}
          {flashSale && (
            <>
              <span>/</span>
              <span className="text-black">Flash Sale</span>
            </>
          )}

          {bestSelling && (
            <>
              <span>/</span>
              <span className="text-black">Best Selling</span>
            </>
          )}

          {explore && (
            <>
              <span>/</span>
              <span className="text-black">Explore Product</span>
            </>
          )}
        </nav>

        <div className="w-full h-full">
          {products.length > 0 ? (
              <>
                {/* sort by */}
                <div className="flex items-center justify-end gap-2 mb-6">
                  <span className="text-sm text-text-3">Sort by:</span>
                  <SortDropdown />
                </div>

                {/* products grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] mt-[60px] sm:mb-0 mb-[40px]">
                  {products.map((product: IProduct) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </>
          ) : (
            <div className="flex-center text-text-2 text-sm w-full h-full">
              <p>No products found</p>
            </div>
          )}

          {/* pagination */}
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </section>
  );
};

export default CollectionsPage;
