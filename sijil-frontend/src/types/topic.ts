import { BasePagination } from './models';

export interface Topic {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  document_count: number;
  collection: {
    _id: string;
    name: string;
    slug: string;
    icon?: string;
  };
  parent?: {
    _id: string;
    slug: string;
    title: string;
  };
  children_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Collection {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  document_count: number;
  icon?: string;
  color?: string;
}

export interface TopicFilters {
  collection?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface TopicsResponse {
  success: boolean;
  data: Topic[];
  pagination: BasePagination;
}

export interface CollectionsResponse {
  success: boolean;
  data: Collection[];
}

export interface TopicResponse {
  success: boolean;
  data: Topic;
}
