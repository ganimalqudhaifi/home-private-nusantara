import React from'react';

export interface BadgeProps {
 readonly children: React.ReactNode;
 readonly variant?:'primary' |'secondary' |'emerald' |'warning' |'info' |'outline';
 readonly size?:'sm' |'md';
 readonly className?: string;
}

export function Badge({
 children,
 variant ='primary',
 size ='md',
 className ='',
}: BadgeProps) {
 const variantStyles = {
 primary:'bg-primary-fixed text-primary border border-primary-fixed-dim',
 secondary:'bg-red-50 text-secondary border border-red-200',
 emerald:'bg-emerald-50 text-emerald-800 border border-emerald-200',
 warning:'bg-amber-50 text-status-warning border border-amber-200',
 info:'bg-blue-50 text-blue-900 border border-blue-200',
 outline:'bg-transparent text-text-muted border border-border-whisper',
 };

 const sizeStyles = {
 sm:'text-[11px] px-2 py-0.5 font-semibold',
 md:'text-xs px-2.5 py-1 font-semibold',
 };

 return (
 <span
 className={`inline-flex items-center gap-1.5 rounded-full transition-colors font-sans ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
 >
 {children}
 </span>
 );
}
