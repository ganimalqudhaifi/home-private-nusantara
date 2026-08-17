import { redirect } from 'next/navigation';
import { auth } from '@/src/lib/auth-server';
import { getUserById, syncUserRoleWithAuth } from '@/src/lib/db-services';

export const dynamic = 'force-dynamic';

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

  const authRole = (session.user as any).role;
  const userName = session.user.name;
  const userImage = session.user.image || (session.user as any).avatarUrl || (session.user as any).picture || null;

  const user = 
    (await syncUserRoleWithAuth(session.user.id, session.user.email, authRole, userName, userImage)) || 
    (await getUserById(session.user.id, session.user.email));

  if (!user || user.status === null || user.status === undefined) {
    redirect('/tutor/onboarding');
  }

  return <>{children}</>;
}
