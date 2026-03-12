import { Hero } from '@/components/Hero';
import { FeatureSection } from '@/components/FeatureSection';
import { HowItWorks } from '@/components/HowItWorks';
import { ImpactSection } from '@/components/ImpactSection';
import { CtaSection } from '@/components/CtaSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureSection />
      <HowItWorks />
      <ImpactSection />
      <CtaSection />
    </>
  );
}
