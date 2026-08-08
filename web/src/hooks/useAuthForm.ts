'use client';

import { useState } from 'react';

export type AuthTabType = 'login' | 'tutor';

export interface UseAuthFormProps {
  readonly initialTab?: AuthTabType;
}

export function useAuthForm({ initialTab = 'login' }: UseAuthFormProps = {}) {
  const [activeTab, setActiveTab] = useState<AuthTabType>(initialTab);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return {
    activeTab,
    setActiveTab,
    showPassword,
    setShowPassword,
    isSubmitted,
    setIsSubmitted,
  };
}

