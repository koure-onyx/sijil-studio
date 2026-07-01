'use client';

interface ScoreDisplayProps {
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  showDetails?: boolean;
}

export default function ScoreDisplay({ 
  score, 
  totalPoints, 
  percentage, 
  passed,
  showDetails = true 
}: ScoreDisplayProps) {
  return (
    <div className="text-center">
      <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${
        passed ? 'bg-green-100' : 'bg-red-100'
      }`}>
        <div className={`text-4xl font-bold ${
          passed ? 'text-green-600' : 'text-red-600'
        }`}>
          {percentage.toFixed(0)}%
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-4 space-y-2">
          <p className="text-lg font-medium text-gray-900">
            {score} out of {totalPoints} points
          </p>
          <p className={`text-sm font-semibold ${
            passed ? 'text-green-700' : 'text-red-700'
          }`}>
            {passed ? '✓ Passed' : '✗ Needs Improvement'}
          </p>
        </div>
      )}
    </div>
  );
}
