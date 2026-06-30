import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar, User, Book, Tag } from 'lucide-react';

interface Metadata {
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

interface Props {
  metadata: Metadata;
}

export function DocumentMetadata({ metadata }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Document Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Authors */}
        {metadata.authors && metadata.authors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Authors</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {metadata.authors.map((author) => (
                <Badge key={author.id} variant="secondary">
                  {author.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Collection */}
        {metadata.collection && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Book className="w-4 h-4" />
              <span>Collection</span>
            </div>
            <Badge variant="outline">{metadata.collection.name}</Badge>
          </div>
        )}
        
        {/* Topics */}
        {metadata.topics && metadata.topics.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="w-4 h-4" />
              <span>Topics</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {metadata.topics.map((topic) => (
                <Badge key={topic.id} variant="outline">
                  {topic.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Stats */}
        <div className="pt-4 border-t space-y-2 text-sm">
          {metadata.wordCount && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Words</span>
              <span className="font-medium">{metadata.wordCount.toLocaleString()}</span>
            </div>
          )}
          
          {metadata.readingTime && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reading time</span>
              <span className="font-medium">{metadata.readingTime} min</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Published</span>
            <span className="font-medium">
              {format(new Date(metadata.createdAt), 'MMM d, yyyy')}
            </span>
          </div>
          
          {metadata.version && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium">v{metadata.version}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
