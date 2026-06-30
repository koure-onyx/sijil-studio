'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

/**
 * React Query client hook fetching the available subject/collection arrays.
 */
export function useSubjects() {
  return useQuery<string[]>({
    queryKey: ['subjects'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.SUBJECTS);
      return Array.isArray(response.data) ? response.data : [];
    },
    staleTime: 1000 * 60 * 60, // Subjects change rarely, cache for 1 hour
  });
}
