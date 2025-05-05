"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";
import { BagIcon, LogoutIcon, ProfileIcon, SearchIcon } from "@/icons";
import NavSearch from "./NavSearch";
import { useCurrentUser } from "@/hooks/use-session";
import { routes } from "@/constants/routes";
import { logout } from "@/libs/actions/auth/logout";
import CartLink from "./CartLink";
import TopHeader from "./TopHeader";
import WishlistLink from "./WishlistLink";

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
  const user = useCurrentUser();

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

      if (currentScrollY > 90) {
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

  // Handling logout
  const handleLogout = async () => {
    await logout();

    setIsDropdownOpen(false);
    window.location.assign(routes.defaultLogoutRedirect);
  };

  return (
    <>
      <header
        className={`fixed top-0 bg-white left-0 w-full border-b-[0.5px] border-border-1 pb-4 duration-500 z-50  ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Top Header */}
        <TopHeader />
        <div className="container relative pt-4 sm:pt-8 md:pt-10">
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
            <ul className="hidden lg:flex xl:gap-12 gap-8">
              {navItems.map(({ label, route }) => {
                if (route === "/sign-up" && user) return null;
                const isActive = pathname === route;
                return (
                  <li
                    key={route}
                    className={
                      isActive ? "border-b border-border-2 !font-normal" : ""
                    }
                  >
                    <Link href={route}>{label}</Link>
                  </li>
                );
              })}
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
              <div className="flex items-center gap-2 sm-xs:gap-3 sm:gap-4">
                {/* Wishlist */}
                <WishlistLink />

                {/* Cart */}
                <CartLink />

                {/* Profile button */}
                {user && (
                  <button
                    ref={profileButtonRef}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="w-8 h-8"
                  >
                    {user?.image ? (
                      <img
                        src={user?.image}
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
              className="text-text-1 flex flex-col gap-3 absolute right-0 w-56 p-3 rounded bg-black/40 shadow-lg backdrop-blur-[150px]"
            >
              <li>
                <Link
                  href="/user/profile"
                  className="flex items-center gap-3 text-sm"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <ProfileIcon />
                  Manage My Account
                </Link>
              </li>

              {/* Order route */}
              <li>
                <Link
                  href="/user/purchases"
                  className="flex items-center gap-3 text-sm"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <BagIcon />
                  My Purchases
                </Link>
              </li>

              {/* Logout button */}
              <li>
                <button
                  onClick={handleLogout}
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
          className={`fixed top-32 md:top-24 left-0 w-full h-full transition-transform duration-[350ms] text-center bg-white pt-8 origin-top z-40 ${
            isMenuOpen ? "translate-y-0" : "-translate-y-[120%]"
          }`}
        >
          <ul className="flex flex-col gap-12">
            {navItems.map(({ label, route }) => {
              if (route === "/sign-up" && user) return null;
              return (
                <li
                  key={route}
                  className={
                    pathname === route ? "font-semibold underline" : ""
                  }
                >
                  <Link onClick={() => setIsMenuOpen(false)} href={route}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
