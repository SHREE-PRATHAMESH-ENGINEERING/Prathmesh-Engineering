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
    { name: "Contact us", href: "#" },
    { name: "Check order", href: "#" },
  ],
  ourcompany: [
    { name: "About us", href: "#" },
    { name: "Privacy policy", href: "#" },
    { name: "Return policy", href: "#" },
    { name: "Terms & conditions", href: "#" },
  ],
};

export const brands = [
  { name: 'Intel', color: '#0071c5' },
  { name: 'AMD', color: '#ed1c24' },
  { name: 'NVIDIA', color: '#76b900' },
  { name: 'Qualcomm', color: '#3253dc' },
  { name: 'Broadcom', color: '#cc092f' },
  { name: 'Texas Instruments', color: '#cc0000' },
  { name: 'Analog Devices', color: '#0066cc' },
  { name: 'Microchip', color: '#ee3124' },
  { name: 'STMicroelectronics', color: '#03234b' },
  { name: 'Infineon', color: '#1a1a1a' },
  { name: 'NXP', color: '#ff6600' },
  { name: 'Xilinx', color: '#ee3124' },
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