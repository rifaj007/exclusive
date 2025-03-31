"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";
import {
  BagIcon,
  CancelIcon,
  CartIcon,
  HeartIcon,
  LogoutIcon,
  ProfileIcon,
  SearchIcon,
  StarLineIcon,
} from "@/icons";
import NavSearch from "./NavSearch";
// import {  } from "@/libs/auth";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  /* ------ All the state variables ------ */
  // menu open state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // nav search state
  const [isNavSearchOpen, setIsNavSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  // dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);
  // show header on scroll state
  const [showHeader, setShowHeader] = useState(true);

  const pathname = usePathname();
  const { data: session } = useSession();

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

      if (currentScrollY > 100) {
        setShowHeader(false);
        setIsMenuOpen(false);
        setIsNavSearchOpen(false);
        setIsDropdownOpen(false);
      } else {
        setShowHeader(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside of nav search box
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setIsNavSearchOpen(false);
      }
    };

    if (isNavSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNavSearchOpen]);

  // Handle clicks outside of user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <>
      <header
        className={`fixed top-0 bg-white left-0 w-full border-b-[0.5px] border-border-1 pt-4 sm:pt-8 md:pt-10 pb-4 duration-500 z-50  ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container relative">
          <nav className="flex justify-between items-center">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center sm-xs:gap-5 gap-3">
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
              {navItems
                .filter(({ route }) => !(session && route === "/sign-up"))
                .map(({ label, route }) => (
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

            <div className="flex gap-3 sm-xs:gap-6 items-center">
              {/* Nav Search for large device */}
              <div className="hidden md:flex">
                <NavSearch />
              </div>

              {/* Nav search button for mobile device */}
              <button
                ref={searchButtonRef}
                onClick={() => setIsNavSearchOpen((prev) => !prev)}
                className="h-full w-full bg-transparent outline-0 md:hidden"
              >
                <SearchIcon />
              </button>

              {/* Wishlist, Cart, and Profile Icons */}
              <div className="flex items-center gap-1 sm-xs:gap-3 sm:gap-4">
                {/* Wishlist */}
                <button>
                  <HeartIcon />
                </button>

                {/* Cart */}
                <button>
                  <CartIcon />
                </button>

                {/* Profile button */}
                {session && (
                  <button
                    ref={profileButtonRef}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="w-8 h-8"
                  >
                    {session.user?.image ? (
                      <img
                        src={session.user?.image}
                        alt="profile"
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <ProfileIcon
                        className={`${
                          isDropdownOpen
                            ? "text-white p-1 bg-secondary-3 rounded-full"
                            : ""
                        } flex-center`}
                      />
                    )}
                  </button>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile search box */}
          {isNavSearchOpen && (
            <div
              ref={searchRef}
              className="absolute top-12 left-1/2 -translate-x-1/2"
            >
              <NavSearch />
            </div>
          )}

          {/* User dropdown */}
          {isDropdownOpen && (
            <ul
              ref={dropdownRef}
              className="text-text-1 flex flex-col gap-3 absolute top-12 right-0 w-56 p-3 rounded bg-black/40 shadow-lg backdrop-blur-[150px]"
            >
              <li>
                <Link
                  href="/user/profile"
                  className="flex items-center gap-3 text-sm"
                >
                  <ProfileIcon />
                  Manage My Account
                </Link>
              </li>

              {/* Order route */}
              <li>
                <Link
                  href="/user/order"
                  className="flex items-center gap-3 text-sm"
                >
                  <BagIcon />
                  My Order
                </Link>
              </li>

              {/* Cancellations route */}
              <li>
                <Link
                  href="/user/cancellations"
                  className="flex items-center gap-3 text-sm"
                >
                  <CancelIcon />
                  My Cancellations
                </Link>
              </li>

              {/* Reviews route */}
              <li>
                <Link
                  href="/user/reviews"
                  className="flex items-center gap-3 text-sm"
                >
                  <StarLineIcon />
                  My Reviews
                </Link>
              </li>

              {/* Logout button */}
              <li>
                <button
                  onClick={() => {
                    signOut({ redirect: true, callbackUrl: "/" });
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 text-sm w-full text-left"
                >
                  <LogoutIcon />
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </header>

      {/* Mobile nav Menu */}
      <div className="lg:hidden">
        <div
          className={`fixed top-20 md:top-24 left-0 w-full h-full transition-transform duration-[350ms] text-center bg-white pt-8 origin-top z-40 ${
            isMenuOpen ? "translate-y-0" : "-translate-y-[120%]"
          }`}
        >
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
      </div>
    </>
  );
};

export default Header;
