'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../shared/Button';
import { authClient } from '@/src/lib/auth-client';

export interface LoginFormProps {
  readonly onSuccess?: () => void;
  readonly className?: string;
}

export function LoginForm({ onSuccess, className = '' }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'tutor' | 'admin'>('tutor');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: role === 'admin' ? '/admin/dashboard' : '/tutor/dashboard',
      });
    } catch (err) {
      console.error('Google Sign In failed:', err);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) onSuccess();

      if (role === 'admin' || email.includes('admin')) {
        router.push('/admin/dashboard');
      } else {
        router.push('/tutor/dashboard');
      }
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      {/* Role Selector */}
      <div className="flex p-1 bg-surface-container-low rounded-xl gap-1">
        <button
          type="button"
          onClick={() => setRole('tutor')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            role === 'tutor'
              ? 'bg-white text-primary shadow-xs'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Portal Pengajar
        </button>
        <button
          type="button"
          onClick={() => setRole('admin')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            role === 'admin'
              ? 'bg-white text-primary shadow-xs'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Portal Admin
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
          Alamat Email
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              role === 'admin'
                ? 'admin@homeprivatenusantara.id'
                : 'tutor@homeprivatenusantara.id'
            }
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Password
          </label>
          <Link
            href="/auth?tab=forgot"
            className="text-xs font-semibold text-secondary hover:underline"
          >
            Lupa password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            required
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan kata sandi"
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full mt-2"
      >
        Masuk ke Portal {role === 'admin' ? 'Admin' : 'Pengajar'}
      </Button>

      <div className="relative my-4 flex items-center justify-center">
        <div className="border-t border-border-whisper w-full" />
        <span className="bg-surface-container-lowest px-3 text-xs text-text-muted absolute">atau</span>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
        className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-border-whisper bg-surface-container-lowest hover:bg-surface-container-low text-text-primary text-sm font-semibold transition-all shadow-xs disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
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
        {isGoogleLoading ? 'Menghubungkan...' : 'Lanjutkan dengan Google'}
      </button>
    </form>
  );
}

