import { Topic } from '@/types/topic';

interface TopicCardProps {
  topic: Topic;
  showDocumentCount?: boolean;
  showCollectionBadge?: boolean;
}

export default function TopicCard({ 
  topic, 
  showDocumentCount = true, 
  showCollectionBadge = true 
}: TopicCardProps) {
  return (
    <a 
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
        
        <div className="mt-auto flex items-center justify-between">
          {showDocumentCount && (
            <span className="text-xs text-gray-500">
              {topic.document_count} {topic.document_count === 1 ? 'document' : 'documents'}
            </span>
          )}
          
          {showCollectionBadge && topic.collection && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {topic.collection.name}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
