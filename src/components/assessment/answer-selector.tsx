'use client';

interface AnswerSelectorProps {
  options: Array<{ id: string; text: string }>;
  selectedAnswers: string[];
  onSelect: (optionIds: string[]) => void;
  questionType: 'mcq' | 'true_false' | 'multiple_select';
  disabled?: boolean;
}

export default function AnswerSelector({
  options,
  selectedAnswers,
  onSelect,
  questionType,
  disabled = false,
}: AnswerSelectorProps) {
  const handleSelect = (optionId: string) => {
    if (disabled) return;

    let newSelection: string[];
    
    if (questionType === 'multiple_select') {
      if (selectedAnswers.includes(optionId)) {
        newSelection = selectedAnswers.filter(id => id !== optionId);
      } else {
        newSelection = [...selectedAnswers, optionId];
      }
    } else {
      newSelection = [optionId];
    }

    onSelect(newSelection);
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isSelected = selectedAnswers.includes(option.id);
        
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.id)}
            disabled={disabled}
            className={`w-full text-left p-4 rounded-md border-2 transition-all duration-200 ${
              isSelected
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-200 hover:border-gray-300'
            } ${
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            aria-pressed={isSelected}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {questionType === 'multiple_select' ? (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    readOnly
                  />
                ) : (
                  <input
                    type="radio"
                    name="answer"
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    readOnly
                  />
                )}
              </div>
              <div className="flex-grow">
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span>{' '}
                <span>{option.text}</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
