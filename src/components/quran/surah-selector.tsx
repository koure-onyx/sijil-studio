'use client';

interface SurahSelectorProps {
  currentSurah: string;
  onSurahChange: (surahNumber: string) => void;
}

const SURAH_LIST = [
  { number: 1, name: 'Al-Fatihah', englishName: 'The Opener' },
  { number: 2, name: 'Al-Baqarah', englishName: 'The Cow' },
  { number: 3, name: 'Ali \'Imran', englishName: 'Family of Imran' },
  { number: 4, name: 'An-Nisa', englishName: 'The Women' },
  { number: 5, name: 'Al-Ma\'idah', englishName: 'The Table Spread' },
  { number: 6, name: 'Al-An\'am', englishName: 'The Cattle' },
  { number: 7, name: 'Al-A\'raf', englishName: 'The Heights' },
  { number: 8, name: 'Al-Anfal', englishName: 'The Spoils of War' },
  { number: 9, name: 'At-Tawbah', englishName: 'The Repentance' },
  { number: 10, name: 'Yunus', englishName: 'Jonah' },
  // Add more surahs as needed - this is a sample
];

export default function SurahSelector({ currentSurah, onSurahChange }: SurahSelectorProps) {
  return (
    <div className="relative">
      <label htmlFor="surah-select" className="sr-only">
        Select Surah
      </label>
      <select
        id="surah-select"
        value={currentSurah}
        onChange={(e) => onSurahChange(e.target.value)}
        className="block w-full sm:w-64 px-4 py-2.5 text-base border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        aria-label="Select Surah"
      >
        {SURAH_LIST.map((surah) => (
          <option key={surah.number} value={surah.number.toString()}>
            {surah.number}. {surah.name} - {surah.englishName}
          </option>
        ))}
      </select>
    </div>
  );
}
