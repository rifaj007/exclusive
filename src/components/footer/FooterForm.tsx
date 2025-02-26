"use client";

import { SendIcon } from "@/icons";

const FooterForm = () => {
  // handle footer form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("form submitting");
  };

  return (
    <form onSubmit={onSubmit} className="relative ">
      <input
        placeholder="Enter your email"
        className="bg-transparent border border-text-1 pl-4 pr-10 py-3 rounded focus:outline-none placeholder:text-[#646464] text-[#646464] w-full"
      />
      <div className="absolute right-0 top-0 bottom-0">
        <button
          className="h-full w-full bg-transparent outline-0 px-2 rounded-md"
          type="submit"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  );
};

export default FooterForm;
