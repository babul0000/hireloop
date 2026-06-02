import CtaSection from "@/components/CtaSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import HeroBanner from "@/components/HeroBanner";
import JobDiscoverySection from "@/components/JobDiscoverySection";
import PricingSection from "@/components/PricingSection";


export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <JobDiscoverySection/>
      <FeaturesGrid/>
      <PricingSection/>
      <CtaSection/>
    </div>
  );
}