import React from'react';
import { TopNavBar } from'../../src/components/shared/TopNavBar';
import { Footer } from'../../src/components/shared/Footer';
import { AuthHubCard } from'../../src/components/auth/AuthHubCard';
import { AuthTabType } from'../../src/hooks/useAuthForm';

export interface AuthPageProps {
 readonly searchParams?: Promise<{ tab?: string }>;
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
 const resolvedParams = searchParams ? await searchParams : {};
  const tabParam = resolvedParams.tab as AuthTabType | undefined;
  const initialTab: AuthTabType =
    tabParam === 'tutor' || tabParam === 'login' ? tabParam : 'login';

 return (
 <div className="bg-surface text-text-primary min-h-screen flex flex-col">
 <TopNavBar activeRoute="/auth" role="guest" />

 <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
 <AuthHubCard initialTab={initialTab} />
 </main>

 <Footer />
 </div>
 );
}
