'use client';

import { SurahData } from '@/hooks/use-quran-surah';

interface TranslationPanelProps {
  surahData: SurahData;
  language: 'en' | 'ur';
  highlightedAyah: number | null;
}

export default function TranslationPanel({
  surahData,
  language,
  highlightedAyah,
}: TranslationPanelProps) {
  if (!surahData.ayahs || surahData.ayahs.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Translation ({language === 'en' ? 'English' : 'Urdu'})
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {surahData.ayahs.map((ayah, index) => {
          const isHighlighted = highlightedAyah !== null && ayah.number === highlightedAyah;
          const translation = language === 'en' ? ayah.translationEn : ayah.translationUr;

          return (
            <div
              key={`translation-${ayah.number}`}
              className={`p-6 transition-colors ${
                isHighlighted ? 'bg-blue-50' : 'bg-white'
              }`}
            >
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                  {ayah.numberInSurah || index + 1}
                </span>
                <p className={`text-lg leading-relaxed ${
                  language === 'ur' ? 'text-right font-urdu' : ''
                }`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
                  {translation || 'Translation not available'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
