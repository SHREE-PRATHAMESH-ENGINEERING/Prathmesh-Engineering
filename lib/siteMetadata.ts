export const siteMetadata = {
  metadataBase: new URL("https://prathmeshengineering.com"),
  title: "PCB Manufacturing | Prathmesh Engineering",
  description: "Professional PCB manufacturing and electronics solutions in India.",
  keywords: [
    "PCB",
    "electronics",
    "manufacturing",
    "India",
    "Prathmesh Engineering"
  ],
  openGraph: {
    title: "PCB Manufacturing | Prathmesh Engineering",
    description: "Professional PCB manufacturing and electronics solutions in India.",
    url: "https://prathmeshengineering.com",
    images: ["/logo v1.png"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://prathmeshengineering.com"
  },
  other: {
    "ld+json": `{
      \"@context\": \"https://schema.org\",
      \"@type\": \"Organization\",
      \"name\": \"Prathmesh Engineering\",
      \"url\": \"https://prathmeshengineering.com\",
      \"logo\": \"https://prathmeshengineering.com/logo v1.png\"
    }`
  }
};
