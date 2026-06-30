# Phase 10: Admin Dashboard

## Overview

This phase implements the admin dashboard for Sijil, enabling administrators to manage content ingestion, batch imports, analytics, and system settings. The admin panel provides a comprehensive interface for content operations, import management, analytics overview, and platform configuration.

**Note:** User management functionality is NOT included - there are no user CRUD APIs in the backend. Focus on content ingestion, import, and analytics features only.

## Goals

- Build a secure admin dashboard accessible only to authorized users
- Create JSON ingestion interface for single document uploads
- Build batch import interface for GitHub repository imports
- Provide system analytics overview
- Enable import status tracking and retry/cancel operations
- Create audit logging interface

## Deliverables

1. **Admin Pages**
   - Admin Dashboard (`/admin`)
   - JSON Ingestion (`/admin/ingest`)
   - Batch Import (`/admin/import`)
   - Import Status (`/admin/import/[batchId]`)
   - Analytics Overview (`/admin/analytics`)
   - Version History (`/admin/versions/[type]/[id]`)

2. **Components**
   - `AdminLayout` - Admin-specific layout with sidebar navigation
   - `AdminSidebar` - Navigation menu for admin sections
   - `IngestionForm` - JSON ingestion form with validation
   - `ImportPreview` - Batch import preview table
   - `ImportProgress` - Import progress indicator
   - `AnalyticsDashboard` - Key metrics visualization
   - `StatusBadge` - Job status indicators
   - `VersionHistoryTable` - Version history display
   - `FilterPanel` - Advanced filtering controls
   - `PaginationControls` - Table pagination

3. **Features**
   - JSON ingestion for single document uploads
   - Batch import from GitHub repositories
   - Import status tracking with retry/cancel
   - Real-time analytics charts
   - Version history viewing
   - Export admin data (CSV, PDF)

## Dependencies

**Completed Before This Phase:**
- Phase 01: Foundation (API client, base components, auth)
- Phase 02: App Shell (layout system, navigation patterns)
- Phase 04: Topic List (table patterns, filtering)
- Phase 05: Topic Detail (content editing patterns)
- Phase 08: Assessments (assessment data structures)
- Phase 09: Exports (data export utilities)

**Required APIs:**
- `POST /api/ingest/json` - Submit JSON for ingestion
- `GET /api/ingest/:trackingId` - Get ingestion status
- `POST /api/ingest/:id/cancel` - Cancel pending job
- `POST /api/ingest/:id/retry` - Retry failed job
- `POST /api/admin/import/preview` - Preview GitHub import
- `POST /api/admin/import/start` - Start batch import
- `GET /api/admin/import/:batchId` - Get import status
- `POST /api/admin/import/:batchId/retry` - Retry failed files
- `POST /api/admin/import/:batchId/cancel` - Cancel import
- `GET /api/admin/import/:batchId/report` - Download report
- `GET /api/v1/admin/analytics/overview` - Get analytics summary
- `GET /api/export/download` - Export admin data

## Exit Criteria

✓ All acceptance criteria in `acceptance.md` pass
✓ Manual verification tests in `tests.md` complete
✓ Admin dashboard loads in < 2 seconds
✓ All CRUD operations work correctly
✓ RBAC enforced on all routes and actions
✓ Responsive on tablet and desktop (admin is desktop-first)
✓ Accessibility audit passes (WCAG 2.1 AA)
✓ Security review completed (no unauthorized access)
✓ CURRENT_PHASE.md updated
✓ CHANGELOG.md updated

## Estimated Effort

**Complexity:** Large (L-XL)
**Estimated Time:** 6-8 days
**Risk Level:** Medium-High (security critical, complex permissions)

## Key Challenges

1. **Security:** Ensuring no unauthorized access to admin functions
2. **Permissions:** Complex RBAC with multiple roles and capabilities
3. **Data Volume:** Handling large datasets efficiently (pagination, virtualization)
4. **Audit Trail:** Comprehensive logging without performance impact
5. **Bulk Operations:** Safe execution of bulk actions with rollback capability

## Success Metrics

- Admin dashboard load time < 2 seconds
- Zero unauthorized access incidents
- 99.9% uptime for admin functions
- Admin user satisfaction score > 4.5/5
- Bulk operations complete within 10 seconds for 1000 records

## Integration Points

- **Authentication:** Admin-only route protection
- **User Management:** Links to user profiles from other sections
- **Topic Management:** Integration with topic creation/editing flow
- **Analytics:** Data from all system modules
- **Audit Logs:** Tracking all admin actions
- **Exports:** Data export functionality

## Technical Notes

- Use Next.js API routes for server-side admin operations
- Implement server-side pagination for all tables
- Use React Query for data fetching with optimistic updates
- Store admin session separately with shorter timeout
- Implement CSRF protection for all mutations
- Use feature flags for rolling out admin features
- Log all admin actions to audit trail
- Implement rate limiting on admin APIs

## Admin Roles

1. **Super Admin** - Full access to all admin functions
2. **Moderator** - Content moderation, user management
3. **Editor** - Topic and assessment management only
4. **Analyst** - Read-only access to analytics and reports
