import { getAllOrders } from "@/libs/actions/checkout/order.action";

const AdminAllOrder = async () => {
  const orders = await getAllOrders();

  return <div>AdminAllOrder: {orders.length}</div>;
};

export default AdminAllOrder;
