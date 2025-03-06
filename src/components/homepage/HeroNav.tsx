"use client";
import { heroNavbarData } from "@/constants";
import { DropDownIcon, DropRightIcon } from "@/icons";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const HeroNav = () => {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSubmenu = (id: number) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  return (
    <nav className="w-60 pt-10 pr-4 relative border-r border-border-1 h-full">
      <ul ref={menuRef} className="space-y-4 w-full">
        {heroNavbarData.map((item) => (
          <li key={item._id} className="relative group">
            <div className="flex-between w-full">
              {item.link ? (
                <Link href={item.link} className="flex-1">
                  {item.label}
                </Link>
              ) : (
                <span className="flex-1">{item.label}</span>
              )}

              {item.hasSubmenu && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubmenu(item._id);
                  }}
                  className="ml-2 px-2"
                >
                  {openSubmenu === item._id ? (
                    <DropDownIcon />
                  ) : (
                    <DropRightIcon />
                  )}
                </button>
              )}
            </div>

            {item.hasSubmenu && openSubmenu === item._id && (
              <ul className="absolute left-full top-0 bg-white shadow-lg rounded-lg min-w-[200px] p-2 space-y-1 z-10 border">
                {item.submenu?.map((sub) => (
                  <li key={sub._id}>
                    <Link
                      href={sub.link}
                      className="block px-4 py-2 hover:bg-secondary-2 rounded-lg"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeroNav;
