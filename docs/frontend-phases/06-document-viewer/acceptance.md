# Phase 06: Document Viewer - Acceptance Criteria

## Definition of Done

This document defines the complete, measurable acceptance criteria for Phase 06. All criteria must pass before this phase is considered complete.

---

## Functional Requirements

### FR-1: Document Loading
- [ ] Document content loads from API endpoint `GET /api/v1/documents/:id`
- [ ] Loading skeleton displays within 100ms of navigation
- [ ] Content renders within 2 seconds for documents < 20k words
- [ ] Content renders within 3 seconds for documents > 50k words
- [ ] No layout shift occurs during loading (CLS < 0.1)
- [ ] Document title appears in browser tab and loading state

**Verification:** Measure load times with Chrome DevTools Performance tab

---

### FR-2: Text Rendering
- [ ] Full document content displays without truncation
- [ ] HTML formatting preserved (bold, italic, lists, blockquotes)
- [ ] Heading hierarchy maintained (H1 → H2 → H3)
- [ ] Paragraph spacing consistent throughout
- [ ] Special characters (Arabic, RTL, emojis) render correctly
- [ ] No XSS vulnerabilities (content sanitized)

**Verification:** Compare rendered output with raw API response

---

### FR-3: Font Size Controls
- [ ] Three font sizes available: Small, Medium, Large
- [ ] Default size is Medium
- [ ] Selection persists across page refreshes (localStorage)
- [ ] Text size changes immediately on selection
- [ ] Line height adjusts proportionally with font size
- [ ] No text overflow or clipping at any size

**Verification:** Test all three sizes on desktop and mobile

---

### FR-4: Reading Themes
- [ ] Three themes available: Light, Sepia, Dark
- [ ] Default theme is Light
- [ ] Theme selection persists across sessions (localStorage)
- [ ] Theme changes apply instantly without flash
- [ ] All text remains readable in each theme
- [ ] Background and foreground colors meet WCAG contrast ratios

**Verification:** Use color contrast analyzer on all themes

---

### FR-5: Table of Contents
- [ ] TOC displays all document sections
- [ ] Section hierarchy shown via indentation
- [ ] Clicking section scrolls smoothly to that section
- [ ] Active section highlighted in TOC during scroll
- [ ] TOC toggle button visible in header
- [ ] Mobile: TOC opens in drawer/modal overlay

**Verification:** Test navigation to first, middle, and last sections

---

### FR-6: Scroll Position Persistence
- [ ] Scroll position saves to localStorage every 200ms while scrolling
- [ ] Position restores on page refresh
- [ ] Restoration completes within 1 second
- [ ] Each document maintains independent scroll position
- [ ] Direct section links (?section=id) override saved position
- [ ] No jarring jump when restoring position

**Verification:** Refresh page at various scroll positions

---

### FR-7: Metadata Display
- [ ] Authors displayed with badges
- [ ] Collection name shown if applicable
- [ ] Topics/tags listed
- [ ] Word count accurate (matches backend)
- [ ] Reading time estimate displayed
- [ ] Publication date formatted as "MMM d, yyyy"
- [ ] Version number shown if > 1

**Verification:** Cross-reference metadata with API response

---

### FR-8: Citation Tools
- [ ] APA citation format available
- [ ] MLA citation format available
- [ ] Chicago citation format available
- [ ] Citation copies to clipboard on selection
- [ ] Toast notification confirms copy action
- [ ] Citation formats match style guide standards

**Verification:** Paste citations into document and verify formatting

---

### FR-9: Reading Progress Indicator
- [ ] Progress bar visible at top of viewport
- [ ] Bar fills from 0% to 100% as user scrolls
- [ ] Updates in real-time (no noticeable lag)
- [ ] Accurate within ±5% of actual scroll position
- [ ] Color contrasts with all three themes
- [ ] ARIA attributes present for accessibility

**Verification:** Compare progress at 25%, 50%, 75% scroll positions

---

### FR-10: Responsive Layout
- [ ] Mobile (< 768px): Single column, collapsible TOC
- [ ] Tablet (768-1024px): Two columns, TOC sidebar visible
- [ ] Desktop (> 1024px): Wide layout with full sidebar
- [ ] Text width max ~70 characters on desktop
- [ ] Touch targets ≥ 44px on mobile
- [ ] No horizontal scroll at any breakpoint

**Verification:** Test at 375px, 768px, 1024px, 1920px widths

---

## Non-Functional Requirements

### NFR-1: Performance
- [ ] Time to Interactive < 2 seconds (medium documents)
- [ ] Time to Interactive < 3 seconds (long documents > 50k words)
- [ ] Scroll performance > 55fps on mid-range devices
- [ ] Memory usage < 200MB for typical documents
- [ ] First Contentful Paint < 1.5 seconds
- [ ] Total Blocking Time < 300ms

**Verification:** Run Lighthouse performance audit

---

### NFR-2: Accessibility
- [ ] WCAG 2.1 Level AA compliant
- [ ] All interactive elements have aria-labels
- [ ] Skip link to main content functional
- [ ] Keyboard navigation complete (Tab, Enter, Arrow keys)
- [ ] Focus indicators visible on all interactive elements
- [ ] Screen reader announces sections with heading levels
- [ ] Progress bar has role="progressbar" with value attributes
- [ ] Color contrast ratios: text ≥ 4.5:1, UI ≥ 3:1

**Verification:** Run axe DevTools audit + manual screen reader test

---

### NFR-3: Browser Compatibility
- [ ] Chrome (latest): Fully functional
- [ ] Firefox (latest): Fully functional
- [ ] Safari (latest): Fully functional
- [ ] Edge (latest): Fully functional
- [ ] Safari iOS (latest): Fully functional
- [ ] Chrome Android (latest): Fully functional

**Verification:** Test on all six browsers

---

### NFR-4: Error Handling
- [ ] 404 page displays for non-existent documents
- [ ] Error state shows clear message for API failures
- [ ] "Try Again" button functional after error
- [ ] Network interruption shows appropriate message
- [ ] No infinite loading spinners
- [ ] Graceful degradation for partial content

**Verification:** Simulate API failures and network issues

---

### NFR-5: Print Support
- [ ] Print styles hide navigation, header, footer
- [ ] Only article content prints
- [ ] Text size ~12pt in print
- [ ] Page breaks avoid splitting sections
- [ ] Background colors removed for ink saving
- [ ] Print preview shows clean layout

**Verification:** Test print preview in browser

---

### NFR-6: SEO
- [ ] Unique meta title per document
- [ ] Meta description populated from excerpt
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags configured
- [ ] Article schema markup (type: 'article')
- [ ] Canonical URL set correctly
- [ ] Robots meta tag allows indexing

**Verification:** Use Facebook Sharing Debugger and Twitter Card Validator

---

### NFR-7: Code Quality
- [ ] TypeScript strict mode passes (no errors, no `any` types)
- [ ] ESLint passes with zero warnings
- [ ] Prettier formatting applied
- [ ] No console.log statements in production code
- [ ] All components have proper TypeScript interfaces
- [ ] No mocked data used (all from real APIs)
- [ ] Code coverage > 80% for new components

**Verification:** Run `npm run lint`, `npm run typecheck`, check coverage report

---

### NFR-8: Security
- [ ] HTML content sanitized before rendering
- [ ] No eval() or innerHTML without sanitization
- [ ] API calls use HTTPS only
- [ ] No sensitive data in localStorage
- [ ] CORS headers properly configured
- [ ] Rate limiting respected on client side

**Verification:** Security scan with npm audit and manual review

---

## Component Checklist

All components must be implemented and functional:

- [ ] `DocumentViewer` - Main container component
- [ ] `DocumentText` - Text rendering with typography
- [ ] `DocumentMetadata` - Sidebar metadata display
- [ ] `TableOfContents` - Section navigation
- [ ] `FontControls` - Font size and theme controls
- [ ] `ReadingProgress` - Scroll progress indicator
- [ ] `CitationTool` - Citation copying dropdown
- [ ] `useReadingSession` - Analytics hook

**Verification:** Each component exists in `components/documents/` directory

---

## File Structure Checklist

All required files must exist:

### Pages
- [ ] `app/documents/[id]/page.tsx`
- [ ] `app/documents/[id]/loading.tsx`
- [ ] `app/documents/[id]/error.tsx`
- [ ] `app/documents/[id]/not-found.tsx`

### Components
- [ ] `components/documents/DocumentViewer.tsx`
- [ ] `components/documents/DocumentText.tsx`
- [ ] `components/documents/DocumentMetadata.tsx`
- [ ] `components/documents/TableOfContents.tsx`
- [ ] `components/documents/FontControls.tsx`
- [ ] `components/documents/ReadingProgress.tsx`
- [ ] `components/documents/CitationTool.tsx`

### Hooks
- [ ] `hooks/useReadingSession.ts`

### API
- [ ] `lib/api/documents.ts`

### Types
- [ ] `types/document.ts`

### Styles
- [ ] `styles/print.css`

**Verification:** Run `find` command to verify all files exist

---

## API Integration Checklist

All endpoints must be connected and functional:

- [ ] `GET /api/v1/documents/:id` - Fetches document content
- [ ] `GET /api/v1/documents/:id/metadata` - Fetches extended metadata
- [ ] `POST /api/v1/analytics/read` - Tracks reading session start
- [ ] `PATCH /api/v1/analytics/read/:sessionId` - Updates reading position
- [ ] `POST /api/v1/analytics/read/:sessionId/complete` - Marks session complete

**Verification:** Monitor network tab during document interaction

---

## User Story Acceptance

### US-1: As a reader, I want to read a document comfortably
- [ ] Text is readable at default size
- [ ] I can adjust text size to my preference
- [ ] I can switch to a comfortable reading theme
- [ ] I can navigate to specific sections easily
- [ ] My reading position is remembered

**Status:** ☐ Accepted / ☐ Rejected

---

### US-2: As a researcher, I want to cite documents properly
- [ ] I can copy APA citation with one click
- [ ] I can copy MLA citation with one click
- [ ] I can copy Chicago citation with one click
- [ ] Citations are formatted correctly

**Status:** ☐ Accepted / ☐ Rejected

---

### US-3: As a student, I want to track my reading progress
- [ ] I can see how much of the document I've read
- [ ] My progress is saved automatically
- [ ] I can resume where I left off

**Status:** ☐ Accepted / ☐ Rejected

---

### US-4: As a mobile user, I want to read on my phone
- [ ] Layout adapts to small screen
- [ ] Controls are accessible with thumbs
- [ ] Text is readable without zooming
- [ ] Navigation works with touch

**Status:** ☐ Accepted / ☐ Rejected

---

### US-5: As a visually impaired user, I want to access documents
- [ ] Screen reader can navigate the document
- [ ] I can increase text size significantly
- [ ] High contrast theme available
- [ ] Keyboard navigation complete

**Status:** ☐ Accepted / ☐ Rejected

---

## Manual Testing Sign-Off

All manual tests from `tests.md` must pass:

- [ ] Section 1: Document Loading Tests (3/3 passed)
- [ ] Section 2: Typography Tests (3/3 passed)
- [ ] Section 3: Navigation Tests (4/4 passed)
- [ ] Section 4: Scroll Position Tests (3/3 passed)
- [ ] Section 5: Metadata Tests (2/2 passed)
- [ ] Section 6: Citation Tests (3/3 passed)
- [ ] Section 7: Progress Indicator Tests (2/2 passed)
- [ ] Section 8: Responsive Design Tests (3/3 passed)
- [ ] Section 9: Accessibility Tests (4/4 passed)
- [ ] Section 10: Print Functionality (1/1 passed)
- [ ] Section 11: Error Handling Tests (2/2 passed)
- [ ] Section 12: Edge Cases (4/4 passed)

**Total:** 34/34 tests must pass

**Tester:** _________________
**Date:** _________________
**Signature:** _________________

---

## Performance Benchmarks

Lighthouse scores must meet these thresholds:

| Metric | Threshold | Actual Score |
|--------|-----------|--------------|
| Performance | ≥ 90 | _____ |
| Accessibility | ≥ 95 | _____ |
| Best Practices | ≥ 95 | _____ |
| SEO | ≥ 100 | _____ |

**Tested On:** Chrome DevTools Lighthouse
**Date:** _________________

---

## Final Approval

### Development Team
- [ ] Code complete
- [ ] Self-review done
- [ ] All tests passing
- [ ] Documentation updated

**Developer:** _________________
**Date:** _________________

### Quality Assurance
- [ ] All acceptance criteria verified
- [ ] Manual tests completed
- [ ] Performance benchmarks met
- [ ] Accessibility audit passed

**QA Engineer:** _________________
**Date:** _________________

### Product Owner
- [ ] User stories accepted
- [ ] Feature demo approved
- [ ] Ready for production

**Product Owner:** _________________
**Date:** _________________

---

## Phase Completion Status

**Phase 06: Document Viewer**

**Start Date:** _________________
**End Date:** _________________
**Status:** ☐ In Progress / ☐ Blocked / ☐ Complete

**Blockers (if any):**
_________________________________
_________________________________

**Notes:**
_________________________________
_________________________________
_________________________________
