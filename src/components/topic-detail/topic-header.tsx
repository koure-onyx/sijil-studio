import { TopicDetail } from '@/types/topic';

export interface TopicHeaderProps {
  title: string;
  description?: string | null;
  level: number;
  documentCount: number;
  childCount: number;
  className?: string;
}

export function TopicHeader({
  title,
  description,
  level,
  documentCount,
  childCount,
  className = '',
}: TopicHeaderProps) {
  return (
    <header className={`mb-8 ${className}`}>
      <div className="mb-4">
        <h1 
          className="text-3xl font-bold text-gray-900 mb-2"
          role="heading"
          aria-level={1}
        >
          {title}
        </h1>
        
        {description && (
          <p className="text-lg text-gray-600">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Level Badge */}
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          Level {level}
        </span>

        {/* Document Count Badge */}
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          {documentCount} {documentCount === 1 ? 'document' : 'documents'}
        </span>

        {/* Child Count Badge */}
        {childCount > 0 && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            {childCount} {childCount === 1 ? 'subtopic' : 'subtopics'}
          </span>
        )}
      </div>
    </header>
  );
}
