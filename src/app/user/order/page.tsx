import { getOrdersByUserId } from "@/libs/actions/checkout/order.action";

const UserOrderPage = async () => {
  const orders = await getOrdersByUserId();

  console.log(orders)

  return <div className="container">UserOrderPage: {orders.length}</div>;
};

export default UserOrderPage;
