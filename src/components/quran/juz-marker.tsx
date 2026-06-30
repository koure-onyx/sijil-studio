'use client';

interface JuzMarkerProps {
  surahNumber: string;
}

// Simplified Juz mapping - in production this would be more comprehensive
const JUZ_SURAH_MAP: Record<number, number[]> = {
  1: [1, 2],
  2: [2],
  3: [2, 3],
  4: [3, 4],
  5: [4, 5],
  6: [5, 6],
  7: [6, 7],
  8: [7, 8],
  9: [8, 9],
  10: [9, 10],
  // Add more mappings as needed
};

export default function JuzMarker({ surahNumber }: JuzMarkerProps) {
  const surahNum = parseInt(surahNumber);
  const juzNumbers = Object.entries(JUZ_SURAH_MAP)
    .filter(([_, surahs]) => surahs.includes(surahNum))
    .map(([juz]) => parseInt(juz));

  if (juzNumbers.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Juz:</span>
      <div className="flex gap-1">
        {juzNumbers.map((juz) => (
          <span
            key={juz}
            className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded"
          >
            {juz}
          </span>
        ))}
      </div>
    </div>
  );
}
