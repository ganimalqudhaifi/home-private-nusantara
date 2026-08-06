'use client';

import { useState, useCallback } from 'react';

export interface UseDrawerProps<T = unknown> {
  readonly initialOpen?: boolean;
  readonly initialData?: T | null;
}

export function useDrawer<T = unknown>({
  initialOpen = false,
  initialData = null,
}: UseDrawerProps<T> = {}) {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  const [data, setData] = useState<T | null>(initialData);

  const open = useCallback((drawerData?: T) => {
    if (drawerData !== undefined) {
      setData(drawerData);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
    setData,
  };
}
