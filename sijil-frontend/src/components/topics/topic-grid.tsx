import { Topic } from '@/types/topic';
import { TopicCard } from './topic-card';
import { PaginationControls } from './pagination-controls';
import { EmptyState } from './empty-state';

interface TopicGridProps {
  topics: Topic[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
}

/**
 * Responsive grid layout for displaying multiple topic cards
 */
export function TopicGrid({
  topics,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  hasActiveFilters = false,
  onClearFilters,
}: TopicGridProps) {
  // Show empty state when no topics
  if (topics.length === 0) {
    return <EmptyState hasActiveFilters={hasActiveFilters} onClearFilters={onClearFilters} />;
  }

  return (
    <div className="space-y-8">
      {/* Topic Grid - Responsive: 1 col mobile → 2 cols tablet → 3 cols desktop → 4 cols large */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {topics.map((topic) => (
          <TopicCard key={topic._id} topic={topic} />
        ))}
      </div>

      {/* Pagination Controls */}
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
