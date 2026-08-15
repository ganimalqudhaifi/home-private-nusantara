'use client';

import React from 'react';
import { TopNavBar } from '../shared/TopNavBar';
import { useUser } from '@/src/hooks/useUser';

export interface TutorTopNavBarProps {
  readonly activeRoute: string;
}

export function TutorTopNavBar({ activeRoute }: TutorTopNavBarProps) {
  const { user, isLoading } = useUser();

  const userName = user?.full_name || user?.name || '';
  const userAvatar = user?.avatar_url || user?.image || undefined;
  const userRole = (user?.role as 'guest' | 'student' | 'tutor' | 'admin') || 'tutor';
  const tutorStatus = user?.status;

  const isVerified = tutorStatus === 'verified' || tutorStatus === 'active';

  let displayRoleLabel = userRole as string;
  if (userRole === 'admin') {
    displayRoleLabel = isVerified ? 'Admin & Tutor' : 'Admin';
  } else if (userRole === 'tutor') {
    displayRoleLabel = 'Tutor';
  }

  let userBadge = 'Menunggu Verifikasi';
  if (tutorStatus === 'on_leave') userBadge = 'Sedang Cuti';
  else if (tutorStatus === 'suspended') userBadge = 'Dibekukan';
  else if (tutorStatus === 'inactive') userBadge = 'Nonaktif';
  else if (isVerified) userBadge = 'Pengajar Terverifikasi';

  return (
    <TopNavBar
      activeRoute={activeRoute}
      role={userRole}
      customRoleLabel={displayRoleLabel}
      userName={userName}
      userAvatar={userAvatar}
      isLoadingUser={isLoading}
      userBadge={userBadge}
    />
  );
}
