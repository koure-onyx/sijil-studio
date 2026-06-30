'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { Document } from '@/types/homepage';

/**
 * React Query client hook tracking the latest uploaded document entities.
 */
export function useRecentDocuments() {
  return useQuery<Document[]>({
    queryKey: ['documents', 'recent'],
    queryFn: async () => {
      const response = await api.get('/documents/recent');
      return response.data?.results || response.data || [];
    },
    staleTime: 1000 * 60 * 5, // Fresh for 5 minutes
  });
}
