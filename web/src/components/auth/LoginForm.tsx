'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, ShieldCheck, GraduationCap } from 'lucide-react';
import { authClient } from '@/src/lib/auth-client';

export interface LoginFormProps {
  readonly onSuccess?: () => void;
  readonly className?: string;
}

export function LoginForm({ onSuccess, className = '' }: LoginFormProps) {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<'tutor' | 'admin'>('tutor');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams?.get('error');
    if (errorParam === 'unregistered_tutor') {
      setErrorMessage(
        'Akun Google ini belum terdaftar sebagai pengajar. Silakan daftar terlebih dahulu melalui tab "Daftar Pengajar Baru".'
      );
    } else if (errorParam === 'unregistered_admin') {
      setErrorMessage(
        'Akun Google ini tidak memiliki hak akses sebagai Admin.'
      );
    }
  }, [searchParams]);

  const handleRoleChange = (newRole: 'tutor' | 'admin') => {
    setRole(newRole);
    setErrorMessage(null);
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    try {
      setIsGoogleLoading(true);
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: role === 'admin' ? '/admin/dashboard' : '/tutor/dashboard',
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Google Sign In failed:', err);
      if (role === 'admin') {
        setErrorMessage(
          'Akun Google ini tidak terdaftar atau tidak memiliki hak akses sebagai Admin.'
        );
      } else {
        setErrorMessage(
          'Akun Google ini belum terdaftar sebagai pengajar. Silakan daftar terlebih dahulu melalui tab "Daftar Pengajar Baru".'
        );
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Role Selector */}
      <div className="flex p-1 bg-surface-container-low rounded-xl gap-1 border border-border-whisper">
        <button
          type="button"
          onClick={() => handleRoleChange('tutor')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            role === 'tutor'
              ? 'bg-white text-primary shadow-xs font-bold'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Portal Pengajar</span>
        </button>
        <button
          type="button"
          onClick={() => handleRoleChange('admin')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            role === 'admin'
              ? 'bg-white text-primary shadow-xs font-bold'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Portal Admin</span>
        </button>
      </div>

      {/* Error Alert Banner */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-medium">{errorMessage}</div>
        </div>
      )}

      {/* Info Notice */}
      <div className="p-4 rounded-xl bg-surface-container-low border border-border-whisper text-center space-y-1">
        <p className="text-xs font-semibold text-text-primary">
          Masuk ke Portal {role === 'admin' ? 'Admin' : 'Pengajar'} dengan Single Sign-On (SSO)
        </p>
        <p className="text-[11px] text-text-muted">
          {role === 'tutor'
            ? 'Gunakan akun Google yang terdaftar saat Anda mengisi formulir pendaftaran pengajar.'
            : 'Gunakan akun Google yang terdaftar sebagai administrator Home Private Nusantara.'}
        </p>
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
        className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-white text-sm font-bold transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer"
      >
        <svg className="w-5 h-5 bg-white p-0.5 rounded-full shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>
          {isGoogleLoading
            ? 'Menghubungkan...'
            : `Masuk sebagai ${role === 'admin' ? 'Admin' : 'Pengajar'} via Google`}
        </span>
      </button>
    </div>
  );
}
