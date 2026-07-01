'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AssessmentSummary from '@/components/assessment/assessment-summary';
import { QuizResult } from '@/types/assessment';

function ResultsContent() {
  const searchParams = useSearchParams();
  
  // In a real implementation, this would fetch from localStorage or URL params
  const mockResult: QuizResult = {
    assessment_id: searchParams.get('assessmentId') || '1',
    score: parseInt(searchParams.get('score') || '0'),
    total_points: parseInt(searchParams.get('totalPoints') || '100'),
    percentage: parseFloat(searchParams.get('percentage') || '0'),
    passed: searchParams.get('passed') === 'true',
    answers: {},
    correct_answers: {},
    time_taken_seconds: parseFloat(searchParams.get('timeTaken') || '0'),
    completed_at: Date.now(),
  };

  return (
    <div className="container py-8">
      <main>
        <AssessmentSummary 
          result={mockResult}
          onRetake={() => window.location.reload()}
        />
      </main>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="container py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
