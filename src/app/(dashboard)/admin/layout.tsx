import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="pt-8 lg:pt-12 xl:pt-20 pb-20 lg:pb-[100px] xl:pb-[140px]">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs mb-12 xl:mb-20">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">Admin Dashboard</span>
        </nav>

        <div className="flex">
          {/* Admin menu */}
          <div className="max-w-[250px] w-full">
            {/* All Products navigation */}
            <div className="mb-6">
              <span className="font-semibold mb-4 inline-block">Products</span>

              <ul className="text-border-2 text-sm space-y-2">
                <li>
                  <Link href="/admin/add-product">Add new product</Link>
                </li>
                <li>
                  <Link href="/admin/all-product">
                    Manage All Product
                  </Link>
                </li>
              </ul>
            </div>

            {/* All orders navigation */}
            <div>
              <span className="font-semibold mb-4 inline-block">Orders</span>

              <ul className="text-border-2 text-sm space-y-2">
                <li>
                  <Link href="/admin/all-order">All Orders</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Main content */}
          <div className="bg-white shadow-custom p-8 flex-1 rounded-md">{children}</div>
        </div>
      </div>
    </section>
  );
}
