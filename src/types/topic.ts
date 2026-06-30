export interface Topic {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
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
  level: number;
  created_at: string;
  updated_at: string;
}

export interface TopicDetail extends Topic {
  parent: {
    id: string;
    slug: string;
    title: string;
  } | null;
}

export interface ChildTopic {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  documentCount: number;
}

export interface DocumentSummary {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  type: 'quranic' | 'hadith' | 'classical' | 'modern';
  sourceId?: string | null;
  topicIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TopicDocumentsResponse {
  data: {
    documents: DocumentSummary[];
    pagination: PaginationInfo;
  };
}

export interface TopicChildrenResponse {
  data: {
    topics: ChildTopic[];
    pagination: PaginationInfo;
  };
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
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
