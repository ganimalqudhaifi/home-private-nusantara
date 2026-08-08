import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../../data/mockData';

export interface FooterProps {
  readonly className?: string;
}

function InstagramIcon({ className = 'w-4 h-4' }: { readonly className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = 'w-4 h-4' }: { readonly className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.49v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.87-.09z" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }: { readonly className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.634.246-1.634 1.428v2.552h4.544l-.459 3.667h-4.085v7.98c-1.333.155-2.689.155-4.022 0z" />
    </svg>
  );
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
            <div>
              <span className="font-headline text-xl font-bold text-white tracking-tight block">
                {BRAND_INFO.name}
              </span>
              <span className="text-[11px] text-gray-300 font-medium">
                {BRAND_INFO.tagline}
              </span>
            </div>
          </Link>
          <p className="text-gray-300 text-sm max-w-md leading-relaxed">
            Platform bimbingan belajar privat terpercaya di rumah untuk Calistung, SD & SMP.
            Melayani Kota Makassar & Kabupaten Gowa. Berpengalaman sejak {BRAND_INFO.contact.sinceYear}.
          </p>

          {/* Social Media Links with Authentic Icons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={BRAND_INFO.contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-pink-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>{BRAND_INFO.contact.instagram}</span>
            </a>
            <a
              href={BRAND_INFO.contact.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl"
            >
              <TikTokIcon className="w-4 h-4" />
              <span>{BRAND_INFO.contact.tiktok}</span>
            </a>
            <a
              href={BRAND_INFO.contact.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl"
            >
              <FacebookIcon className="w-4 h-4" />
              <span>{BRAND_INFO.contact.facebook}</span>
            </a>
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
              <Link href="/#keunggulan" className="hover:text-white transition-colors">
                6 Alasan Pilih Kami
              </Link>
            </li>
            <li>
              <Link href="/#programs" className="hover:text-white transition-colors">
                Biaya & Paket
              </Link>
            </li>
            <li>
              <a href="#daftar" className="hover:text-white transition-colors font-semibold text-amber-300">
                Formulir Pendaftaran
              </a>
            </li>
            <li>
              <Link href="/auth" className="hover:text-white transition-colors">
                Portal Pengajar & Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline text-sm font-semibold text-white uppercase tracking-wider">
            Hubungi Kami
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={`https://wa.me/${BRAND_INFO.contact.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors font-bold text-emerald-300"
              >
                {BRAND_INFO.contact.whatsapp}
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
              <span className="text-gray-300">
                {BRAND_INFO.contact.serviceArea}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 px-4 md:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <p>© 2026 Home Private Nusantara. &quot;Belajar Lebih Mudah, Prestasi Lebih Baik!&quot;</p>
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
