import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container pt-8 md:pt-20 pb-14 md:pb-[140px]">
      <nav className="mb-12 md:mb-[100px] xl:mb-[140px] flex items-center gap-3 text-sm text-border-2">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="text-black">404 Error</span>
      </nav>

      <div className="text-center">
        <h2 className="font-inter font-medium md:text-7xl lg:text-[90px] xl:text-[110px] leading-[115px] tracking-[3%] inline-block md:mb-6">
          404 Not Found
        </h2>

        <p className="mb-12 xl:mb-20">
          Your visited page not found. You may go home page.
        </p>
        <Link className="button" href="/">
          Back to home page
        </Link>
      </div>
    </div>
  );
}
