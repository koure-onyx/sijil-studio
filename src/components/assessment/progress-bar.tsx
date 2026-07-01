'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  percentage?: number;
}

export default function ProgressBar({ 
  current, 
  total, 
  percentage 
}: ProgressBarProps) {
  const progressPercentage = percentage ?? (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Progress: {current} of {total}
        </span>
        <span className="text-sm font-medium text-gray-700">
          {progressPercentage.toFixed(0)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
