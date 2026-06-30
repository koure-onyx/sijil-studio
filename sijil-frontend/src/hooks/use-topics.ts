'use client';

import { useQuery } from '@tanstack/react-query';
import { apiFetchClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { TopicFilters, TopicsResponse, Collection, CollectionsResponse, Topic, TopicResponse } from '@/types/topic';

/**
 * Build query params for topic filtering
 */
function buildTopicParams(filters: TopicFilters): string {
  const params = new URLSearchParams();
  
  if (filters.collection) params.append('collection', filters.collection);
  if (filters.search) params.append('search', filters.search);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  
  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * React Query hook for fetching topics with filters
 */
export function useTopics(filters: TopicFilters = {}) {
  const queryParams = buildTopicParams(filters);
  
  return useQuery<TopicsResponse>({
    queryKey: ['topics', filters],
    queryFn: async () => {
      const endpoint = `${API_ENDPOINTS.TOPICS}${queryParams}`;
      return await apiFetchClient(endpoint);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * React Query hook for fetching a single topic by slug
 */
export function useTopicBySlug(slug: string) {
  return useQuery<TopicResponse>({
    queryKey: ['topic', slug],
    queryFn: async () => {
      const endpoint = `${API_ENDPOINTS.TOPICS}/${slug}`;
      return await apiFetchClient(endpoint);
    },
    enabled: !!slug,
  });
}

/**
 * React Query hook for fetching child topics of a parent topic
 */
export function useTopicChildren(slug: string) {
  return useQuery<TopicsResponse>({
    queryKey: ['topic-children', slug],
    queryFn: async () => {
      const endpoint = `${API_ENDPOINTS.TOPICS}/${slug}/children`;
      return await apiFetchClient(endpoint);
    },
    enabled: !!slug,
  });
}

/**
 * React Query hook for fetching all collections (subjects)
 */
export function useCollections() {
  return useQuery<CollectionsResponse>({
    queryKey: ['collections'],
    queryFn: async () => {
      return await apiFetchClient(API_ENDPOINTS.SUBJECTS);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
