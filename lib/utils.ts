export const categoryMenuList = [
  {
    id: 1,
    title: "Single Layer PCBs",
    icon: "🔧",
    href: "/shop/single-layer-pcbs",
    categoryId: "cat_1753894634025_vzk9y7yae"
  },
  {
    id: 2,
    title: "Multi Layer PCBs",
    icon: "⚙️",
    href: "/shop/multi-layer-pcbs",
    categoryId: "cat_1753894657262_vt9ovggw5"
  },
  {
    id: 3,
    title: "Flex PCBs",
    icon: "🔌",
    href: "/shop/flex-pcbs",
    categoryId: "cat_1753894667307_1p6i1fljb"
  },
  {
    id: 4,
    title: "Rigid-Flex PCBs",
    icon: "🛠️",
    href: "/shop/rigid-flex-pcbs",
    categoryId: "cat_1753894678072_zydbmq0m4" // Add correct ID if available
  },
  {
    id: 5,
    title: "Prototype PCBs",
    icon: "⚡",
    href: "/shop/prototype-pcbs",
    categoryId: "cat_1753894689818_mv1zqvuzs"
  },
];

export const incentives = [
  {
    name: "Fast PCB Manufacturing",
    description:
      "Quick turnaround times for prototype and production PCBs with industry-leading quality standards.",
    icon: "⚡",
  },
  {
    name: "Quality Assurance",
    description:
      "100% electrical testing and visual inspection ensures your PCBs meet specification requirements.",
    icon: "✅",
  },
  {
    name: "Professional Support",
    description:
      "Expert technical support team available to help with design optimization and manufacturing queries.",
    icon: "🔧",
  },
];

export const navigation = {
  quicklinks: [
    { name: "Home", href: "#" },
    { name: "Products", href: "#" },
    { name: "Contact us", href: "/contact" },
    { name: "Check order", href: "#" },
  ],
  ourcompany: [
    { name: "About us", href: "/about" },
    { name: "Privacy policy", href: "#" },
    { name: "Return policy", href: "#" },
    { name: "Terms & conditions", href: "#" },
  ],
};

export const brands = [
  { name: 'Intel', logo: '/brands/intel_logo.png' },
  { name: 'Sony', logo: '/brands/sony_logo.png' },
  { name: 'Samsung', logo: '/brands/samsung_logo.png' },
  { name: 'Infenion', logo: '/brands/infenion_logo.png' },
  { name: 'Usha', logo: '/brands/usha_logo.jpg' },
  { name: 'Godrej', logo: '/brands/godrej_logo.png' },
  { name: 'LG', logo: '/brands/lg_logo.png' },
  { name: 'Philips', logo: '/brands/philips_logo.png' },
];

export const testimonials = [
  {
    id: 1,
    name: "John Mitchell",
    position: "Senior Hardware Engineer",
    company: "TechCorp Industries",
    content: "Outstanding PCB quality and fast turnaround time. Shree Prathamesh Engineering has been our go-to partner for all custom PCB solutions. Their attention to detail and professional service is unmatched.",
    rating: 5,
    avatar: "JM"
  },
  {
    id: 2,
    name: "Sarah Chen",
    position: "Product Development Manager",
    company: "InnovateTech Solutions",
    content: "The precision and reliability of their PCBs have significantly improved our product performance. Their technical expertise and customer support made our complex project a success.",
    rating: 4,
    avatar: "SC"
  },
  {
    id: 3,
    name: "David Rodriguez",
    position: "Electronics Design Lead",
    company: "Future Electronics",
    content: "Exceptional quality control and competitive pricing. We've been working with them for over two years, and they consistently deliver high-quality PCBs that meet our exact specifications.",
    rating: 5,
    avatar: "DR"
  }
];

export const isValidNameOrLastname = (input: string) => {
  // Simple name or lastname regex format check
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(input);
};

export const isValidEmailAddressFormat = (input: string) => {
  // simple email address format check
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(input);
};