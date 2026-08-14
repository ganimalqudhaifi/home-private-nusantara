'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Menu, X, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { BRAND_INFO, NAV_LINKS } from '../../data/mockData';
import { authClient } from '../../lib/auth-client';

export interface TopNavBarProps {
  readonly activeRoute?: string;
  readonly role?: 'guest' | 'student' | 'tutor' | 'admin';
  readonly userName?: string;
  readonly userBadge?: string;
  readonly userAvatar?: string;
  readonly hideUserName?: boolean;
  readonly customRoleLabel?: string;
  readonly isLoadingUser?: boolean;
}

export function TopNavBar({
  activeRoute = '/',
  role = 'guest',
  userName,
  userBadge,
  userAvatar,
  hideUserName = false,
  customRoleLabel,
  isLoadingUser = false,
}: TopNavBarProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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

  return (
    <header className="bg-surface-container-lowest sticky top-0 w-full border-b border-border-whisper shadow-sm z-50 animate-fade-in">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-20">
        {/* Brand Logo & Name - Always Links to Home */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none rounded-lg p-1"
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
        {(role === 'guest' || activeRoute === '/') && (
          <nav className="hidden md:flex gap-6 items-center">
            {NAV_LINKS.map((link) => {
              const isActive = activeRoute === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-sm font-medium transition-colors hover:text-secondary px-2 py-1 rounded-md relative after:absolute after:left-2 after:right-2 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-secondary after:transition-transform hover:after:scale-x-100 ${
                    isActive ? 'text-primary font-semibold' : 'text-text-muted'
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
          {(role === 'guest' || activeRoute === '/') && (
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="md:hidden p-2 rounded-xl border border-border-whisper text-text-muted hover:text-primary hover:bg-surface-container-low transition-colors"
              aria-label={isMobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          {role === 'guest' ? (
            <div className="hidden md:flex items-center gap-3">
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
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3" ref={profileMenuRef}>
              {isLoadingUser ? (
                <div className="hidden sm:inline-flex items-center w-32 h-6 bg-gray-200 rounded-full animate-pulse" />
              ) : userBadge ? (
                <div className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-2.5 py-1 rounded-full font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{userBadge}</span>
                </div>
              ) : null}

              {isLoadingUser ? (
                <div className="relative border-l border-border-whisper pl-2 ml-1 flex items-center gap-2 p-1.5 animate-pulse">
                  {!hideUserName && (
                    <div className="text-right hidden sm:block">
                      <div className="h-3 w-32 bg-gray-200 rounded mb-1" />
                      <div className="h-2 w-16 bg-gray-200 rounded ml-auto" />
                    </div>
                  )}
                  <div className="w-9 h-9 rounded-full bg-gray-200 shadow-xs" />
                  <div className="w-4 h-4 bg-gray-200 rounded hidden sm:block" />
                </div>
              ) : userName ? (
                <div className="relative border-l border-border-whisper pl-2 ml-1">
                  <button
                    type="button"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 hover:bg-surface-container-low p-1.5 rounded-xl transition-colors focus:outline-none"
                  >
                    {!hideUserName && (
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-semibold text-text-primary leading-tight">
                          {userName}
                        </p>
                        <p className="text-[10px] text-text-muted capitalize">{customRoleLabel || role}</p>
                      </div>
                    )}
                    {userAvatar ? (
                      <Image
                        src={userAvatar}
                        alt={userName}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover border border-border-whisper shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary-container text-white flex items-center justify-center text-xs font-bold shadow-xs">
                        {userName.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <ChevronDown className="w-4 h-4 text-text-muted hidden sm:block" />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-border-whisper rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                      {role === 'admin' && (
                        <>
                          <Link
                            href="/admin/dashboard"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-surface-container-low hover:text-primary transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard Admin</span>
                          </Link>
                          <Link
                            href="/tutor/dashboard"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-surface-container-low hover:text-primary transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard Tutor</span>
                          </Link>
                        </>
                      )}
                      
                      {role === 'tutor' && (
                        <Link
                          href="/tutor/dashboard"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-surface-container-low hover:text-primary transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard Tutor</span>
                        </Link>
                      )}

                      {role === 'student' && (
                        <Link
                          href="/student/dashboard"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-surface-container-low hover:text-primary transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard Siswa</span>
                        </Link>
                      )}

                      <div className="h-px bg-border-whisper my-1" />
                      
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
          )}
        </div>
      </div>

      {(role === 'guest' || activeRoute === '/') && isMobileMenuOpen && (
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
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-surface-container-low hover:text-primary ${isActive ? 'bg-surface-container-low text-primary' : 'text-text-muted'}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {role === 'guest' && (
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border-whisper pt-3">
                  <Link
                    href="/auth"
                    onClick={closeMobileMenu}
                    className="rounded-xl border border-border-whisper px-3 py-2.5 text-center text-xs font-bold text-primary hover:bg-surface-container-low"
                  >
                    Masuk Portal
                  </Link>
                  <a
                    href="#daftar"
                    onClick={closeMobileMenu}
                    className="rounded-xl bg-[#DC2626] px-3 py-2.5 text-center text-xs font-bold text-white hover:bg-[#B91C1C]"
                  >
                    Daftar Sekarang
                  </a>
                </div>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
