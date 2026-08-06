import React from 'react';
import { ClipboardCheck, GraduationCap, CalendarClock } from 'lucide-react';

export interface BentoValuePropsProps {
  readonly className?: string;
}

export function BentoValueProps({ className = '' }: BentoValuePropsProps) {
  const cards = [
    {
      title: '100% Offline-to-Online Curation',
      description:
        'Setiap tutor melewati proses seleksi ketat termasuk wawancara tatap muka offline dan tes kompetensi akademik sebelum terdaftar di platform kami.',
      icon: ClipboardCheck,
      iconBg: 'bg-blue-50 dark:bg-blue-950/40 text-primary-container dark:text-blue-300',
    },
    {
      title: 'Spesialisasi SD 1-6 & SMP 7-9',
      description:
        'Fokus eksklusif pada rentang usia kritis dengan metodologi pengajaran yang disesuaikan secara psikologis untuk anak-anak dan remaja awal.',
      icon: GraduationCap,
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300',
    },
    {
      title: 'Pencocokan Jadwal Real-Time',
      description:
        'Sistem kalender interaktif memungkinkan orang tua melihat ketersediaan slot tutor secara transparan dan memesan sesi tanpa delay atau tumpang-tindih.',
      icon: CalendarClock,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300',
    },
  ];

  return (
    <section
      id="about"
      className={`w-full bg-surface-container-low dark:bg-surface-container-high py-16 md:py-24 border-y border-border-whisper dark:border-outline-variant ${className}`}
    >
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary dark:text-white">
            Standar Kurasi Profesional
          </h2>
          <p className="text-text-muted dark:text-gray-300 text-sm md:text-base mt-2 max-w-2xl mx-auto">
            Sistem kami dirancang untuk memberikan ketenangan pikiran bagi orang tua dan efektivitas
            belajar maksimal bagi siswa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-surface-container-lowest p-7 rounded-2xl border border-border-whisper dark:border-outline-variant shadow-[0_2px_8px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-200 flex flex-col gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-lg font-bold text-primary dark:text-white">
                  {card.title}
                </h3>
                <p className="text-text-muted dark:text-gray-400 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
