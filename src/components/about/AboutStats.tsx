"use client";
import { aboutStatsData } from "@/constants";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";

const CountUpClient = dynamic(
  () => import("@/components/elements/CountUpClient"),
  {
    ssr: false,
  }
);

const AboutStats = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-[140px] xl:mt-[200px]">
      {aboutStatsData.map(({ _id, value, label, icon: Icon }) => {
        const numericValue = parseFloat(value.replace("k", ""));

        return (
          <div
            key={_id}
            ref={ref}
            className="border border-border-1 rounded text-center py-[26px] group hover:bg-[#DB4444] hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-center mb-5">
              <span className="p-[11px] bg-[#C1C1C1] group-hover:bg-[#E67C7C] rounded-full flex">
                <span className="p-[9px] bg-black group-hover:bg-white rounded-full">
                  <Icon className="text-text-1 group-hover:text-black" />
                </span>
              </span>
            </div>

            {/* React CountUp for animated value */}
            <h5 className="font-inter font-bold text-[32px] leading-[30px] mb-1 group-hover:text-white">
              {inView ? (
                <CountUpClient
                  start={0}
                  end={numericValue}
                  duration={5}
                  decimals={value.includes(".") ? 1 : 0}
                />
              ) : (
                "0"
              )}
              k
            </h5>
            <p className="group-hover:text-white">{label}</p>
          </div>
        );
      })}
    </section>
  );
};

export default AboutStats;
