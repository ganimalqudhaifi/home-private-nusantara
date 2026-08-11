'use client';

import { useEffect } from 'react';

export function AuthUrlCleaner() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.searchParams.has('neon_auth_session_verifier')) {
        const timer = setTimeout(() => {
          url.searchParams.delete('neon_auth_session_verifier');
          window.history.replaceState({}, '', url.toString());
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  return null;
}
