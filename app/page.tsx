import { Hero } from '@/components/Hero';
import { FeatureSection } from '@/components/FeatureSection';
import { HowItWorks } from '@/components/HowItWorks';
import { FoodShowcase } from '@/components/FoodShowcase';
import { ImpactSection } from '@/components/ImpactSection';
import { DonorsSection } from '@/components/DonorsSection';
import { CtaSection } from '@/components/CtaSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureSection />
      <HowItWorks />
      <FoodShowcase />
      <ImpactSection />
      <DonorsSection />
      <CtaSection />
    </>
  );
}
