'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { HomepageStats } from '@/types/homepage';

/**
 * React Query client hook tracking global system platform analytics metrics.
 */
export function usePlatformStats() {
  return useQuery<HomepageStats>({
    queryKey: ['platform-stats'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.PLATFORM_STATS);
      return response.data;
    },
    staleTime: 1000 * 60 * 15, // Consider data fresh for 15 minutes
    gcTime: 1000 * 60 * 30,    // Cache persistence window
  });
}
