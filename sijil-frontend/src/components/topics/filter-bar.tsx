'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Collection } from '@/types/topic';
import { CollectionDropdown } from './collection-dropdown';
import { SearchInput } from './search-input';

interface FilterBarProps {
  collections: Collection[];
  selectedCollection?: string;
  searchQuery?: string;
}

/**
 * Filter bar component with collection dropdown and search input
 */
export function FilterBar({
  collections,
  selectedCollection,
  searchQuery,
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Handle collection filter change
   */
  const handleCollectionChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('collection', value);
      params.set('page', '1'); // Reset to first page when changing filters
    } else {
      params.delete('collection');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  /**
   * Handle search query change
   */
  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('search', value);
      params.set('page', '1'); // Reset to first page when searching
    } else {
      params.delete('search');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <CollectionDropdown
        collections={collections}
        selectedValue={selectedCollection}
        onSelect={handleCollectionChange}
      />

      <SearchInput defaultValue={searchQuery || ''} onChange={handleSearchChange} />
    </div>
  );
}
