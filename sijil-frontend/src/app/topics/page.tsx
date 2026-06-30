import { Metadata } from 'next';
import { Suspense } from 'react';
import { apiFetchClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { TopicGrid } from '@/components/topics/topic-grid';
import { FilterBar } from '@/components/topics/filter-bar';
import { BreadcrumbNav } from '@/components/topics/breadcrumb-nav';
import { TopicSkeleton } from '@/components/topics/topic-skeleton';
import { TopicsResponse, CollectionsResponse, TopicFilters } from '@/types/topic';

interface PageProps {
  searchParams: Promise<{ collection?: string; search?: string; page?: string }>;
}

/**
 * Generate metadata for the topics page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Browse Topics | Sijil',
    description: 'Explore Islamic topics organized by collection including Quran, Hadith, Fiqh, and more.',
  };
}

/**
 * Main topics list page - Server Component
 */
export default async function TopicsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  const filters: TopicFilters = {
    collection: params.collection,
    search: params.search,
    page: params.page ? parseInt(params.page) : 1,
    limit: 20,
  };

  // Fetch data on the server side
  const [topicsPromise, collectionsPromise] = await Promise.all([
    apiFetchClient<TopicsResponse>(`${API_ENDPOINTS.TOPICS}?${new URLSearchParams(filters as Record<string, string>).toString()}`),
    apiFetchClient<CollectionsResponse>(API_ENDPOINTS.SUBJECTS),
  ]);

  const topicsData = await topicsPromise;
  const collectionsData = await collectionsPromise;

  // Create breadcrumbs
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Topics', href: '/topics' },
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
          topics={topicsData.data}
          currentPage={topicsData.pagination?.page || 1}
          totalPages={topicsData.pagination?.total || 1}
          hasActiveFilters={!!filters.collection || !!filters.search}
        />
      </Suspense>
    </div>
  );
}
