'use client';

import React, { useEffect, useState } from'react';
import Link from'next/link';
import Image from'next/image';
import { ShieldCheck, HelpCircle, Menu, X } from'lucide-react';
import { BRAND_INFO, NAV_LINKS } from'../../data/mockData';

export interface TopNavBarProps {
 readonly activeRoute?: string;
 readonly role?:'guest' |'student' |'tutor' |'admin';
 readonly userName?: string;
 readonly userBadge?: string;
}

export function TopNavBar({
 activeRoute ='/',
 role ='guest',
 userName,
 userBadge,
 }: TopNavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key ==='Escape') setIsMobileMenuOpen(false);
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
 <header className="bg-surface-container-lowest sticky top-0 w-full border-b border-border-whisper shadow-sm z-50 animate-fade-in">
 <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-20">
 {/* Brand Logo & Name - Always Links to Home */}
 <Link
 href="/"
 className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-container rounded-lg p-1"
 >
 <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border-whisper shadow-xs shrink-0 bg-white">
 <Image
 src={BRAND_INFO.logoUrl}
 alt={BRAND_INFO.name}
 width={40}
 height={40}
 className="object-contain w-full h-full"
  priority
  />
 </div>
 <div className="flex flex-col">
 <span className="font-headline text-lg md:text-xl font-bold text-primary tracking-tight group-hover:text-primary-hover transition-colors">
 {BRAND_INFO.name}
 </span>
 <span className="text-[11px] text-text-muted font-medium hidden sm:block">
 Les Privat SD & SMP
 </span>
 </div>
 </Link>

 {/* Navigation Links for Public Pages */}
 {role ==='guest' && (
 <nav className="hidden md:flex gap-6 items-center">
 {NAV_LINKS.map((link) => {
 const isActive = activeRoute === link.href;
 return (
 <Link
 key={link.href}
 href={link.href}
 className={`font-body text-sm font-medium transition-colors hover:text-secondary px-2 py-1 rounded-md relative after:absolute after:left-2 after:right-2 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-secondary after:transition-transform hover:after:scale-x-100 ${
 isActive
 ?'text-primary font-semibold'
 :'text-text-muted'
 }`}
 >
 {link.label}
 </Link>
 );
 })}
 </nav>
 )}

  {/* Action Buttons */}
  <div className="flex items-center gap-2 md:gap-3">
  {role ==='guest' && (
  <button
  type="button"
  onClick={() => setIsMobileMenuOpen((open) => !open)}
  className="md:hidden p-2 rounded-xl border border-border-whisper text-text-muted hover:text-primary hover:bg-surface-container-low transition-colors"
  aria-label={isMobileMenuOpen ?'Tutup menu navigasi' :'Buka menu navigasi'}
  aria-expanded={isMobileMenuOpen}
  >
  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
  </button>
  )}
        <div className="hidden md:flex items-center gap-3">
          {role === 'guest' ? (
            <>
              <Link
                href="/auth"
                className="hidden sm:inline-flex text-xs md:text-sm font-semibold text-primary hover:text-primary-hover px-3 py-2 rounded-xl transition-colors"
              >
                Masuk Portal
              </Link>
              <a
                href="#daftar"
                className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm active:scale-95 transition-all duration-150 inline-flex items-center gap-1.5"
              >
                Daftar Sekarang
              </a>
            </>
          ) : (
 <div className="flex items-center gap-3">
 {userBadge && (
 <div className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-2.5 py-1 rounded-full font-medium">
 <ShieldCheck className="w-3.5 h-3.5" />
 <span>{userBadge}</span>
 </div>
 )}
 {userName && (
 <div className="flex items-center gap-2 pl-2 border-l border-border-whisper">
 <div className="text-right hidden sm:block">
 <p className="text-xs font-semibold text-text-primary leading-tight">
 {userName}
 </p>
 <p className="text-[10px] text-text-muted capitalize">{role}</p>
 </div>
 <div className="w-9 h-9 rounded-full bg-primary-container text-white flex items-center justify-center text-xs font-bold shadow-xs">
 {userName.substring(0, 2).toUpperCase()}
 </div>
 </div>
 )}
 <Link
 href="/#faq"
 className="p-2 rounded-xl border border-border-whisper text-text-muted hover:text-primary hover:bg-surface-container-low transition-colors"
 title="Bantuan"
 >
 <HelpCircle className="w-4 h-4" />
 </Link>
 </div>
 )}
   </div>
   </div>
   </div>
 
   {role ==='guest' && isMobileMenuOpen && (
  <>
  <button
  type="button"
  aria-label="Tutup menu navigasi"
  className="fixed inset-0 top-20 z-40 bg-slate-900/20 md:hidden"
  onClick={closeMobileMenu}
  />
  <nav className="absolute left-4 right-4 top-[calc(100%-0.5rem)] z-50 rounded-2xl border border-border-whisper bg-surface-container-lowest p-3 shadow-xl animate-scale-in md:hidden">
  <div className="flex flex-col gap-1">
  {NAV_LINKS.map((link) => {
  const isActive = activeRoute === link.href;
  return (
  <Link
  key={link.href}
  href={link.href}
  onClick={closeMobileMenu}
  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-surface-container-low hover:text-primary ${isActive ?'bg-surface-container-low text-primary' :'text-text-muted'}`}
  >
  {link.label}
  </Link>
  );
  })}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border-whisper pt-3">
              <Link href="/auth" onClick={closeMobileMenu} className="rounded-xl border border-border-whisper px-3 py-2.5 text-center text-xs font-bold text-primary hover:bg-surface-container-low">
                Masuk Portal
              </Link>
              <a href="#daftar" onClick={closeMobileMenu} className="rounded-xl bg-[#DC2626] px-3 py-2.5 text-center text-xs font-bold text-white hover:bg-[#B91C1C]">
                Daftar Sekarang
              </a>
            </div>
  </div>
  </nav>
  </>
  )}
  </header>
 );
}
