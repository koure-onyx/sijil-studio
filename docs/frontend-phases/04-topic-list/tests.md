# Phase 04: Topic List - Manual Verification Tests

## Test Environment Setup

**Prerequisites:**
- Backend API running on configured base URL
- Frontend build completed successfully
- Test data includes at least 50 topics across 3+ collections
- Topics include hierarchical relationships (parent/child)

---

## Manual Test Cases

### TC-01: Initial Page Load

**Steps:**
1. Navigate to `/topics` in browser
2. Observe initial render

**Expected Results:**
- Header and footer visible (Phase 02 components)
- Breadcrumb shows "Home > Topics"
- Filter bar displays collection dropdown and search input
- Topic grid loads with 20 topics
- Each topic card shows title, document count, collection badge
- No console errors in DevTools
- Page load time < 2 seconds

**Pass Criteria:** All expected results observed

---

### TC-02: Collection Filter - Single Selection

**Steps:**
1. On `/topics` page, click collection dropdown
2. Select "Quran" from list
3. Observe URL and content changes

**Expected Results:**
- URL updates to `/topics?collection=quran`
- Only Quran topics displayed in grid
- Collection dropdown shows "Quran" as selected
- Document counts visible for each topic
- Pagination resets to page 1 if previously on higher page
- Browser back button returns to unfiltered state

**Pass Criteria:** Filter applies correctly, URL updates, navigation works

---

### TC-03: Collection Filter - Multiple Sequential Selections

**Steps:**
1. Select "Quran" collection
2. Wait for results
3. Change to "Hadith" collection
4. Wait for results
5. Change to "Fiqh" collection

**Expected Results:**
- Each selection updates content appropriately
- No flickering or duplicate requests
- Loading state shown briefly during transitions
- Previous filter state cleared before new results display
- URL updates with each change

**Pass Criteria:** Sequential filtering works smoothly

---

### TC-04: Search Functionality

**Steps:**
1. Type "prayer" in search input
2. Wait 300ms (debounce period)
3. Observe results

**Expected Results:**
- URL updates to `/topics?search=prayer`
- Only topics matching "prayer" displayed
- Search term highlighted in input field
- Results update without full page reload
- Clear button appears in search input (if implemented)

**Pass Criteria:** Search filters correctly with debounce

---

### TC-05: Combined Filters

**Steps:**
1. Select "Quran" collection
2. Type "revelation" in search
3. Observe combined filter effect

**Expected Results:**
- URL shows `/topics?collection=quran&search=revelation`
- Only Quran topics matching "revelation" displayed
- Both filters active simultaneously
- Clearing one filter preserves the other

**Pass Criteria:** Multiple filters work together correctly

---

### TC-06: Pagination Navigation

**Precondition:** Ensure >20 topics exist for selected filters

**Steps:**
1. Navigate to `/topics`
2. Scroll to bottom of page
3. Click "Next" or page "2"
4. Observe navigation

**Expected Results:**
- URL updates to `?page=2`
- New set of 20 topics loads
- Page indicator shows current page
- "Previous" button becomes active
- Scroll position moves to top of grid
- Browser back returns to page 1

**Pass Criteria:** Pagination navigates correctly

---

### TC-07: Hierarchical Navigation - Parent to Child

**Steps:**
1. Find a parent topic with children (indicated by children_count > 0)
2. Click on the parent topic card
3. Observe navigation

**Expected Results:**
- Navigate to `/topics/[parent-slug]`
- Page title updates to show parent topic name
- Breadcrumb shows "Home > Topics > [Parent Topic]"
- Only child topics of selected parent displayed
- Document counts reflect child topics only
- Back button returns to root topics

**Pass Criteria:** Hierarchy navigation works correctly

---

### TC-08: Breadcrumb Navigation

**Steps:**
1. Navigate to a child topic page (`/topics/[slug]`)
2. Click "Topics" in breadcrumb
3. Click "Home" in breadcrumb

**Expected Results:**
- "Topics" link navigates to `/topics`
- "Home" link navigates to homepage (`/`)
- Breadcrumb links are keyboard accessible
- Hover states visible on breadcrumb links

**Pass Criteria:** Breadcrumb navigation functional

---

### TC-09: Loading State Display

**Steps:**
1. Open Chrome DevTools Network tab
2. Set throttling to "Slow 3G"
3. Navigate to `/topics`
4. Observe loading state

**Expected Results:**
- TopicSkeleton components display immediately
- Skeleton layout matches final card layout
- Skeleton count equals expected page size (20)
- Content fades in smoothly after load
- No layout shift when content loads

**Pass Criteria:** Loading states provide good UX

---

### TC-10: Error State - API Failure

**Steps:**
1. Open Chrome DevTools Network tab
2. Set throttling to "Offline"
3. Navigate to `/topics`
4. Observe error handling

**Expected Results:**
- Error message displays: "Unable to load topics"
- "Retry" button visible
- Clicking "Retry" attempts to refetch data
- Filter state preserved for retry
- Error logged to monitoring service (check console)

**Pass Criteria:** Error state handles gracefully

---

### TC-11: Empty State - No Results

**Steps:**
1. Navigate to `/topics`
2. Enter search term that matches no topics (e.g., "xyz123abc")
3. Observe empty state

**Expected Results:**
- EmptyTopicsState component displays
- Message: "No topics found"
- If filters active: "Clear filters" button visible
- Clicking "Clear filters" resets to unfiltered state
- Empty state illustration/icon present (if designed)

**Pass Criteria:** Empty state provides clear recovery path

---

### TC-12: Keyboard Navigation

**Steps:**
1. Navigate to `/topics`
2. Press Tab repeatedly to move through interactive elements
3. Use Enter/Space to activate links
4. Use arrow keys on pagination
5. Use Escape on open dropdown

**Expected Results:**
- Focus order is logical (left-to-right, top-to-bottom)
- Focus indicator visible on all interactive elements
- Enter/Space activates topic cards and buttons
- Arrow keys navigate pagination controls
- Escape closes open dropdowns
- No focus traps encountered

**Pass Criteria:** Full keyboard accessibility

---

### TC-13: Screen Reader Testing

**Tools:** NVDA (Windows), VoiceOver (Mac), or JAWS

**Steps:**
1. Enable screen reader
2. Navigate to `/topics`
3. Listen to page announcement
4. Navigate through topic cards
5. Activate filters

**Expected Results:**
- Page title announced correctly
- Breadcrumb announced as navigation landmark
- Each topic card announces: "[Title], [Collection], [Document Count] documents"
- Collection badges have descriptive labels
- Filter controls announce their purpose
- Pagination announces current page and total pages
- Dynamic updates announced (ARIA live regions if implemented)

**Pass Criteria:** Screen reader experience is complete

---

### TC-14: Mobile Responsiveness

**Device:** iPhone 13 (390x844) or similar mobile viewport

**Steps:**
1. Open `/topics` on mobile device or emulator
2. Test all interactions

**Expected Results:**
- Single column topic grid
- Filter bar stacks vertically (dropdown above search)
- Topic cards span full width
- Touch targets minimum 44px height
- No horizontal scrolling
- Text remains readable without zooming
- Mobile menu accessible (Phase 02)

**Pass Criteria:** Mobile experience fully functional

---

### TC-15: Tablet Responsiveness

**Device:** iPad (768x1024) or similar tablet viewport

**Steps:**
1. Open `/topics` on tablet device or emulator
2. Test all interactions

**Expected Results:**
- 2-3 column topic grid
- Filter bar horizontal
- Topic cards medium size
- All interactions touch-friendly
- No layout issues

**Pass Criteria:** Tablet experience optimized

---

### TC-16: Desktop Responsiveness

**Device:** Desktop viewport (1920x1080)

**Steps:**
1. Open `/topics` on desktop browser
2. Test hover states
3. Test all interactions

**Expected Results:**
- 4 column topic grid
- Filter bar horizontal with spacing
- Topic cards large with hover effects
- Hover states visible on cards and buttons
- Breadcrumb fully visible with icons
- Optimal use of screen space

**Pass Criteria:** Desktop experience polished

---

### TC-17: Browser Compatibility

**Browsers to Test:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Steps:**
1. Open `/topics` in each browser
2. Verify core functionality

**Expected Results:**
- Consistent layout across browsers
- All interactions work in each browser
- No browser-specific errors
- Performance acceptable in all browsers

**Pass Criteria:** Cross-browser compatibility achieved

---

### TC-18: SEO Verification

**Steps:**
1. Navigate to `/topics`
2. View page source
3. Check meta tags
4. Use Google Rich Results Test tool

**Expected Results:**
- `<title>` tag contains "Browse Topics | Sijil"
- Meta description present and accurate
- Open Graph tags present (og:title, og:description, og:type, og:url)
- Twitter Card tags present
- Canonical URL specified
- Structured data (ItemList) valid in Rich Results Test

**Pass Criteria:** SEO metadata complete and valid

---

## API Verification Tests

### API-01: Topics Endpoint Response

**Endpoint:** `GET /api/v1/topics`

**Steps:**
1. Make request to endpoint with default params
2. Inspect response structure

**Expected Response:**
```json
{
  "data": [
    {
      "id": "string",
      "slug": "string",
      "title": "string",
      "document_count": 0,
      "collection": {
        "id": "string",
        "name": "string",
        "slug": "string"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 5,
    "total_count": 100,
    "per_page": 20
  }
}
```

**Pass Criteria:** Response matches expected schema

---

### API-02: Filter Parameters

**Endpoint:** `GET /api/v1/topics?collection=quran&search=prayer&page=2`

**Steps:**
1. Make request with filter params
2. Verify filtered results

**Expected Results:**
- Only Quran collection topics returned
- Only topics matching "prayer" returned
- Page 2 results returned (items 21-40)
- Meta reflects filtered total count

**Pass Criteria:** Backend filtering works correctly

---

### API-03: Collections Endpoint

**Endpoint:** `GET /api/v1/collections`

**Steps:**
1. Make request to collections endpoint
2. Verify response includes all collections

**Expected Results:**
- All available collections returned
- Each collection has id, name, slug
- Collection count accurate
- Response used to populate filter dropdown

**Pass Criteria:** Collections data available for filters

---

## Edge Case Tests

### EC-01: Very Long Topic Titles

**Steps:**
1. Find or create topic with very long title (50+ characters)
2. Observe rendering in card

**Expected Results:**
- Title truncates with ellipsis
- Card layout not broken
- Full title visible on hover (tooltip if implemented)
- Responsive behavior maintains integrity

**Pass Criteria:** Long titles handled gracefully

---

### EC-02: Topics with Zero Documents

**Steps:**
1. Find topic with document_count = 0
2. Observe display

**Expected Results:**
- Topic card still displays
- Document count shows "0 documents"
- Card may have visual distinction (optional)
- Clickable to view topic detail (if children exist)

**Pass Criteria:** Zero-count topics handled correctly

---

### EC-03: Special Characters in Search

**Steps:**
1. Search for term with special characters: "prayer's" or "zakāt"
2. Observe results

**Expected Results:**
- Search handles special characters without error
- Results match appropriately (unicode normalization if needed)
- No XSS vulnerabilities
- Input sanitization occurs

**Pass Criteria:** Special characters handled securely

---

### EC-04: Rapid Filter Changes

**Steps:**
1. Quickly change collection filter 5 times in succession
2. Observe behavior

**Expected Results:**
- Only last filter request processed (previous cancelled)
- No race conditions in result display
- Loading state manages rapid changes
- Final results match final filter selection

**Pass Criteria:** Rapid changes handled without errors

---

### EC-05: Deep Hierarchy Navigation

**Precondition:** Topics with 3+ levels of hierarchy exist

**Steps:**
1. Navigate to parent topic
2. Navigate to child topic
3. Navigate to grandchild topic (if exists)

**Expected Results:**
- Breadcrumb reflects full hierarchy
- Each level shows appropriate children
- Navigation back through hierarchy works
- No maximum depth errors

**Pass Criteria:** Deep hierarchy supported

---

## Regression Test Checklist

After any code changes, verify:

- [ ] TC-01: Initial Page Load
- [ ] TC-02: Collection Filter
- [ ] TC-04: Search Functionality
- [ ] TC-06: Pagination
- [ ] TC-07: Hierarchical Navigation
- [ ] TC-10: Error State
- [ ] TC-12: Keyboard Navigation
- [ ] TC-14: Mobile Responsiveness
- [ ] API-01: Topics Endpoint Response

---

## Performance Benchmarks

**Metrics to Verify:**

| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Time to Interactive | < 3.0s | Lighthouse |
| Total Blocking Time | < 200ms | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| API Response Time | < 500ms | DevTools Network |
| Page Load (3G) | < 3s | Chrome Throttling |

**Pass Criteria:** All metrics meet or exceed targets

---

## Sign-off

**Tester:** _________________
**Date:** _________________
**Browser(s) Tested:** _________________
**Device(s) Tested:** _________________
**Issues Found:** _________________
**Overall Result:** PASS / FAIL

**Notes:**
_________________________________
_________________________________
_________________________________
