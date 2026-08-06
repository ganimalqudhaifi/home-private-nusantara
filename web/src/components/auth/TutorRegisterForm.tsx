'use client';

import React, { useState } from'react';
import { useRouter } from'next/navigation';
import { User, School, Phone, Upload, CheckCircle2 } from'lucide-react';
import { Button } from'../shared/Button';

export interface TutorRegisterFormProps {
 readonly onSuccess?: () => void;
 readonly className?: string;
}

export function TutorRegisterForm({
 onSuccess,
 className ='',
}: TutorRegisterFormProps) {
 const router = useRouter();
 const [name, setName] = useState('');
 const [university, setUniversity] = useState('');
 const [major, setMajor] = useState('');
 const [phone, setPhone] = useState('');
 const [selectedSubjects, setSelectedSubjects] = useState<readonly string[]>([
'Matematika SD-SMP',
 ]);
 const [cvFileName, setCvFileName] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);

 const subjectOptions = [
'Matematika SD-SMP',
'IPA Terpadu SMP',
'Bahasa Inggris SD-SMP',
'Tematik SD & Calistung',
'Fisika SMP',
'Olimpiade Sains SD-SMP',
 ];

 const toggleSubject = (sub: string) => {
 setSelectedSubjects((prev) =>
 prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
 );
 };

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setIsLoading(true);

 setTimeout(() => {
 setIsLoading(false);
 setIsSuccess(true);
 if (onSuccess) onSuccess();
 setTimeout(() => {
 router.push('/tutor/pending');
 }, 1200);
 }, 800);
 };

 if (isSuccess) {
 return (
 <div className="text-center py-8 space-y-4">
 <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
 <CheckCircle2 className="w-8 h-8" />
 </div>
 <h3 className="font-headline text-xl font-bold text-primary">
 Pendaftaran Pengajar Terkirim!
 </h3>
 <p className="text-sm text-text-muted max-w-sm mx-auto">
 Terima kasih <strong>{name}</strong>. Berkas Anda sedang dalam antrean review oleh admin
 pusat. Mengalihkan ke status verifikasi akun...
 </p>
 </div>
 );
 }

 return (
 <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {/* Full Name & Degree */}
 <div className="flex flex-col gap-1.5">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Nama Lengkap & Gelar
 </label>
 <div className="relative">
 <User className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
 <input
 required
 type="text"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="Contoh: Sarah Amanda, S.Pd."
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
 />
 </div>
 </div>

 {/* WhatsApp */}
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
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {/* University */}
 <div className="flex flex-col gap-1.5">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Asal Universitas / Kampus
 </label>
 <div className="relative">
 <School className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
 <input
 required
 type="text"
 value={university}
 onChange={(e) => setUniversity(e.target.value)}
 placeholder="Contoh: UNJ / UI / UGM / ITB"
 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
 />
 </div>
 </div>

 {/* Major */}
 <div className="flex flex-col gap-1.5">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Jurusan & Jenjang
 </label>
 <input
 required
 type="text"
 value={major}
 onChange={(e) => setMajor(e.target.value)}
 placeholder="Contoh: S1 Pendidikan Matematika"
 className="w-full px-4 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
 />
 </div>
 </div>

 {/* Teaching Subjects */}
 <div className="flex flex-col gap-2">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Pilihan Bidang & Mata Pelajaran yang Diampu
 </label>
 <div className="flex flex-wrap gap-2">
 {subjectOptions.map((sub) => {
 const isSelected = selectedSubjects.includes(sub);
 return (
 <button
 key={sub}
 type="button"
 onClick={() => toggleSubject(sub)}
 className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
 isSelected
 ?'bg-primary-container text-white font-semibold shadow-xs'
 :'bg-white text-text-muted border border-border-whisper hover:border-primary-container'
 }`}
 >
 {sub}
 </button>
 );
 })}
 </div>
 </div>

 {/* CV / Document Upload Box */}
 <div className="flex flex-col gap-1.5">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Unggah CV & Dokumen Ijazah / Transkrip (PDF / Gambar)
 </label>
 <label className="border-2 border-dashed border-border-whisper hover:border-primary-container rounded-xl p-4 text-center cursor-pointer bg-surface-container-low transition-colors flex flex-col items-center justify-center gap-1.5">
 <Upload className="w-5 h-5 text-primary-container" />
 <span className="text-xs font-semibold text-text-primary">
 {cvFileName ||'Klik untuk memilih file CV / Ijazah'}
 </span>
 <span className="text-[11px] text-text-muted">Maksimal file 10MB (PDF, JPG, PNG)</span>
 <input
 type="file"
 className="hidden"
 onChange={(e) => {
 if (e.target.files && e.target.files[0]) {
 setCvFileName(e.target.files[0].name);
 }
 }}
 />
 </label>
 </div>

 <Button
 type="submit"
 variant="primary"
 size="lg"
 isLoading={isLoading}
 className="w-full mt-2 font-bold"
 >
 Kirim Pendaftaran Tutor & Masuk Antrean Verifikasi
 </Button>
 </form>
 );
}
