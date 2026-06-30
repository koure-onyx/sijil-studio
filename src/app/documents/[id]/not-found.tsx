import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DocumentNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <FileQuestion className="w-12 h-12 text-muted-foreground mx-auto" />
        <h2 className="text-2xl font-bold">Document Not Found</h2>
        <p className="text-muted-foreground">
          The document you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <div className="flex gap-2 justify-center">
          <Button asChild>
            <Link href="/documents">Browse Documents</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
