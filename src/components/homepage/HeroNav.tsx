"use client";
import { heroNavbarData } from "@/constants";
import { DropDownIcon, DropRightIcon } from "@/icons";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const HeroNav = () => {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (openSubmenu === null) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSubmenu]);

  // Toggles submenu state
  const toggleSubmenu = (id: number) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  // Handles submenu button click
  const handleSubmenuClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    toggleSubmenu(id);
  };

  return (
    <nav className="lg:w-60 lg:pt-10 sm:pt-5 pr-4 relative lg:border-r border-border-1 h-full border-0 lg:mb-0 mb-4">
      <ul
        ref={menuRef}
        className="w-full h-full flex flex-row lg:flex-col gap-4 lg:items-start items-center flex-wrap"
      >
        {heroNavbarData.map((item) => (
          <li key={item._id} className="relative group lg:w-full">
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
                  onClick={(e) => handleSubmenuClick(e, item._id)}
                  className="ml-2 px-2"
                  aria-expanded={openSubmenu === item._id}
                  aria-controls={`submenu-${item._id}`}
                  tabIndex={0}
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
              <ul className="absolute right-0 left-0 lg:left-full top-5 bg-white shadow-lg rounded-lg w-[150px] lg:min-w-[200px] p-2 space-y-1 z-10 border">
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
