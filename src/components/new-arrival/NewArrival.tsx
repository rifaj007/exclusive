import Link from "next/link";
import SectionTitle from "../pages-component/SectionTitle";
import Image from "next/image";

const NewArrival = () => {
  return (
    <section className="mb-[140px]">
      <SectionTitle subTitle="Featured" title="New Arrival" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] mt-[60px] text-text-1">
        {/* PlayStation 5 - Large Block */}
        <div className="lg:row-span-2 sm:col-span-2 new-arrival-wrapper">
          <Image
            src="/images/new-arrival/playstation-5.png"
            width={500}
            height={500}
            alt="PlayStation 5"
            className="w-auto h-auto rounded lg:ml-0 ml-auto"
          />

          <div className="absolute bottom-8 left-8 right-0">
            <h2 className="new-arrival-heading mb-2">PlayStation 5</h2>

            <p className="mb-2 sm:text-[14px] text-xs">
              Black and White version of the PS5 <br /> coming out on sale.
            </p>

            <Link
              href="/collections/681282db2d145242d20e10cc"
              className="underline text-white"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Women's Collection - Medium Block */}
        <div className="sm:col-span-2 new-arrival-wrapper">
          <Image
            src="/images/new-arrival/womens-collection.jpg"
            width={500}
            height={285}
            alt="Women's Collection"
            className="w-auto h-auto scale-x-[-1] lg:pr-10 lg:ml-0 ml-auto rounded"
          />

          <div className="absolute bottom-6 left-6 right-0">
            <h2 className="new-arrival-heading mb-2">
              Women&apos;s Collections
            </h2>
            <p className="mb-2 text-[14px]">
              Featured women&apos;s collections that <br /> give you another
              vibe.
            </p>

            <Link
              href="/collections?category=Woman’s Fashion"
              className="underline text-white"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Speakers - Small Block */}
        <div className="new-arrival-wrapper p-7">
          <Image
            src="/images/new-arrival/speakers.png"
            width={500}
            height={500}
            alt="Speakers"
            className="w-auto h-auto rounded mx-auto"
          />

          <div className="absolute bottom-6 left-6 right-0">
            <h2 className="new-arrival-heading mb-0">Speakers</h2>
            <p className="mb-0 text-[14px]">Amazon wireless speakers.</p>

            <Link
              href="/collections?category=Electronics&type=Speakers"
              className="underline text-white"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Perfume - Small Block */}
        <div className="new-arrival-wrapper lg:p-7">
          <Image
            src="/images/new-arrival/perfume.png"
            width={500}
            height={500}
            alt="Speakers"
            className="w-auto h-auto rounded mx-auto sm:-scale-100 scale-75"
          />

          <div className="absolute bottom-6 left-6 right-0">
            <h2 className="new-arrival-heading mb-0">Perfume</h2>
            <p className="mb-0 text-[14px]">GUCCI INTENSE OUD EDP</p>

            <Link
              href={`/collections?category=${encodeURIComponent(
                "Groceries & Pets"
              )}&type=${encodeURIComponent("Perfume")}`}
              className="underline text-white"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
