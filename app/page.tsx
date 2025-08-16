import { siteMetadata } from "@/lib/siteMetadata";
export const metadata = siteMetadata;
import { CategoryMenu, Hero, IntroducingSection, ProductsSection, BrandsStrip, Testimonials } from "@/components";
import DeveloperEcosystemSection from "@/components/DeveloperEcosystemSection";

export default function Home() {
  return (
    <>
    <Hero />
    <BrandsStrip />
    <IntroducingSection />
    <DeveloperEcosystemSection />
    <CategoryMenu />
    <ProductsSection />
    <Testimonials />
    </>
  );
}
