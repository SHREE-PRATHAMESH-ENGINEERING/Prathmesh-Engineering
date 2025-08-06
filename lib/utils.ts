// Main Navigation for Header
export const mainNavigation = [
  {
    id: 1,
    name: "All Products",
    href: "/shop",
    megaMenu: false
  },
  {
    id: 2,
    name: "PCBs",
    href: "/shop/pcbs",
    megaMenu: true,
    subItems: [
      { name: "Single Layer PCBs", href: "/shop?categoryId=cat_1753894634025_vzk9y7yae" },
      { name: "Multi Layer PCBs", href: "/shop?categoryId=cat_1753894657262_vt9ovggw5" },
      { name: "Flex PCBs", href: "/shop?categoryId=cat_1753894667307_1p6i1fljb" },
      { name: "Rigid-Flex PCBs", href: "/shop?categoryId=cat_1753894678072_zydbmq0m4" },
      { name: "Prototype PCBs", href: "/shop?categoryId=cat_1753894689818_mv1zqvuzs" }
    ]
  },
  {
    id: 3,
    name: "Electronic Products",
    href: "/shop/electronics",
    megaMenu: false
  },
  {
    id: 4,
    name: "Contact Us",
    href: "/contact",
    megaMenu: false
  }
];

// Social Media and Contact Icons
export const socialMediaIcons = [
  {
    id: 'phone',
    icon: 'FaPhone',
    href: 'tel:+917972839225',
    title: 'Call Us',
    external: false
  },
  {
    id: 'whatsapp',
    icon: 'FaWhatsapp',
    href: 'https://wa.me/917972839225',
    title: 'WhatsApp',
    external: true
  },
  {
    id: 'linkedin',
    icon: 'FaLinkedin',
    href: 'https://linkedin.com/company/shree-prathamesh-engineering',
    title: 'LinkedIn',
    external: true
  },
  {
    id: 'instagram',
    icon: 'FaInstagram',
    href: 'https://instagram.com/shreeprathameshengineering',
    title: 'Instagram',
    external: true
  },
  {
    id: 'twitter',
    icon: 'FaTwitter',
    href: 'https://twitter.com/shreeprathamesh',
    title: 'Twitter',
    external: true
  },
  {
    id: 'facebook',
    icon: 'FaFacebook',
    href: 'https://facebook.com/shreeprathameshengineering',
    title: 'Facebook',
    external: true
  },
  {
    id: 'email',
    icon: 'FaEnvelope',
    href: 'mailto:contact@prathmeshengineering.com',
    title: 'Email',
    external: false
  }
];

// Home page data
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
    categoryId: "cat_1753894678072_zydbmq0m4"
  },
  {
    id: 5,
    title: "Prototype PCBs",
    icon: "⚡",
    href: "/shop/prototype-pcbs",
    categoryId: "cat_1753894689818_mv1zqvuzs"
  },
];

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

// Footer data
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

// About Page Data
export const aboutStats = [
  {
    value: "15+",
    label: "Years Experience",
    delay: "0.2s"
  },
  {
    value: "50K+",
    label: "PCBs Delivered",
    delay: "0.4s"
  },
  {
    value: "500+",
    label: "Happy Clients",
    delay: "0.6s"
  },
  {
    value: "99.9%",
    label: "Quality Rate",
    delay: "0.8s"
  }
];

export const whyChooseUsFeatures = [
  {
    icon: "⚡",
    title: "Fast Turnaround",
    description: "Quick delivery times without compromising on quality, ensuring your projects stay on schedule."
  },
  {
    icon: "🛠️",
    title: "Expert Team",
    description: "Skilled professionals with years of experience in PCB design and manufacturing."
  },
  {
    icon: "🤝",
    title: "Customer Support",
    description: "Dedicated support team providing technical assistance and project guidance."
  }
];

export const leadershipTeam = [
  {
    name: "Prathmesh Shah",
    position: "Founder & CEO",
    description: "Visionary leader with 15+ years in electronics manufacturing",
    initials: "PS"
  },
  {
    name: "Dr. Rajesh Kumar",
    position: "Chief Technology Officer",
    description: "Expert in advanced PCB technologies and process optimization",
    initials: "RK"
  },
  {
    name: "Priya Mehta",
    position: "Quality Assurance Director",
    description: "Ensuring the highest standards in every product we deliver",
    initials: "PM"
  }
];

// Contact Page Data
export const contactStats = [
  {
    value: "24/7",
    label: "Engineering Support",
    delay: "0.2s"
  },
  {
    value: "<4HR",
    label: "Quote Response",
    delay: "0.4s"
  },
  {
    value: "1000+",
    label: "Projects Completed",
    delay: "0.6s"
  },
  {
    value: "99.8%",
    label: "Client Satisfaction",
    delay: "0.8s"
  }
];

export const contactMethods = [
  {
    iconType: "phone",
    title: "Call Us",
    info: "+91 79728 39225",
    delay: "0.1s"
  },
  {
    iconType: "email",
    title: "Email Support",
    info: "engineering@shreeprathmesh.com",
    delay: "0.2s"
  },
  {
    iconType: "location",
    title: "Visit Our Facility",
    info: "Dhaurakahra, Vijaypur, Mirzapur, Uttar Pradesh 231303",
    delay: "0.3s"
  },
  {
    iconType: "clock",
    title: "Business Hours",
    info: "Mon-Fri: 9:00 AM - 7:00 PM",
    delay: "0.4s"
  }
];

export const pcbServices = [
  {
    iconType: "tools",
    title: "Advanced Manufacturing",
    description: "State-of-the-art equipment with precision manufacturing capabilities for complex PCB designs"
  },
  {
    iconType: "shipping",
    title: "Lightning Fast Delivery",
    description: "Industry-leading turnaround times with rush service available for urgent projects"
  },
  {
    iconType: "industry",
    title: "Engineering Support",
    description: "Expert technical consultation from design optimization to manufacturing recommendations"
  }
];

export const manufacturingCapabilities = {
  leftColumn: [
    {
      label: "Layers",
      value: "1-16 layers"
    },
    {
      label: "Board Size",
      value: "5x5mm to 500x500mm"
    },
    {
      label: "Thickness",
      value: "0.4mm - 6.0mm"
    },
    {
      label: "Min Via",
      value: "0.1mm (4 mil)"
    }
  ],
  rightColumn: [
    {
      label: "Min Trace",
      value: "0.075mm (3 mil)"
    },
    {
      label: "Copper Weight",
      value: "0.5oz - 6oz"
    },
    {
      label: "Surface Finish",
      value: "HASL, ENIG, OSP"
    },
    {
      label: "Delivery",
      value: "24hrs - 15 days"
    }
  ]
};

export const isValidNameOrLastname = (input: string) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(input);
};

export const isValidEmailAddressFormat = (input: string) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(input);
};