'use client';

import React from'react';
import Image from'next/image';
import { BadgeCheck, CheckCircle2 } from'lucide-react';
import { Tutor } from'../../types';

export interface InteractiveTutorPreviewCardProps {
 readonly tutor: Tutor;
 readonly className?: string;
}

export function InteractiveTutorPreviewCard({
 tutor,
 className ='',
}: InteractiveTutorPreviewCardProps) {
 return (
 <div
 className={`bg-white rounded-2xl border border-border-whisper p-5 shadow-sm flex items-start gap-4 hover:-translate-y-0.5 transition-transform ${className}`}
 >
 <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0 bg-gray-100">
 <Image
 src={tutor.avatar}
 alt={tutor.name}
 width={56}
 height={56}
 className="object-cover w-full h-full"
 unoptimized
 referrerPolicy="no-referrer"
 />
 </div>

 <div className="flex flex-col flex-1 min-w-0">
 <div className="flex items-center gap-1.5">
 <h3 className="font-headline text-base font-bold text-primary truncate">
 {tutor.name}
 </h3>
 <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
 </div>

 <p className="text-xs text-text-muted mt-0.5 truncate">
 {tutor.title}
 </p>

 <div className="mt-2.5 flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full w-fit">
 <CheckCircle2 className="w-3 h-3 text-emerald-600" />
 <span className="text-[11px] font-semibold tracking-wide">
 100% Lolos Seleksi Offline
 </span>
 </div>
 </div>
 </div>
 );
}
