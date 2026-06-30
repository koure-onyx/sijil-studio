import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QuranBrowser from '@/components/quran/quran-browser';
import { getSurah } from '@/lib/api';

interface PageProps {
  params: { surahNumber: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const surah = await getSurah(params.surahNumber);
    
    return {
      title: `Surah ${surah.name} - Quran | Sijil`,
      description: surah.englishName ? `Surah ${surah.englishName} (${surah.name}) - ${surah.ayahs.length} verses` : undefined,
      openGraph: {
        title: `Surah ${surah.name} - Quran | Sijil`,
        description: surah.englishName || `Read Surah ${surah.name}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Surah ${surah.name} - Quran | Sijil`,
        description: surah.englishName || `Read Surah ${surah.name}`,
      },
    };
  } catch (error) {
    return {
      title: 'Surah Not Found - Quran | Sijil',
      description: 'The requested Surah could not be found.',
    };
  }
}

export default async function SurahPage({ params }: PageProps) {
  try {
    const surah = await getSurah(params.surahNumber);
    
    if (!surah) {
      notFound();
    }

    return <QuranBrowser initialSurahNumber={params.surahNumber} />;
  } catch (error) {
    notFound();
  }
}
