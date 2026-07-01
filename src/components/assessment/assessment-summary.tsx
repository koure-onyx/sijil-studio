'use client';

import { QuizResult } from '@/types/assessment';
import ScoreDisplay from './score-display';

interface AssessmentSummaryProps {
  result: QuizResult;
  onRetake?: () => void;
}

export default function AssessmentSummary({ 
  result, 
  onRetake 
}: AssessmentSummaryProps) {
  const timeTaken = new Date(result.time_taken_seconds * 1000).toISOString().substr(14, 5);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Assessment Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Score</h3>
          <ScoreDisplay 
            score={result.score}
            totalPoints={result.total_points}
            percentage={result.percentage}
            passed={result.passed}
            showDetails={false}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Time Taken</h3>
            <p className="text-xl font-semibold text-gray-900">{timeTaken}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Questions</h3>
            <p className="text-xl font-semibold text-gray-900">
              {Object.keys(result.answers).length} answered
            </p>
          </div>

          <div className={`rounded-lg p-4 ${
            result.passed 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <h3 className="text-sm font-medium mb-1">
              {result.passed ? '✓ Passed' : '✗ Needs Improvement'}
            </h3>
            <p className={`text-sm ${
              result.passed ? 'text-green-700' : 'text-red-700'
            }`}>
              {result.passed 
                ? 'Congratulations! You have successfully completed this assessment.' 
                : 'Keep practicing to improve your score.'}
            </p>
          </div>
        </div>
      </div>

      {onRetake && (
        <div className="flex gap-4">
          <button
            onClick={onRetake}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Retake Assessment
          </button>
        </div>
      )}
    </div>
  );
}
