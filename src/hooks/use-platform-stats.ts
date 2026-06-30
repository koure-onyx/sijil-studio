import { useApiQuery } from './use-api';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { PlatformStats } from '@/types/api';

export function usePlatformStats() {
  return useApiQuery<PlatformStats>(
    ['platform-stats'],
    API_ENDPOINTS.PLATFORM_STATS,
    {
      refetchInterval: 30000, // Sync every 30 seconds
    }
  );
}
