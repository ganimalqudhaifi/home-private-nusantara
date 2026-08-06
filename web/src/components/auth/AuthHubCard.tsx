'use client';

import React from 'react';
import { useAuthForm, AuthTabType } from '../../hooks/useAuthForm';
import { LoginForm } from './LoginForm';
import { StudentRegisterForm } from './StudentRegisterForm';
import { TutorRegisterForm } from './TutorRegisterForm';

export interface AuthHubCardProps {
  readonly initialTab?: AuthTabType;
  readonly className?: string;
}

export function AuthHubCard({
  initialTab = 'login',
  className = '',
}: AuthHubCardProps) {
  const { activeTab, setActiveTab } = useAuthForm({ initialTab });

  return (
    <div
      className={`w-full max-w-2xl bg-white dark:bg-surface-container-low rounded-2xl border border-border-whisper dark:border-outline-variant shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden ${className}`}
    >
      <div className="p-6 md:p-8">
        {/* Title Header */}
        <div className="text-center mb-8">
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-primary dark:text-white mb-2">
            Selamat Datang di Home Private
          </h1>
          <p className="text-sm text-text-muted dark:text-gray-400">
            {activeTab === 'login'
              ? 'Masuk ke portal akun Anda untuk mengelola sesi belajar.'
              : activeTab === 'student'
              ? 'Daftarkan putra-putri Anda untuk bimbingan privat berkualitas di rumah.'
              : 'Bergabung sebagai pengajar terverifikasi Home Private Nusantara.'}
          </p>
        </div>

        {/* Segmented Tab Switcher */}
        <div className="flex p-1 bg-surface-container-low dark:bg-surface-container-high rounded-xl mb-8 border border-border-whisper dark:border-outline-variant">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold text-center transition-all ${
              activeTab === 'login'
                ? 'bg-primary-container text-white shadow-xs'
                : 'text-text-muted dark:text-gray-300 hover:text-text-primary hover:bg-white/50'
            }`}
          >
            Masuk Akun
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold text-center transition-all ${
              activeTab === 'student'
                ? 'bg-primary-container text-white shadow-xs'
                : 'text-text-muted dark:text-gray-300 hover:text-text-primary hover:bg-white/50'
            }`}
          >
            Daftar Siswa (SD/SMP)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tutor')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold text-center transition-all ${
              activeTab === 'tutor'
                ? 'bg-primary-container text-white shadow-xs'
                : 'text-text-muted dark:text-gray-300 hover:text-text-primary hover:bg-white/50'
            }`}
          >
            Daftar Pengajar
          </button>
        </div>

        {/* Form State Views */}
        <div className="transition-all duration-200">
          {activeTab === 'login' && <LoginForm />}
          {activeTab === 'student' && <StudentRegisterForm />}
          {activeTab === 'tutor' && <TutorRegisterForm />}
        </div>
      </div>
    </div>
  );
}
