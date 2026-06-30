import {
  Topic,
  TopicsResponse,
  Collection,
  CollectionsResponse,
  TopicDocumentsResponse,
  TopicChildrenResponse
} from '@/types/topic';
import { Document, DocumentsResponse } from '@/types/document';

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

export const getTopicDocuments = async (
  slug: string,
  page = 1,
  pageSize = 20,
  sortBy?: string,
  sortOrder?: string
): Promise<TopicDocumentsResponse> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('pageSize', pageSize.toString());

  if (sortBy) params.append('sortBy', sortBy);
  if (sortOrder) params.append('sortOrder', sortOrder);

  const response = await fetch(
    `${API_BASE_URL}/topics/${slug}/documents?${params.toString()}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch topic documents: ${response.status} ${response.statusText}`);
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

// Document APIs for Phase 06
export const getDocument = async (id: string): Promise<Document> => {
  const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch document: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const getDocumentMetadata = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/documents/${id}/metadata`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch document metadata: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const getDocuments = async (filters: {
  subject?: string;
  grade?: string;
  status?: string;
  type?: string;
  sort?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<DocumentsResponse> => {
  const params = new URLSearchParams();

  if (filters.subject) params.append('subject', filters.subject);
  if (filters.grade) params.append('grade', filters.grade);
  if (filters.status) params.append('status', filters.status);
  if (filters.type) params.append('type', filters.type);
  if (filters.sort) params.append('sort', filters.sort);
  if (filters.search) params.append('search', filters.search);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());

  const response = await fetch(`${API_BASE_URL}/documents?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch documents: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
