'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Collection } from '@/types/topic';
import SearchInput from './search-input';

interface FilterBarProps {
  collections: Collection[];
  selectedCollection?: string;
  searchQuery?: string;
}

export default function FilterBar({ 
  collections, 
  selectedCollection, 
  searchQuery 
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCollectionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set('collection', value);
      params.set('page', '1');
    } else {
      params.delete('collection');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set('search', value);
      params.set('page', '1');
    } else {
      params.delete('search');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="relative w-full sm:w-48">
        <select
          value={selectedCollection || ''}
          onChange={(e) => handleCollectionChange(e.target.value)}
          className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Filter by collection"
        >
          <option value="">All Collections</option>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.slug}>
              {collection.name}
            </option>
          ))}
        </select>
      </div>
      
      <SearchInput
        defaultValue={searchQuery || ''}
        onChange={handleSearchChange}
      />
    </div>
  );
}
