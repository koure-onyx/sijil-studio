# Phase 07: Search Functionality - Implementation Specification

## Self-Contained Implementation Guide

This document contains everything required to implement the Search phase. No external references needed.

---

## 1. Pages & Routes

### 1.1 Global Search Results Page

**Route:** `/search`
**File:** `app/(public)/search/page.tsx`
**Layout:** MainLayout
**Type:** Client Component (interactive search)

```typescript
// Route structure
/search?q=query&subject=Physics&grade=10&type=document&page=1&sort=relevance
```

**Purpose:** Display search results with faceted filtering

**Key Features:**
- Query parameter-based state (all filters in URL)
- Real-time result updates when filters change
- Pagination support
- Sort options (relevance, date, title)
- Result count and timing display
- Empty state for no results
- Error state handling

**Data Requirements:**
- Search query from URL params
- Filter values from URL params
- Paginated results from API
- Available facets from API

---

### 1.2 Formula Search Page

**Route:** `/search/formulas`
**File:** `app/(public)/search/formulas/page.tsx`
**Layout:** MainLayout
**Type:** Client Component

```typescript
// Route structure
/search/formulas?pattern=E%3Dmc%5E2&subject=Physics&page=1
```

**Purpose:** Specialized search for mathematical formulas and expressions

**Key Features:**
- LaTeX input support with preview
- Plain text formula search
- Formula pattern matching
- Result highlighting with MathJax/KaTeX rendering
- Subject filtering
- Difficulty level filtering

**Data Requirements:**
- Formula pattern from URL params
- Rendered formula preview
- Matching formulas with context
- Source document references

---

### 1.3 Advanced Search Modal

**Route:** Triggered from header (no dedicated route)
**File:** `components/search/AdvancedSearchModal.tsx`
**Type:** Client Component (Dialog/Modal)

**Purpose:** Provide advanced search options without leaving current page

**Key Features:**
- Overlay modal with search form
- Multiple field inputs (title, content, author)
- Date range picker
- Document type multi-select
- Subject/grade cascading filters
- Save search criteria option
- Quick access to recent searches

---

## 2. Components

### 2.1 SearchBar

**File:** `components/search/SearchBar.tsx`
**Type:** Client Component
**Location:** Header (global), Homepage (prominent)

**Props:**
```typescript
interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  variant?: 'header' | 'homepage' | 'compact';
  autoFocus?: boolean;
  onSubmit?: (query: string) => void;
  className?: string;
}
```

**Features:**
- Autocomplete suggestions dropdown
- Debounced input (300ms)
- Keyboard navigation (Arrow keys, Enter, Escape)
- Clear button (X icon)
- Search icon button
- Responsive sizing
- Accessible (ARIA labels, role="searchbox")

**State Management:**
- Local state for input value
- React Query for suggestions fetch
- URL update on submit
- localStorage for recent searches

**Dependencies:**
- `useSearchSuggestions` hook
- `Button` component (shadcn/ui)
- `Input` component (shadcn/ui)
- `Command` component (shadcn/ui for dropdown)

---

### 2.2 SearchResults

**File:** `components/search/SearchResults.tsx`
**Type:** Client Component

**Props:**
```typescript
interface SearchResultsProps {
  results: SearchResult[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
  query: string;
  onPaginate: (page: number) => void;
}
```

**Features:**
- Result list rendering
- Loading skeleton state
- Empty state display
- Error state with retry
- Pagination controls
- Result count display
- Sort dropdown integration

**Layout:**
```
┌─────────────────────────────────────┐
│ Search Stats (42 results in 0.23s)  │
├─────────────────────────────────────┤
│ [Result Card 1]                     │
│ [Result Card 2]                     │
│ [Result Card 3]                     │
│ ...                                 │
├─────────────────────────────────────┤
│ [Pagination Controls]               │
└─────────────────────────────────────┘
```

---

### 2.3 SearchResultCard

**File:** `components/search/SearchResultCard.tsx`
**Type:** Client Component

**Props:**
```typescript
interface SearchResultCardProps {
  result: SearchResultItem;
  highlightQuery: string;
}
```

**Features:**
- Content type badge (Document, Topic, Formula)
- Title with highlights
- Snippet with highlighted matches
- Metadata (subject, grade, date)
- Breadcrumb for nested content
- Click-through to detail page
- Hover effects

**Rendering Logic:**
```typescript
// Highlight matching text
const highlightMatches = (text: string, query: string) => {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};
```

---

### 2.4 SearchFilters

**File:** `components/search/SearchFilters.tsx`
**Type:** Client Component

**Props:**
```typescript
interface SearchFiltersProps {
  facets: SearchFacets;
  selectedFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}
```

**Features:**
- Subject checkboxes (multi-select)
- Grade level selector (multi-select)
- Document type radio buttons
- Content type filter (Documents, Topics, Formulas)
- Date range picker
- Active filters display with remove buttons
- Clear all filters button
- Mobile: Collapsible accordion
- Desktop: Sticky sidebar

**Filter State Structure:**
```typescript
interface FilterState {
  subjects: string[];
  grades: number[];
  types: string[];
  contentTypes: ('document' | 'topic' | 'formula')[];
  dateFrom?: string;
  dateTo?: string;
}
```

---

### 2.5 SearchHighlights

**File:** `components/search/SearchHighlights.tsx`
**Type:** Client Component

**Props:**
```typescript
interface SearchHighlightsProps {
  text: string;
  query: string;
  maxSnippetLength?: number;
  className?: string;
}
```

**Features:**
- Extract relevant snippet around match
- Highlight matching terms
- Truncate with ellipsis
- Support multiple matches
- Preserve word boundaries
- Case-insensitive matching

**Algorithm:**
```typescript
function extractSnippet(text: string, query: string, maxLength: number = 150): string {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text.slice(0, maxLength);
  
  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + query.length + 50);
  
  return (start > 0 ? '...' : '') + 
         text.slice(start, end) + 
         (end < text.length ? '...' : '');
}
```

---

### 2.6 FormulaSearchInput

**File:** `components/search/FormulaSearchInput.tsx`
**Type:** Client Component

**Props:**
```typescript
interface FormulaSearchInputProps {
  initialValue?: string;
  onSearch: (pattern: string) => void;
  mode?: 'latex' | 'plaintext';
}
```

**Features:**
- LaTeX editor with live preview
- Toggle between LaTeX and plain text modes
- Common symbol palette (∑, ∫, √, etc.)
- Syntax validation
- Preview rendered formula (KaTeX)
- Search history for formulas
- Example formulas dropdown

**Dependencies:**
- KaTeX or MathJax for rendering
- Monaco Editor or simple textarea for input

---

### 2.7 SearchSuggestions

**File:** `components/search/SearchSuggestions.tsx`
**Type:** Client Component

**Props:**
```typescript
interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
  onClose: () => void;
  isOpen: boolean;
  anchorElement: HTMLElement | null;
}
```

**Features:**
- Position below search input
- Show up to 8 suggestions
- Highlight matching portion
- Keyboard navigation
- Click to select
- Recent searches section
- Trending searches section
- Loading indicator

**Data Sources:**
- API: `/api/v1/search/suggestions?q={query}`
- localStorage: Recent searches (last 10)
- Static: Trending searches (updated daily)

---

### 2.8 RecentSearches

**File:** `components/search/RecentSearches.tsx`
**Type:** Client Component

**Props:**
```typescript
interface RecentSearchesProps {
  limit?: number;
  onSelect: (query: string) => void;
  onClear: () => void;
}
```

**Features:**
- Display last N searches from localStorage
- Timestamp for each search
- Remove individual item (X button)
- Clear all button
- Click to re-run search
- Empty state message
- Privacy: Auto-expire after 30 days

**Storage Schema:**
```typescript
interface RecentSearch {
  query: string;
  timestamp: number;
  resultCount?: number;
}
```

---

### 2.9 NoResultsFound

**File:** `components/search/NoResultsFound.tsx`
**Type:** Client Component

**Props:**
```typescript
interface NoResultsFoundProps {
  query: string;
  appliedFilters: FilterState;
  onClearFilters: () => void;
  onSuggestAlternatives: () => void;
}
```

**Features:**
- Friendly "no results" message
- Display current query
- List active filters
- Suggest spelling corrections
- Suggest broader search terms
- Link to browse instead of search
- Contact support option

**UI Copy:**
```
"No results found for '{query}'

Try:
• Checking your spelling
• Using fewer keywords
• Removing some filters
• Browsing by subject instead

[Clear Filters] [Browse Subjects]"
```

---

### 2.10 SearchStats

**File:** `components/search/SearchStats.tsx`
**Type:** Client Component

**Props:**
```typescript
interface SearchStatsProps {
  total: number;
  timeMs: number;
  query: string;
  hasActiveFilters: boolean;
}
```

**Features:**
- Result count display
- Search duration
- Active filter count badge
- Sort dropdown integration
- View toggle (list/grid)

**Display Format:**
```
"About 1,234 results (0.18s)"
[Sort: Relevance ▼]  [View: List/Grid]
```

---

## 3. API Integration

### 3.1 API Client Functions

**File:** `lib/api/search.api.ts`

```typescript
// Global text search
export async function searchContent(params: SearchParams): Promise<SearchResponse> {
  const response = await apiClient.get('/api/v1/search', { params });
  return response.data;
}

// Formula pattern search
export async function searchFormulas(params: FormulaSearchParams): Promise<FormulaSearchResponse> {
  const response = await apiClient.get('/api/v1/search/formulas', { params });
  return response.data;
}

// Get autocomplete suggestions
export async function getSearchSuggestions(query: string): Promise<Suggestion[]> {
  const response = await apiClient.get('/api/v1/search/suggestions', { 
    params: { q: query } 
  });
  return response.data.suggestions;
}

// Get available filter facets
export async function getSearchFacets(params: SearchParams): Promise<SearchFacets> {
  const response = await apiClient.get('/api/v1/search/filters', { params });
  return response.data.facets;
}

// Track search analytics
export async function trackSearch(event: SearchAnalyticsEvent): Promise<void> {
  await apiClient.post('/api/v1/analytics/search', event);
}
```

### 3.2 Type Definitions

```typescript
interface SearchParams {
  q: string;
  subject?: string[];
  grade?: number[];
  type?: string[];
  contentType?: ('document' | 'topic' | 'formula')[];
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sort?: 'relevance' | 'date' | 'title';
}

interface SearchResponse {
  results: SearchResultItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  timeMs: number;
  facets: SearchFacets;
  suggestions: string[];
}

interface SearchResultItem {
  id: string;
  type: 'document' | 'topic' | 'formula';
  title: string;
  snippet: string;
  highlights: string[];
  metadata: {
    subject?: string;
    grade?: number;
    date?: string;
    author?: string;
  };
  url: string;
  score: number;
}

interface SearchFacets {
  subjects: FacetCount[];
  grades: FacetCount[];
  types: FacetCount[];
  contentTypes: FacetCount[];
}

interface FacetCount {
  value: string | number;
  count: number;
}

interface Suggestion {
  text: string;
  type: 'query' | 'document' | 'topic';
  metadata?: any;
}
```

### 3.3 React Query Hooks

**File:** `hooks/search/useSearch.ts`

```typescript
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { searchContent, SearchParams } from '@/lib/api/search.api';

export function useSearch(params: SearchParams) {
  return useQuery({
    queryKey: ['search', params],
    queryFn: () => searchContent(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: params.q.length > 0,
  });
}

export function useSearchSuggestions(query: string) {
  return useQuery({
    queryKey: ['search-suggestions', query],
    queryFn: () => getSearchSuggestions(query),
    staleTime: 10 * 60 * 1000,
    enabled: query.length >= 2,
  });
}
```

---

## 4. State Management

### 4.1 URL-Based State

All search state must be in URL query parameters for shareability:

```typescript
// Custom hook for search state synchronization
function useSearchState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const getState = () => ({
    query: searchParams.get('q') || '',
    subject: searchParams.getAll('subject'),
    grade: searchParams.getAll('grade').map(Number),
    type: searchParams.getAll('type'),
    page: parseInt(searchParams.get('page') || '1'),
    sort: (searchParams.get('sort') as SortOption) || 'relevance',
  });
  
  const setState = (newState: Partial<SearchState>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newState.query !== undefined) {
      newState.query ? params.set('q', newState.query) : params.delete('q');
    }
    
    // Reset to page 1 when query or filters change
    if (newState.query || newState.subject || newState.grade || newState.type) {
      params.set('page', '1');
    }
    
    // Update other params...
    
    router.push(`/search?${params.toString()}`, { scroll: false });
  };
  
  return { state: getState(), setState };
}
```

### 4.2 LocalStorage for Recent Searches

```typescript
// Hook for managing recent searches
function useRecentSearches() {
  const [recent, setRecent] = useState<RecentSearch[]>([]);
  
  useEffect(() => {
    const stored = localStorage.getItem('recent-searches');
    if (stored) {
      setRecent(JSON.parse(stored));
    }
  }, []);
  
  const addSearch = (query: string, resultCount?: number) => {
    const newSearch: RecentSearch = {
      query,
      timestamp: Date.now(),
      resultCount,
    };
    
    setRecent(prev => {
      // Remove duplicate if exists
      const filtered = prev.filter(s => s.query !== query);
      // Add new search at beginning
      const updated = [newSearch, ...filtered].slice(0, 10);
      // Persist to localStorage
      localStorage.setItem('recent-searches', JSON.stringify(updated));
      return updated;
    });
  };
  
  const removeSearch = (query: string) => {
    setRecent(prev => {
      const updated = prev.filter(s => s.query !== query);
      localStorage.setItem('recent-searches', JSON.stringify(updated));
      return updated;
    });
  };
  
  const clearAll = () => {
    setRecent([]);
    localStorage.removeItem('recent-searches');
  };
  
  return { recent, addSearch, removeSearch, clearAll };
}
```

---

## 5. Styling & Design

### 5.1 Search Bar Variants

```css
/* Header variant - compact */
.search-bar--header {
  @apply w-64 md:w-96 h-10;
}

/* Homepage variant - large */
.search-bar--homepage {
  @apply w-full max-w-2xl h-14 text-lg;
}

/* Compact variant - minimal */
.search-bar--compact {
  @apply w-48 h-9 text-sm;
}
```

### 5.2 Highlight Styling

```css
.search-highlight {
  @apply bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded;
  font-weight: 600;
}

mark {
  @apply bg-transparent text-inherit;
}

mark > .highlight {
  @apply bg-yellow-200 dark:bg-yellow-800;
}
```

### 5.3 Filter Sidebar (Desktop)

```css
.search-filters-sidebar {
  @apply sticky top-20 space-y-6;
  max-height: calc(100vh - 6rem);
  overflow-y: auto;
}

@media (max-width: 768px) {
  .search-filters-sidebar {
    @apply static max-h-none;
  }
}
```

### 5.4 Mobile Filter Drawer

```css
.search-filters-drawer {
  @apply fixed inset-x-0 bottom-0 z-50 bg-background border-t;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.search-filters-drawer--open {
  transform: translateY(0);
}
```

---

## 6. Accessibility

### 6.1 ARIA Labels

```tsx
// Search bar
<input
  type="search"
  role="searchbox"
  aria-label="Search documents and topics"
  aria-autocomplete="list"
  aria-controls="search-suggestions"
  aria-expanded={isSuggestionsOpen}
/>

// Search results region
<div role="region" aria-label="Search results">
  <div aria-live="polite" aria-atomic>
    {resultCount} results found
  </div>
</div>

// Filter groups
<fieldset>
  <legend>Subject</legend>
  {/* Checkboxes */}
</fieldset>

// Individual result
<article aria-labelledby={`result-title-${result.id}`}>
  <h3 id={`result-title-${result.id}`}>{result.title}</h3>
</article>
```

### 6.2 Keyboard Navigation

```typescript
// Search suggestions keyboard handling
function handleKeyDown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1));
      break;
    case 'ArrowUp':
      event.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
      break;
    case 'Enter':
      event.preventDefault();
      if (activeIndex >= 0) {
        onSelect(suggestions[activeIndex]);
      }
      break;
    case 'Escape':
      onClose();
      break;
  }
}
```

### 6.3 Focus Management

- Trap focus in modal when open
- Return focus to trigger element on close
- Visible focus indicators on all interactive elements
- Skip link to search results

---

## 7. Responsive Behavior

### 7.1 Breakpoint Strategy

```typescript
// Mobile (< 768px)
- Full-width search bar
- Filters in collapsible drawer
- Single column results
- Simplified result cards
- Bottom sheet for sorting

// Tablet (768px - 1024px)
- Medium search bar
- Filters in collapsible sidebar
- Two-column grid optional
- Standard result cards

// Desktop (> 1024px)
- Large search bar
- Persistent filter sidebar
- List or grid view toggle
- Detailed result cards
- Multi-column layout for facets
```

### 7.2 Component Responsiveness

```tsx
// SearchFilters responsive rendering
{isMobile ? (
  <FilterDrawer filters={filters} onChange={setFilters} />
) : (
  <FilterSidebar filters={filters} onChange={setFilters} />
)}

// Result card responsive layout
<div className={cn(
  "grid gap-4",
  isGridView ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
)}>
```

---

## 8. Error Handling

### 8.1 Error States

```typescript
// Search API error handling
if (searchError) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Search failed</AlertTitle>
      <AlertDescription>
        We couldn't complete your search. Please try again.
      </AlertDescription>
      <Button onClick={() => refetch()} variant="outline">
        Retry
      </Button>
    </Alert>
  );
}
```

### 8.2 Degraded Mode

If facets API fails but search works:
- Show results without filter sidebar
- Display warning: "Filters temporarily unavailable"
- Allow basic search to continue

If suggestions API fails:
- Silently fail (no suggestions shown)
- Search still functional
- Log error for monitoring

---

## 9. Performance Optimization

### 9.1 Debouncing

```typescript
// Debounce search input
const debouncedQuery = useDebounce(inputValue, 300);

// Only fetch when debounced value changes
useEffect(() => {
  if (debouncedQuery.length >= 2) {
    updateUrl({ query: debouncedQuery });
  }
}, [debouncedQuery]);
```

### 9.2 Caching Strategy

```typescript
// React Query cache configuration
const queryClient = useQueryClient();

// Cache search results for 5 minutes
queryClient.setQueryData(['search', params], data, {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
});

// Cache suggestions for 10 minutes
queryClient.setQueryData(['search-suggestions', query], suggestions, {
  staleTime: 10 * 60 * 1000,
});
```

### 9.3 Virtualization for Large Result Sets

```typescript
// Use virtual scrolling for 100+ results
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualizedResultsList({ results }) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // Estimated height per result
    overscan: 5,
  });
  
  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map(item => (
          <ResultCard
            key={item.key}
            result={results[item.index]}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${item.size}px`,
              transform: `translateY(${item.start}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## 10. SEO Considerations

### 10.1 Meta Tags for Search Results

```typescript
// app/(public)/search/page.tsx
export function generateMetadata({ searchParams }: Props): Metadata {
  const query = searchParams.q || '';
  
  return {
    title: query ? `Search results for "${query}" - SIJIL` : 'Search - SIJIL',
    description: query 
      ? `Find documents and topics related to ${query}`
      : 'Search across all educational content',
    robots: 'noindex, follow', // Don't index search result pages
  };
}
```

### 10.2 Canonical URLs

```typescript
// Always use full URL with params as canonical
<link rel="canonical" href={`https://sijil.com/search?${searchParams}`} />
```

### 10.3 Structured Data (Optional)

```json
{
  "@context": "https://schema.org",
  "@type": "SearchResultsPage",
  "url": "https://sijil.com/search?q=physics",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 1234,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://sijil.com/documents/doc-123"
      }
    ]
  }
}
```

---

## 11. Analytics Integration

### 11.1 Search Event Tracking

```typescript
interface SearchAnalyticsEvent {
  query: string;
  resultCount: number;
  appliedFilters: FilterState;
  timestamp: number;
  sessionId: string;
  page: number;
}

// Track search execution
function trackSearchExecution(params: SearchParams, resultCount: number) {
  const event: SearchAnalyticsEvent = {
    query: params.q,
    resultCount,
    appliedFilters: {
      subjects: params.subject || [],
      grades: params.grade || [],
      types: params.type || [],
    },
    timestamp: Date.now(),
    sessionId: getSessionId(),
    page: params.page || 1,
  };
  
  // Send to analytics endpoint (non-blocking)
  navigator.sendBeacon('/api/v1/analytics/search', JSON.stringify(event));
}

// Track result click
function trackResultClick(resultId: string, position: number, query: string) {
  const event = {
    type: 'search_result_click',
    resultId,
    position,
    query,
    timestamp: Date.now(),
    sessionId: getSessionId(),
  };
  
  navigator.sendBeacon('/api/v1/analytics/search-click', JSON.stringify(event));
}
```

### 11.2 Zero Results Tracking

```typescript
// Special tracking for zero-result searches
if (results.length === 0 && !isLoading) {
  trackZeroResultSearch({
    query: params.q,
    appliedFilters: params,
    timestamp: Date.now(),
  });
}
```

---

## 12. Folder Structure

```
src/
├── app/
│   └── (public)/
│       └── search/
│           ├── page.tsx              # Search results page
│           └── formulas/
│               └── page.tsx          # Formula search page
├── components/
│   └── search/
│       ├── SearchBar.tsx
│       ├── SearchResults.tsx
│       ├── SearchResultCard.tsx
│       ├── SearchFilters.tsx
│       ├── SearchHighlights.tsx
│       ├── FormulaSearchInput.tsx
│       ├── SearchSuggestions.tsx
│       ├── RecentSearches.tsx
│       ├── NoResultsFound.tsx
│       ├── SearchStats.tsx
│       └── AdvancedSearchModal.tsx
├── hooks/
│   └── search/
│       ├── useSearch.ts
│       ├── useSearchSuggestions.ts
│       ├── useSearchState.ts
│       └── useRecentSearches.ts
├── lib/
│   └── api/
│       └── search.api.ts
└── types/
    └── search.ts
```

---

## 13. Implementation Order

1. **Day 1-2: Core Infrastructure**
   - Create API client functions
   - Implement type definitions
   - Build useSearch hook
   - Create SearchBar component

2. **Day 3-4: Search Results Page**
   - Build SearchResults container
   - Implement SearchResultCard
   - Add SearchFilters sidebar
   - URL state synchronization

3. **Day 5: Advanced Features**
   - Formula search page
   - SearchHighlights component
   - Autocomplete suggestions
   - Recent searches

4. **Day 6: Polish & Testing**
   - Responsive adjustments
   - Accessibility audit
   - Performance optimization
   - Manual testing

---

## 14. Acceptance Checklist Summary

Before marking this phase complete, verify:

### Functional
- [ ] Search executes and returns results
- [ ] Filters work correctly (subject, grade, type)
- [ ] Pagination navigates through results
- [ ] Sorting changes result order
- [ ] Formula search renders math correctly
- [ ] Autocomplete shows suggestions
- [ ] Recent searches persist
- [ ] URL updates reflect state changes

### UI/UX
- [ ] Loading states display during fetch
- [ ] Empty state shows for no results
- [ ] Error state with retry option
- [ ] Highlights appear in snippets
- [ ] Mobile filters work in drawer
- [ ] Keyboard navigation functional
- [ ] Focus management correct

### Performance
- [ ] Search responds < 300ms (p95)
- [ ] Debouncing prevents excess requests
- [ ] Virtualization for large lists
- [ ] Caching reduces redundant fetches

### Accessibility
- [ ] ARIA labels present
- [ ] Screen reader compatible
- [ ] Keyboard accessible
- [ ] Focus indicators visible
- [ ] Color contrast sufficient

### Code Quality
- [ ] TypeScript strict mode passes
- [ ] No ESLint errors
- [ ] Components are reusable
- [ ] No hardcoded values
- [ ] Proper error boundaries

---

This specification is complete and self-contained. An implementation AI can build the entire Search phase using only this document.
