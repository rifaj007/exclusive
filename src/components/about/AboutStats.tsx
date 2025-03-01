'use client'
import { AboutStatsData } from "@/constants";
import CountUp from "react-countup";

const AboutStats = () => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {AboutStatsData.map(({ _id, value, label, icon: Icon }) => {
        const numericValue = parseFloat(value.replace("k", ""));

        return (
          <div
            key={_id}
            className="border border-border-1 rounded text-center py-[26px] group hover:bg-[#DB4444] transition duration-300"
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
              <CountUp 
                end={numericValue} 
                duration={2.5} 
                separator="," 
                decimals={value.includes(".") ? 1 : 0}
              />
              k
            </h5>
            <p className="group-hover:text-white">{label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AboutStats;
