'use client';

import { useState, useEffect } from 'react';
import SurahSelector from './surah-selector';
import AyahNavigator from './ayah-navigator';
import TranslationToggle from './translation-toggle';
import QuranText from './quran-text';
import TranslationPanel from './translation-panel';
import JuzMarker from './juz-marker';
import HizbMarker from './hizb-marker';
import RukuMarker from './ruku-marker';
import { useQuranSurah } from '@/hooks/use-quran-surah';

interface QuranBrowserProps {
  initialSurahNumber: string;
}

export default function QuranBrowser({ initialSurahNumber }: QuranBrowserProps) {
  const [currentSurah, setCurrentSurah] = useState(initialSurahNumber);
  const [showTranslation, setShowTranslation] = useState(true);
  const [translationLang, setTranslationLang] = useState<'en' | 'ur'>('en');
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);

  const { data: surahData, isLoading, error } = useQuranSurah(currentSurah);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !surahData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Error loading Surah</h2>
        <p className="text-gray-600 mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <SurahSelector
            currentSurah={currentSurah}
            onSurahChange={setCurrentSurah}
          />
          
          <div className="flex items-center gap-4">
            <TranslationToggle
              showTranslation={showTranslation}
              onToggle={() => setShowTranslation(!showTranslation)}
              currentLang={translationLang}
              onLangChange={setTranslationLang}
            />
          </div>
        </div>

        {/* Navigation Markers */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
          <JuzMarker surahNumber={currentSurah} />
          <HizbMarker surahNumber={currentSurah} />
          <RukuMarker surahNumber={currentSurah} />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Surah Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8 text-center border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {surahData.name}
          </h1>
          {surahData.englishName && (
            <p className="text-lg text-gray-600">{surahData.englishName}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {surahData.englishNameTranslation} • {surahData.revelationType} • {surahData.numberOfAyahs} verses
          </p>
        </div>

        {/* Ayah Navigator */}
        {surahData.ayahs && surahData.ayahs.length > 0 && (
          <AyahNavigator
            surahNumber={currentSurah}
            totalAyahs={surahData.numberOfAyahs}
            currentAyah={currentAyah}
            onAyahChange={setCurrentAyah}
          />
        )}

        {/* Quran Text */}
        <div className="p-6">
          <QuranText
            surahData={surahData}
            showTranslation={showTranslation}
            translationLang={translationLang}
            highlightedAyah={currentAyah}
          />
        </div>

        {/* Translation Panel */}
        {showTranslation && (
          <TranslationPanel
            surahData={surahData}
            language={translationLang}
            highlightedAyah={currentAyah}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentSurah((prev) => String(Math.max(1, parseInt(prev) - 1)))}
          disabled={parseInt(currentSurah) <= 1}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            parseInt(currentSurah) <= 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous Surah
        </button>
        
        <span className="text-gray-600 font-medium">
          Surah {currentSurah} of 114
        </span>
        
        <button
          onClick={() => setCurrentSurah((prev) => String(Math.min(114, parseInt(prev) + 1)))}
          disabled={parseInt(currentSurah) >= 114}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            parseInt(currentSurah) >= 114
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next Surah
        </button>
      </div>
    </div>
  );
}
