import React from'react';
import Image from'next/image';
import { Star, Quote } from'lucide-react';
import { TESTIMONIALS } from'../../data/mockData';

export interface TestimonialsSectionProps {
 readonly className?: string;
}

export function TestimonialsSection({ className = '' }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className={`w-full py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
 <div className="text-center mb-12">
 <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">
 Dipercaya oleh Ribuan Orang Tua & Siswa
 </h2>
 <p className="text-text-muted text-sm md:text-base mt-2 max-w-2xl mx-auto">
 Kepuasan orang tua dan kemajuan akademik siswa adalah tolak ukur keberhasilan utama kami.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {TESTIMONIALS.map((t, idx) => (
 <div
 key={idx}
 className="bg-white border border-border-whisper p-6 rounded-2xl shadow-xs flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300 animate-fade-up"
 >
 <div>
 <div className="flex items-center justify-between mb-4">
 <div className="flex text-amber-500">
 {[...Array(t.rating)].map((_, i) => (
 <Star key={i} className="w-4 h-4 fill-current" />
 ))}
 </div>
 <Quote className="w-5 h-5 text-gray-300" />
 </div>
 <p className="text-sm text-text-primary leading-relaxed italic mb-6">
 &ldquo;{t.comment}&rdquo;
 </p>
 </div>

 <div className="flex items-center gap-3 pt-4 border-t border-border-whisper">
 <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-border-whisper">
 <Image
 src={t.avatar}
 alt={t.name}
 width={44}
 height={44}
 className="object-cover w-full h-full"
 unoptimized
 />
 </div>
 <div className="flex flex-col min-w-0">
 <h4 className="font-headline text-sm font-bold text-primary truncate">
 {t.name}
 </h4>
 <p className="text-xs text-text-muted truncate">{t.role}</p>
 <p className="text-[11px] text-gray-400 truncate">{t.location}</p>
 </div>
 </div>
 </div>
 ))}
 </div>
 </section>
 );
}
