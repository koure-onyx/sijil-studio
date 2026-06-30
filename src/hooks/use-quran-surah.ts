'use client';

import { useQuery } from '@tanstack/react-query';

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translationEn?: string;
  translationUr?: string;
}

export interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  ayahs: Ayah[];
}

const fetchSurah = async (surahNumber: string): Promise<SurahData> => {
  const response = await fetch(`/api/quran/surah/${surahNumber}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Surah ${surahNumber}: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const useQuranSurah = (surahNumber: string) => {
  return useQuery({
    queryKey: ['quran-surah', surahNumber],
    queryFn: () => fetchSurah(surahNumber),
    enabled: !!surahNumber,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
