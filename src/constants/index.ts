import { DollarIcon, MoneyBagIcon, ShopIcon, ShoppingBagIcon } from "@/icons";

export const navItems = [
  { label: "Home", route: "/" },
  { label: "Contact", route: "/contact" },
  { label: "About", route: "/about" },
  { label: "Sign Up", route: "/sign-up" },
];

export const AboutStatsData = [
  {
    _id: 1,
    value: "10.5k",
    label: "Sellers active on our site",
    icon: ShopIcon,
  },
  {
    _id: 2,
    value: "33k",
    label: "Monthly Product Sale",
    icon: DollarIcon,
  },
  {
    _id: 3,
    value: "45.5k",
    label: "Customers active on our site",
    icon: ShoppingBagIcon,
  },
  {
    _id: 4,
    value: "25k",
    label: "Annual gross sale on our site",
    icon: MoneyBagIcon,
  },
];
