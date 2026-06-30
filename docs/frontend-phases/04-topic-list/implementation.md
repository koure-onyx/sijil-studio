# Phase 04: Topic List - Implementation Specification

## Pages & Routes

### Route: `/topics`

**File:** `app/topics/page.tsx`
**Type:** Server Component
**Purpose:** Main topic list page with filtering and hierarchical browsing

```typescript
// Route metadata
export const metadata = {
  title: 'Browse Topics | Sijil',
  description: 'Explore Islamic topics organized by collection including Quran, Hadith, Fiqh, and more.',
  canonical: '/topics'
};
```

**Server-side data fetching:**
- Fetch root topics from `/api/v1/topics`
- Support query params: `?collection=quran&search=prayer&page=1`
- Initial page size: 20 topics

### Route: `/topics/[slug]`

**File:** `app/topics/[slug]/page.tsx`
**Type:** Server Component (with Client interactivity for children)
**Purpose:** Display child topics within a parent topic

**Dynamic metadata based on topic data**

---

## Layout Structure

```
┌─────────────────────────────────────┐
│           Header (Phase 02)         │
├─────────────────────────────────────┤
│  Breadcrumb                         │
│  Home > Topics > [Parent Topic]     │
├─────────────────────────────────────┤
│  Filter Bar                         │
│  [Collection ▼] [Search input   🔍] │
├─────────────────────────────────────┤
│                                     │
│  Topic Grid                         │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │Topic │ │Topic │ │Topic │        │
│  │  1   │ │  2   │ │  3   │ ...    │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
├─────────────────────────────────────┤
│  Pagination                         │
│  ← Prev  1  2  3  Next →            │
├─────────────────────────────────────┤
│          Footer (Phase 02)          │
└─────────────────────────────────────┘
```

---

## Components

### New Components

#### 1. TopicCard
**File:** `components/topics/TopicCard.tsx`
**Type:** Server Component
**Props:**
```typescript
interface TopicCardProps {
  topic: Topic;
  showDocumentCount?: boolean;
  showCollectionBadge?: boolean;
}
```
**Purpose:** Display individual topic with title, document count, collection badge
**Dependencies:** CollectionBadge (Phase 03), DocumentCount utility

#### 2. TopicGrid
**File:** `components/topics/TopicGrid.tsx`
**Type:** Server Component
**Props:**
```typescript
interface TopicGridProps {
  topics: Topic[];
  columns?: 2 | 3 | 4;
}
```
**Purpose:** Responsive grid layout for topic cards
**Responsive:** 2 cols mobile, 3 cols tablet, 4 cols desktop

#### 3. TopicFilterBar
**File:** `components/topics/TopicFilterBar.tsx`
**Type:** Client Component
**Props:**
```typescript
interface TopicFilterBarProps {
  collections: Collection[];
  selectedCollection?: string;
  searchQuery?: string;
  onFilterChange: (filters: TopicFilters) => void;
}
```
**Purpose:** Collection dropdown and search input for filtering
**State:** Local state for debounced search

#### 4. TopicBreadcrumb
**File:** `components/topics/TopicBreadcrumb.tsx`
**Type:** Server Component
**Props:**
```typescript
interface TopicBreadcrumbProps {
  topicHierarchy: Topic[];
}
```
**Purpose:** Display hierarchical navigation path
**Dependencies:** shadcn/ui Breadcrumb component

#### 5. TopicPagination
**File:** `components/topics/TopicPagination.tsx`
**Type:** Client Component
**Props:**
```typescript
interface TopicPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
```
**Purpose:** Pagination controls with page numbers

#### 6. TopicSkeleton
**File:** `components/topics/TopicSkeleton.tsx`
**Type:** Client Component
**Props:** None
**Purpose:** Loading skeleton matching TopicCard structure
**Design:** Match Phase 01 loading patterns

#### 7. EmptyTopicsState
**File:** `components/topics/EmptyTopicsState.tsx`
**Type:** Server Component
**Props:**
```typescript
interface EmptyTopicsStateProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}
```
**Purpose:** Display when no topics match filters

#### 8. CollectionDropdown
**File:** `components/topics/CollectionDropdown.tsx`
**Type:** Client Component
**Props:**
```typescript
interface CollectionDropdownProps {
  collections: Collection[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}
```
**Purpose:** Dropdown to filter by collection type
**Dependencies:** shadcn/ui Select component

### Reused Components

From Phase 01:
- `ErrorBoundary`
- `LoadingSkeleton`
- `Button`

From Phase 02:
- `Header`
- `Footer`
- `MobileMenu`

From Phase 03:
- `CollectionBadge`
- `StatDisplay`
- `HeroSection` (pattern reference)

---

## API Integration

### Endpoints Used

#### GET `/api/v1/topics`
**Purpose:** Fetch paginated list of topics
**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `collection` (string, optional) - Filter by collection slug
- `parent_id` (string, optional) - Get child topics
- `search` (string, optional) - Search in topic titles

**Response:**
```typescript
interface TopicsResponse {
  data: Topic[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
  };
}
```

**Usage Location:** `app/topics/page.tsx`, `app/topics/[slug]/page.tsx`

#### GET `/api/v1/collections`
**Purpose:** Fetch available collections for filter dropdown
**Response:**
```typescript
interface CollectionsResponse {
  data: Collection[];
}
```

**Usage Location:** `components/topics/TopicFilterBar.tsx`

---

## Data Models

```typescript
// models/topic.ts
interface Topic {
  id: string;
  slug: string;
  title: string;
  description?: string;
  document_count: number;
  collection: {
    id: string;
    name: string;
    slug: string;
    icon?: string;
  };
  parent?: {
    id: string;
    slug: string;
    title: string;
  };
  children_count?: number;
  created_at: string;
  updated_at: string;
}

// models/collection.ts
interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  document_count: number;
  icon?: string;
  color?: string;
}

// models/topic-filters.ts
interface TopicFilters {
  collection?: string;
  search?: string;
  page?: number;
}
```

---

## State Management

### URL State (Preferred)
All filter state stored in URL query parameters:
- `?collection=quran&search=prayer&page=2`

**Benefits:**
- Shareable URLs
- Browser back/forward works
- SEO friendly
- No hydration mismatch

### Local Component State
Only for transient UI states:
- Dropdown open/close
- Search input debounce (300ms)
- Loading states during navigation

---

## Folder Structure

```
app/
  topics/
    page.tsx                    # Main topic list
    [slug]/
      page.tsx                  # Child topics view

components/
  topics/
    TopicCard.tsx
    TopicGrid.tsx
    TopicFilterBar.tsx
    TopicBreadcrumb.tsx
    TopicPagination.tsx
    TopicSkeleton.tsx
    EmptyTopicsState.tsx
    CollectionDropdown.tsx

models/
  topic.ts
  collection.ts
  topic-filters.ts

lib/
  topic-utils.ts                # Topic helper functions
```

---

## SEO Requirements

### Metadata for `/topics`
```typescript
{
  title: 'Browse Topics | Sijil',
  description: 'Explore Islamic topics organized by collection including Quran, Hadith, Fiqh, and more.',
  openGraph: {
    title: 'Browse Topics | Sijil',
    description: 'Explore Islamic topics organized by collection.',
    type: 'website',
    url: 'https://sijil.com/topics'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Browse Topics | Sijil',
    description: 'Explore Islamic topics organized by collection.'
  }
}
```

### Metadata for `/topics/[slug]`
Dynamic based on topic:
```typescript
{
  title: `${topic.title} Topics | Sijil`,
  description: topic.description || `Browse topics under ${topic.title}`,
  openGraph: {
    title: `${topic.title} Topics | Sijil`,
    description: topic.description || `Browse topics under ${topic.title}`,
    type: 'website',
    url: `https://sijil.com/topics/${topic.slug}`
  }
}
```

### Structured Data
Add ItemList structured data for topic listings.

---

## Loading States

### Initial Load
- Show `TopicSkeleton` grid (20 items)
- Skeleton matches final card layout exactly
- Fade-in animation on content load

### Filter Change
- Maintain current content visible
- Show subtle loading overlay on grid
- Replace content smoothly on completion

### Navigation (Page Change)
- Show `TopicSkeleton` during transition
- Preserve scroll position at top of grid

---

## Error States

### No Topics Available
- Show `EmptyTopicsState` component
- Message: "No topics found"
- If filters active: show "Clear filters" button
- If no filters: show "Check back later" message

### API Error
- Show error message: "Unable to load topics"
- Provide "Retry" button
- Log error to monitoring service
- Preserve filter state for retry

### Network Error
- Show offline message
- Provide "Retry" button
- Check connection status

---

## Accessibility Requirements

### Keyboard Navigation
- Tab through topic cards in logical order
- Enter/Space to activate topic link
- Arrow keys for pagination controls
- Escape to close dropdowns

### Screen Readers
- All topic cards have descriptive labels
- Document counts announced: "Prayer, 45 documents"
- Collection badges have aria-labels
- Breadcrumb has nav landmark with aria-label
- Pagination has aria-label for page navigation

### Focus Management
- Visible focus indicators on all interactive elements
- Focus moves to top of results on filter change
- Focus trapped in dropdowns when open

### Color Contrast
- Text meets WCAG AA (4.5:1 minimum)
- Interactive elements have clear visual states
- Don't rely solely on color for information

---

## Responsive Behavior

### Mobile (< 640px)
- Single column topic grid
- Stacked filter bar (dropdown above search)
- Full-width topic cards
- Simplified breadcrumb (truncate long titles)
- Touch-friendly tap targets (min 44px)

### Tablet (640px - 1024px)
- 2-3 column topic grid
- Horizontal filter bar
- Medium topic cards
- Full breadcrumb visible

### Desktop (> 1024px)
- 4 column topic grid
- Horizontal filter bar with spacing
- Large topic cards with hover effects
- Full breadcrumb with icons

---

## Backend Integration Points

### Required Endpoints
1. `GET /api/v1/topics` - Primary data source
2. `GET /api/v1/collections` - Filter options

### Integration Pattern
```typescript
// Server Component data fetching
async function getTopics(filters: TopicFilters) {
  const response = await api.get('/topics', { params: filters });
  return response.data;
}

// Use in page component
const { data, meta } = await getTopics({
  page: 1,
  collection: 'quran'
});
```

### Error Handling
```typescript
try {
  const topics = await getTopics(filters);
} catch (error) {
  if (error.status === 404) {
    // Handle not found
  } else if (error.status === 500) {
    // Handle server error
  } else {
    // Handle network error
  }
}
```

---

## File Specifications

### `app/topics/page.tsx`
```typescript
import { getTopics, getCollections } from '@/lib/api';
import TopicGrid from '@/components/topics/TopicGrid';
import TopicFilterBar from '@/components/topics/TopicFilterBar';
import TopicBreadcrumb from '@/components/topics/TopicBreadcrumb';
import { Suspense } from 'react';
import TopicSkeleton from '@/components/topics/TopicSkeleton';

export default async function TopicsPage({
  searchParams
}: {
  searchParams: { collection?: string; search?: string; page?: string };
}) {
  const filters = {
    collection: searchParams.collection,
    search: searchParams.search,
    page: parseInt(searchParams.page || '1')
  };

  const [topicsData, collectionsData] = await Promise.all([
    getTopics(filters),
    getCollections()
  ]);

  return (
    <div className="container py-8">
      <TopicBreadcrumb hierarchy={[{ title: 'Topics', href: '/topics' }]} />
      
      <TopicFilterBar
        collections={collectionsData.data}
        selectedCollection={filters.collection}
        searchQuery={filters.search}
      />

      <Suspense fallback={<TopicSkeleton />}>
        <TopicGrid topics={topicsData.data} />
      </Suspense>
    </div>
  );
}
```

### `app/topics/[slug]/page.tsx`
Similar structure but fetches child topics based on slug.

---

## Performance Optimizations

1. **Server-Side Rendering:** Initial HTML includes topic data
2. **Image Optimization:** Collection icons use next/image
3. **Code Splitting:** Topic components loaded on demand
4. **Debounced Search:** 300ms delay before API call
5. **Pagination:** Load 20 topics per page max
6. **Cache Headers:** Leverage browser caching for static assets

---

## Acceptance Checklist

- [ ] Topics load from backend API
- [ ] Hierarchical navigation works (parent → child)
- [ ] Collection filter dropdown functional
- [ ] Search filters topics correctly
- [ ] Pagination navigates between pages
- [ ] Loading skeletons display during fetch
- [ ] Error states show with retry option
- [ ] Empty states display appropriately
- [ ] Mobile layout responsive (single column)
- [ ] Tablet layout responsive (2-3 columns)
- [ ] Desktop layout responsive (4 columns)
- [ ] Keyboard navigation works
- [ ] Screen reader announces content correctly
- [ ] Focus management implemented
- [ ] Color contrast meets WCAG AA
- [ ] SEO metadata present on all pages
- [ ] Breadcrumb navigation accurate
- [ ] URLs update with filter changes
- [ ] Browser back/forward works with filters
- [ ] Build passes without errors
- [ ] TypeScript compilation successful
- [ ] Lint rules pass
- [ ] No console errors in browser
