import React from 'react';
import { TopNavBar } from '../src/components/shared/TopNavBar';
import { Footer } from '../src/components/shared/Footer';
import { HeroSection } from '../src/components/landing/HeroSection';
import { WhyChooseUsSection } from '../src/components/landing/WhyChooseUsSection';
import { PricingTableSection } from '../src/components/landing/PricingTableSection';
import { CurriculumSection } from '../src/components/landing/CurriculumSection';
import { CurationStepsSection } from '../src/components/landing/CurationStepsSection';
import { TestimonialsSection } from '../src/components/landing/TestimonialsSection';
import { QuickBookingFormSection } from '../src/components/landing/QuickBookingFormSection';

export interface HomePageProps {
  readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  if (searchParams) {
    await searchParams;
  }

  return (
    <div className="bg-surface text-text-primary min-h-screen flex flex-col selection:bg-red-100 selection:text-red-900">
      {/* Top Navigation Bar */}
      <TopNavBar activeRoute="/" role="guest" />

      {/* Main Content Flow */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero with Gold Seal & 3 Pillars */}
        <HeroSection />

        {/* 2. 6 Reasons Why Choose Us (Direct from Brochure) */}
        <WhyChooseUsSection />

        {/* 3. Pricing Table (Per Month Rates from Brochure) */}
        <PricingTableSection />

        {/* 4. Curriculum Depth */}
        <CurriculumSection />

        {/* 5. Curation Steps */}
        <CurationStepsSection />

        {/* 6. Testimonials in Makassar & Gowa */}
        <TestimonialsSection />

        {/* 7. Dynamic WhatsApp Booking Form */}
        <QuickBookingFormSection />
      </main>

      {/* Footer with Socials & Service Area */}
      <Footer />
    </div>
  );
}
