import DeleteButton from "@/components/admin/DeleteButton";
import { EditIcon } from "@/icons";
import { getAllProductsForAdmin } from "@/libs/actions/product";
import { IProduct } from "@/libs/database/models/product.model";
import Image from "next/image";
import Link from "next/link";

const AdminAllProductPage = async () => {
  const products = await getAllProductsForAdmin();

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {products.length > 0 ? (
        products.map((product: IProduct) => (
          <div
            key={product._id}
            className="border border-border-1 p-4 rounded-md flex justify-between"
          >
            {/* Product details */}
            <div className="flex sm:gap-5 gap-2">
              {/* image */}
              <Link href={`/collections/${product._id}`}>
                <Image
                  src={product.image[0]}
                  alt="product"
                  width={100}
                  height={100}
                  className="max-h-[100px]"
                />
              </Link>

              <div className="flex flex-col text-sm">
                {/* name */}
                <Link
                  href={`/collections/${product._id}`}
                  className="text-sm font-medium"
                >
                  {product.name}
                </Link>

                {/* category */}
                <span>
                  Category:{" "}
                  <span className="text-text-4">{product.category}</span>
                </span>

{/* availability */}
                <span>Availability:{" "} <span className="text-text-4">{product.availability}</span></span>

                {/* price */}
                <span>
                  Offer Price: <span className="text-text-4">{product.offerPrice}</span> Original Price:{" "}
                  <span className="line-through text-text-4">
                    {product.originalPrice}
                  </span>
                </span>

                {/* rating */}
                <span>Rating: {" "} <span className="text-text-4">{product.rating}</span></span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Delete button */}
              <DeleteButton id={product._id} />

              {/* Edit button */}
              <Link href={`/admin/update-product/${product._id}`}>
                <EditIcon />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-text-2 text-sm">No products found</div>
      )}
    </div>
  );
};

export default AdminAllProductPage;
