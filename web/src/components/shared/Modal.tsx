'use client';

import React, { useEffect } from'react';
import { X } from'lucide-react';

export interface ModalProps {
 readonly isOpen: boolean;
 readonly onClose: () => void;
 readonly title?: React.ReactNode;
 readonly children: React.ReactNode;
 readonly maxWidth?:'sm' |'md' |'lg' |'xl' |'2xl';
 readonly showCloseButton?: boolean;
}

export function Modal({
 isOpen,
 onClose,
 title,
 children,
 maxWidth ='lg',
 showCloseButton = true,
}: ModalProps) {
 useEffect(() => {
 const handleKeyDown = (e: KeyboardEvent) => {
 if (e.key ==='Escape') onClose();
 };

 if (isOpen) {
 document.body.style.overflow ='hidden';
 window.addEventListener('keydown', handleKeyDown);
 } else {
 document.body.style.overflow ='unset';
 }

 return () => {
 document.body.style.overflow ='unset';
 window.removeEventListener('keydown', handleKeyDown);
 };
 }, [isOpen, onClose]);

 if (!isOpen) return null;

 const maxWidthStyles = {
 sm:'max-w-sm',
 md:'max-w-md',
 lg:'max-w-lg',
 xl:'max-w-xl',
'2xl':'max-w-2xl',
 };

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
 {/* Backdrop */}
 <div
 className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs animate-fade-in"
 onClick={onClose}
 />

 {/* Modal Dialog */}
 <div
 className={`relative w-full ${maxWidthStyles[maxWidth]} bg-surface-container-lowest border border-border-whisper rounded-2xl shadow-2xl p-6 md:p-8 z-10 animate-scale-in overflow-hidden max-h-[90vh] flex flex-col`}
 >
 {/* Header */}
 {(title || showCloseButton) && (
 <div className="flex items-center justify-between pb-4 border-b border-border-whisper mb-4 shrink-0">
 {typeof title ==='string' ? (
 <h3 className="font-headline text-lg md:text-xl font-bold text-primary">
 {title}
 </h3>
 ) : (
 title
 )}
 {showCloseButton && (
 <button
 onClick={onClose}
 className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-container-low transition-colors"
 title="Tutup"
 >
 <X className="w-5 h-5" />
 </button>
 )}
 </div>
 )}

 {/* Body Content */}
 <div className="overflow-y-auto flex-1 pr-1">{children}</div>
 </div>
 </div>
 );
}
