'use client';

import React, { useState, useEffect } from 'react';
import { TopNavBar } from '../shared/TopNavBar';

export interface AdminTopNavBarProps {
  readonly activeRoute?: string;
}

export function AdminTopNavBar({ activeRoute = '/admin/dashboard' }: AdminTopNavBarProps) {
  const [adminName, setAdminName] = useState('Administrator Pusat');
  const [adminAvatar, setAdminAvatar] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch('/api/user/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          const fetchedName = data.user.full_name;
          if (fetchedName) {
            setAdminName(fetchedName);
          }
          
          const fetchedAvatar = data.user.avatar_url;
          if (fetchedAvatar) {
            setAdminAvatar(fetchedAvatar);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch admin profile:', err);
      });
  }, []);

  return (
    <TopNavBar
      activeRoute={activeRoute}
      role="admin"
      userName={adminName}
      userBadge="Admin Master"
      userAvatar={adminAvatar}
    />
  );
}
