'use client';

import { useState, useRef, useEffect } from 'react';
import { Collection } from '@/types/topic';
import { Button } from '@/components/ui/button';

interface CollectionDropdownProps {
  collections: Collection[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

/**
 * Dropdown component for selecting collection/filter type
 */
export function CollectionDropdown({
  collections,
  selectedValue,
  onSelect,
}: CollectionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCollection = collections.find((c) => c.slug === selectedValue);

  return (
    <div className="relative w-full sm:w-48" ref={dropdownRef}>
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {selectedCollection ? selectedCollection.name : 'All Collections'}
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <ul
          className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {/* All Collections option */}
          <li
            className={`cursor-pointer px-3 py-2 text-sm hover:bg-accent ${
              !selectedValue ? 'bg-accent text-accent-foreground' : ''
            }`}
            onClick={() => {
              onSelect('');
              setIsOpen(false);
            }}
            role="option"
            aria-selected={!selectedValue}
          >
            All Collections
          </li>

          {/* Collection options */}
          {collections.map((collection) => (
            <li
              key={collection._id}
              className={`cursor-pointer px-3 py-2 text-sm hover:bg-accent ${
                collection.slug === selectedValue
                  ? 'bg-accent text-accent-foreground'
                  : ''
              }`}
              onClick={() => {
                onSelect(collection.slug);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={collection.slug === selectedValue}
            >
              <div className="flex items-center gap-2">
                {collection.icon && <span>{collection.icon}</span>}
                <span className="truncate">{collection.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
