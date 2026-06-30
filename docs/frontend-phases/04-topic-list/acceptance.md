# Phase 04: Topic List - Acceptance Criteria

## Definition of Done

This document defines the measurable acceptance criteria for Phase 04: Topic List. All criteria must pass before this phase is considered complete.

---

## Functional Requirements

### FR-01: Topic Display

**ID:** FR-01  
**Priority:** P0 (Critical)  
**Requirement:** All topics load and display correctly from backend API  

**Acceptance Tests:**
- [ ] Navigate to `/topics` displays at least 20 topics on first page
- [ ] Each topic card shows title, document count, and collection badge
- [ ] Topic data matches backend response exactly
- [ ] No hardcoded or mocked topic data present
- [ ] Topic cards link to correct detail pages (`/topics/[slug]`)

**Measurement:** Manual verification + API response comparison  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### FR-02: Collection Filtering

**ID:** FR-02  
**Priority:** P0  
**Requirement:** Users can filter topics by collection type  

**Acceptance Tests:**
- [ ] Collection dropdown displays all available collections from backend
- [ ] Selecting a collection filters topics to that collection only
- [ ] URL updates with `?collection=[slug]` parameter
- [ ] Filter persists on page refresh
- [ ] Browser back/forward navigates through filter history
- [ ] Changing collection clears previous filter results before showing new

**Measurement:** Manual verification of 5+ collections  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### FR-03: Search Functionality

**ID:** FR-03  
**Priority:** P0  
**Requirement:** Users can search topics by title  

**Acceptance Tests:**
- [ ] Search input accepts text entry
- [ ] Search triggers after 300ms debounce (no immediate requests)
- [ ] Search results match entered term in topic titles
- [ ] URL updates with `?search=[term]` parameter
- [ ] Search is case-insensitive
- [ ] Special characters handled without errors
- [ ] Empty search clears filter and shows all topics

**Measurement:** Test with 10+ different search terms  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### FR-04: Combined Filtering

**ID:** FR-04  
**Priority:** P1 (High)  
**Requirement:** Collection and search filters work together  

**Acceptance Tests:**
- [ ] Applying both collection and search filters shows intersection of results
- [ ] URL contains both parameters: `?collection=[slug]&search=[term]`
- [ ] Clearing one filter preserves the other
- [ ] Results update correctly when either filter changes
- [ ] Empty result state shows when no matches for combined filters

**Measurement:** Test 5+ combinations of filters  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### FR-05: Pagination

**ID:** FR-05  
**Priority:** P0  
**Requirement:** Topics paginate across multiple pages  

**Acceptance Tests:**
- [ ] Page 1 shows topics 1-20 (or configured limit)
- [ ] "Next" button navigates to page 2
- [ ] Page numbers clickable and navigate to correct page
- [ ] "Previous" button appears on page 2+
- [ ] URL updates with `?page=[number]` parameter
- [ ] Total page count accurate based on filtered results
- [ ] Current page clearly indicated visually
- [ ] Pagination resets to page 1 when filters change

**Measurement:** Verify pagination with 50+ topics  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### FR-06: Hierarchical Navigation

**ID:** FR-06  
**Priority:** P0  
**Requirement:** Users can navigate parent → child topic hierarchy  

**Acceptance Tests:**
- [ ] Parent topics with children are identifiable (children_count displayed)
- [ ] Clicking parent topic navigates to `/topics/[parent-slug]`
- [ ] Child topic page shows only children of selected parent
- [ ] Breadcrumb reflects hierarchy: Home > Topics > [Parent]
- [ ] Can navigate back to root topics via breadcrumb
- [ ] Hierarchy works for 2+ levels deep (if data exists)

**Measurement:** Test with 3+ parent-child relationships  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### FR-07: Loading States

**ID:** FR-07  
**Priority:** P1  
**Requirement:** Appropriate loading indicators display during data fetch  

**Acceptance Tests:**
- [ ] Initial page load shows skeleton grid (20 skeletons)
- [ ] Skeleton layout matches final card layout exactly
- [ ] Filter changes show loading overlay or spinner
- [ ] Page navigation shows skeletons during transition
- [ ] No content flicker during loading
- [ ] Loading duration feels appropriate (< 500ms perceived)

**Measurement:** Visual inspection + Network throttling tests  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### FR-08: Error States

**ID:** FR-08  
**Priority:** P1  
**Requirement:** Errors display gracefully with recovery options  

**Acceptance Tests:**
- [ ] API error shows message: "Unable to load topics"
- [ ] "Retry" button present on error state
- [ ] Retry attempts to refetch data
- [ ] Filter state preserved during retry
- [ ] Network error shows offline-appropriate message
- [ ] Error logged to console/monitoring service
- [ ] No JavaScript errors crash the page

**Measurement:** Simulate API failures via DevTools  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### FR-09: Empty States

**ID:** FR-09  
**Priority:** P1  
**Requirement:** Empty result states provide clear messaging and recovery  

**Acceptance Tests:**
- [ ] No results shows message: "No topics found"
- [ ] When filters active, "Clear filters" button visible
- [ ] Clearing filters returns to unfiltered state
- [ ] Empty state includes helpful illustration or icon (if designed)
- [ ] Message tone is friendly and actionable

**Measurement:** Trigger empty state with non-matching search  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

## Responsive Design Requirements

### RD-01: Mobile Layout (< 640px)

**ID:** RD-01  
**Priority:** P0  
**Requirement:** Fully functional mobile layout  

**Acceptance Tests:**
- [ ] Topic grid displays single column
- [ ] Filter bar stacks vertically (dropdown above search)
- [ ] Topic cards span full container width
- [ ] Touch targets minimum 44px height
- [ ] No horizontal scrolling required
- [ ] Text readable at 16px base size
- [ ] Mobile menu (Phase 02) accessible and functional
- [ ] All interactions work with touch

**Measurement:** Test on iPhone 13 viewport (390x844)  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### RD-02: Tablet Layout (640px - 1024px)

**ID:** RD-02  
**Priority:** P1  
**Requirement:** Optimized tablet experience  

**Acceptance Tests:**
- [ ] Topic grid displays 2-3 columns
- [ ] Filter bar displays horizontally
- [ ] Topic cards medium size with appropriate spacing
- [ ] Breadcrumb fully visible
- [ ] All interactions touch-friendly
- [ ] No layout breaking or overflow

**Measurement:** Test on iPad viewport (768x1024)  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### RD-03: Desktop Layout (> 1024px)

**ID:** RD-03  
**Priority:** P1  
**Requirement:** Polished desktop experience  

**Acceptance Tests:**
- [ ] Topic grid displays 4 columns
- [ ] Filter bar horizontal with optimal spacing
- [ ] Topic cards large with hover effects
- [ ] Hover states visible on interactive elements
- [ ] Breadcrumb shows full path with icons
- [ ] Optimal use of screen real estate
- [ ] No excessive white space or crowding

**Measurement:** Test on desktop viewport (1920x1080)  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

## Accessibility Requirements

### AX-01: Keyboard Navigation

**ID:** AX-01  
**Priority:** P0  
**Requirement:** Full keyboard accessibility  

**Acceptance Tests:**
- [ ] Tab moves focus through all interactive elements in logical order
- [ ] Enter/Space activates buttons and links
- [ ] Arrow keys navigate pagination controls
- [ ] Escape closes open dropdowns
- [ ] Focus never trapped in any component
- [ ] Skip-to-content link functional (if implemented in Phase 02)
- [ ] Focus order matches visual order

**Measurement:** Complete navigation using keyboard only  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### AX-02: Screen Reader Support

**ID:** AX-02  
**Priority:** P0  
**Requirement:** Complete screen reader experience  

**Acceptance Tests:**
- [ ] Page title announced correctly by screen reader
- [ ] Breadcrumb announced as navigation landmark with label
- [ ] Each topic card announces: "[Title], [Collection], [X] documents"
- [ ] Collection badges have descriptive aria-labels
- [ ] Filter controls announce their purpose and current value
- [ ] Pagination announces current page and total pages
- [ ] Dynamic content changes announced (via ARIA live regions if implemented)
- [ ] All images have alt text or are marked decorative

**Measurement:** Test with NVDA, VoiceOver, or JAWS  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### AX-03: Focus Indicators

**ID:** AX-03  
**Priority:** P0  
**Requirement:** Visible focus states on all interactive elements  

**Acceptance Tests:**
- [ ] All buttons show visible focus ring
- [ ] All links show visible focus ring
- [ ] Form inputs show visible focus ring
- [ ] Dropdown triggers show visible focus ring
- [ ] Focus ring has sufficient contrast (3:1 minimum)
- [ ] Focus ring not removed by CSS outline:none without replacement
- [ ] Custom focus styles align with design system

**Measurement:** Visual inspection with keyboard tabbing  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### AX-04: Color Contrast

**ID:** AX-04  
**Priority:** P0  
**Requirement:** Text meets WCAG AA contrast requirements  

**Acceptance Tests:**
- [ ] Body text contrast ratio ≥ 4.5:1
- [ ] Large text (18px+) contrast ratio ≥ 3:1
- [ ] Interactive element text contrast ratio ≥ 4.5:1
- [ ] Placeholder text contrast ratio ≥ 4.5:1
- [ ] Collection badge text contrast ratio ≥ 4.5:1
- [ ] Focus ring contrast ratio ≥ 3:1
- [ ] Don't rely solely on color to convey information

**Measurement:** Use axe DevTools or WebAIM Contrast Checker  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### AX-05: Semantic HTML

**ID:** AX-05  
**Priority:** P1  
**Requirement:** Proper semantic structure  

**Acceptance Tests:**
- [ ] Page has single h1 heading
- [ ] Heading hierarchy logical (h1 → h2 → h3)
- [ ] Topic cards use appropriate heading level (h3 or h2)
- [ ] Breadcrumb uses nav element with aria-label
- [ ] Pagination uses nav element with aria-label
- [ ] Lists use ul/ol elements appropriately
- [ ] Buttons use button element (not div/span)
- [ ] Links use a element with href attribute

**Measurement:** Inspect element + axe DevTools audit  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

## SEO Requirements

### SE-01: Meta Tags

**ID:** SE-01  
**Priority:** P0  
**Requirement:** Complete meta tags for search engines  

**Acceptance Tests:**
- [ ] `<title>` tag present: "Browse Topics | Sijil"
- [ ] Meta description present and accurate (150-160 characters)
- [ ] Canonical URL specified
- [ ] Robots meta tag allows indexing
- [ ] Viewport meta tag for mobile responsiveness
- [ ] Charset UTF-8 specified

**Measurement:** View page source  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### SE-02: Open Graph Tags

**ID:** SE-02  
**Priority:** P1  
**Requirement:** Open Graph tags for social sharing  

**Acceptance Tests:**
- [ ] og:title present
- [ ] og:description present
- [ ] og:type set to "website"
- [ ] og:url specifies canonical URL
- [ ] og:image present (if applicable)
- [ ] og:site_name present

**Measurement:** View page source + Facebook Sharing Debugger  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### SE-03: Twitter Card Tags

**ID:** SE-03  
**Priority:** P1  
**Requirement:** Twitter Card tags for Twitter sharing  

**Acceptance Tests:**
- [ ] twitter:card present (summary_large_image)
- [ ] twitter:title present
- [ ] twitter:description present
- [ ] twitter:image present (if applicable)

**Measurement:** View page source + Twitter Card Validator  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### SE-04: Structured Data

**ID:** SE-04  
**Priority:** P2 (Medium)  
**Requirement:** Schema.org structured data for rich results  

**Acceptance Tests:**
- [ ] ItemList structured data present on topic list
- [ ] Each topic listed as ListItem with position
- [ ] Structured data validates in Google Rich Results Test
- [ ] No structured data errors or warnings

**Measurement:** Google Rich Results Test tool  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### SE-05: URL Structure

**ID:** SE-05  
**Priority:** P0  
**Requirement:** SEO-friendly URLs  

**Acceptance Tests:**
- [ ] URLs use hyphens not underscores
- [ ] URLs lowercase only
- [ ] URLs include descriptive slugs
- [ ] Filter params use standard query string format
- [ ] No session IDs or unnecessary parameters in URLs
- [ ] Canonical URLs match actual page URLs

**Measurement:** Inspect URLs in browser  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

## Performance Requirements

### PF-01: Load Time

**ID:** PF-01  
**Priority:** P0  
**Requirement:** Fast initial page load  

**Acceptance Tests:**
- [ ] First Contentful Paint < 1.5 seconds
- [ ] Time to Interactive < 3.0 seconds
- [ ] Total Blocking Time < 200 milliseconds
- [ ] Speed Index < 3.4 seconds

**Measurement:** Lighthouse audit (desktop and mobile)  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### PF-02: Cumulative Layout Shift

**ID:** PF-02  
**Priority:** P0  
**Requirement:** Minimal layout shift during load  

**Acceptance Tests:**
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] No layout shift when images load
- [ ] No layout shift when fonts load
- [ ] Skeleton dimensions match final content dimensions
- [ ] No content jumps during filter changes

**Measurement:** Lighthouse CLS metric  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### PF-03: API Performance

**ID:** PF-03  
**Priority:** P1  
**Requirement:** Efficient API usage  

**Acceptance Tests:**
- [ ] Topics API response time < 500ms (P95)
- [ ] Collections API response time < 300ms (P95)
- [ ] No unnecessary API calls (check Network tab)
- [ ] Debounced search prevents excessive requests
- [ ] Previous requests cancelled when superseded
- [ ] Proper caching headers utilized

**Measurement:** DevTools Network tab analysis  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### PF-04: Bundle Size

**ID:** PF-04  
**Priority:** P2  
**Requirement:** Reasonable JavaScript bundle size  

**Acceptance Tests:**
- [ ] Initial JavaScript bundle < 200KB (gzipped)
- [ ] Topic components code-split and lazy-loaded
- [ ] No duplicate dependencies
- [ ] Tree-shaking effective (dead code eliminated)
- [ ] Images optimized and appropriately sized

**Measurement:** Next.js build analyzer / bundle analyzer  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

## Code Quality Requirements

### CQ-01: TypeScript Compliance

**ID:** CQ-01  
**Priority:** P0  
**Requirement:** Strict TypeScript with no errors  

**Acceptance Tests:**
- [ ] `npm run build` completes with no TypeScript errors
- [ ] No `any` types used (except where absolutely necessary and documented)
- [ ] All interfaces and types defined
- [ ] Props typed explicitly on all components
- [ ] API responses typed with interfaces
- [ ] Event handlers typed correctly

**Measurement:** `tsc --noEmit` passes with zero errors  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### CQ-02: Linting

**ID:** CQ-02  
**Priority:** P0  
**Requirement:** ESLint rules pass  

**Acceptance Tests:**
- [ ] `npm run lint` completes with zero errors
- [ ] No unused variables or imports
- [ ] No console.log statements in production code
- [ ] Code follows project style guide
- [ ] Import order follows conventions
- [ ] JSX formatting consistent

**Measurement:** `eslint . --max-warnings=0` passes  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### CQ-03: Component Reuse

**ID:** CQ-03  
**Priority:** P1  
**Requirement:** No duplicate components  

**Acceptance Tests:**
- [ ] TopicCard used consistently for all topic displays
- [ ] Shared components from Phase 01-03 reused (Button, etc.)
- [ ] No copy-paste code between components
- [ ] Common logic extracted to utility functions
- [ ] shadcn/ui components used where applicable

**Measurement:** Code review for duplication  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### CQ-04: File Organization

**ID:** CQ-04  
**Priority:** P1  
**Requirement:** Files organized per specification  

**Acceptance Tests:**
- [ ] Components in `components/topics/` directory
- [ ] Models in `models/` directory
- [ ] Pages in `app/topics/` directory
- [ ] Utilities in `lib/` directory
- [ ] File names follow kebab-case convention
- [ ] Component filenames match export names

**Measurement:** Directory structure inspection  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### CQ-05: Error Handling

**ID:** CQ-05  
**Priority:** P0  
**Requirement:** Comprehensive error handling  

**Acceptance Tests:**
- [ ] All API calls wrapped in try-catch blocks
- [ ] Errors logged to monitoring service
- [ ] User-facing error messages friendly and actionable
- [ ] No raw error messages exposed to users
- [ ] Error boundaries catch unexpected errors
- [ ] Graceful degradation on partial failures

**Measurement:** Code review + error simulation tests  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

## Browser Compatibility Requirements

### BC-01: Modern Browsers

**ID:** BC-01  
**Priority:** P0  
**Requirement:** Works in latest browser versions  

**Acceptance Tests:**
- [ ] Chrome (latest) - all features functional
- [ ] Firefox (latest) - all features functional
- [ ] Safari (latest) - all features functional
- [ ] Edge (latest) - all features functional
- [ ] No browser-specific console errors
- [ ] Consistent visual appearance across browsers

**Measurement:** Manual testing in each browser  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### BC-02: Mobile Browsers

**ID:** BC-02  
**Priority:** P1  
**Requirement:** Works on mobile browsers  

**Acceptance Tests:**
- [ ] Mobile Chrome (Android) - functional
- [ ] Mobile Safari (iOS) - functional
- [ ] Samsung Internet - functional
- [ ] Touch interactions responsive
- [ ] No mobile-specific layout issues

**Measurement:** Testing on physical devices or emulators  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

## Documentation Requirements

### DO-01: Code Comments

**ID:** DO-01  
**Priority:** P2  
**Requirement:** Necessary code documentation  

**Acceptance Tests:**
- [ ] Complex logic has explanatory comments
- [ ] Component props documented with JSDoc
- [ ] API integration points commented
- [ ] Non-obvious decisions explained
- [ ] No over-commenting of self-explanatory code

**Measurement:** Code review  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

### DO-02: README Updates

**ID:** DO-02  
**Priority:** P2  
**Requirement:** Phase documentation complete  

**Acceptance Tests:**
- [ ] This acceptance.md file completed with status
- [ ] tests.md updated with any new test cases
- [ ] implementation.md reflects final implementation
- [ ] CHANGELOG.md entry added (in docs/frontend-pm/)
- [ ] CURRENT_PHASE.md updated (in docs/frontend-pm/)

**Measurement:** Documentation file inspection  
**Status:** ☐ Pass ☐ Fail ☐ N/A

---

## Final Verification Checklist

### Pre-Deployment Verification

Before marking this phase complete, verify:

- [ ] All P0 requirements pass
- [ ] All P1 requirements pass (or documented exceptions approved)
- [ ] Build completes successfully: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] TypeScript compiles: `tsc --noEmit`
- [ ] Manual tests executed (see tests.md)
- [ ] Performance benchmarks met
- [ ] Accessibility audit passed (axe DevTools)
- [ ] SEO metadata validated
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Error states tested
- [ ] Loading states verified
- [ ] No console errors in production build
- [ ] Git commit prepared with descriptive message

---

## Sign-off

**Phase:** 04 - Topic List  
**Reviewer:** _________________  
**Date:** _________________  

**Overall Status:** ☐ APPROVED FOR DEPLOYMENT ☐ REQUIRES WORK

**Exceptions Approved:**
_________________________________
_________________________________

**Notes:**
_________________________________
_________________________________
_________________________________

---

## Completion Criteria Summary

**Phase 04 is complete when:**

✓ All P0 acceptance criteria pass  
✓ All P1 acceptance criteria pass (or documented exceptions)  
✓ Build, lint, and TypeScript checks pass  
✓ Manual verification tests executed  
✓ Performance benchmarks met  
✓ Accessibility standards met  
✓ Documentation updated  
✓ Git commit ready  

**Then stop. Do not begin Phase 05 automatically.**
