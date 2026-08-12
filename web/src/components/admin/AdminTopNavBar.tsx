'use client';

import React, { useState, useEffect } from 'react';
import { TopNavBar } from '../shared/TopNavBar';

export interface AdminTopNavBarProps {
  readonly activeRoute?: string;
}

export function AdminTopNavBar({ activeRoute = '/admin/dashboard' }: AdminTopNavBarProps) {
  const [adminName, setAdminName] = useState('Administrator Pusat');
  const [adminAvatar, setAdminAvatar] = useState<string | undefined>(undefined);
  const [tutorStatus, setTutorStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch('/api/user/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          const fetchedName = data.user.full_name || data.user.name;
          if (fetchedName) {
            setAdminName(fetchedName);
          }
          
          const fetchedAvatar = data.user.avatar_url || data.user.image;
          if (fetchedAvatar) {
            setAdminAvatar(fetchedAvatar);
          }

          if (data.user.status) {
            setTutorStatus(data.user.status);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch admin profile:', err);
      });
  }, []);

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
