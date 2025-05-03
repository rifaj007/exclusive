import Link from "next/link";

const SuccessPage = () => {
  return (
    <section>
      <div className="container">
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold text-green-600">
            Payment Successful!
          </h1>
          <p>Thank you for your order.</p>

          <Link
            href="/user/orders"
            className="button-primary px-3 py-3 text-sm font-normal"
          >
            View Orders
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
