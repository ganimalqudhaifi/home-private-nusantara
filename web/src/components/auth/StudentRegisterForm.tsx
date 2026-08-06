'use client';

import React, { useState } from'react';
import { useRouter } from'next/navigation';
import { User, Phone, MapPin, CheckCircle2 } from'lucide-react';
import { Button } from'../shared/Button';
import { LevelType } from'../../types';

export interface StudentRegisterFormProps {
 readonly onSuccess?: () => void;
 readonly className?: string;
}

export function StudentRegisterForm({
 onSuccess,
 className ='',
}: StudentRegisterFormProps) {
 const router = useRouter();
 const [studentName, setStudentName] = useState('');
 const [level, setLevel] = useState<LevelType>('SD');
 const [grade, setGrade] = useState<number>(5);
 const [parentName, setParentName] = useState('');
 const [phone, setPhone] = useState('');
 const [address, setAddress] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);

 const grades =
 level ==='SD' ? [1, 2, 3, 4, 5, 6] : [7, 8, 9];

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setIsLoading(true);

 setTimeout(() => {
 setIsLoading(false);
 setIsSuccess(true);
 if (onSuccess) onSuccess();
 setTimeout(() => {
 router.push('/student/search');
 }, 1200);
 }, 800);
 };

 if (isSuccess) {
 return (
 <div className="text-center py-8 space-y-4">
 <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
 <CheckCircle2 className="w-8 h-8" />
 </div>
 <h3 className="font-headline text-xl font-bold text-primary">
 Pendaftaran Siswa Berhasil!
 </h3>
 <p className="text-sm text-text-muted max-w-sm mx-auto">
 Akun siswa atas nama <strong>{studentName}</strong> telah terdaftar. Anda akan dialihkan
 ke halaman pencarian guru privat...
 </p>
 </div>
 );
 }

 return (
 <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {/* Student Name */}
 <div className="flex flex-col gap-1.5">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Nama Lengkap Siswa
 </label>
 <div className="relative">
 <User className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
 <input
 required
 type="text"
 value={studentName}
 onChange={(e) => setStudentName(e.target.value)}
 placeholder="Contoh: Fajar Pratama"
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
 />
 </div>
 </div>

 {/* Parent / Guardian Name */}
 <div className="flex flex-col gap-1.5">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Nama Orang Tua / Wali
 </label>
 <input
 required
 type="text"
 value={parentName}
 onChange={(e) => setParentName(e.target.value)}
 placeholder="Contoh: Ibu Ratna Dewi"
 className="w-full px-4 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
 />
 </div>
 </div>

 {/* Grade Level Selection */}
 <div className="flex flex-col gap-2">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Jenjang & Kelas Siswa
 </label>
 <div className="flex gap-2 mb-1">
 <button
 type="button"
 onClick={() => {
 setLevel('SD');
 setGrade(1);
 }}
 className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
 level ==='SD'
 ?'bg-blue-900 text-white shadow-xs'
 :'bg-surface-container-low text-text-muted hover:bg-surface-container-high'
 }`}
 >
 Jenjang SD (Kelas 1 - 6)
 </button>
 <button
 type="button"
 onClick={() => {
 setLevel('SMP');
 setGrade(7);
 }}
 className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
 level ==='SMP'
 ?'bg-indigo-900 text-white shadow-xs'
 :'bg-surface-container-low text-text-muted hover:bg-surface-container-high'
 }`}
 >
 Jenjang SMP (Kelas 7 - 9)
 </button>
 </div>

 {/* Grade Pills */}
 <div className="flex flex-wrap gap-2">
 {grades.map((g) => (
 <button
 key={g}
 type="button"
 onClick={() => setGrade(g)}
 className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
 grade === g
 ?'bg-primary-container text-white shadow-xs'
 :'bg-white text-text-muted border border-border-whisper hover:border-primary-container'
 }`}
 >
 Kelas {g}
 </button>
 ))}
 </div>
 </div>

 {/* WhatsApp Number */}
 <div className="flex flex-col gap-1.5">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Nomor WhatsApp Aktif
 </label>
 <div className="relative">
 <Phone className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
 <input
 required
 type="tel"
 value={phone}
 onChange={(e) => setPhone(e.target.value)}
 placeholder="0812-xxxx-xxxx"
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
 />
 </div>
 </div>

 {/* Residential Address */}
 <div className="flex flex-col gap-1.5">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Alamat Rumah (Untuk Les Tatap Muka)
 </label>
 <div className="relative">
 <MapPin className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
 <textarea
 required
 rows={2}
 value={address}
 onChange={(e) => setAddress(e.target.value)}
 placeholder="Alamat lengkap, nomor rumah, RT/RW, kecamatan, dan patokan domisili"
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none resize-none"
 />
 </div>
 </div>

 <Button
 type="submit"
 variant="cta"
 size="lg"
 isLoading={isLoading}
 className="w-full mt-3 font-bold"
 >
 Daftar & Lanjut Pilih Jadwal Guru
 </Button>
 </form>
 );
}
