'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

export function TutorPendingSync() {
  const [status, setStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [tutorName, setTutorName] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const draftRaw = localStorage.getItem('tutor_registration_draft');
    if (!draftRaw) return;

    let retriesLeft = 3;

    const performSync = () => {
      try {
        const draft = JSON.parse(draftRaw);
        if (draft.name) setTutorName(draft.name);
        setStatus('syncing');

        fetch('/api/tutor/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(draft),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              localStorage.removeItem('tutor_registration_draft');
              setStatus('synced');
            } else {
              console.warn('Sync attempt notice:', data.error);
              if (retriesLeft > 0) {
                retriesLeft--;
                setTimeout(performSync, 1200);
              } else {
                setStatus('error');
              }
            }
          })
          .catch((err) => {
            console.error('Failed to sync tutor registration:', err);
            if (retriesLeft > 0) {
              retriesLeft--;
              setTimeout(performSync, 1200);
            } else {
              setStatus('error');
            }
          });
      } catch (err) {
        console.error('Error parsing registration draft:', err);
        localStorage.removeItem('tutor_registration_draft');
      }
    };

    // Small delay to allow OAuth verifier exchange to settle
    const timer = setTimeout(performSync, 600);
    return () => clearTimeout(timer);
  }, []);

  if (status === 'syncing') {
    return (
      <div className="mb-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3 animate-fade-in">
        <Loader2 className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
        <div>
          <strong>Menyimpan Berkas Pendaftaran...</strong>
          <p className="text-[11px] text-amber-700 mt-0.5">
            Menyinkronkan data profil dan mata pelajaran Anda ke sistem database server.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'synced') {
    return (
      <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3 animate-fade-in">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <div>
          <strong>Berkas Pendaftaran Berhasil Tersimpan!</strong>
          <p className="text-[11px] text-emerald-700 mt-0.5">
            Data pendaftaran {tutorName ? `atas nama ${tutorName} ` : ''}telah aman tersimpan di database dan siap direview admin.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
