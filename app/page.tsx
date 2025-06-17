import { HeroSection } from "@/components/marketing/hero-section"
import { FeaturesSection } from "@/components/marketing/features-section"
import { PricingSection } from "@/components/marketing/pricing-section"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { CTASection } from "@/components/marketing/cta-section"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
