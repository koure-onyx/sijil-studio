'use client';

import { useState, useCallback } from 'react';
import { TopicFilters } from '@/types/topic';

interface UseTopicFiltersReturn {
  filters: TopicFilters;
  updateFilter: (newFilters: Partial<TopicFilters>) => void;
  clearFilters: () => void;
}

/**
 * Hook for managing topic filter state
 */
export function useTopicFilters(initialFilters: TopicFilters = {}): UseTopicFiltersReturn {
  const [filters, setFilters] = useState<TopicFilters>(initialFilters);

  const updateFilter = useCallback((newFilters: Partial<TopicFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      // Reset to page 1 when search or collection changes
      page: newFilters.search !== undefined || newFilters.collection !== undefined ? 1 : prev.page,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    filters,
    updateFilter,
    clearFilters,
  };
}
