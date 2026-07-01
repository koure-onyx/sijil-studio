import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BreadcrumbNav from '@/components/navigation/breadcrumb';
import QuizContainer from '@/components/assessment/quiz-container';

interface PageProps {
  params: { topicId: string };
}

async function getPracticeQuestions(topicId: string) {
  // In production, this would fetch practice questions from topic data
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/topics/${topicId}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  const topic = await response.json();
  return topic.assessment?.questions || [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: 'Practice Mode | Sijil',
    description: 'Practice questions to test your knowledge',
  };
}

export default async function PracticePage({ params }: PageProps) {
  const questions = await getPracticeQuestions(params.topicId);

  if (!questions || questions.length === 0) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Topics', href: '/topics' },
    { label: 'Practice', href: `/practice/${params.topicId}` },
  ];

  return (
    <div className="container py-8">
      <BreadcrumbNav breadcrumbs={breadcrumbs} />
      
      <main className="mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              Practice Mode
            </h2>
            <p className="text-sm text-blue-700">
              Get immediate feedback on your answers. You can retry questions and 
              learn from explanations. This won't affect your graded score.
            </p>
          </div>
          
          <QuizContainer
            questions={questions}
            title="Practice Quiz"
            description="Test your knowledge with instant feedback"
            passingScore={0}
          />
        </div>
      </main>
    </div>
  );
}
