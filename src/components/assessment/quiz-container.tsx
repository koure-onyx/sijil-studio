'use client';

import { useState } from 'react';
import { Question } from '@/types/assessment';
import { useQuiz } from '@/hooks/use-quiz';
import MCQBlock from './mcq-block';
import ProgressBar from './progress-bar';
import QuizNavigation from './quiz-navigation';
import FeedbackPanel from './feedback-panel';
import PracticeModeToggle from './practice-mode-toggle';

interface QuizContainerProps {
  questions: Question[];
  title: string;
  description?: string;
  passingScore?: number;
}

export default function QuizContainer({ 
  questions, 
  title, 
  description,
  passingScore = 70 
}: QuizContainerProps) {
  const [practiceMode, setPracticeMode] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedAnswers,
    answeredQuestions,
    isComplete,
    score,
    totalPoints,
    progress,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    resetQuiz,
    getQuestionStatus,
    getResult,
  } = useQuiz({
    questions,
    practiceMode,
    settings: {
      show_feedback_immediately: practiceMode,
      allow_retry: practiceMode,
      shuffle_questions: !practiceMode,
      shuffle_options: !practiceMode,
    },
  });

  const handleSubmitAnswer = () => {
    const result = submitAnswer();
    if (result && practiceMode) {
      setShowFeedback(true);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    nextQuestion();
  };

  if (isComplete) {
    const result = getResult();
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
          
          {result && (
            <div className="space-y-6">
              <div className="text-center">
                <div className={`text-4xl font-bold ${
                  result.passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {result.percentage.toFixed(0)}%
                </div>
                <p className="text-gray-600 mt-2">
                  {result.score} out of {result.totalPoints} points
                </p>
              </div>

              <div className={`p-4 rounded-md ${
                result.passed 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`font-semibold ${
                  result.passed ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.passed 
                    ? '✓ Congratulations! You passed the quiz.' 
                    : '✗ Keep practicing! You can retake this quiz.'}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={resetQuiz}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <PracticeModeToggle
            practiceMode={practiceMode}
            onToggle={setPracticeMode}
          />
        </div>

        <ProgressBar 
          current={currentIndex + 1} 
          total={totalQuestions} 
          percentage={progress} 
        />
      </div>

      {currentQuestion && (
        <MCQBlock
          question={currentQuestion}
          selectedAnswers={selectedAnswers[currentQuestion.id] || []}
          onSelectAnswer={(answers) => selectAnswer(currentQuestion.id, answers)}
          showFeedback={practiceMode && showFeedback}
          isCorrect={getQuestionStatus(currentQuestion.id) === 'correct'}
          disabled={!practiceMode && answeredQuestions.has(currentQuestion.id)}
        />
      )}

      {practiceMode && showFeedback && currentQuestion?.explanation && (
        <FeedbackPanel
          isCorrect={getQuestionStatus(currentQuestion!.id) === 'correct'}
          explanation={currentQuestion!.explanation!}
        />
      )}

      <QuizNavigation
        currentQuestion={currentIndex + 1}
        totalQuestions={totalQuestions}
        hasAnswered={!!selectedAnswers[currentQuestion?.id || '']}
        isLastQuestion={currentIndex >= totalQuestions - 1}
        onPrevious={previousQuestion}
        onSubmit={handleSubmitAnswer}
        onNext={handleNextQuestion}
      />
    </div>
  );
}
