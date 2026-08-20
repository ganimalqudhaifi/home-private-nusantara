'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut, ChevronDown, ShieldCheck, Menu } from 'lucide-react';
import { authClient } from '../../lib/auth-client';
import { useUser } from '../../hooks/useUser';

export interface DashboardHeaderProps {
  readonly onMenuClick?: () => void;
  readonly hideMenuButton?: boolean;
}

export function DashboardHeader({ onMenuClick, hideMenuButton = false }: DashboardHeaderProps) {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } catch (error: unknown) {
      console.error('Gagal melakukan sign out:', error);
    } finally {
      router.push('/');
      router.refresh();
    }
  };

  const role = user?.role || 'guest';
  const userName = user?.full_name || user?.name || (role === 'admin' ? 'Administrator Pusat' : '');
  const userAvatar = user?.avatar_url || user?.image || undefined;
  const tutorStatus = user?.status;
  const isVerified = tutorStatus === 'verified' || tutorStatus === 'active';

  let customRoleLabel = role as string;
  if (role === 'admin') {
    customRoleLabel = isVerified ? 'Admin & Tutor' : 'Admin';
  } else if (role === 'tutor') {
    customRoleLabel = 'Tutor';
  }

  let userBadge = '';
  if (role === 'admin') {
    userBadge = 'Admin Master';
  } else if (role === 'tutor') {
    userBadge = 'Menunggu Verifikasi';
    if (tutorStatus === 'on_leave') userBadge = 'Sedang Cuti';
    else if (tutorStatus === 'suspended') userBadge = 'Dibekukan';
    else if (tutorStatus === 'inactive') userBadge = 'Nonaktif';
    else if (isVerified) userBadge = 'Pengajar Terverifikasi';
  }

  return (
    <header className="bg-white border-b border-border-whisper h-16 flex items-center justify-between px-4 shrink-0 sticky top-0 z-30">
      <div className="flex items-center">
        {!hideMenuButton && (
          <button
            type="button"
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 mr-2 text-text-muted hover:text-primary rounded-lg hover:bg-surface-container-low transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 relative" ref={profileMenuRef}>
        {isLoading ? (
          <div className="hidden sm:inline-flex items-center w-32 h-6 bg-gray-200 rounded-full animate-pulse" />
        ) : userBadge ? (
          <div className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-2.5 py-1 rounded-full font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{userBadge}</span>
          </div>
        ) : null}

        {isLoading ? (
          <div className="border-l border-border-whisper pl-3 ml-1 flex items-center gap-2 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        ) : userName ? (
          <div className="border-l border-border-whisper pl-3 ml-1">
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 hover:bg-surface-container-low p-1.5 rounded-xl transition-colors focus:outline-none"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-text-primary leading-tight">{userName}</p>
                <p className="text-[10px] text-text-muted capitalize">{customRoleLabel}</p>
              </div>
              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt={userName}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover border border-border-whisper shadow-xs"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {userName.substring(0, 2).toUpperCase()}
                </div>
              )}
              <ChevronDown className="w-4 h-4 text-text-muted hidden sm:block" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-border-whisper rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
}
