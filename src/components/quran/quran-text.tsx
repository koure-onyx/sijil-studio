'use client';

import { SurahData } from '@/hooks/use-quran-surah';

interface QuranTextProps {
  surahData: SurahData;
  showTranslation: boolean;
  translationLang: 'en' | 'ur';
  highlightedAyah: number | null;
}

export default function QuranText({
  surahData,
  highlightedAyah,
}: QuranTextProps) {
  if (!surahData.ayahs || surahData.ayahs.length === 0) {
    return <p className="text-gray-500 text-center py-8">No ayahs available</p>;
  }

  return (
    <div className="space-y-6">
      {surahData.ayahs.map((ayah, index) => {
        const isHighlighted = highlightedAyah !== null && ayah.number === highlightedAyah;
        
        return (
          <div
            key={ayah.number}
            id={`ayah-${ayah.number}`}
            className={`relative p-6 rounded-lg transition-all duration-200 ${
              isHighlighted
                ? 'bg-blue-50 border-2 border-blue-300 shadow-md'
                : 'bg-white border border-gray-100 hover:border-gray-200'
            }`}
          >
            {/* Ayah Number */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
                {ayah.numberInSurah || index + 1}
              </span>
            </div>

            {/* Arabic Text */}
            <div 
              className="text-right mb-4 pr-12"
              dir="rtl"
              lang="ar"
            >
              <p className="text-3xl leading-loose font-arabic text-gray-900">
                {ayah.text}
              </p>
            </div>

            {/* Bismillah for first ayah (except Surah 1 and 9) */}
            {index === 0 && surahData.number !== 1 && surahData.number !== 9 && (
              <div className="text-center py-4 mb-4 border-t border-gray-100">
                <p className="text-2xl font-arabic text-gray-700">
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
