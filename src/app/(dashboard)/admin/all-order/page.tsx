import { getAllOrders } from "@/libs/actions/checkout/order.action";

const AdminAllOrder = async () => {
  const orders = await getAllOrders();

  console.log(orders);
  return <div>AdminAllOrder</div>;
};

export default AdminAllOrder;
