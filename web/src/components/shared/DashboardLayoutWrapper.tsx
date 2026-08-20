'use client';

import React, { useState } from 'react';
import { SideNavBar } from './SideNavBar';
import { Menu } from 'lucide-react';

export interface DashboardLayoutWrapperProps {
  readonly children: React.ReactNode;
  readonly role: 'tutor' | 'admin';
}

export function DashboardLayoutWrapper({ children, role }: DashboardLayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface-container-lowest">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Tutup menu navigasi"
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SideNavBar role={role} className="h-screen overflow-y-auto" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden bg-white border-b border-border-whisper h-14 flex items-center px-4 shrink-0 sticky top-0 z-30">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-text-muted hover:text-primary rounded-lg hover:bg-surface-container-low transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-headline font-bold text-primary ml-2">Home Private</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}
