import { siteMetadata } from "@/lib/siteMetadata";
export const metadata = siteMetadata;
import { CategoryMenu, Hero, IntroducingSection, ProductsSection, BrandsStrip, Testimonials } from "@/components";

export default function Home() {
  return (
    <>
    <Hero />
    <BrandsStrip />
    <IntroducingSection />
    <CategoryMenu />
    <ProductsSection />
    <Testimonials />
    </>
  );
}
