import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthUrlCleaner } from "@/src/components/shared/AuthUrlCleaner";
import { SWRProvider } from "@/src/components/shared/SWRProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Private Nusantara",
  description: "Bimbingan belajar privat terbaik untuk siswa SD dan SMP.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <SWRProvider>
          <AuthUrlCleaner />
          {children}
        </SWRProvider>
      </body>
    </html>
  );
}
