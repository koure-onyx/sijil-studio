'use client';

interface HizbMarkerProps {
  surahNumber: string;
}

// Simplified Hizb mapping - each Juz has 2 Hizbs
const HIZB_SURAH_MAP: Record<number, number[]> = {
  1: [1, 2],
  2: [2],
  3: [2, 3],
  4: [3, 4],
  5: [4, 5],
  // Add more mappings as needed
};

export default function HizbMarker({ surahNumber }: HizbMarkerProps) {
  const surahNum = parseInt(surahNumber);
  const hizbNumbers = Object.entries(HIZB_SURAH_MAP)
    .filter(([_, surahs]) => surahs.includes(surahNum))
    .flatMap(([juz]) => {
      const juzNum = parseInt(juz);
      return [(juzNum - 1) * 2 + 1, (juzNum - 1) * 2 + 2];
    });

  if (hizbNumbers.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Hizb:</span>
      <div className="flex gap-1">
        {hizbNumbers.map((hizb) => (
          <span
            key={hizb}
            className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded"
          >
            {hizb}
          </span>
        ))}
      </div>
    </div>
  );
}
