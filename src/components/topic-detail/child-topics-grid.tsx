import Link from 'next/link';
import { ChildTopic } from '@/types/topic';

export interface ChildTopicsGridProps {
  topics: ChildTopic[];
  title?: string;
  className?: string;
}

export function ChildTopicsGrid({ 
  topics, 
  title = 'Subtopics',
  className = '' 
}: ChildTopicsGridProps) {
  if (topics.length === 0) {
    return null;
  }

  return (
    <section className={`mb-8 ${className}`} aria-label={title}>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/topics/${topic.slug}`}
            className="block bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {topic.title}
              </h3>
              
              {topic.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {topic.description}
                </p>
              )}
              
              <div className="mt-auto">
                <span className="text-xs text-gray-500">
                  {topic.documentCount} {topic.documentCount === 1 ? 'document' : 'documents'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
