import { api } from './client';
import { API_ENDPOINTS } from './api/endpoints';
import { HomepageStats, Document } from '@/types/homepage';

/**
 * Parallel execution fallback targets gracefully mitigating breaking build 
 * runtime interfaces if downstream backend clusters drop active sockets.
 */

export async function fetchStats(): Promise<HomepageStats> {
  try {
    const response = await api.get(API_ENDPOINTS.PLATFORM_STATS);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch platform metrics:', error);
    // Safe schema-conforming fallback to respect Rule 001 safely during failure states
    return { documents: 0, topics: 0, subjects: 0, grades: 0 };
  }
}

export async function fetchSubjects(): Promise<string[]> {
  try {
    const response = await api.get(API_ENDPOINTS.SUBJECTS);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Failed to fetch subjects config:', error);
    return ['Physics', 'Chemistry', 'Biology', 'Mathematics'];
  }
}

export async function fetchRecentDocuments(): Promise<Document[]> {
  try {
    const response = await api.get(API_ENDPOINTS.RECENT_DOCUMENTS);
    return response.data?.results || response.data || [];
  } catch (error) {
    console.error('Failed to fetch recent documents:', error);
    return [];
  }
}
