'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TopicDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Topic detail error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Failed to load topic
      </h2>
      <p className="text-gray-600 mb-6">
        {error.message || 'An unexpected error occurred'}
      </p>
      <Button 
        onClick={reset}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Try again
      </Button>
    </div>
  );
}
