/**
 * Shared Data Model interfaces for the homepage context layers
 */

export interface Document {
  id: string;
  title: string;
  subject: string;
  grade: number;
  type: 'textbook' | 'guide' | 'notes' | 'past_paper';
  topicCount: number;
  createdAt: string;
  updatedAt: string;
  status: 'published' | 'draft' | 'archived';
}

export interface HomepageStats {
  documents: number;
  topics: number;
  subjects: number;
  grades: number;
}
