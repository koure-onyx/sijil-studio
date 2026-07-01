import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExportTrigger } from '@/components/export/export-trigger';

export const metadata: Metadata = {
  title: 'Topic Detail',
  description: 'View topic details',
};

export default function TopicPage({ params }: { params: { slug: string } }) {
  // Mock topic data for example
  const topic = {
    id: 'top_123',
    title: 'Newton\'s Laws of Motion',
    description: 'Learn about Newton\'s three fundamental laws of motion.',
  };

  if (!topic) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{topic.title}</h1>
          <p className="text-muted-foreground mt-2">{topic.description}</p>
        </div>
        <ExportTrigger topicId={topic.id} topicTitle={topic.title} />
      </div>
      
      <div className="bg-muted p-8 rounded-lg">
        <p>Topic content would go here...</p>
      </div>
    </div>
  );
}
