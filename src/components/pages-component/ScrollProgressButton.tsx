"use client";
import { ArrowUpIcon } from "@/icons";
import { useEffect, useState } from "react";

const ScrollProgressButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    setShowButton(window.scrollY > 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 sm:bottom-5 md:bottom-6 right-4 sm:right-5 md:right-8 w-10 sm:w-12 h-10 sm:h-12 rounded-full flex-center cursor-pointer bg-secondary-2 z-50 shadow-lg hover:bg- ${
        showButton
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible translate-y-3"
      }`}
      onClick={scrollToTop}
      style={{
        transition: "all 0.2s linear, margin-right 0s",
      }}
    >
      <ArrowUpIcon className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
  );
};

export default ScrollProgressButton;
