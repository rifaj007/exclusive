"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";
import { CartIcon, HeartIcon, ProfileIcon } from "@/icons";
import NavSearch from "./NavSearch";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  // hide an show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full bg-white border-b-[0.5px] border-border-1 pt-8 md:pt-10 pb-4 duration-500 z-50 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container">
          <nav className="flex justify-between items-center">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center gap-5">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden size-10 z-30 relative text-white focus:outline-none overflow-hidden"
              >
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-0 top-1/2">
                  <span
                    className={`absolute h-0.5 w-8 bg-black transform transition duration-300 ease-in-out ${
                      isMenuOpen ? "rotate-45 delay-100" : "-translate-y-1.5"
                    }`}
                  ></span>
                  <span
                    className={`absolute h-0.5 bg-black transform transition-all duration-100 ease-in-out ${
                      isMenuOpen
                        ? "w-0 opacity-50"
                        : "w-8 delay-100 opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`absolute h-0.5 w-8 bg-black transform transition duration-300 ease-in-out ${
                      isMenuOpen ? "-rotate-45 delay-200" : "translate-y-1.5"
                    }`}
                  ></span>
                </div>
              </button>

              {/* Logo */}
              <Link href="/" className="logo">
                Exclusive
              </Link>
            </div>

            {/* Navigation items */}
            <ul className="hidden lg:flex gap-12">
              {navItems.map(({ label, route }) => (
                <li
                  key={route}
                  className={
                    pathname === route
                      ? "border-b border-border-2 !font-normal"
                      : ""
                  }
                >
                  <Link href={route}>{label}</Link>
                </li>
              ))}
            </ul>

            <div className="flex gap-6 items-center">
              {/* Nav Search */}
              <div className="hidden md:flex">
                <NavSearch />
              </div>

              {/* Wishlist, Cart, and Profile Icons */}
              <div className="flex items-center gap-4">
                {/* Wishlist */}
                <div>
                  <HeartIcon />
                </div>

                {/* Cart */}
                <div>
                  <CartIcon />
                </div>

                {/* Profile */}
                <div>
                  <ProfileIcon />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-20 md:top-24 left-0 w-full h-full z-20 transform transition-transform duration-300 ease-in-out text-center bg-white pt-8 origin-top ${
          isMenuOpen ? "animate-menuOpen" : "animate-menuClose"
        }`}
      >
        <div className="md:hidden flex justify-center mb-8">
          <NavSearch />
        </div>
        <ul className="flex flex-col gap-12">
          {navItems.map(({ label, route }) => (
            <li
              key={route}
              className={pathname === route ? "font-semibold underline" : ""}
            >
              <Link onClick={() => setIsMenuOpen(false)} href={route}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;
