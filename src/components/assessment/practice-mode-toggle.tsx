'use client';

interface PracticeModeToggleProps {
  practiceMode: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function PracticeModeToggle({ 
  practiceMode, 
  onToggle 
}: PracticeModeToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-medium ${
        !practiceMode ? 'text-gray-900' : 'text-gray-500'
      }`}>
        Graded
      </span>
      
      <button
        type="button"
        onClick={() => onToggle(!practiceMode)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          practiceMode ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        role="switch"
        aria-checked={practiceMode}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            practiceMode ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      
      <span className={`text-sm font-medium ${
        practiceMode ? 'text-gray-900' : 'text-gray-500'
      }`}>
        Practice
      </span>
      
      <div className="ml-2 text-xs text-gray-500">
        {practiceMode 
          ? 'Get immediate feedback' 
          : 'No hints, shuffled questions'}
      </div>
    </div>
  );
}
