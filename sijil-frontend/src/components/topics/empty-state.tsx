import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  hasActiveFilters: boolean;
  onClearFilters?: () => void;
}

/**
 * Empty state component displayed when no topics match filters
 */
export function EmptyState({ hasActiveFilters, onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <svg
        className="mx-auto h-12 w-12 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>

      <h3 className="mt-4 text-lg font-semibold">No topics found</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        {hasActiveFilters
          ? "We couldn't find any topics matching your current filters. Try adjusting your search or collection filter."
          : 'There are currently no topics available.'}
      </p>

      {hasActiveFilters && onClearFilters && (
        <div className="mt-6">
          <Button onClick={onClearFilters} variant="outline" size="sm" className="min-h-[44px]">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
