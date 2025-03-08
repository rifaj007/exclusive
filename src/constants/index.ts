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

/* hero section data */
export const heroNavbarData = [
  {
    _id: 1,
    label: "Woman’s Fashion",
    link: "/womens-fashion",
    hasSubmenu: true,
    submenu: [
      { _id: 101, label: "Dresses", link: "/womens-fashion/dresses" },
      { _id: 102, label: "Tops", link: "/womens-fashion/tops" },
      { _id: 103, label: "Shoes", link: "/womens-fashion/shoes" },
      { _id: 104, label: "Bags", link: "/womens-fashion/bags" },
    ],
  },
  {
    _id: 2,
    label: "Men’s Fashion",
    link: "/mens-fashion",
    hasSubmenu: true,
    submenu: [
      { _id: 201, label: "Shirts", link: "/mens-fashion/shirts" },
      { _id: 202, label: "Pants", link: "/mens-fashion/pants" },
      { _id: 203, label: "Shoes", link: "/mens-fashion/shoes" },
      { _id: 204, label: "Accessories", link: "/mens-fashion/accessories" },
    ],
  },
  {
    _id: 3,
    label: "Electronics",
    link: "/electronics",
    hasSubmenu: false,
  },
  {
    _id: 4,
    label: "Home & Lifestyle",
    link: "/home-&-lifestyle",
    hasSubmenu: false,
  },
  {
    _id: 5,
    label: "Medicine",
    link: "/medicine",
    hasSubmenu: false,
  },
  {
    _id: 6,
    label: "Sports & Outdoor",
    link: "/sports-&-outdoor",
    hasSubmenu: false,
  },
  {
    _id: 7,
    label: "Baby’s & Toys",
    link: "/babys-&-toys",
    hasSubmenu: false,
  },
  {
    _id: 8,
    label: "Groceries & Pets",
    link: "/groceries-&-pets",
    hasSubmenu: false,
  },
  {
    _id: 9,
    label: "Health & Beauty",
    link: "/health-&-beauty",
    hasSubmenu: false,
  },
];

export const heroSliderData = [
  {
    _id: 1,
    title: "iPhone 14 Series",
    description: "Up to 10% off Voucher",
    image: "/images/hero-slider/img_1.jpeg",
    ctaLink: "/shop-now",
  },
  {
    _id: 2,
    title: "Xbox Consoles",
    description: "Up to 50% on select Xbox games",
    image: "/images/hero-slider/img_2.png",
    ctaLink: "/shop-now",
  },
  {
    _id: 3,
    title: "Apple Watch Ultra 2",
    description: "Sale up to 20% off",
    image: "/images/hero-slider/img_3.png",
    ctaLink: "/shop-now",
  },
  {
    _id: 4,
    title: "Nike, Adidas",
    description: "MIN 40% OFF",
    image: "/images/hero-slider/img_4.png",
    ctaLink: "/shop-now",
  },
  {
    _id: 5,
    title: "Playstation 5",
    description: "MIN 25% OFF",
    image: "/images/hero-slider/img_5.png",
    ctaLink: "/shop-now",
  },
  {
    _id: 6,
    title: "Galaxy S24 | S24+",
    description: "Get up to 5% off",
    image: "/images/hero-slider/img_6.png",
    ctaLink: "/shop-now",
  },
];

/* product data */
export const productsData = [
  {
    _id: "1",
    name: "HAVIT HV-G92 Gamepad",
    price: 120,
    original_price: 160,
    discount: "-40%",
    rating: 4.5,
    reviews: 88,
    imageUrl: "/images/product/img_1.png",
  },
  {
    _id: "2",
    name: "AK-900 Wired Keyboard",
    price: 960,
    original_price: 1160,
    discount: "-35%",
    rating: 3.5,
    reviews: 75,
    imageUrl: "/images/product/img_2.png",
  },
  {
    _id: "3",
    name: "IPS LCD Gaming Monitor",
    price: 370,
    original_price: 400,
    discount: "-30%",
    rating: 5,
    reviews: 99,
    imageUrl: "/images/product/img_3.png",
  },
  {
    _id: "4",
    name: "S-Series Comfort Chair",
    price: 375,
    original_price: 400,
    discount: "-25%",
    rating: 4.5,
    reviews: 99,
    imageUrl: "/images/product/img_4.png",
  },
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
