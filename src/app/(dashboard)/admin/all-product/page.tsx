import DeleteButton from "@/components/admin/DeleteButton";
import { EditIcon } from "@/icons";
import { getAllProducts } from "@/libs/actions/product";
import { IProduct } from "@/libs/database/models/product.model";
import Image from "next/image";
import Link from "next/link";

const AdminAllProductPage = async () => {
  const products = await getAllProducts();

  return (
    <div className="flex flex-col gap-4">
      {products.length > 0 ? (
        products.map((product: IProduct) => (
          <div
            key={product._id}
            className="border border-border-1 p-4 rounded-md flex justify-between"
          >
            {/* Product details */}
            <div className="flex gap-5">
              <Image
                src={product.image[0]}
                alt="product"
                width={100}
                height={100}
              />
              <div className="text-text-3 text-sm">
                <Link
                  href={`/collections/${product._id}`}
                  className="text-black"
                >
                  {product.name}
                </Link>
                <p>Category: {product.category}</p>
                <p>Availability: {product.availability}</p>
                <p>
                  Offer Price: {product.offerPrice} Original Price:{" "}
                  <span className="line-through text-gray-400">
                    {product.originalPrice}
                  </span>
                </p>
                <p>Rating: {product.rating}</p>
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
