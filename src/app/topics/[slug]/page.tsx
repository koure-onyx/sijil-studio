import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTopicBySlug, getTopicChildren, getCollections } from '@/lib/api';
import TopicGrid from '@/components/topics/topic-grid';
import FilterBar from '@/components/topics/filter-bar';
import BreadcrumbNav from '@/components/topics/breadcrumb-nav';
import TopicSkeleton from '@/components/topics/topic-skeleton';
import { Suspense } from 'react';
import { TopicFilters } from '@/types/topic';

interface PageProps {
  params: { slug: string };
  searchParams: { collection?: string; search?: string; page?: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const topic = await getTopicBySlug(params.slug);
    
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

export default async function TopicDetailPage({ params, searchParams }: PageProps) {
  const filters: TopicFilters = {
    collection: searchParams.collection,
    search: searchParams.search,
    page: parseInt(searchParams.page || '1')
  };

  try {
    const [topic, childrenData, collectionsData] = await Promise.all([
      getTopicBySlug(params.slug),
      getTopicChildren(params.slug),
      getCollections()
    ]);

    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Topics', href: '/topics' },
      { label: topic.title, href: `/topics/${params.slug}` }
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
            topics={childrenData.data} 
            currentPage={childrenData.meta.current_page}
            totalPages={childrenData.meta.total_pages}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
