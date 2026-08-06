import React from'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 readonly variant?:'primary' |'cta' |'secondary' |'outline' |'ghost';
 readonly size?:'sm' |'md' |'lg';
 readonly isLoading?: boolean;
 readonly children: React.ReactNode;
 readonly className?: string;
}

export function Button({
 variant ='primary',
 size ='md',
 isLoading = false,
 children,
 className ='',
 disabled,
 ...rest
}: ButtonProps) {
 const variantStyles = {
 primary:
'bg-primary-container text-white hover:bg-primary-hover shadow-sm',
 cta:'bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-sm active:scale-95 transition-all',
 secondary:
'bg-surface-container-low text-text-primary hover:bg-surface-container-high border border-border-whisper',
 outline:
'bg-transparent border border-border-whisper text-text-primary hover:bg-surface-container-low',
 ghost:
'bg-transparent text-text-muted hover:text-text-primary hover:bg-surface-container-low',
 };

 const sizeStyles = {
 sm:'px-3 py-1.5 text-xs font-semibold rounded-lg',
 md:'px-4 py-2 text-sm font-semibold rounded-xl',
 lg:'px-6 py-3 text-base font-semibold rounded-xl',
 };

 return (
 <button
 disabled={disabled || isLoading}
 className={`inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
 {...rest}
 >
 {isLoading ? (
 <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
 ) : null}
 {children}
 </button>
 );
}
