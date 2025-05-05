"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <section className="pt-8 lg:pt-12 xl:pt-20 pb-20 lg:pb-[100px] xl:pb-[140px]">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs mb-12 xl:mb-20">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">My Account</span>
        </nav>

        <div className="sm:flex">
          {/* User menu */}
          <div className="max-w-[200px] xl:max-w-[250px] w-full sm:mb-0 mb-10">
            {/* User navigation */}
            <div className="mb-6">
              <span className="font-semibold mb-4 inline-block">
                Manage My Account
              </span>

              <ul className="text-border-2 text-sm space-y-2">
                <li>
                  <Link
                    className={
                      isActive("/user/profile")
                        ? "text-secondary-3"
                        : "text-border-2"
                    }
                    href="/user/profile"
                  >
                    My Profile
                  </Link>
                </li>
              </ul>
            </div>

            {/* Orders navigation */}
            <div>
              <span className="font-semibold mb-4 inline-block">My Orders</span>

              <ul className="text-border-2 text-sm space-y-2">
                <li>
                  <Link className={
                      isActive("/user/purchases")
                        ? "text-secondary-3"
                        : "text-border-2"
                    } href="/user/purchases">My Purchases</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Main content */}
          <div className="bg-white shadow-custom p-4 pb-14 sm:pb-8 lg:p-8 flex-1 rounded-md">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
