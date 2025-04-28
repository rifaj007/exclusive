import { ProductDetails } from "@/components";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import { getSingleProduct } from "@/libs/actions/product";
import Link from "next/link";

// dynamic metadata title for product details page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getSingleProduct(id);

  return {
    title: `${product.name}`,
  };
}

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  const { name, category, image } = product;

  return (
    <section className="pt-8 lg:pt-12 xl:pt-20 pb-20 lg:pb-[100px] xl:pb-[140px]">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs mb-12 xl:mb-20 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/collections" className="hover:underline">
            {category}
          </Link>
          <span>/</span>
          <span className="text-black">{name}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-10 xl:gap-16">
          {/* Product image showcase */}
          <ProductImageGallery images={image} />

          {/* Product details */}
          <ProductDetails product={product} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
