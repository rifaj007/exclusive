import Link from "next/link";

const TopHeader = () => {
  return (
    <div className="bg-black text-white flex-center flex-wrap sm:gap-4 py-3 px-2">
      <p className="text-sm">Summer sale! To get 20% -OFF, use &quot;SUMMER20&quot;</p>

      <Link className="underline" href="/collections">Shop Now</Link>
    </div>
  );
};

export default TopHeader;
