'use client';

import { useState, useEffect } from 'react';

export function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    
    const fetchSuggestions = async () => {
      setIsLoading(true);
      
      try {
        const response = await fetch(`/api/v1/search/suggestions?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }

        const data = await response.json();
        setSuggestions(data.data || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    timeoutId = setTimeout(fetchSuggestions, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { suggestions, isLoading };
}
