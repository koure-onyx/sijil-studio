# Phase 09: Exports - Implementation Prompt

## Objective

Implement the export functionality allowing users to download documents and topics in multiple formats (PDF, LaTeX, Markdown) with progress tracking and download management.

---

## Read First

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md`
2. `docs/frontend-pm/CURRENT_PHASE.md`
3. `docs/frontend-phases/09-exports/README.md`
4. `docs/frontend-phases/09-exports/implementation.md`
5. `docs/frontend-execution/02-api-registry.md` - Export API endpoints

---

## Files To Create

### Pages
- `src/app/exports/[jobId]/page.tsx` - Export status and download page
- `src/app/exports/page.tsx` - Export history list (user-specific recent exports)

### Components
- `src/components/export/export-trigger.tsx` - Button/dropdown to initiate export from document/topic pages
- `src/components/export/export-status.tsx` - Progress indicator and job status display
- `src/components/export/export-job-card.tsx` - Export job display card for history list
- `src/components/export/export-history-list.tsx` - Recent exports table with filters

### Hooks
- `src/hooks/use-export.ts` - Export initiation and polling
- `src/hooks/use-export-status.ts` - Job status polling hook with exponential backoff

### Utilities
- `src/lib/export/formats.ts` - Export format definitions (PDF, LaTeX, Markdown)
- `src/lib/export/polling.ts` - Polling utility for job status

---

## Files That May Change

- `src/components/layout/header.tsx` - May add exports link
- `src/config/navigation.ts` - Add exports navigation item
- `src/app/documents/[id]/page.tsx` - Add export trigger button (Phase 06 page)
- `src/app/topics/[slug]/page.tsx` - Add export trigger button (Phase 05 page)

---

## Backend APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/exports` | POST | Initiate new export job (resourceId, resourceType, format) |
| `/api/v1/exports/:jobId` | GET | Get export job status and progress |
| `/api/v1/exports/:jobId/download` | GET | Download completed export file |
| `/api/v1/exports/user` | GET | Get user's export history (paginated) |

---

## Components

Create only these components:

**Export Components:**
- ExportTrigger (button/dropdown with format selection)
- ExportStatus (progress bar, status badge, download button when ready)
- ExportJobCard (card displaying job info: format, status, created date, actions)
- ExportHistoryList (table with filtering by status, format, date range)

**Reused from Previous Phases:**
- Button, Card, Badge, Progress (from Phase 01/02)
- Pagination (from Phase 04)
- EmptyState, ErrorBoundary (from Phase 01)
- Header, Footer (from Phase 02)

Do NOT create backend export processing logic - that's handled by the backend API.

---

## Rules

Follow ALL rules from `docs/frontend-pm/IMPLEMENTATION_RULES.md`:

**Critical Rules Summary:**

1. **Never use mocked data** - All export jobs must use real backend APIs
2. **Server Components by default** - Export history page is a Server Component
3. **Strict TypeScript** - No `any` types allowed
4. **Mobile-first responsive design** - Base styles target mobile
5. **No inline fetch calls** - Use React Query hooks

**Additional Phase 09 Constraints:**

- Polling must use exponential backoff to avoid overwhelming the API
- Export triggers should be placed on document and topic detail pages
- Multiple format options must be clearly presented to user
- Progress updates should be smooth and informative
- Download should start automatically when export completes

---

## Stop Conditions

STOP implementation when ALL of these are complete:

✓ Export trigger displays on document and topic pages
✓ Format selection works (PDF, LaTeX, Markdown)
✓ Export job initiates successfully via API
✓ Export status page shows real-time progress
✓ Progress bar updates as job processes
✓ Download button appears when export completes
✓ Download starts automatically or on button click
✓ Export history list displays user's recent exports
✓ History list supports filtering by status and format
✓ All loading states implemented
✓ All error states implemented (job failed, expired, etc.)
✓ All TypeScript checks pass
✓ ESLint passes with no errors
✓ Build completes successfully

**DO NOT continue to:**
- Admin export management (Phase 10)
- Any Phase 10+ features

When all stop conditions are met, end the session immediately.

---

## Self Review

Before finishing, verify each item:

**Code Quality:**
- [ ] No `any` types used without explicit eslint-disable comment
- [ ] All components have proper TypeScript interfaces
- [ ] Server Component used for history page
- [ ] No inline fetch calls
- [ ] All API calls use React Query hooks
- [ ] Polling uses exponential backoff

**Functionality:**
- [ ] Export trigger displays correctly on source pages
- [ ] Format selection dropdown works
- [ ] Export job initiates with correct parameters
- [ ] Status page polls for updates
- [ ] Progress bar reflects actual job progress
- [ ] Download button appears when status = "completed"
- [ ] Download starts correctly
- [ ] Export history lists recent jobs
- [ ] History filters work (status, format)
- [ ] Loading skeletons appear during data fetching
- [ ] Error states display gracefully (failed jobs, expired downloads)

**Responsive Design:**
- [ ] Export trigger works on mobile
- [ ] Status page readable on all screen sizes
- [ ] History table responsive (horizontal scroll on mobile if needed)
- [ ] Touch targets at least 44px

**Accessibility:**
- [ ] Export trigger has ARIA labels
- [ ] Progress announcements for screen readers
- [ ] Keyboard navigation works
- [ ] Focus management correct
- [ ] Color contrast meets WCAG 2.1 AA

**Performance:**
- [ ] Polling interval reasonable (not too frequent)
- [ ] No unnecessary Client Components
- [ ] No console errors or warnings
- [ ] Download doesn't block UI

---

## Deliverables

List these items in your session summary:

**Files Created:**
- [ ] Export status page (`exports/[jobId]/page.tsx`)
- [ ] Export history page (`exports/page.tsx`)
- [ ] ExportTrigger component
- [ ] ExportStatus component
- [ ] ExportJobCard component
- [ ] ExportHistoryList component
- [ ] use-export hook
- [ ] use-export-status hook
- [ ] Export format utilities
- [ ] Polling utilities

**Files Modified:**
- [ ] Document detail page (add export trigger)
- [ ] Topic detail page (add export trigger)
- [ ] Navigation config (add exports link)

**Tests Run:**
- [ ] `npm run build` - Build completed successfully
- [ ] `npm run type-check` - TypeScript validation passed
- [ ] `npm run lint` - ESLint passed with no errors
- [ ] Manual test: Export initiation works
- [ ] Manual test: Progress updates display
- [ ] Manual test: Download works when complete
- [ ] Manual test: Export history displays
- [ ] Manual test: Filters work in history
- [ ] Manual test: Mobile responsive verified
- [ ] Manual test: Error states display correctly

**Acceptance Completed:**
- [ ] All Phase 09 exit criteria from CURRENT_PHASE.md checked off
- [ ] Backend APIs responding correctly
- [ ] No console errors in browser
- [ ] Download verification completed

---

## Session Notes

After completing this phase:

1. Update `docs/frontend-pm/CURRENT_PHASE.md` with completion status
2. Add completed work to `docs/CHANGELOG.md`
3. Do NOT mark Phase 10 as started
4. End session and wait for next instruction

**Estimated Effort:** 2-3 days

**Complexity:** Medium-High (async job handling, polling, multiple formats)
