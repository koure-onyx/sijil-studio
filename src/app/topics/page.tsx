import { Metadata } from 'next';
import { Suspense } from 'react';
import { getTopics, getCollections } from '@/lib/api';
import TopicGrid from '@/components/topics/topic-grid';
import FilterBar from '@/components/topics/filter-bar';
import BreadcrumbNav from '@/components/topics/breadcrumb-nav';
import TopicSkeleton from '@/components/topics/topic-skeleton';
import { TopicFilters } from '@/types/topic';

export const metadata: Metadata = {
  title: 'Browse Topics | Sijil',
  description: 'Explore Islamic topics organized by collection including Quran, Hadith, Fiqh, and more.',
};

interface PageProps {
  searchParams: { collection?: string; search?: string; page?: string };
}

export default async function TopicsPage({ searchParams }: PageProps) {
  const filters: TopicFilters = {
    collection: searchParams.collection,
    search: searchParams.search,
    page: parseInt(searchParams.page || '1')
  };

  try {
    const [topicsData, collectionsData] = await Promise.all([
      getTopics(filters),
      getCollections()
    ]);

    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Topics', href: '/topics' }
    ];

    return (
      <div className="container mx-auto px-4 py-8">
        <BreadcrumbNav breadcrumbs={breadcrumbs} />
        
        <FilterBar
          collections={collectionsData.data}
          selectedCollection={filters.collection}
          searchQuery={filters.search}
        />

        <Suspense fallback={<TopicSkeleton />}>
          <TopicGrid 
            topics={topicsData.data} 
            currentPage={topicsData.meta.current_page}
            totalPages={topicsData.meta.total_pages}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BreadcrumbNav breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Topics', href: '/topics' }]} />
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Failed to load topics</h3>
          <p className="mt-2 text-sm text-gray-500">Please try again later.</p>
        </div>
      </div>
    );
  }
}
