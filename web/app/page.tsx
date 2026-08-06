import React from'react';
import { TopNavBar } from'../src/components/shared/TopNavBar';
import { Footer } from'../src/components/shared/Footer';
import { HeroSection } from'../src/components/landing/HeroSection';
import { BentoValueProps } from'../src/components/landing/BentoValueProps';
import { CurriculumSection } from'../src/components/landing/CurriculumSection';
import { CurationStepsSection } from'../src/components/landing/CurationStepsSection';
import { TestimonialsSection } from'../src/components/landing/TestimonialsSection';
import { MOCK_TUTORS } from'../src/data/mockData';

export interface HomePageProps {
 readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
 // Await searchParams if provided (Next.js 15+ convention)
 if (searchParams) {
 await searchParams;
 }
 const featuredTutor = MOCK_TUTORS[0];

 return (
 <div className="bg-surface text-text-primary min-h-screen flex flex-col selection:bg-red-100 selection:text-red-900">
 {/* Top Navigation */}
 <TopNavBar activeRoute="/" role="guest" />

 {/* Main Content Sections */}
 <main className="flex-1 flex flex-col">
 <HeroSection featuredTutor={featuredTutor} />
 <BentoValueProps />
 <CurriculumSection />
 <CurationStepsSection />
 <TestimonialsSection />
 </main>

 {/* Footer */}
 <Footer />
 </div>
 );
}
