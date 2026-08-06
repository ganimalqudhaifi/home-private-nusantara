'use client';

import { useState } from'react';
import { LevelType } from'../types';

export type AuthTabType ='login' |'student' |'tutor';

export interface UseAuthFormProps {
 readonly initialTab?: AuthTabType;
}

export function useAuthForm({ initialTab ='login' }: UseAuthFormProps = {}) {
 const [activeTab, setActiveTab] = useState<AuthTabType>(initialTab);
 const [studentLevel, setStudentLevel] = useState<LevelType>('SD');
 const [studentGrade, setStudentGrade] = useState<number>(5);
 const [showPassword, setShowPassword] = useState<boolean>(false);
 const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

 return {
 activeTab,
 setActiveTab,
 studentLevel,
 setStudentLevel,
 studentGrade,
 setStudentGrade,
 showPassword,
 setShowPassword,
 isSubmitted,
 setIsSubmitted,
 };
}
