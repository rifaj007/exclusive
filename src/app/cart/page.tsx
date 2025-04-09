import { CartCheckout, CartTable } from "@/components";
import Link from "next/link";

const CartPage = () => {
  return (
    <section className="pt-8 lg:pt-12 xl:pt-20 pb-20 lg:pb-[100px] xl:pb-[140px]">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">Cart</span>
        </nav>

        {/* Cart table */}
        <CartTable />

        {/* Cart Checkout */}
        <CartCheckout />
      </div>
    </section>
  );
};

export default CartPage;
