interface EmptyStateProps {
  hasActiveFilters: boolean;
  onClearFilters?: () => void;
}

export default function EmptyState({ hasActiveFilters, onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <svg 
        className="mx-auto h-12 w-12 text-gray-400" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      
      <h3 className="mt-2 text-sm font-medium text-gray-900">No topics found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {hasActiveFilters
          ? "We couldn't find any topics matching your filters."
          : "There are currently no topics available."
        }
      </p>
      
      {hasActiveFilters && onClearFilters && (
        <div className="mt-6">
          <button
            onClick={onClearFilters}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
