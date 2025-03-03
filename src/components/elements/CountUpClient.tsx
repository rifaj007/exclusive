"use client";
import CountUp from "react-countup";

interface CountUpClientProps {
  start: number;
  end: number;
  duration: number;
  decimals: number;
}

const CountUpClient = ({ start, end, duration, decimals }: CountUpClientProps) => {
  return (
    <CountUp
      start={start}
      end={end}
      duration={duration}
      separator=","
      decimals={decimals}
    />
  );
};

export default CountUpClient;
