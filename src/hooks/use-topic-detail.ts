'use client';

import { useQuery } from '@tanstack/react-query';
import { TopicDetail, TopicChildrenResponse } from '@/types/topic';

const fetchTopicBySlug = async (slug: string): Promise<TopicDetail> => {
  const response = await fetch(`/api/v1/topics/${slug}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch topic: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

const fetchTopicChildren = async (slug: string): Promise<TopicChildrenResponse> => {
  const response = await fetch(`/api/v1/topics/${slug}/children`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch topic children: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const useTopicDetail = (slug: string) => {
  return useQuery({
    queryKey: ['topic-detail', slug],
    queryFn: () => fetchTopicBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTopicChildren = (slug: string) => {
  return useQuery({
    queryKey: ['topic-children', slug],
    queryFn: () => fetchTopicChildren(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
