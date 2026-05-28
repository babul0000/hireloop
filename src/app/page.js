import FeaturesGrid from "@/components/FeaturesGrid";
import HeroBanner from "@/components/HeroBanner";
import JobDiscoverySection from "@/components/JobDiscoverySection";


export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <JobDiscoverySection/>
      <FeaturesGrid/>
    </div>
  );
}
