import HeroSection from "@/components/hero-section";
import StatisticsSection from "@/components/statistics-section";
import FeaturesSection from "@/components/features-section";
import HowItWorks from "@/components/how-it-works";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/faq-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
