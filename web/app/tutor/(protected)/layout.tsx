import { redirect } from 'next/navigation';
import { auth } from '@/src/lib/auth-server';
import { getUserById } from '@/src/lib/db-services';

export default async function ProtectedTutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;
  try {
    const { data } = await auth.getSession();
    session = data;
  } catch (error) {
    console.warn('Auth check failed:', error);
  }

  if (!session?.user) {
    redirect('/auth');
  }

  const user = await getUserById(session.user.id, session.user.email);
  if (!user || user.status === null || user.status === undefined) {
    redirect('/tutor/onboarding');
  }

  return <>{children}</>;
}
