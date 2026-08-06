import React from'react';
import { TopNavBar } from'../../../src/components/shared/TopNavBar';
import { Footer } from'../../../src/components/shared/Footer';
import { AuthHubCard } from'../../../src/components/auth/AuthHubCard';

export interface RegisterStudentPageProps {
 readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RegisterStudentPage({ searchParams }: RegisterStudentPageProps) {
 if (searchParams) await searchParams;

 return (
 <div className="bg-surface text-text-primary min-h-screen flex flex-col">
 <TopNavBar activeRoute="/auth" role="guest" />
 <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
 <AuthHubCard initialTab="student" />
 </main>
 <Footer />
 </div>
 );
}
