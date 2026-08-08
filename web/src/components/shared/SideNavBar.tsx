'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Clock,
  HelpCircle,
  Settings,
  LogOut,
  Users,
  CheckCircle,
  GraduationCap,
  CalendarDays,
} from 'lucide-react';
import { BRAND_INFO } from '../../data/mockData';

export interface SideNavBarProps {
  readonly role: 'tutor' | 'admin';
  readonly className?: string;
}

export function SideNavBar({ role, className = '' }: SideNavBarProps) {
  const pathname = usePathname();

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
          { label: 'Pengaturan Sistem', href: '/admin/dashboard', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();


 return (
 <aside
 className={`bg-surface-container-lowest border-r border-border-whisper w-64 flex flex-col p-4 shrink-0 min-h-screen sticky top-0 ${className}`}
 >
 {/* Brand Header */}
 <div className="mb-6 px-3 py-2">
 <Link href="/" className="flex items-center gap-3 group">
 <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-border-whisper shrink-0 bg-white">
 <Image
 src={BRAND_INFO.logoUrl}
 alt={BRAND_INFO.name}
 width={32}
 height={32}
 className="object-contain w-full h-full"
  priority
  />
 </div>
 <div className="flex flex-col">
 <h1 className="font-headline text-base font-bold text-primary tracking-tight">
 Home Private
 </h1>
 <p className="text-[11px] text-text-muted font-medium capitalize">
 Portal {role}
 </p>
 </div>
 </Link>
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
 ?'bg-primary-container text-white shadow-xs font-semibold'
 :'text-on-surface-variant hover:bg-surface-container-high'
 }`}
 >
 <Icon className={`w-4 h-4 shrink-0 ${isActive ?'text-white' :'text-text-muted'}`} />
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
        <Link
          href="/auth"
          className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-text-muted hover:text-[#DC2626] hover:bg-red-50 text-xs font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Portal</span>
        </Link>
      </div>
 </aside>
 );
}
