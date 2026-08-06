'use client';

import { useState, useCallback } from 'react';

export interface UseModalProps<T = unknown> {
  readonly initialOpen?: boolean;
  readonly initialData?: T | null;
}

export function useModal<T = unknown>({
  initialOpen = false,
  initialData = null,
}: UseModalProps<T> = {}) {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  const [data, setData] = useState<T | null>(initialData);

  const open = useCallback((modalData?: T) => {
    if (modalData !== undefined) {
      setData(modalData);
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
