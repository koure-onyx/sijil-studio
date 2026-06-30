# Phase 05: Topic Detail - Implementation Prompt

## Objective

Implement the Topic Detail page allowing users to explore a specific topic's hierarchy, view associated documents, and navigate to child topics or document pages.

---

## Read First

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md`
2. `docs/frontend-pm/CURRENT_PHASE.md`
3. `docs/frontend-phases/05-topic-detail/README.md`
4. `docs/frontend-phases/05-topic-detail/implementation.md`
5. `docs/frontend-execution/02-api-registry.md`

---

## Files To Create

### Pages
- `src/app/topics/[slug]/page.tsx` - Topic detail page (Server Component)
- `src/app/topics/[slug]/loading.tsx` - Loading state with skeleton
- `src/app/topics/[slug]/error.tsx` - Error boundary

### Components
- `src/components/navigation/breadcrumb.tsx` - Hierarchical navigation path
- `src/components/topic-detail/topic-header.tsx` - Title, description, metadata (level, doc count, child count)
- `src/components/topic-detail/document-list.tsx` - Paginated document list for topic
- `src/components/topic-detail/child-topics-grid.tsx` - Child topic cards for navigation
- `src/components/topic-detail/topic-actions.tsx` - Share, export, and other actions

### Hooks
- `src/hooks/use-topic-detail.ts` - Topic detail data fetching with React Query

### SEO
- Update metadata in `src/app/topics/[slug]/page.tsx` - Dynamic topic metadata (title, description, Open Graph)

---

## Files That May Change

- `src/components/layout/header.tsx` - If navigation updates needed
- `src/config/navigation.ts` - May add new links

---

## Backend APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/topics/:slug` | GET | Get full topic details (title, description, level, counts) |
| `/api/v1/topics/:slug/documents` | GET | Documents in this topic (paginated) |
| `/api/v1/topics/:slug/children` | GET | Child topics for hierarchical navigation |

---

## Components

Create only these components:

**Navigation:**
- Breadcrumb (hierarchical path: Home > Topics > Parent > Current)

**Topic Detail:**
- TopicHeader (title, description, metadata badges)
- ChildTopicsGrid (card grid for child topics)
- DocumentList (paginated list with DocumentCard items)
- TopicActions (share, export buttons)

**Reused from Previous Phases:**
- TopicCard (from Phase 04)
- DocumentCard (from Phase 04)
- Pagination (from Phase 04)
- Card, Button, Skeleton, Badge (from Phase 01/02)
- Header, Footer (from Phase 02)
- ErrorBoundary, EmptyState (from Phase 01)

Do NOT create document viewer components - those belong to Phase 06.

---

## Rules

Follow ALL rules from `docs/frontend-pm/IMPLEMENTATION_RULES.md`:

**Critical Rules Summary:**

1. **Never use mocked data** - All topic and document data must come from real backend APIs
2. **Server Components by default** - Topic detail page is a Server Component
3. **Strict TypeScript** - No `any` types allowed
4. **Mobile-first responsive design** - Base styles target mobile
5. **No inline fetch calls** - Use React Query hooks

**Additional Phase 05 Constraints:**

- Do NOT implement document viewing (Phase 06)
- Do NOT implement assessments (Phase 08)
- Document list must support pagination
- Child topics must be clickable and navigate correctly
- Breadcrumb must reflect full hierarchy

---

## Stop Conditions

STOP implementation when ALL of these are complete:

✓ Topic detail renders correctly for all topic types (root, parent, leaf)
✓ Breadcrumb navigation works for nested topics (multiple levels)
✓ Document list displays with working pagination
✓ Child topics clickable and navigate to correct routes
✓ All loading states implemented (skeleton loaders)
✓ All error states implemented (graceful error display)
✓ SEO metadata configured (dynamic title, description, Open Graph)
✓ All TypeScript checks pass
✓ ESLint passes with no errors
✓ Build completes successfully

**DO NOT continue to:**
- Document viewer (Phase 06)
- Assessments (Phase 08)
- Any Phase 06+ features

When all stop conditions are met, end the session immediately.

---

## Self Review

Before finishing, verify each item:

**Code Quality:**
- [ ] No `any` types used without explicit eslint-disable comment
- [ ] All components have proper TypeScript interfaces
- [ ] Server Component used for main page
- [ ] No inline fetch calls
- [ ] All API calls use React Query hooks

**Functionality:**
- [ ] Topic header displays title, description, and metadata
- [ ] Breadcrumb shows correct hierarchical path
- [ ] Child topics grid displays (or empty state if none)
- [ ] Document list displays with pagination
- [ ] Child topic links navigate correctly
- [ ] Document links navigate to Phase 06 routes (even if not implemented)
- [ ] Loading skeletons appear during data fetching
- [ ] Error states display gracefully

**Responsive Design:**
- [ ] Layout works on mobile (320px minimum)
- [ ] Child topics grid responsive (1 col mobile → 3-4 cols desktop)
- [ ] Document list readable on all screen sizes
- [ ] Touch targets at least 44px

**Accessibility:**
- [ ] Breadcrumb has proper ARIA labels
- [ ] Keyboard navigation works (Tab through links)
- [ ] Focus management correct
- [ ] Screen reader announces topic structure
- [ ] Color contrast meets WCAG 2.1 AA

**SEO:**
- [ ] Dynamic title tag includes topic name
- [ ] Meta description present
- [ ] Open Graph tags for social sharing
- [ ] Canonical URL set correctly

**Performance:**
- [ ] No unnecessary Client Components
- [ ] Images optimized (if any images added)
- [ ] No console errors or warnings

---

## Deliverables

List these items in your session summary:

**Files Created:**
- [ ] Topic detail page (`topics/[slug]/page.tsx`)
- [ ] Loading state (`topics/[slug]/loading.tsx`)
- [ ] Error boundary (`topics/[slug]/error.tsx`)
- [ ] Breadcrumb component
- [ ] TopicHeader component
- [ ] DocumentList component with pagination
- [ ] ChildTopicsGrid component
- [ ] TopicActions component
- [ ] use-topic-detail hook

**Files Modified:**
- [ ] Navigation config (if new links added)

**Tests Run:**
- [ ] `npm run build` - Build completed successfully
- [ ] `npm run type-check` - TypeScript validation passed
- [ ] `npm run lint` - ESLint passed with no errors
- [ ] Manual test: Topic detail loads with real data
- [ ] Manual test: Breadcrumb navigation works
- [ ] Manual test: Child topic navigation works
- [ ] Manual test: Document pagination works
- [ ] Manual test: Mobile responsive verified
- [ ] Manual test: SEO metadata in page source

**Acceptance Completed:**
- [ ] All Phase 05 exit criteria from CURRENT_PHASE.md checked off
- [ ] Backend APIs responding with data
- [ ] No console errors in browser
- [ ] Accessibility basic checks passed

---

## Session Notes

After completing this phase:

1. Update `docs/frontend-pm/CURRENT_PHASE.md` with completion status
2. Add completed work to `docs/CHANGELOG.md`
3. Do NOT mark Phase 06 as started
4. End session and wait for next instruction

**Estimated Effort:** 2-3 days

**Complexity:** Medium-High (hierarchical navigation, pagination)
