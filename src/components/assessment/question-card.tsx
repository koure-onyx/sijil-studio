'use client';

import { Question } from '@/types/assessment';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({ 
  question, 
  questionNumber, 
  totalQuestions 
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm font-medium text-blue-600">
          Question {questionNumber} of {totalQuestions}
        </span>
        {question.points > 1 && (
          <span className="text-sm text-gray-500">
            {question.points} {question.points === 1 ? 'point' : 'points'}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {question.question_text}
      </h3>

      {question.question_type === 'multiple_select' && (
        <p className="text-sm text-gray-500 mb-4">
          Select all that apply
        </p>
      )}
    </div>
  );
}
