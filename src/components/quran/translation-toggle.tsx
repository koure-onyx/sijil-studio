'use client';

interface TranslationToggleProps {
  showTranslation: boolean;
  onToggle: () => void;
  currentLang: 'en' | 'ur';
  onLangChange: (lang: 'en' | 'ur') => void;
}

export default function TranslationToggle({
  showTranslation,
  onToggle,
  currentLang,
  onLangChange,
}: TranslationToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          showTranslation
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        aria-pressed={showTranslation}
      >
        {showTranslation ? 'Hide Translation' : 'Show Translation'}
      </button>

      {showTranslation && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onLangChange('en')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentLang === 'en'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onLangChange('ur')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentLang === 'ur'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            اردو
          </button>
        </div>
      )}
    </div>
  );
}
