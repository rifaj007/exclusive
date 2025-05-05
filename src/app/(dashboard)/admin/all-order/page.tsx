import { getAllOrders } from "@/libs/actions/checkout/order.action";
import { Order } from "@/types/order";
import Image from "next/image";
import Link from "next/link";

const AdminAllOrder = async () => {
  const orders: Order[] = await getAllOrders();

  return (
    <div>
      <>
        {orders.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-4">
            {orders.map(
              ({
                _id,
                createdAt,
                productId,
                name,
                price,
                size,
                color,
                image,
                quantity,
                email
              }) => (
                <div
                  key={_id}
                  className="mb-4 p-4 border border-border-1 rounded"
                >
                  <div className="flex gap-4">
                    {/* image */}
                    <Link href={`/collections/${productId}`}>
                      <Image src={image} width={100} height={100} alt={name} />
                    </Link>

                    <div className="flex flex-col text-sm">
                      {/* name */}
                      <Link
                        href={`/collections/${productId}`}
                        className="leading-tight hyphens-auto hover:underline"
                      >
                        {name}
                      </Link>

                      {/* price and quantity */}
                      <span className="flex items-center gap-1 text-text-4">
                        <span className="font-inter font-medium text-lg text-black">
                          Price: ${price}
                        </span>
                        X<span className="">{quantity}</span>
                      </span>

                      {/* size and color */}
                      <div className="flex gap-1">
                        {size && (
                          <span>
                            <span>Size:</span>{" "}
                            <span className="text-text-4">{size}</span>
                          </span>
                        )}{" "}
                        {color && (
                          <span className="flex items-center gap-1">
                            <span>Color:</span>{" "}
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                backgroundColor: color,
                              }}
                            />
                          </span>
                        )}
                      </div>

                      {/* purchased date */}
                      <span>
                        <span>Purchased: </span>{" "}
                        <span className="text-text-4">
                          {new Date(createdAt).toLocaleDateString()}{" "}
                          {new Date(createdAt).toLocaleTimeString()}
                        </span>
                      </span>

                      <span>
                        <span>Customer: </span>{" "}
                        <span className="text-text-4">{email}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-center">No orders found</p>
        )}
      </>
    </div>
  );
};

export default AdminAllOrder;
