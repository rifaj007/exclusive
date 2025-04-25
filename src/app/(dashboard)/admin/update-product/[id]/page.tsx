import { AddProductForm } from "@/components";
import { getSingleProduct } from "@/libs/actions/product";

const UpdateProduct = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  console.log(product);
  return (
    <div>
      <AddProductForm product={product} />
    </div>
  );
};

export default UpdateProduct;
