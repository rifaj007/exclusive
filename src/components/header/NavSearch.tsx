"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "@/icons";
import { useEffect, useRef, useState } from "react";

const NavSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isFocused) return;
    
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const params = new URLSearchParams();

      if (query.trim()) {
        params.set("query", query.trim());
        params.set("page", "1");
        router.push(`/collections?${params.toString()}`);
      } else {
        const clearedParams = new URLSearchParams(searchParams.toString());
        clearedParams.delete("query");
        clearedParams.delete("page");
        router.push(`/collections?${clearedParams.toString()}`);
      }
    }, 300);

    // Cleanup on unmount
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [isFocused, query, router, searchParams]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="relative w-[245px]">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder="What are you looking for?"
        className="bg-secondary-2 pl-[20px] pr-10 py-2 rounded focus:outline-none text-[12px] placeholder:text-text-3 text-black w-full transition duration-200"
      />
      <div className="absolute right-0 top-0 bottom-0">
        <button
          className="h-full w-full bg-transparent outline-0 px-2 rounded-md"
          type="submit"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default NavSearch;
