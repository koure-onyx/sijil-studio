export interface Topic {
  id: string;
  slug: string;
  title: string;
  description?: string;
  document_count: number;
  collection: {
    id: string;
    name: string;
    slug: string;
    icon?: string;
  };
  parent?: {
    id: string;
    slug: string;
    title: string;
  };
  children_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Collection {
  id: string;
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
}

export interface TopicsResponse {
  data: Topic[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
  };
}

export interface CollectionsResponse {
  data: Collection[];
}
