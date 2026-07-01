'use client';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  onPrevious: () => void;
  onSubmit: () => void;
  onNext: () => void;
}

export default function QuizNavigation({
  currentQuestion,
  totalQuestions,
  hasAnswered,
  isLastQuestion,
  onPrevious,
  onSubmit,
  onNext,
}: QuizNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={onPrevious}
        disabled={currentQuestion <= 1}
        className={`px-6 py-3 rounded-md font-medium transition-colors ${
          currentQuestion <= 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Previous
      </button>

      <div className="text-sm text-gray-600">
        Question {currentQuestion} of {totalQuestions}
      </div>

      {!isLastQuestion ? (
        <button
          onClick={onNext}
          disabled={!hasAnswered}
          className={`px-6 py-3 rounded-md font-medium transition-colors ${
            hasAnswered
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      ) : (
        <button
          onClick={onSubmit}
          disabled={!hasAnswered}
          className={`px-6 py-3 rounded-md font-medium transition-colors ${
            hasAnswered
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
}
