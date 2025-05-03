import Link from "next/link";

const CancelPage = () => {
  return (
    <section>
      <div className="container">
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <h4 className="font-bold text-red-500">Payment Canceled</h4>
          <p>Your payment has been canceled.</p>
          <Link
            href="/collections"
            className="button-primary px-3 py-3 text-sm font-normal"
          >
            Return to Collections
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CancelPage;
