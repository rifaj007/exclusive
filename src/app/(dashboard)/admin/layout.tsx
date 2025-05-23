"use client";
import { Loading } from "@/components";
import useHasMounted from "@/hooks/useHasMounted";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasMounted = useHasMounted();
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };

  if (!hasMounted) return <Loading />;
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

        <div className="sm:flex">
          {/* Admin menu */}
          <div className="max-w-[200px] xl:max-w-[250px] w-full sm:mb-0 mb-10">
            {/* All Products navigation */}
            <div className="mb-6">
              <span className="font-semibold mb-4 inline-block">Products</span>

              <ul className="text-border-2 text-sm space-y-2">
                <li>
                  <Link
                    className={
                      isActive("/admin/add-product")
                        ? "text-secondary-3"
                        : "text-border-2"
                    }
                    href="/admin/add-product"
                  >
                    Add new product
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      isActive("/admin/all-product")
                        ? "text-secondary-3"
                        : "text-border-2"
                    }
                    href="/admin/all-product"
                  >
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
                  <Link
                    className={
                      isActive("/admin/all-order")
                        ? "text-secondary-3"
                        : "text-border-2"
                    }
                    href="/admin/all-order"
                  >
                    All Orders
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Main content */}
          <div className="bg-white shadow-custom p-4 lg:p-8 flex-1 rounded-md">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
