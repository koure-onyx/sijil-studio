'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DocumentSummary, PaginationInfo } from '@/types/topic';
import { getTopicDocuments } from '@/lib/api';

export interface TopicDocumentListProps {
  topicSlug: string;
  initialPage?: number;
  pageSize?: number;
  className?: string;
}

interface DocumentsResponse {
  data: {
    documents: DocumentSummary[];
    pagination: PaginationInfo;
  };
}

export function TopicDocumentList({
  topicSlug,
  initialPage = 1,
  pageSize = 20,
  className = '',
}: TopicDocumentListProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [documents, setDocuments] = useState<DocumentSummary[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch documents when page changes
  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await getTopicDocuments(
          topicSlug,
          currentPage,
          pageSize
        );
        setDocuments(response.data.documents);
        setPagination(response.data.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load documents');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [topicSlug, currentPage, pageSize]);

  if (isLoading && documents.length === 0) {
    return (
      <section className={`mb-8 ${className}`} aria-label="Documents">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Documents
        </h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse"
            >
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`mb-8 ${className}`} aria-label="Documents">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Documents
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-800">{error}</p>
        </div>
      </section>
    );
  }

  if (documents.length === 0) {
    return (
      <section className={`mb-8 ${className}`} aria-label="Documents">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Documents
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No documents in this topic yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`mb-8 ${className}`} aria-label="Documents">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Documents ({pagination?.totalItems || documents.length})
      </h2>
      
      <div className="space-y-4">
        {documents.map((doc) => (
          <Link
            key={doc.id}
            href={`/documents/${doc.slug}`}
            className="block bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {doc.title}
              </h3>
              
              {doc.excerpt && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {doc.excerpt}
                </p>
              )}
              
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                  {doc.type}
                </span>
                
                <span className="text-xs text-gray-500">
                  Updated {new Date(doc.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center space-x-2" aria-label="Document pagination">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-300 hover:bg-gray-50"
              aria-label="Previous page"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 text-sm text-gray-700">
              Page {currentPage} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
              disabled={currentPage === pagination.totalPages}
              className="px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-300 hover:bg-gray-50"
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </section>
  );
}
