import React from 'react';
import { headers } from 'next/headers';
import { TopNavBar } from '../src/components/shared/TopNavBar';
import { Footer } from '../src/components/shared/Footer';
import { HeroSection } from '../src/components/landing/HeroSection';
import { WhyChooseUsSection } from '../src/components/landing/WhyChooseUsSection';
import { PricingTableSection } from '../src/components/landing/PricingTableSection';
import { CurriculumSection } from '../src/components/landing/CurriculumSection';
import { CurationStepsSection } from '../src/components/landing/CurationStepsSection';
import { TestimonialsSection } from '../src/components/landing/TestimonialsSection';
import { QuickBookingFormSection } from '../src/components/landing/QuickBookingFormSection';
import { auth } from '../src/lib/auth-server';

export interface HomePageProps {
  readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  if (searchParams) {
    await searchParams;
  }

  let session = null;
  try {
    const res = await auth.getSession({ fetchOptions: { headers: await headers() } });
    session = res.data;
  } catch (err) {
    // Suppress cookie modification errors in Server Components
    // Client-side TopNavBar will fallback to useUser() automatically if this fails
    console.warn('Failed to fetch session on server:', err);
  }

  const role = ((session?.user as any)?.role as 'guest' | 'student' | 'tutor' | 'admin') || 'guest';
  const userName = session?.user?.name || undefined;
  const userAvatar = session?.user?.image || (session?.user as any)?.avatarUrl || undefined;

  return (
    <div className="bg-surface text-text-primary min-h-screen flex flex-col selection:bg-red-100 selection:text-red-900">
      {/* Top Navigation Bar */}
      <TopNavBar 
        activeRoute="/" 
        role={role} 
        userName={userName}
        userAvatar={userAvatar}
        hideUserName={true}
      />

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
