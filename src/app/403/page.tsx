import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <section className="pt-8 lg:pt-12 xl:pt-20 pb-20 lg:pb-[100px] xl:pb-[140px]">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="mb-12 md:mb-[100px] xl:mb-[140px] breadcrumbs">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">403 Error</span>
        </nav>

        {/* Not found content */}
        <div className="text-center">
          <h2 className="font-inter font-medium md:text-7xl lg:text-[90px] xl:text-[110px] leading-[115px] inline-block md:mb-6">
            403 - Forbidden
          </h2>

          <p className="mb-12 xl:mb-20">
            You don&apos;t have permission to access this page.
          </p>
          <Link className="button-primary inline-block" href="/">
            Back to home page
          </Link>
        </div>
      </div>
    </section>
  );
}
