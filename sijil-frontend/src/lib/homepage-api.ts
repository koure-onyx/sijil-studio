import { api } from './client';
import { HomepageStats, Document } from '@/types/homepage';

/**
 * Parallel execution fallback targets gracefully mitigating breaking build 
 * runtime interfaces if downstream backend clusters drop active sockets.
 */

export async function fetchStats(): Promise<HomepageStats> {
  try {
    const response = await api.get('/documents/aggregates');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch platform stats:', error);
    return { documents: 0, topics: 0, subjects: 0, grades: 0 };
  }
}

export async function fetchSubjects(): Promise<string[]> {
  try {
    const response = await api.get('/subjects');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Failed to fetch subjects config:', error);
    return ['Physics', 'Chemistry', 'Biology', 'Mathematics'];
  }
}

export async function fetchRecentDocuments(): Promise<Document[]> {
  try {
    const response = await api.get('/documents', {
      params: { limit: 6, sort: '-createdAt' }
    });
    return response.data?.results || [];
  } catch (error) {
    console.error('Failed to fetch recent documents:', error);
    return [];
  }
}
