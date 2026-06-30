import { Topic, TopicsResponse, Collection, CollectionsResponse } from '@/types/topic';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

export const getTopics = async (filters: { 
  collection?: string; 
  search?: string; 
  page?: number; 
  limit?: number; 
  parent_id?: string 
}): Promise<TopicsResponse> => {
  const params = new URLSearchParams();
  
  if (filters.collection) params.append('collection', filters.collection);
  if (filters.search) params.append('search', filters.search);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.parent_id) params.append('parent_id', filters.parent_id);

  const response = await fetch(`${API_BASE_URL}/topics?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch topics: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const getTopicBySlug = async (slug: string): Promise<Topic> => {
  const response = await fetch(`${API_BASE_URL}/topics/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch topic: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const getTopicChildren = async (slug: string): Promise<TopicsResponse> => {
  const response = await fetch(`${API_BASE_URL}/topics/${slug}/children`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch topic children: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const getCollections = async (): Promise<CollectionsResponse> => {
  const response = await fetch(`${API_BASE_URL}/subjects`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch collections: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
