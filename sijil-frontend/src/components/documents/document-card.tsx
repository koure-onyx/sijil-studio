import Link from 'next/link';
import { FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Document } from '@/types/homepage';

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const readableType = document.type.replace('_', ' ');

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden">
      <div className="p-6 flex-1">
        <div className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground uppercase tracking-wide mb-3">
          {document.subject}
        </div>
        <h3 className="text-lg font-serif font-bold text-foreground line-clamp-2 mb-2">
          {document.title}
        </h3>
        <p className="text-xs text-muted-foreground capitalize mb-4">
          Grade {document.grade} • {readableType}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground border-t pt-4">
          <span className="flex items-center">
            <FileText className="h-3 w-3 mr-1 text-primary" />
            {document.topicCount} topics
          </span>
          <span className="flex items-center">
            <Calendar className="h-3 w-3 mr-1 text-primary" />
            {formatDate(document.createdAt)}
          </span>
        </div>
      </div>
      <div className="p-6 pt-0">
        <Link href={`/documents/${document.id}`} passHref legacyBehavior>
          <Button variant="outline" size="sm" className="w-full min-h-[44px]">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
