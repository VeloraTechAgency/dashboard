import { PublicLayout } from '../components/layout/PublicLayout';
import { HeroSection } from '../components/landing/HeroSection';
import { ServicesSection } from '../components/landing/ServicesSection';
import { ProjectsSection } from '../components/landing/ProjectsSection';
import { StatsSection } from '../components/landing/StatsSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { HeroProfileCards } from '../components/landing/HeroProfileCards';
import { ContactSection } from '../components/landing/ContactSection';

export function LandingPage() {
  return (
    <PublicLayout>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <StatsSection />
      <TestimonialsSection />
      <HeroProfileCards />
      <ContactSection />
    </PublicLayout>
  );
}
