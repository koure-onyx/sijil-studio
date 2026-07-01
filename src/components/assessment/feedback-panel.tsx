'use client';

interface FeedbackPanelProps {
  isCorrect: boolean;
  explanation: string;
}

export default function FeedbackPanel({ isCorrect, explanation }: FeedbackPanelProps) {
  return (
    <div className={`p-4 rounded-md ${
      isCorrect 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-blue-50 border border-blue-200'
    }`}>
      <h4 className={`font-semibold mb-2 flex items-center gap-2 ${
        isCorrect ? 'text-green-800' : 'text-blue-800'
      }`}>
        {isCorrect ? (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Correct!
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Explanation:
          </>
        )}
      </h4>
      <p className="text-sm text-gray-700">{explanation}</p>
    </div>
  );
}
