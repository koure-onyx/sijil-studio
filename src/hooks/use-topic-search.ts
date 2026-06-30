'use client';

import { useState, useEffect, useRef } from 'react';

export const useTopicSearch = (onSearch: (query: string) => void, delay = 300) => {
  const [searchQuery, setSearchQuery] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (searchQuery.trim()) {
      timeoutRef.current = setTimeout(() => {
        onSearch(searchQuery);
      }, delay);
    } else {
      onSearch('');
    }

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
};
