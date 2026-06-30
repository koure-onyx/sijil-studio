'use client';

interface AyahNavigatorProps {
  surahNumber: string;
  totalAyahs: number;
  currentAyah: number | null;
  onAyahChange: (ayahNumber: number | null) => void;
}

export default function AyahNavigator({
  surahNumber,
  totalAyahs,
  currentAyah,
  onAyahChange,
}: AyahNavigatorProps) {
  const goToPrevious = () => {
    if (currentAyah === null) {
      onAyahChange(totalAyahs);
    } else if (currentAyah > 1) {
      onAyahChange(currentAyah - 1);
    }
  };

  const goToNext = () => {
    if (currentAyah === null) {
      onAyahChange(1);
    } else if (currentAyah < totalAyahs) {
      onAyahChange(currentAyah + 1);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200">
      <button
        onClick={goToPrevious}
        disabled={currentAyah === 1}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentAyah === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
        aria-label="Previous Ayah"
      >
        ← Previous Ayah
      </button>

      <span className="text-sm font-medium text-gray-600">
        {currentAyah ? `Ayah ${currentAyah} of ${totalAyahs}` : `All ${totalAyahs} Ayahs`}
      </span>

      <button
        onClick={goToNext}
        disabled={currentAyah === totalAyahs}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentAyah === totalAyahs
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
        aria-label="Next Ayah"
      >
        Next Ayah →
      </button>
    </div>
  );
}
