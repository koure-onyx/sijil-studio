import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BreadcrumbNav from '@/components/navigation/breadcrumb';
import QuizContainer from '@/components/assessment/quiz-container';

interface PageProps {
  params: { slug: string };
}

// This would normally fetch from the topic data that includes assessments
// For now, using embedded assessment data from topic content
async function getAssessmentData(slug: string) {
  // In production, this would come from the topic detail API
  // which includes embedded assessment data
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/topics/${slug}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  const topic = await response.json();
  return topic.assessment || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const assessment = await getAssessmentData(params.slug);
  
  if (!assessment) {
    return {
      title: 'Quiz Not Found',
    };
  }

  return {
    title: `${assessment.title} | Quiz`,
    description: assessment.description || `Take the quiz for ${assessment.title}`,
  };
}

export default async function QuizPage({ params }: PageProps) {
  const assessment = await getAssessmentData(params.slug);

  if (!assessment) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Topics', href: '/topics' },
    { label: assessment.topic_title || 'Topic', href: `/topics/${params.slug}` },
    { label: 'Quiz', href: `/topics/${params.slug}/quiz` },
  ];

  return (
    <div className="container py-8">
      <BreadcrumbNav breadcrumbs={breadcrumbs} />
      
      <main className="mt-8">
        <QuizContainer
          questions={assessment.questions}
          title={assessment.title}
          description={assessment.description}
          passingScore={assessment.passing_score}
        />
      </main>
    </div>
  );
}
