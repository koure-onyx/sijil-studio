'use client';

import { useQuery } from '@tanstack/react-query';
import { Document, DocumentMetadata } from '@/types/document';

const fetchDocument = async (id: string): Promise<Document> => {
  const response = await fetch(`/api/v1/documents/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Document not found');
    }
    throw new Error(`Failed to fetch document: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

const fetchDocumentMetadata = async (id: string): Promise<DocumentMetadata> => {
  const response = await fetch(`/api/v1/documents/${id}/metadata`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch document metadata: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => fetchDocument(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDocumentMetadata = (id: string) => {
  return useQuery({
    queryKey: ['document-metadata', id],
    queryFn: () => fetchDocumentMetadata(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};
