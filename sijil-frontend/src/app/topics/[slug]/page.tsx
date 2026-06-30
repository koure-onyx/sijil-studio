import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { apiFetchClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { TopicGrid } from '@/components/topics/topic-grid';
import { FilterBar } from '@/components/topics/filter-bar';
import { BreadcrumbNav } from '@/components/topics/breadcrumb-nav';
import { TopicSkeleton } from '@/components/topics/topic-skeleton';
import { TopicsResponse, CollectionsResponse, TopicResponse, TopicFilters } from '@/types/topic';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ collection?: string; search?: string; page?: string }>;
}

/**
 * Generate metadata for the topic detail page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const topicData = await apiFetchClient<TopicResponse>(`${API_ENDPOINTS.TOPICS}/${slug}`);
    const topic = topicData.data;
    
    return {
      title: `${topic.title} Topics | Sijil`,
      description: topic.description || `Browse topics under ${topic.title}`,
    };
  } catch (error) {
    return {
      title: 'Topic Not Found | Sijil',
      description: 'The requested topic could not be found.',
    };
  }
}

/**
 * Topic detail page showing child topics - Server Component
 */
export default async function TopicDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = await searchParams;
  
  const filters: TopicFilters = {
    collection: search.collection,
    search: search.search,
    page: search.page ? parseInt(search.page) : 1,
    limit: 20,
  };

  try {
    // Fetch data on the server side
    const [topicPromise, childrenPromise, collectionsPromise] = await Promise.all([
      apiFetchClient<TopicResponse>(`${API_ENDPOINTS.TOPICS}/${slug}`),
      apiFetchClient<TopicsResponse>(`${API_ENDPOINTS.TOPICS}/${slug}/children`),
      apiFetchClient<CollectionsResponse>(API_ENDPOINTS.SUBJECTS),
    ]);

    const topicData = await topicPromise;
    const childrenData = await childrenPromise;
    const collectionsData = await collectionsPromise;

    const topic = topicData.data;

    // Create breadcrumbs with parent hierarchy
    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Topics', href: '/topics' },
      { label: topic.title, href: `/topics/${slug}` },
    ];

    return (
      <div className="container mx-auto py-8 px-4">
        <BreadcrumbNav breadcrumbs={breadcrumbs} />

        <FilterBar
          collections={collectionsData.data}
          selectedCollection={filters.collection}
          searchQuery={filters.search}
        />

        <Suspense fallback={<TopicSkeleton />}>
          <TopicGrid
            topics={childrenData.data}
            currentPage={childrenData.pagination?.page || 1}
            totalPages={childrenData.pagination?.total || 1}
            hasActiveFilters={!!filters.collection || !!filters.search}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
