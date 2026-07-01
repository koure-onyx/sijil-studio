'use client';

import { Question, Option } from '@/types/assessment';

interface MCQBlockProps {
  question: Question;
  selectedAnswers?: string[];
  onSelectAnswer?: (optionIds: string[]) => void;
  showFeedback?: boolean;
  isCorrect?: boolean;
  disabled?: boolean;
}

export default function MCQBlock({
  question,
  selectedAnswers = [],
  onSelectAnswer,
  showFeedback = false,
  isCorrect,
  disabled = false,
}: MCQBlockProps) {
  const handleOptionSelect = (optionId: string) => {
    if (disabled || !onSelectAnswer) return;

    let newSelection: string[];
    
    if (question.question_type === 'multiple_select') {
      if (selectedAnswers.includes(optionId)) {
        newSelection = selectedAnswers.filter(id => id !== optionId);
      } else {
        newSelection = [...selectedAnswers, optionId];
      }
    } else {
      newSelection = [optionId];
    }

    onSelectAnswer(newSelection);
  };

  const getOptionStyles = (option: Option) => {
    const isSelected = selectedAnswers.includes(option.id);
    const isAnswerShown = showFeedback && question.correct_answer_ids.includes(option.id);
    const isWrongSelected = showFeedback && isSelected && !question.correct_answer_ids.includes(option.id);

    if (isAnswerShown) {
      return 'border-green-500 bg-green-50 text-green-900';
    }
    if (isWrongSelected) {
      return 'border-red-500 bg-red-50 text-red-900';
    }
    if (isSelected) {
      return 'border-blue-500 bg-blue-50 text-blue-900';
    }
    return 'border-gray-200 hover:border-gray-300';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {question.question_text}
        </h3>
        {question.points > 1 && (
          <span className="text-sm text-gray-500">
            ({question.points} {question.points === 1 ? 'point' : 'points'})
          </span>
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleOptionSelect(option.id)}
            disabled={disabled}
            className={`w-full text-left p-4 rounded-md border-2 transition-all duration-200 ${getOptionStyles(option)} ${
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            aria-pressed={selectedAnswers.includes(option.id)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {question.question_type === 'multiple_select' ? (
                  <input
                    type="checkbox"
                    checked={selectedAnswers.includes(option.id)}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    readOnly
                  />
                ) : (
                  <input
                    type="radio"
                    name={question.id}
                    checked={selectedAnswers.includes(option.id)}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    readOnly
                  />
                )}
              </div>
              <div className="flex-grow">
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span>{' '}
                <span>{option.option_text}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {showFeedback && question.explanation && (
        <div className={`mt-4 p-4 rounded-md ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            isCorrect ? 'text-green-800' : 'text-blue-800'
          }`}>
            {isCorrect ? '✓ Correct!' : 'Explanation:'}
          </h4>
          <p className="text-sm text-gray-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
