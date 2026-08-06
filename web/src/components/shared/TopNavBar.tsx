'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { BRAND_INFO, NAV_LINKS } from '../../data/mockData';

export interface TopNavBarProps {
  readonly activeRoute?: string;
  readonly role?: 'guest' | 'student' | 'tutor' | 'admin';
  readonly userName?: string;
  readonly userBadge?: string;
}

export function TopNavBar({
  activeRoute = '/',
  role = 'guest',
  userName,
  userBadge,
}: TopNavBarProps) {
  return (
    <header className="bg-surface-container-lowest dark:bg-surface-container-high sticky top-0 w-full border-b border-border-whisper dark:border-outline-variant shadow-sm z-50 transition-colors">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-20">
        {/* Brand Logo & Name - Always Links to Home */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-container rounded-lg p-1"
        >
          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border-whisper dark:border-outline-variant shadow-xs shrink-0 bg-white">
            <Image
              src={BRAND_INFO.logoUrl}
              alt={BRAND_INFO.name}
              width={40}
              height={40}
              className="object-contain w-full h-full"
              priority
              unoptimized
            />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-lg md:text-xl font-bold text-primary dark:text-white tracking-tight group-hover:text-primary-hover transition-colors">
              {BRAND_INFO.name}
            </span>
            <span className="text-[11px] text-text-muted dark:text-gray-400 font-medium hidden sm:block">
              Les Privat SD & SMP
            </span>
          </div>
        </Link>

        {/* Navigation Links for Public Pages */}
        {role === 'guest' && (
          <nav className="hidden md:flex gap-6 items-center">
            {NAV_LINKS.map((link) => {
              const isActive = activeRoute === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-sm font-medium transition-colors hover:text-secondary px-2 py-1 rounded-md ${
                    isActive
                      ? 'text-primary dark:text-white font-semibold'
                      : 'text-text-muted dark:text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {role === 'guest' ? (
            <>
              <Link
                href="/auth"
                className="hidden sm:inline-flex text-xs md:text-sm font-semibold text-primary dark:text-gray-200 hover:text-primary-hover px-3 py-2 rounded-xl transition-colors"
              >
                Masuk Portal
              </Link>
              <Link
                href="/student/search"
                className="bg-primary-container hover:bg-primary-hover text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm active:scale-95 transition-all duration-150 inline-flex items-center gap-1.5"
              >
                Cari Guru Privat
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {userBadge && (
                <div className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{userBadge}</span>
                </div>
              )}
              {userName && (
                <div className="flex items-center gap-2 pl-2 border-l border-border-whisper dark:border-outline-variant">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-semibold text-text-primary dark:text-white leading-tight">
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
                className="p-2 rounded-xl border border-border-whisper dark:border-outline-variant text-text-muted hover:text-primary dark:hover:text-white hover:bg-surface-container-low transition-colors"
                title="Bantuan"
              >
                <HelpCircle className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
