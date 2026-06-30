'use client';

import { useCallback, useRef } from 'react';

export function useReadingSession(documentId: string) {
  const sessionStartRef = useRef<Date | null>(null);
  const lastPositionRef = useRef<number>(0);

  const trackReading = useCallback(() => {
    sessionStartRef.current = new Date();
    
    // Send analytics event (fire-and-forget)
    fetch('/api/v1/analytics/read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documentId,
        startedAt: sessionStartRef.current.toISOString(),
      }),
    }).catch(() => {
      // Ignore errors - analytics is non-critical
    });
  }, [documentId]);

  const updatePosition = useCallback((position: number) => {
    lastPositionRef.current = position;
    
    // Could send periodic updates to backend here
    // For now, just update local state
  }, []);

  const getSessionDuration = useCallback(() => {
    if (!sessionStartRef.current) return 0;
    return Date.now() - sessionStartRef.current.getTime();
  }, []);

  return {
    trackReading,
    updatePosition,
    getSessionDuration,
  };
}
