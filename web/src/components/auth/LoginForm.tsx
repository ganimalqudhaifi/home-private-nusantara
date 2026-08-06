'use client';

import React, { useState } from'react';
import Link from'next/link';
import { useRouter } from'next/navigation';
import { Mail, Lock, Eye, EyeOff } from'lucide-react';
import { Button } from'../shared/Button';

export interface LoginFormProps {
 readonly onSuccess?: () => void;
 readonly className?: string;
}

export function LoginForm({ onSuccess, className ='' }: LoginFormProps) {
 const router = useRouter();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);
 const [role, setRole] = useState<'student' |'tutor' |'admin'>('student');
 const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setIsLoading(true);

 setTimeout(() => {
 setIsLoading(false);
 if (onSuccess) onSuccess();

 if (role ==='admin' || email.includes('admin')) {
 router.push('/admin/dashboard');
 } else if (role ==='tutor' || email.includes('tutor')) {
 router.push('/tutor/dashboard');
 } else {
 router.push('/student/dashboard');
 }
 }, 600);
 };

 return (
 <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
 {/* Quick Demo Role Selector */}
 <div className="flex p-1 bg-surface-container-low rounded-xl gap-1">
 <button
 type="button"
 onClick={() => setRole('student')}
 className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
 role ==='student'
 ?'bg-white text-primary shadow-xs'
 :'text-text-muted hover:text-text-primary'
 }`}
 >
 Masuk Siswa
 </button>
 <button
 type="button"
 onClick={() => setRole('tutor')}
 className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
 role ==='tutor'
 ?'bg-white text-primary shadow-xs'
 :'text-text-muted hover:text-text-primary'
 }`}
 >
 Masuk Pengajar
 </button>
 <button
 type="button"
 onClick={() => setRole('admin')}
 className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
 role ==='admin'
 ?'bg-white text-primary shadow-xs'
 :'text-text-muted hover:text-text-primary'
 }`}
 >
 Masuk Admin
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
 role ==='admin'
 ?'admin@homeprivatenusantara.id'
 : role ==='tutor'
 ?'tutor@homeprivatenusantara.id'
 :'orangtua@email.com'
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
 type={showPassword ?'text' :'password'}
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
 Masuk ke Portal {role ==='admin' ?'Admin' : role ==='tutor' ?'Pengajar' :'Siswa'}
 </Button>
 </form>
 );
}
