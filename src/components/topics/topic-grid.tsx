import { Topic } from '@/types/topic';
import TopicCard from './topic-card';
import PaginationControls from './pagination-controls';
import EmptyState from './empty-state';

interface TopicGridProps {
  topics: Topic[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
}

export default function TopicGrid({ 
  topics, 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  hasActiveFilters = false,
  onClearFilters
}: TopicGridProps) {
  if (topics.length === 0) {
    return <EmptyState hasActiveFilters={hasActiveFilters} onClearFilters={onClearFilters} />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {topics.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <PaginationControls 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={onPageChange} 
        />
      )}
    </div>
  );
}
