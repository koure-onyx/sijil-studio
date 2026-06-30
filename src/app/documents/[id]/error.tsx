'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function DocumentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
        <h2 className="text-2xl font-bold">Failed to load document</h2>
        <p className="text-muted-foreground">{error.message}</p>
        <Button onClick={reset}>Try Again</Button>
      </div>
    </div>
  );
}
