'use client';

import { useState, useEffect, useRef } from 'react';

interface UseTopicSearchReturn {
  searchQuery: string;
  handleSearchChange: (query: string) => void;
}

/**
 * Hook for debounced topic search functionality
 * @param onSearch - Callback function when search query changes (after debounce)
 * @param delay - Debounce delay in milliseconds (default: 300ms)
 */
export function useTopicSearch(
  onSearch: (query: string) => void,
  delay = 300
): UseTopicSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounce
    if (searchQuery.trim()) {
      timeoutRef.current = setTimeout(() => {
        onSearch(searchQuery);
      }, delay);
    } else {
      onSearch('');
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery, delay, onSearch]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return {
    searchQuery,
    handleSearchChange,
  };
}
