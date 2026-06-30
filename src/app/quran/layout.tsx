import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Quran - Sijil',
  description: 'Read and explore the Holy Quran with translations and tafsir',
  openGraph: {
    title: 'Quran - Sijil',
    description: 'Read and explore the Holy Quran with translations and tafsir',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quran - Sijil',
    description: 'Read and explore the Holy Quran with translations and tafsir',
  },
};

interface QuranLayoutProps {
  children: ReactNode;
}

export default function QuranLayout({ children }: QuranLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
