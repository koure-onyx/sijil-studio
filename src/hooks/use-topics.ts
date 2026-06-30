'use client';

import { useQuery } from '@tanstack/react-query';
import { Topic, TopicsResponse, TopicFilters, Collection, CollectionsResponse } from '../types/topic';

const fetchTopics = async (filters: TopicFilters): Promise<TopicsResponse> => {
  const params = new URLSearchParams();
  
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.collection) params.append('collection', filters.collection);
  if (filters.search) params.append('search', filters.search);

  const response = await fetch(`/api/v1/topics?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch topics: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

const fetchCollections = async (): Promise<CollectionsResponse> => {
  const response = await fetch('/api/v1/subjects');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch collections: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

const fetchTopicBySlug = async (slug: string): Promise<Topic> => {
  const response = await fetch(`/api/v1/topics/${slug}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch topic: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

const fetchTopicChildren = async (slug: string): Promise<TopicsResponse> => {
  const response = await fetch(`/api/v1/topics/${slug}/children`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch topic children: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const useTopics = (filters: TopicFilters) => {
  return useQuery({
    queryKey: ['topics', filters],
    queryFn: () => fetchTopics(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: fetchCollections,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTopicBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['topic', slug],
    queryFn: () => fetchTopicBySlug(slug),
    enabled: !!slug,
  });
};

export const useTopicChildren = (slug: string) => {
  return useQuery({
    queryKey: ['topic-children', slug],
    queryFn: () => fetchTopicChildren(slug),
    enabled: !!slug,
  });
};
