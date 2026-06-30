# Phase 04: Topic List

## Overview

Implement the Topic List screen that allows users to browse all available topics in the Sijil system. This is a critical navigation hub that connects the homepage to detailed topic exploration.

Users can browse topics hierarchically, filter by collection type, and see document counts for each topic.

## Goals

1. Display all root-level topics with document counts
2. Support hierarchical navigation (parent → child topics)
3. Implement filtering by collection type (Quran, Hadith, Fiqh, etc.)
4. Provide search-within-topics capability
5. Maintain consistent navigation patterns from Phase 02
6. Ensure full responsiveness and accessibility

## Deliverables

- `/topics` route with server-side rendering
- Topic card components with hover states
- Breadcrumb navigation for hierarchy
- Filter dropdown for collection types
- Search input for topic filtering
- Loading skeletons matching Phase 01 patterns
- Error states with recovery options
- Empty states for filtered results
- SEO metadata for topic browsing

## Dependencies

**Requires:**
- Phase 01 (Foundation) - API client, layout shell, design tokens
- Phase 02 (App Shell) - Header, footer, navigation patterns
- Phase 03 (Homepage) - Collection badges, stat display patterns

**Unlocks:**
- Phase 05 (Topic Detail) - Individual topic pages
- Phase 06 (Document Viewer) - Document access from topic lists
- Phase 07 (Search) - Advanced search integration

## Exit Criteria

- All topics load correctly from backend
- Hierarchical navigation works seamlessly
- Filtering by collection type functions properly
- Mobile and desktop layouts are fully responsive
- Accessibility standards (WCAG 2.1 AA) are met
- Performance metrics achieved (< 2s load time)
- All acceptance criteria pass

## Estimated Effort

**Complexity:** M (Medium)
**Time:** 2-3 days
**Files:** ~15 new files
**Components:** 8 new + 4 reused
