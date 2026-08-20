'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Clock,
  HelpCircle,
  LogOut,
  Users,
  CheckCircle,
  GraduationCap,
  CalendarDays,
  BookOpen,
} from 'lucide-react';
import { BRAND_INFO } from '../../data/mockData';
import { useUser } from '../../hooks/useUser';
import { authClient } from '../../lib/auth-client';

export interface SideNavBarProps {
  readonly role: 'tutor' | 'admin';
  readonly className?: string;
}

export function SideNavBar({ role, className = '' }: SideNavBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useUser();

  const getNavItems = () => {
    switch (role) {
      case 'tutor':
        return [
          { label: 'Dashboard', href: '/tutor/dashboard', icon: LayoutDashboard },
          { label: 'Jadwal Mengajar', href: '/tutor/schedule', icon: CalendarDays },
          { label: 'Atur Ketersediaan', href: '/tutor/availability', icon: Clock },
          { label: 'Status Akun', href: '/tutor/pending', icon: CheckCircle },
          { label: 'Bantuan', href: '/#contact', icon: HelpCircle },
        ];
      case 'admin':
        return [
          { label: 'Control Hub', href: '/admin/dashboard', icon: LayoutDashboard },
          { label: 'Kurasi Pengajar', href: '/admin/tutors', icon: Users },
          { label: 'Direktori Klien/Siswa', href: '/admin/students', icon: GraduationCap },
          { label: 'Monitoring Jadwal', href: '/admin/bookings', icon: CalendarDays },
          { label: 'Mata Pelajaran', href: '/admin/subjects', icon: BookOpen },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

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

  return (
    <aside
      className={`bg-surface-container-lowest border-r border-border-whisper w-64 flex flex-col p-4 shrink-0 min-h-screen sticky top-0 ${className}`}
    >
      {/* User Profile Block (Moved to Top) */}
      <div className="flex items-center gap-3 px-3 py-3 bg-surface-container-low rounded-2xl mb-6">
        {isLoading ? (
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse shrink-0" />
        ) : userAvatar ? (
          <Image
            src={userAvatar}
            alt={userName}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border border-border-whisper shadow-xs shrink-0"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center text-sm font-bold shadow-xs shrink-0">
            {userName.substring(0, 2).toUpperCase()}
          </div>
        )}
        
        <div className="flex flex-col min-w-0 flex-1">
          {isLoading ? (
            <>
              <div className="h-3 w-24 bg-gray-200 animate-pulse rounded mb-1" />
              <div className="h-2 w-16 bg-gray-200 animate-pulse rounded" />
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-text-primary truncate" title={userName}>
                {userName}
              </p>
              <p className="text-[11px] text-text-muted capitalize truncate">
                {customRoleLabel}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-body text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary-container text-white shadow-xs font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-text-muted'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / CTA Actions */}
      <div className="mt-auto pt-4 border-t border-border-whisper space-y-2">
        {role === 'tutor' && (
          <Link
            href="/tutor/availability"
            className="w-full bg-primary-container hover:bg-primary-hover text-white py-2.5 px-4 rounded-xl text-xs font-bold text-center block shadow-xs transition-colors"
          >
            Atur Jam Mengajar
          </Link>
        )}

        <button
          onClick={handleSignOut}
          type="button"
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-text-muted hover:text-[#DC2626] hover:bg-red-50 text-xs font-semibold transition-colors mt-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Portal</span>
        </button>

        {/* Brand Header (Moved to Bottom) */}
        <div className="mt-4 pt-4 border-t border-border-whisper px-3 py-2">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-border-whisper shrink-0 bg-white">
              <Image
                src={BRAND_INFO.logoUrl}
                alt={BRAND_INFO.name}
                width={24}
                height={24}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-headline text-sm font-bold text-primary tracking-tight">
                Home Private
              </h1>
              <p className="text-[10px] text-text-muted font-medium capitalize">
                Portal {role}
              </p>
            </div>
          </Link>
        </div>

      </div>
    </aside>
  );
}
