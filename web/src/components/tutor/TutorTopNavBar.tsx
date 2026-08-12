'use client';

import React, { useState, useEffect } from 'react';
import { TopNavBar } from '../shared/TopNavBar';

export interface TutorTopNavBarProps {
  readonly activeRoute: string;
  readonly preloadedUser?: {
    name?: string;
    avatar?: string;
    role?: string;
    status?: string;
  };
  readonly isLoadingPreloaded?: boolean;
}

export function TutorTopNavBar({
  activeRoute,
  preloadedUser,
  isLoadingPreloaded = false,
}: TutorTopNavBarProps) {
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined);
  const [userRole, setUserRole] = useState<'guest' | 'student' | 'tutor' | 'admin'>('tutor');
  const [tutorStatus, setTutorStatus] = useState<string | undefined>(undefined);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    // If parent component provides the data, use it directly to avoid duplicate fetching
    if (preloadedUser !== undefined) {
      setUserName(preloadedUser.name || '');
      setUserAvatar(preloadedUser.avatar);
      setUserRole((preloadedUser.role as any) || 'tutor');
      setTutorStatus(preloadedUser.status);
      setIsLoadingUser(isLoadingPreloaded);
      return;
    }

    // Otherwise, fetch independently
    let isMounted = true;
    setIsLoadingUser(true);
    fetch('/api/user/me')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.authenticated && data.user) {
          setUserRole(data.user.role || 'tutor');
          setUserName(data.user.full_name || data.user.name || '');
          setUserAvatar(data.user.avatar_url || data.user.image);
          setTutorStatus(data.user.status);
        }
      })
      .catch((err) => console.error('Error fetching user profile for navbar:', err))
      .finally(() => {
        if (isMounted) setIsLoadingUser(false);
      });

    return () => {
      isMounted = false;
    };
  }, [preloadedUser, isLoadingPreloaded]);

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
      isLoadingUser={isLoadingUser}
      userBadge={userBadge}
    />
  );
}
