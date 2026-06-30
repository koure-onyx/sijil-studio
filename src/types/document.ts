export interface Document {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authors?: Array<{
    id: string;
    name: string;
  }>;
  collection?: {
    id: string;
    name: string;
    slug: string;
  };
  topics?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  sections?: Array<{
    id: string;
    title: string;
    level: number;
    content?: string;
  }>;
  language?: string;
  wordCount?: number;
  readingTime?: number;
  version?: number;
}

export interface DocumentMetadata {
  authors?: Array<{ name: string; id: string }>;
  createdAt: string;
  updatedAt: string;
  collection?: { id: string; name: string };
  topics?: Array<{ id: string; name: string }>;
  language?: string;
  wordCount?: number;
  readingTime?: number;
  version?: number;
}

export interface DocumentsResponse {
  data: Document[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
  };
}
