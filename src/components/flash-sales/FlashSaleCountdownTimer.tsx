"use client";
import { useEffect, useState } from "react";

const FlashSaleCountdownTimer = () => {
  const flashSaleEndTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // Ends in 3 days

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = flashSaleEndTime - now;

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
    <div className="flex items-end gap-3 sm-xs:gap-4 sm:gap-6 text-black">
      {["Days", "Hours", "Minutes", "Seconds"]
        .map((unit, index) => (
          <div key={unit} className="flex flex-col items-center">
            <span className="text-sm font-medium">{unit}</span>
            <span className="text-3xl lg:text-4xl font-bold font-inter">
              {Object.values(timeLeft)[index].toString().padStart(2, "0")}
            </span>
          </div>
        ))
        .reduce<React.ReactNode[]>((acc, curr, index) => {
          if (index > 0) {
            acc.push(
              <span
                key={`colon-${index}`}
                className="text-4xl text-button-hover1 font-bold"
              >
                :
              </span>
            );
          }
          acc.push(curr);
          return acc;
        }, [])}
    </div>
  );
};

export default FlashSaleCountdownTimer;
