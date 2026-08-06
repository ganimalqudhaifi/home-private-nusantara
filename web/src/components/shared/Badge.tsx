import React from 'react';

export interface BadgeProps {
  readonly children: React.ReactNode;
  readonly variant?: 'primary' | 'secondary' | 'emerald' | 'warning' | 'info' | 'outline';
  readonly size?: 'sm' | 'md';
  readonly className?: string;
}

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    primary: 'bg-primary-fixed text-primary border border-primary-fixed-dim dark:bg-primary-container dark:text-primary-fixed',
    secondary: 'bg-red-50 text-secondary border border-red-200 dark:bg-red-950/30 dark:text-red-300',
    emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300',
    warning: 'bg-amber-50 text-status-warning border border-amber-200 dark:bg-amber-950/30 dark:text-amber-300',
    info: 'bg-blue-50 text-blue-900 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-300',
    outline: 'bg-transparent text-text-muted border border-border-whisper dark:border-outline-variant',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-semibold',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full transition-colors font-sans ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
