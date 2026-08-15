'use client';

import { SWRConfig } from 'swr';
import React from 'react';

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig 
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
        revalidateOnFocus: false, // Optional: avoid refetching on window focus for performance if desired, but default is true.
      }}
    >
      {children}
    </SWRConfig>
  );
};
