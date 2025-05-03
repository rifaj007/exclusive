import {
  CameraIcon,
  CellPhoneIcon,
  ComputerIcon,
  CustomerServiceIcon,
  DeliveryIcon,
  DollarIcon,
  GamepadIcon,
  HeadphoneIcon,
  MoneyBagIcon,
  SecureIcon,
  ShopIcon,
  ShoppingBagIcon,
  SmartWatchIcon,
} from "@/icons";

/* nav bar data */
export const navItems = [
  { label: "Home", route: "/" },
  { label: "Collections", route: "/collections" },
  { label: "Contact", route: "/contact" },
  { label: "About", route: "/about" },
  { label: "Signup", route: "/sign-up" },
];

/* hero section data */
const generateLink = (category: string, type?: string) => {
  const base = `/collections?category=${encodeURIComponent(category)}`;
  return type ? `${base}&type=${encodeURIComponent(type)}` : base;
};

export const heroNavbarData = [
  {
    _id: 1,
    label: "Woman’s Fashion",
    link: generateLink("Woman’s Fashion"),
    hasSubmenu: true,
    submenu: [
      { _id: 101, label: "Dresses", link: generateLink("Woman’s Fashion", "Dresses") },
      { _id: 102, label: "Tops", link: generateLink("Woman’s Fashion", "Tops") },
      { _id: 103, label: "Shoes", link: generateLink("Woman’s Fashion", "Shoes") },
    ],
  },
  {
    _id: 2,
    label: "Men’s Fashion",
    link: generateLink("Men’s Fashion"),
    hasSubmenu: true,
    submenu: [
      { _id: 201, label: "Jacket", link: generateLink("Men’s Fashion", "Jacket") },
      { _id: 202, label: "Pant", link: generateLink("Men’s Fashion", "Pant") },
      { _id: 203, label: "Shirt", link: generateLink("Men’s Fashion", "Shirt") },
      { _id: 204, label: "Shoes", link: generateLink("Men’s Fashion", "Shoes") },
    ],
  },
  {
    _id: 3,
    label: "Electronics",
    link: generateLink("Electronics"),
    hasSubmenu: true,
    submenu: [
      { _id: 301, label: "Gaming", link: generateLink("Electronics", "Gaming") },
      { _id: 302, label: "Keyboard", link: generateLink("Electronics", "Keyboard") },
      { _id: 303, label: "Monitor", link: generateLink("Electronics", "Monitor") },
      { _id: 304, label: "Camera", link: generateLink("Electronics", "Camera") },
      { _id: 305, label: "Speakers", link: generateLink("Electronics", "Speakers") },
      { _id: 306, label: "Phones", link: generateLink("Electronics", "Phones") },
      { _id: 307, label: "SmartWatch", link: generateLink("Electronics", "SmartWatch") },
    ],
  },
  {
    _id: 4,
    label: "Home & Lifestyle",
    link: generateLink("Home & Lifestyle"),
    hasSubmenu: false,
  },
  {
    _id: 5,
    label: "Medicine",
    link: generateLink("Medicine"),
    hasSubmenu: false,
  },
  {
    _id: 6,
    label: "Sports & Outdoor",
    link: generateLink("Sports & Outdoor"),
    hasSubmenu: false,
  },
  {
    _id: 7,
    label: "Baby’s & Toys",
    link: generateLink("Baby’s & Toys"),
    hasSubmenu: false,
  },
  {
    _id: 8,
    label: "Groceries & Pets",
    link: generateLink("Groceries & Pets"),
    hasSubmenu: true,
    submenu: [
      { _id: 801, label: "Perfume", link: generateLink("Groceries & Pets", "Perfume") },
    ],
  },
  {
    _id: 9,
    label: "Health & Beauty",
    link: generateLink("Health & Beauty"),
    hasSubmenu: false,
  },
];

export const heroSliderData = [
  {
    _id: 1,
    title: "iPhone 14 Series",
    description: "Up to 10% off Voucher",
    image: "/images/hero-slider/img_1.jpeg",
    ctaLink: "/collections/6813542e32324fe9ebf861a8",
  },
  {
    _id: 2,
    title: "Xbox Consoles",
    description: "Up to 50% on select Xbox games",
    image: "/images/hero-slider/img_2.png",
    ctaLink: "/collections/68136134dcf109e3e051247e",
  },
  {
    _id: 3,
    title: "Apple Watch Ultra 2",
    description: "Sale up to 20% off",
    image: "/images/hero-slider/img_3.png",
    ctaLink: "/collections/68136794dcf109e3e051259d",
  },
  {
    _id: 4,
    title: "Nike, Adidas",
    description: "MIN 40% OFF",
    image: "/images/hero-slider/img_4.png",
    ctaLink: "/collections/68136390dcf109e3e05124aa",
  },
  {
    _id: 5,
    title: "Playstation 5",
    description: "MIN 25% OFF",
    image: "/images/hero-slider/img_5.png",
    ctaLink: "/collections/681282db2d145242d20e10cc",
  },
  {
    _id: 6,
    title: "Galaxy S24 | S24+",
    description: "Get up to 5% off",
    image: "/images/hero-slider/img_6.png",
    ctaLink: "/collections/68136590dcf109e3e0512512",
  },
];

/* category slider data */
export const categoriesSliderData = [
  {
    _id: 1,
    name: "Phones",
    icon: CellPhoneIcon,
    link: "/collections?category=Electronics&type=Phones",
  },
  {
    _id: 2,
    name: "Computers",
    icon: ComputerIcon,
    link: "/collections?category=Electronics&type=Computers",
  },
  {
    _id: 3,
    name: "SmartWatch",
    icon: SmartWatchIcon,
    link: "/collections?category=Electronics&type=SmartWatch",
  },
  {
    _id: 4,
    name: "Camera",
    icon: CameraIcon,
    link: "/collections?category=Electronics&type=Camera",
  },
  {
    _id: 5,
    name: "HeadPhones",
    icon: HeadphoneIcon,
    link: "/collections?category=Electronics&type=HeadPhones",
  },
  {
    _id: 6,
    name: "Gaming",
    icon: GamepadIcon,
    link: "/collections?category=Electronics&type=Gaming",
  },
  {
    _id: 7,
    name: "Phones",
    icon: CellPhoneIcon,
    link: "/collections?category=Electronics&type=Phones",
  },
  {
    _id: 8,
    name: "Computers",
    icon: ComputerIcon,
    link: "/collections?category=Electronics&type=Computers",
  },
  {
    _id: 9,
    name: "SmartWatch",
    icon: SmartWatchIcon,
    link: "/collections?category=Electronics&type=SmartWatch",
  },
  {
    _id: 10,
    name: "Camera",
    icon: CameraIcon,
    link: "/collections?category=Electronics&type=Camera",
  },
  {
    _id: 11,
    name: "HeadPhones",
    icon: HeadphoneIcon,
    link: "/collections?category=Electronics&type=HeadPhones",
  },
  {
    _id: 12,
    name: "Gaming",
    icon: GamepadIcon,
    link: "/collections?category=Electronics&type=Gaming",
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
