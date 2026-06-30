'use client';

interface RukuMarkerProps {
  surahNumber: string;
}

// Simplified Ruku mapping - approximate rukus per surah
const RUKU_MAP: Record<number, number> = {
  1: 1,
  2: 40,
  3: 20,
  4: 24,
  5: 18,
  6: 20,
  7: 24,
  8: 10,
  9: 16,
  10: 11,
  // Add more mappings as needed
};

export default function RukuMarker({ surahNumber }: RukuMarkerProps) {
  const surahNum = parseInt(surahNumber);
  const rukuCount = RUKU_MAP[surahNum] || 0;

  if (rukuCount === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Ruku:</span>
      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
        {rukuCount} sections
      </span>
    </div>
  );
}
