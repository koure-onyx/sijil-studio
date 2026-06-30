'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function PaginationControls({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push(-1);
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push(-1);
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push(-1);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push(-1);
      pages.push(totalPages);
    }
  }

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="flex items-center justify-center">
      <nav className="inline-flex items-center space-x-2" aria-label="Pagination">
        <button
          onClick={() => hasPrevPage && handlePageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            hasPrevPage
              ? 'text-gray-700 hover:bg-gray-100'
              : 'text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Previous page"
        >
          Previous
        </button>

        {pages.map((page, index) => (
          <span key={index}>
            {page === -1 ? (
              <span className="px-3 py-2 text-sm font-medium text-gray-700">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </span>
        ))}

        <button
          onClick={() => hasNextPage && handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            hasNextPage
              ? 'text-gray-700 hover:bg-gray-100'
              : 'text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Next page"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
