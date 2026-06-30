'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';

/**
 * React Query client hook fetching the available subject/collection arrays.
 */
export function useSubjects() {
  return useQuery<string[]>({
    queryKey: ['subjects'],
    queryFn: async () => {
      const response = await api.get('/subjects');
      return Array.isArray(response.data) ? response.data : [];
    },
    staleTime: 1000 * 60 * 60, // Subjects change rarely, cache for 1 hour
  });
}
