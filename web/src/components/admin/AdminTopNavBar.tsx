'use client';

import React from 'react';
import { TopNavBar } from '../shared/TopNavBar';
import { useUser } from '@/src/hooks/useUser';

export interface AdminTopNavBarProps {
  readonly activeRoute?: string;
}

export function AdminTopNavBar({ activeRoute = '/admin/dashboard' }: AdminTopNavBarProps) {
  const { user } = useUser();

  const adminName = user?.full_name || user?.name || 'Administrator Pusat';
  const adminAvatar = user?.avatar_url || user?.image || undefined;
  const tutorStatus = user?.status;

  const isVerified = tutorStatus === 'verified' || tutorStatus === 'active';
  const displayRoleLabel = isVerified ? 'Admin & Tutor' : 'Admin';

  return (
    <TopNavBar
      activeRoute={activeRoute}
      role="admin"
      customRoleLabel={displayRoleLabel}
      userName={adminName}
      userBadge="Admin Master"
      userAvatar={adminAvatar}
    />
  );
}
