import { HeroSection } from '@/components/HeroSection';
import { Navbar } from '@/components/Navbar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { SupportersSection } from '@/components/SupportersSection';
import { StatsSection } from '@/components/StatsSection';
import { Phase1Section } from '@/components/Phase1Section';
import { WhyTobeSection } from '@/components/WhyTobeSection';
import { Phase2Section } from '@/components/Phase2Section';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ArchitectureSection } from '@/components/ArchitectureSection';
import { ImpactSection } from '@/components/ImpactSection';
import { FutureVisionSection } from '@/components/FutureVisionSection';
import { CTASection } from '@/components/CTASection';
import { ImpactStrip } from '@/components/ImpactStrip';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />
      <HeroSection />
      <SupportersSection />
      <StatsSection />
      <Phase1Section />
      <WhyTobeSection />
      <Phase2Section />
      <HowItWorksSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <ArchitectureSection />
      <section id="impact">
        <ImpactSection />
      </section>
      <FutureVisionSection />
      <FAQSection />
      <CTASection />
      <ImpactStrip />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
