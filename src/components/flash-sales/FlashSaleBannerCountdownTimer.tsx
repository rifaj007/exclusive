"use client";
import { useEffect, useState } from "react";

const FlashSaleBannerCountdownTimer = () => {
    const FlashSaleBannerEndTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // Ends in 3 days

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = FlashSaleBannerEndTime - now;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-end gap-[6px] sm-xs:gap-4 sm:gap-6 text-black mb-10">
      {["Days", "Hours", "Minutes", "Seconds"]
        .map((unit, index) => (
          <div key={unit} className="flex flex-col justify-center items-center text-black bg-white rounded-full w-16 h-16">
            <span className="font-semibold -mb-1">
              {Object.values(timeLeft)[index].toString().padStart(2, "0")}
            </span>
            <span className="text-xs">{unit}</span>
          </div>
        ))}
    </div>
  );
};

export default FlashSaleBannerCountdownTimer;
