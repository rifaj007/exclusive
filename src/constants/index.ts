import {
  CustomerServiceIcon,
  DeliveryIcon,
  DollarIcon,
  MoneyBagIcon,
  SecureIcon,
  ShopIcon,
  ShoppingBagIcon,
} from "@/icons";

/* nav bar data */
export const navItems = [
  { label: "Home", route: "/" },
  { label: "Contact", route: "/contact" },
  { label: "About", route: "/about" },
  { label: "Sign Up", route: "/sign-up" },
];

/* about page data */
export const aboutStatsData = [
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

export const aboutSliderData = [
  {
    _id: 1,
    name: "Tom Cruise",
    position: "Founder & Chairman",
    image: "/images/about/slider/img_1.png",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    _id: 2,
    name: "Emma Watson",
    position: "Managing Director",
    image: "/images/about/slider/img_2.png",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    _id: 3,
    name: "Will Smith",
    position: "Product Designer",
    image: "/images/about/slider/img_3.png",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    _id: 4,
    name: "Tom Cruise",
    position: "Founder & Chairman",
    image: "/images/about/slider/img_1.png",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    _id: 5,
    name: "Emma Watson",
    position: "Managing Director",
    image: "/images/about/slider/img_2.png",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    _id: 6,
    name: "Will Smith",
    position: "Product Designer",
    image: "/images/about/slider/img_3.png",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
];

/* services data */
export const serviceFeatures = [
  {
    _id: 1,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
    icon: DeliveryIcon,
  },
  {
    _id: 2,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
    icon: CustomerServiceIcon,
  },
  {
    _id: 3,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
    icon: SecureIcon,
  },
];
