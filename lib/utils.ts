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
    info: "contact@prathmeshengineering.com",
    delay: "0.2s"
  },
  {
    iconType: "location",
    title: "Visit Our Facility",
    info: "Dhaurahara, Vijaypur, Mirzapur, Uttar Pradesh 231303",
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

// Policy Content
export const privacyPolicyContent = `Privacy Policy for Prathmesh Engineering

This Privacy Policy explains how Prathmesh Engineering collects, uses, and protects your personal information when you visit our website, use our services, or interact with us. Your privacy is important to us, and we are committed to safeguarding your personal data in compliance with applicable laws, including the Digital Personal Data Protection Act, 2023, of India.

By using our website and services, you agree to the collection and use of information in accordance with this policy.

1. Information We Collect
We collect various types of information to provide and improve our services to you.

a) Personal Data:
This is information that can be used to identify you personally. We may collect the following Personal Data when you voluntarily provide it to us:

Contact Information: Name, email address, phone number, and postal address.

Professional Information: Company name, job title, and business address.

Inquiry Details: Information you provide when you contact us with an inquiry, a service request, or a complaint.

Payment Details: Financial information such as credit/debit card details (handled securely by a third-party payment gateway and not stored on our servers) when you make a purchase.

b) Usage Data:
This is information collected automatically when you visit our website. It includes:

Your computer's Internet Protocol (IP) address.

Browser type and version.

The pages of our website you visit.

The time and date of your visit.

The time spent on those pages.

Unique device identifiers and other diagnostic data.

c) Cookies and Tracking Technologies:
We use cookies and similar tracking technologies to track the activity on our website and store certain information. Cookies are small files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some parts of our website.

2. How We Use Your Information
We use the collected information for various purposes, including:

To provide and maintain our services: This includes selling and servicing our electronics, electrical, and FCBC charger products.

To respond to your inquiries: We use your contact information to reply to your questions, provide quotes, and address your service requests.

To process transactions: We use your information to process payments and deliver products or services you have purchased.

To improve our website and services: We analyze usage data to understand how visitors use our site and make improvements to the user experience and functionality.

For marketing and communication: With your consent, we may send you newsletters, special offers, and information about our products and services. You can opt out of receiving these communications at any time.

To comply with legal obligations: We may use and disclose your information as required by law, such as to respond to a legal process or government request.

3. Data Sharing and Disclosure
We will not sell or rent your personal information to third parties. We may, however, share your information with trusted third parties in the following situations:

Service Providers: We may employ third-party companies and individuals to facilitate our services, such as website hosting, payment processing, or data analytics. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.

Business Transfers: In the event of a merger, acquisition, or asset sale, your Personal Data may be transferred as a business asset. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.

Legal Requirements: We may disclose your Personal Data in the good faith belief that such action is necessary to comply with a legal obligation, protect and defend the rights or property of Prathmesh Engineering, prevent or investigate possible wrongdoing in connection with the services, or protect the personal safety of users or the public.

4. Data Security
The security of your data is important to us. We implement reasonable technical and organizational measures to protect your Personal Data from unauthorized access, use, alteration, or destruction. While we strive to use commercially acceptable means to protect your information, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure.

5. Your Rights
Under the DPDP Act, 2023, you have the following rights regarding your personal data:

Right to Access: You have the right to request a copy of the personal data we hold about you.

Right to Correction and Erasure: You have the right to request that we correct any inaccurate information or erase your personal data from our records, subject to certain legal exceptions.

Right to Grievance Redressal: You have the right to file a complaint with the Data Protection Board of India if you believe your rights have been violated.

Right to Withdraw Consent: You have the right to withdraw your consent for the processing of your personal data at any time.

To exercise any of these rights, please contact us using the details provided below.

6. Links to Other Websites
Our website may contain links to other sites that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We strongly advise you to review the Privacy Policy of every site you visit.

7. Changes to This Privacy Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Changes to this Privacy Policy are effective when they are posted on this page. We encourage you to review this page periodically for any changes.

8. Contact Us
If you have any questions or suggestions about our Privacy Policy, please contact us:

Company Name: Prathmesh Engineering
Address: Dhaurahara, Vijaypur, Mirzapur, Uttar Pradesh 231303
Email: contact@prathmeshengineering.com
Phone: 7972839225`;

export const returnPolicyContent = `Return and Refund Policy

1. Introduction
At Prathmesh Engineering, we are committed to ensuring your satisfaction with every purchase. We offer a simple and transparent return and refund policy for all our products.

2. Return Window
You may initiate a return for an item purchased from our website within 12 days from the date of delivery.

3. Eligibility for Returns
To be eligible for a return, your item must meet the following conditions:

The product must be in its original, unused, and undamaged condition.

The product must be in its original packaging with all included accessories, manuals, and warranty cards intact.

You must have the original invoice or proof of purchase.

The product must not be a "Non-Returnable Item" as specified below.

4. Non-Returnable Items
The following items are not eligible for return:

Items that have been used, altered, or damaged by the customer.

Items without their original packaging, accessories, or tags.

Products that fall under specific categories, such as:

Used or Activated Electronics: Any electronics (e.g., FCBC chargers) that have been installed, activated, or show signs of use.

Electrical Components: Components that have been fitted or used.

"Final Sale" or "Clearance" items: Products marked as such at the time of purchase.

5. Return Process
To initiate a return, please follow these steps:

Contact Us: Send an email to contact@prathmeshengineering.com or call our customer service at 7972839225 with your order number and a clear reason for the return.

Provide Information: Our team may ask you to provide photos or videos of the product to assess its condition.

Return Authorization: If your return request is approved, we will provide you with a Return Authorization Number (RAN) and instructions on how to send the item back to us. Do not send the item back without an RAN.

Packaging: Securely package the item in its original box to prevent damage during transit.

Shipping: You will be responsible for the return shipping costs unless the return is due to a defect or an error on our part.

6. Refunds
Once we receive and inspect the returned item, we will notify you of the status of your refund.

Approval: If the return is approved, we will initiate a refund to your original payment method.

Processing Time: The refund amount will be credited to your account within 7-10 business days, depending on your bank or payment provider.

Partial Refunds: In certain cases, we may offer a partial refund, especially if the product is not in its original condition or has missing parts.

7. Damaged, Defective, or Incorrect Items

If you receive an item that is damaged, defective, or incorrect, please notify us immediately, preferably within 48 hours of delivery.

We will arrange for a free pick-up of the item and, subject to verification, will offer a full refund, replacement, or store credit, as per your preference and product availability.

All claims for damaged or incorrect items must be supported by photographic evidence of the item and its packaging.

8. Order Cancellation

You can cancel your order before it has been shipped. Once an order is shipped, it falls under our Return Policy.

To cancel an order, please contact our customer service team immediately.

9. Contact Us
For any questions regarding our Return and Refund Policy, please contact us at:

Email: contact@prathmeshengineering.com

Phone: 7972839225`;

export const termsConditionsContent = `Terms and Conditions for Prathmesh Engineering

1. Introduction

This document outlines the terms and conditions that govern your use of the website and the services and products provided by us.

By accessing or using the website, you, the user, agree to be bound by these Terms and our Privacy Policy.

If you do not agree to these Terms, you must not use or access this website.

2. Products and Services

Product Descriptions: We aim to provide accurate descriptions of the electronics, electrical components, PCB's, Custom PCB's with all type of Design and FCBC chargers we sell. However, we do not warrant that product descriptions or other content on the website are always accurate, complete, or error-free.

Pricing: All prices are subject to change without notice. We reserve the right to correct any errors in pricing.

Servicing: Our servicing for FCBC chargers and other products is subject to a separate service agreement. The terms of that agreement will be provided to you upon request for a service.

3. Orders and Payments

Order Acceptance: Your order is an offer to purchase. Our acceptance of your order is confirmed when we send you an email confirming that the item has been shipped. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or issues identified by our fraud prevention department.

Payment Methods: We accept credit cards, debit cards, net banking, UPI, etc.

Taxes: All prices listed are exclusive of applicable taxes unless otherwise stated. You are responsible for all applicable taxes and shipping fees.

4. Shipping and Delivery

Shipping Address: You are responsible for providing an accurate and complete shipping address. We are not liable for any delays or losses resulting from an incorrect address.

Delivery Timeframes: We provide estimated delivery times, but these are not guaranteed. We are not responsible for any delays caused by the courier service or unforeseen circumstances.

Risk of Loss: The risk of loss and title for all products purchased from the website pass to you upon our delivery to the carrier.

5. Returns, Refunds, and Replacements

Return Policy: Products may be returned within 12 days of receipt, provided they are in their original condition and packaging. We have some non Returnable Items.

Refunds: Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed to your original method of payment within a certain number of days.

Warranty: Products sold are subject to the manufacturer's warranty. Prathmesh Engineering offers any additional warranty for 1 years for some Products.

6. User Accounts

You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account.

You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to comply with this section.

7. Intellectual Property

All content on this website, including text, graphics, logos, images, and software, is the property of Prathmesh Engineering or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.

You may not use any of our intellectual property without our express written permission.

8. Disclaimers and Limitation of Liability

Disclaimer: The website and all products and services are provided on an "as is" and "as available" basis. We disclaim all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.

Limitation of Liability: In no event shall Prathmesh Engineering, its directors, employees, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the website or the products and services purchased.

9. Indemnification

You agree to indemnify, defend, and hold harmless Prathmesh Engineering, its officers, directors, employees, and agents from any and all claims, liabilities, damages, and costs (including legal fees) arising from your use of the website or your breach of these Terms.

10. Governing Law and Jurisdiction

These Terms and your use of the website shall be governed by and construed in accordance with the laws of Uttar Pradesh, India.

Any legal action or proceeding related to this website shall be brought exclusively in the courts located in Mirzapur, India.

11. Modifications to Terms

We reserve the right to modify these Terms at any time. Your continued use of the website after any such changes constitutes your acceptance of the new Terms.

12. Privacy Policy

Our Privacy Policy, which is available on a separate page on our website, describes how we collect, use, and protect your personal information. By using our website, you consent to the collection and use of your information as described in the Privacy Policy.`;