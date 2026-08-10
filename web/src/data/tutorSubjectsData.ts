export interface TutorSubjectItem {
  readonly id: string;
  readonly name: string;
  readonly category: 'PAUD/TK' | 'SD' | 'SMP';
}

export const TUTOR_SUBJECT_OPTIONS: readonly TutorSubjectItem[] = [
  { id: 'calistung', name: 'Calistung', category: 'PAUD/TK' },
  { id: 'matematika-sd', name: 'Matematika SD', category: 'SD' },
  { id: 'bahasa-inggris-sd', name: 'Bahasa Inggris SD', category: 'SD' },
  { id: 'ipa-sd', name: 'IPA SD', category: 'SD' },
  { id: 'ips-sd', name: 'IPS SD', category: 'SD' },
  { id: 'matematika-smp', name: 'Matematika SMP', category: 'SMP' },
  { id: 'bahasa-inggris-smp', name: 'Bahasa Inggris SMP', category: 'SMP' },
  { id: 'ipa-smp', name: 'IPA SMP', category: 'SMP' },
  { id: 'ips-smp', name: 'IPS SMP', category: 'SMP' },
  { id: 'fisika-smp', name: 'Fisika SMP', category: 'SMP' },
  { id: 'biologi-smp', name: 'Biologi SMP', category: 'SMP' },
];

export const TUTOR_SUBJECT_NAMES: readonly string[] = TUTOR_SUBJECT_OPTIONS.map(
  (subject) => subject.name
);
