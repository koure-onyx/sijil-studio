import Link from 'next/link';
import { Topic } from '@/types/topic';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface TopicCardProps {
  topic: Topic;
}

/**
 * Individual topic card component displaying topic information
 */
export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link href={`/topics/${topic.slug}`} className="block h-full">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold line-clamp-2">{topic.title}</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          {topic.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {topic.description}
            </p>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">
              {topic.document_count} {topic.document_count === 1 ? 'document' : 'documents'}
            </span>
            
            {topic.collection && (
              <Badge variant="secondary" className="text-xs">
                {topic.collection.icon && (
                  <span className="mr-1">{topic.collection.icon}</span>
                )}
                {topic.collection.name}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
