import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTopicBySlug, getTopicChildren, getTopicDocuments } from '@/lib/api';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { TopicHeader } from '@/components/topic-detail/topic-header';
import { ChildTopicsGrid } from '@/components/topic-detail/child-topics-grid';
import { TopicDocumentList } from '@/components/topic-detail/document-list';
import { TopicActions } from '@/components/topic-detail/topic-actions';
import { Suspense } from 'react';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const topic = await getTopicBySlug(params.slug);
    
    return {
      title: `${topic.title} | Sijil`,
      description: topic.description || `Explore documents related to ${topic.title}`,
      openGraph: {
        title: `${topic.title} | Sijil`,
        description: topic.description || `Explore documents related to ${topic.title}`,
        type: 'website',
        url: `https://sijil.app/topics/${params.slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Topic Not Found | Sijil',
      description: 'The requested topic could not be found.',
    };
  }
}

export default async function TopicDetailPage({ params }: PageProps) {
  try {
    const [topic, childrenData] = await Promise.all([
      getTopicBySlug(params.slug),
      getTopicChildren(params.slug),
    ]);

    // Build breadcrumb hierarchy
    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Topics', href: '/topics' },
    ];

    // Add parent topic if exists
    if (topic.parent) {
      breadcrumbs.push({
        label: topic.parent.title,
        href: `/topics/${topic.parent.slug}`,
      });
    }

    breadcrumbs.push({
      label: topic.title,
      href: `/topics/${params.slug}`,
    });

    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb items={breadcrumbs} />
        
        <TopicHeader
          title={topic.title}
          description={topic.description}
          level={topic.level}
          documentCount={topic.document_count}
          childCount={topic.children_count || 0}
        />

        <TopicActions topicSlug={params.slug} className="mb-8" />

        {/* Child Topics Section */}
        {childrenData.data && childrenData.data.length > 0 && (
          <ChildTopicsGrid 
            topics={childrenData.data.map(child => ({
              id: child.id,
              slug: child.slug,
              title: child.title,
              description: child.description,
              documentCount: child.document_count,
            }))}
          />
        )}

        {/* Documents Section */}
        <Suspense fallback={
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
        }>
          <TopicDocumentList topicSlug={params.slug} />
        </Suspense>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Thing',
              name: topic.title,
              description: topic.description,
              url: `https://sijil.app/topics/${topic.slug}`,
            }),
          }}
        />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
