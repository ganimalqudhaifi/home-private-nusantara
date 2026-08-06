import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../../data/mockData';

export interface FooterProps {
  readonly className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-primary text-white border-t border-primary-container mt-auto ${className}`}>
      <div className="w-full py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/20 bg-white p-1">
              <Image
                src={BRAND_INFO.logoUrl}
                alt={BRAND_INFO.name}
                width={36}
                height={36}
                className="object-contain w-full h-full"
                unoptimized
              />
            </div>
            <span className="font-headline text-xl font-bold text-white tracking-tight">
              {BRAND_INFO.name}
            </span>
          </Link>
          <p className="text-gray-300 text-sm max-w-md leading-relaxed">
            Platform les privat terkurasi 100% seleksi offline untuk siswa SD & SMP di Indonesia.
            Menghubungkan orang tua dengan pengajar berkualitas tinggi dan berintegritas.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full w-fit text-xs font-semibold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Terverifikasi Wawancara Offline</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline text-sm font-semibold text-white uppercase tracking-wider">
            Navigasi Cepat
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/#about" className="hover:text-white transition-colors">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href="/#programs" className="hover:text-white transition-colors">
                Program SD & SMP
              </Link>
            </li>
            <li>
              <Link href="/#curation" className="hover:text-white transition-colors">
                Alur Kurasi Tutor
              </Link>
            </li>
            <li>
              <Link href="/student/search" className="hover:text-white transition-colors">
                Cari Guru Privat
              </Link>
            </li>
            <li>
              <Link href="/auth" className="hover:text-white transition-colors">
                Portal Masuk
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline text-sm font-semibold text-white uppercase tracking-wider">
            Hubungi Kami
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={`https://wa.me/${BRAND_INFO.contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                +{BRAND_INFO.contact.whatsapp}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <a href={`mailto:${BRAND_INFO.contact.email}`} className="hover:text-white transition-colors">
                {BRAND_INFO.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{BRAND_INFO.contact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 px-4 md:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <p>© 2026 Home Private Nusantara. Seluruh Hak Cipta Dilindungi.</p>
        <div className="flex gap-6">
          <Link href="/#privacy" className="hover:text-white transition-colors">
            Kebijakan Privasi
          </Link>
          <Link href="/#terms" className="hover:text-white transition-colors">
            Syarat & Ketentuan
          </Link>
          <Link href="/#security" className="hover:text-white transition-colors">
            Standar Keamanan
          </Link>
        </div>
      </div>
    </footer>
  );
}
