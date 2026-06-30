'use client';

import { useState, useCallback } from 'react';
import { TopicFilters } from '../types/topic';

export const useTopicFilters = (initialFilters: TopicFilters = {}) => {
  const [filters, setFilters] = useState<TopicFilters>(initialFilters);

  const updateFilter = useCallback((newFilters: Partial<TopicFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.search || newFilters.collection ? 1 : prev.page // Reset to page 1 when filters change
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
};
