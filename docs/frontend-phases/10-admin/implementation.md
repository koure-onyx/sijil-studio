# Phase 10: Admin Dashboard - Implementation Guide

## Pages

### 1. Admin Dashboard (`/admin`)

**File:** `apps/web/app/admin/page.tsx`

```typescript
// Main admin dashboard with overview metrics and quick actions
- Fetch analytics summary from backend
- Display key metrics cards (total topics, documents, assessments, imports)
- Show recent import activity
- Quick action buttons (New Ingest, New Import)
- System health indicators
```

**Layout:** `apps/web/app/admin/layout.tsx`
```typescript
// AdminLayout component
- Sidebar navigation (ingest, import, topics, documents, assessments, analytics)
- Header with admin user info
- Main content area
- Breadcrumb navigation
- Admin-only route protection (middleware)
```

### 2. JSON Ingestion

**Page:** `apps/web/app/admin/ingest/page.tsx`
```typescript
// JsonIngest page
- File upload area for JSON files
- Drag-and-drop support
- Upload progress indicator
- Validation results display
- Success/error messages
- Recent ingestion history
```

### 3. Batch Import

**List Page:** `apps/web/app/admin/import/page.tsx`
```typescript
// BatchImportList page
- Table of recent/scheduled imports
- Filters: status (pending, in-progress, completed, failed)
- Search by batch ID or source URL
- Create new import button
- Retry failed imports
- Cancel running imports
```

**Detail Page:** `apps/web/app/admin/import/[id]/page.tsx`
```typescript
// BatchImportDetail page
- Import status progress bar
- Files processed count
- Success/failure counts
- Error details for failed files
- Retry button for failed items
- Download report button
- Real-time updates (polling)
```

### 4. Topic Management (Read-Only View)

**List Page:** `apps/web/app/admin/topics/page.tsx`
```typescript
// TopicManager list (read-only view)
- All topics table
- Filters: category, status
- Search functionality
- View topic details
- No create/edit/delete (handled via import)
```

### 5. Document Moderation

**List Page:** `apps/web/app/admin/documents/page.tsx`
```typescript
// DocumentModerator queue
- Pending documents awaiting review
- Filters: status, type
- Approval/rejection actions
- Bulk approve/reject
- View document preview
```

**Detail Page:** `apps/web/app/admin/documents/[id]/page.tsx`
```typescript
// DocumentReview page
- Full document preview
- Metadata display
- Approve/Reject buttons
- Rejection reason input
- History of actions
- Associated topic link
```

### 6. Assessment Management (Read-Only View)

**List Page:** `apps/web/app/admin/assessments/page.tsx`
```typescript
// Assessment list (read-only)
- All assessments table
- Filters: type, topic, status
- Search by title
- View assessment details
- No create/edit (handled via import)
```

### 7. Analytics Overview

**Page:** `apps/web/app/admin/analytics/page.tsx`
```typescript
// AnalyticsDashboard
- Basic metrics display (counts from backend)
- Import success rates
- Document approval stats
- Topic coverage overview
- Date range picker
- Simple charts (if backend supports)
```

---

## Components

### AdminLayout Component

**File:** `apps/web/components/admin/AdminLayout.tsx`

```typescript
interface AdminLayoutProps {
  children: React.ReactNode;
}

// Structure:
<AdminLayout>
  <AdminSidebar />  // Left sidebar with navigation
  <AdminHeader />   // Top bar with user info, notifications
  <main>            // Content area
    {children}
  </main>
</AdminLayout>

// Features:
- Collapsible sidebar
- Responsive breakpoints
- Active route highlighting
- User dropdown menu
- Notification bell
- Theme toggle (if applicable)
```

### AdminSidebar Component

**File:** `apps/web/components/admin/AdminSidebar.tsx`

```typescript
// Navigation items (based on actual backend capabilities):
const navItems = [
  { label: 'Dashboard', href: '/admin', icon: DashboardIcon },
  { label: 'Ingest JSON', href: '/admin/ingest', icon: IngestIcon },
  { label: 'Batch Import', href: '/admin/import', icon: ImportIcon },
  { label: 'Topics', href: '/admin/topics', icon: TopicsIcon },
  { label: 'Documents', href: '/admin/documents', icon: DocumentsIcon },
  { label: 'Assessments', href: '/admin/assessments', icon: AssessmentsIcon },
  { label: 'Analytics', href: '/admin/analytics', icon: AnalyticsIcon },
];

// Features:
- Icon + label for each item
- Active state styling
- Submenu support (if needed)
- Collapse on mobile
- Keyboard navigation
```

### ModerationQueue Component

**File:** `apps/web/components/admin/ModerationQueue.tsx`

```typescript
interface ModerationQueueProps {
  documents: PendingDocument[];
  totalCount: number;
  onPageChange: (page: number) => void;
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
  onBulkAction: (action: 'approve' | 'reject', docIds: string[]) => void;
}

// Columns:
- Checkbox (for bulk selection)
- Document Title (sortable)
- Type (sortable, filterable)
- Submitter (sortable)
- Submitted At (sortable)
- Status (pending/reviewed, filterable)
- Actions (view, approve, reject)

// Features:
- Pagination controls
- Column sorting
- Row selection
- Bulk approve/reject toolbar
- Empty state
- Loading skeleton
- Error state
```

### ModerationDetailCard Component

**File:** `apps/web/components/admin/ModerationDetailCard.tsx`

```typescript
interface ModerationDetailCardProps {
  document: PendingDocument;
  onApprove: () => void;
  onReject: (reason: string) => void;
  onReturnToSubmitter: () => void;
}

// Sections:
- Document header (title, type, submitter, date)
- Full document preview
- Metadata panel
- Action buttons (approve, reject with reason, return)
- Moderation history timeline
```
- Account info (role, status, joined date)
- Activity stats (logins, content created, assessments taken)
- Recent actions log
- Action buttons (edit, suspend, delete)
```

### TopicManager Component

**File:** `apps/web/components/admin/TopicManager.tsx`

```typescript
interface TopicManagerProps {
  topics: Topic[];
  onCreateNew: () => void;
  onEdit: (topicId: string) => void;
  onDelete: (topicIds: string[]) => void;
  onBulkPublish: (topicIds: string[]) => void;
  onBulkArchive: (topicIds: string[]) => void;
}

// Features:
- Table view with topic data
- Filters: category, status, author, date
- Search by title/description
- Bulk selection
- Quick status toggle
- View count display
- Last updated timestamp
```

### DocumentModerator Component

**File:** `apps/web/components/admin/DocumentModerator.tsx`

```typescript
interface DocumentModeratorProps {
  documents: Document[];
  onApprove: (docId: string) => void;
  onReject: (docId: string, reason: string) => void;
  onBulkApprove: (docIds: string[]) => void;
  onBulkReject: (docIds: string[], reason: string) => void;
}

// Features:
- Queue view (pending first)
- Document preview panel
- Quick approve/reject buttons
- Rejection reason modal
- Filter by status (pending, approved, rejected)
- Sort by submission date
- Show submitter info
```

### AssessmentEditor Component

**File:** `apps/web/components/admin/AssessmentEditor.tsx`

```typescript
interface AssessmentEditorProps {
  assessment?: Assessment; // Undefined for create mode
  onSave: (data: AssessmentInput) => void;
  onCancel: () => void;
}

// Sections:
1. Basic Info Form
   - Title
   - Description
   - Type (quiz, practice, graded)
   - Topic association (dropdown)
   - Tags

2. Question Builder
   - Add question button
   - Question list with drag-and-drop
   - Each question has:
     - Question text (rich text)
     - Type selector (MCQ, true/false, short answer)
     - Answer options (for MCQ)
     - Correct answer indicator
     - Explanation field
     - Points value
     - Delete question button

3. Settings Panel
   - Time limit (minutes)
   - Passing score (%)
   - Shuffle questions (toggle)
   - Show results immediately (toggle)
   - Allow retakes (toggle)
   - Max attempts

4. Action Bar
   - Save draft
   - Preview
   - Publish
   - Cancel

// Features:
- Auto-save drafts
- Question preview
- Validation before publish
- Import/export questions (JSON)
```

### AnalyticsDashboard Component

**File:** `apps/web/components/admin/AnalyticsDashboard.tsx`

```typescript
interface AnalyticsDashboardProps {
  metrics: AnalyticsMetrics;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

// Charts (use recharts or chart.js):
1. User Growth Chart (LineChart)
   - Daily/weekly/monthly signups
   - Active users trend

2. Topic Engagement (BarChart)
   - Views per topic
   - Completion rates

3. Assessment Performance (PieChart)
   - Pass/fail distribution
   - Average scores by topic

4. Document Submissions (AreaChart)
   - Submissions over time
   - Approval rate

5. Top Content Table
   - Most viewed topics
   - Highest rated assessments
   - Most downloaded documents

// Features:
- Date range picker
- Export to PDF/CSV
- Refresh button
- Compare periods toggle
- Metric cards at top
```

### ModerationActions Component

**File:** `apps/web/components/admin/ModerationActions.tsx`

```typescript
interface ModerationActionsProps {
  documentId: string;
  onApprove: () => void;
  onReject: (reason: string) => void;
  isLoading?: boolean;
}

// Features:
- Approve button (green, primary)
- Reject button with reason modal (red, secondary)
- Loading state during API call
- Confirmation dialog for bulk actions
- Success/error toast notifications
```

### StatusBadge Component

**File:** `apps/web/components/admin/StatusBadge.tsx`

```typescript
interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'archived';
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

// Styles:
- Active: Green background
- Inactive: Gray background
- Pending: Yellow background
- Approved: Blue background
- Rejected: Red background
- Archived: Gray background

// Features:
- Icon + text
- Tooltip with full status name
- Consistent sizing
```

### AuditLogTable Component

**File:** `apps/web/components/admin/AuditLogTable.tsx`

```typescript
interface AuditLogTableProps {
  logs: AuditLog[];
  totalCount: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filters: LogFilters) => void;
}

// Columns:
- Timestamp
- User (with link to profile)
- Action (created, updated, deleted, etc.)
- Resource type (user, topic, document, etc.)
- Resource ID (with link if applicable)
- IP address
- Details (expandable row)

// Features:
- Advanced filters
- Date range picker
- Search by user/action/resource
- Export to CSV
- Real-time updates (optional)
- Infinite scroll or pagination
```

### BulkActionToolbar Component

**File:** `apps/web/components/admin/BulkActionToolbar.tsx`

```typescript
interface BulkActionToolbarProps {
  selectedCount: number;
  actions: BulkAction[];
  onActionSelect: (action: string) => void;
  onClearSelection: () => void;
}

// Features:
- Show selected count
- Action dropdown
- Confirmation dialog
- Progress indicator during execution
- Success/error toast
- Clear selection button
```

### FilterPanel Component

**File:** `apps/web/components/admin/FilterPanel.tsx`

```typescript
interface FilterPanelProps {
  filters: FilterConfig[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onReset: () => void;
  collapsible?: boolean;
}

// Filter types:
- Text search
- Dropdown select
- Multi-select
- Date range
- Boolean toggle
- Number range

// Features:
- Collapsible on mobile
- Active filter chips
- Clear all button
- Save filter preset
- URL sync (shareable filters)
```

### PaginationControls Component

**File:** `apps/web/components/admin/PaginationControls.tsx`

```typescript
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

// Features:
- Previous/Next buttons
- Page number buttons (with ellipsis)
- Jump to page input
- Items per page selector
- Total count display
- Mobile-responsive layout
```

---

## Routes

```typescript
// apps/web/app/admin/route.ts (middleware protection)
// All admin routes require admin role

Admin Routes:
├── /admin (Dashboard)
├── /admin/users (User list)
│   ├── /admin/users/:id (User detail)
│   └── /admin/users/:id/edit (Edit user)
├── /admin/topics (Topic list)
│   ├── /admin/topics/new (Create topic)
│   └── /admin/topics/:id/edit (Edit topic)
├── /admin/documents (Document moderation)
│   └── /admin/documents/:id (Review document)
├── /admin/assessments (Assessment list)
│   ├── /admin/assessments/new (Create assessment)
│   └── /admin/assessments/:id/edit (Edit assessment)
├── /admin/analytics (Analytics dashboard)
├── /admin/settings (System settings)
└── /admin/logs (Audit logs)
```

---

## APIs

### Client Functions

**File:** `apps/web/lib/api/admin.ts`

```typescript
// Moderation Queue
export async function getPendingDocuments(params: GetDocumentsParams): Promise<PaginatedResponse<PendingDocument>>
export async function approveDocument(id: string): Promise<void>
export async function rejectDocument(id: string, reason: string): Promise<void>
export async function bulkApproveDocuments(ids: string[]): Promise<void>
export async function bulkRejectDocuments(ids: string[], reason: string): Promise<void>

// Topics
export async function getTopics(params: GetTopicsParams): Promise<PaginatedResponse<Topic>>
export async function createTopic(data: CreateTopicInput): Promise<Topic>
export async function updateTopic(id: string, data: UpdateTopicInput): Promise<Topic>
export async function deleteTopic(id: string): Promise<void>
export async function bulkPublishTopics(ids: string[]): Promise<void>
export async function bulkArchiveTopics(ids: string[]): Promise<void>

// Documents
export async function getDocuments(params: GetDocumentsParams): Promise<PaginatedResponse<Document>>
export async function approveDocument(id: string): Promise<Document>
export async function rejectDocument(id: string, reason: string): Promise<Document>
export async function bulkApproveDocuments(ids: string[]): Promise<void>
export async function bulkRejectDocuments(ids: string[], reason: string): Promise<void>

// Assessments
export async function getAssessments(params: GetAssessmentsParams): Promise<PaginatedResponse<Assessment>>
export async function createAssessment(data: CreateAssessmentInput): Promise<Assessment>
export async function updateAssessment(id: string, data: UpdateAssessmentInput): Promise<Assessment>
export async function deleteAssessment(id: string): Promise<void>

// Analytics
export async function getAnalyticsOverview(params: AnalyticsParams): Promise<AnalyticsMetrics>
export async function getUserGrowthData(range: DateRange): Promise<GrowthDataPoint[]>
export async function getTopicEngagementData(): Promise<EngagementDataPoint[]>
export async function getAssessmentPerformanceData(): Promise<PerformanceDataPoint[]>

// Settings
export async function getSettings(): Promise<SystemSettings>
export async function updateSettings(data: UpdateSettingsInput): Promise<SystemSettings>

// Audit Logs
export async function getAuditLogs(params: GetLogsParams): Promise<PaginatedResponse<AuditLog>>
export async function exportAuditLogs(params: GetLogsParams): Promise<Blob>

// Exports
export async function exportUsers(params: GetUsersParams): Promise<Blob>
export async function exportTopics(params: GetTopicsParams): Promise<Blob>
export async function exportDocuments(params: GetDocumentsParams): Promise<Blob>
```

---

## State Management

### Admin Store (Zustand)

**File:** `apps/web/stores/adminStore.ts`

```typescript
interface AdminState {
  // Selection state
  selectedUserIds: string[];
  selectedTopicIds: string[];
  selectedDocumentIds: string[];
  selectedAssessmentIds: string[];
  
  // Filters
  userFilters: UserFilters;
  topicFilters: TopicFilters;
  documentFilters: DocumentFilters;
  assessmentFilters: AssessmentFilters;
  logFilters: LogFilters;
  
  // UI state
  sidebarCollapsed: boolean;
  currentView: AdminView;
  
  // Actions
  setSelectedUserIds: (ids: string[]) => void;
  setSelectedTopicIds: (ids: string[]) => void;
  setSelectedDocumentIds: (ids: string[]) => void;
  setSelectedAssessmentIds: (ids: string[]) => void;
  setUserFilters: (filters: UserFilters) => void;
  setTopicFilters: (filters: TopicFilters) => void;
  setDocumentFilters: (filters: DocumentFilters) => void;
  setAssessmentFilters: (filters: AssessmentFilters) => void;
  setLogFilters: (filters: LogFilters) => void;
  toggleSidebar: () => void;
  setCurrentView: (view: AdminView) => void;
  clearSelections: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  // Initial state
  selectedUserIds: [],
  selectedTopicIds: [],
  selectedDocumentIds: [],
  selectedAssessmentIds: [],
  userFilters: defaultUserFilters,
  topicFilters: defaultTopicFilters,
  documentFilters: defaultDocumentFilters,
  assessmentFilters: defaultAssessmentFilters,
  logFilters: defaultLogFilters,
  sidebarCollapsed: false,
  currentView: 'dashboard',
  
  // Actions
  setSelectedUserIds: (ids) => set({ selectedUserIds: ids }),
  setSelectedTopicIds: (ids) => set({ selectedTopicIds: ids }),
  setSelectedDocumentIds: (ids) => set({ selectedDocumentIds: ids }),
  setSelectedAssessmentIds: (ids) => set({ selectedAssessmentIds: ids }),
  setUserFilters: (filters) => set({ userFilters: filters }),
  setTopicFilters: (filters) => set({ topicFilters: filters }),
  setDocumentFilters: (filters) => set({ documentFilters: filters }),
  setAssessmentFilters: (filters) => set({ assessmentFilters: filters }),
  setLogFilters: (filters) => set({ logFilters: filters }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setCurrentView: (view) => set({ currentView: view }),
  clearSelections: () => set({
    selectedUserIds: [],
    selectedTopicIds: [],
    selectedDocumentIds: [],
    selectedAssessmentIds: [],
  }),
}));
```

---

## Hooks

### useAdminAuth Hook

**File:** `apps/web/hooks/useAdminAuth.ts`

```typescript
export function useAdminAuth() {
  const { user, isLoading } = useAuth();
  
  const isAdmin = useMemo(() => {
    return user?.roles?.some(role => 
      ['super_admin', 'moderator', 'editor', 'analyst'].includes(role)
    ) ?? false;
  }, [user]);
  
  const canAccess = useCallback((requiredRole: AdminRole) => {
    const roleHierarchy = {
      super_admin: 4,
      moderator: 3,
      editor: 2,
      analyst: 1,
    };
    
    const userMaxRole = user?.roles?.reduce((max, role) => 
      Math.max(max, roleHierarchy[role] ?? 0), 0
    ) ?? 0;
    
    return userMaxRole >= (roleHierarchy[requiredRole] ?? 0);
  }, [user]);
  
  return { isAdmin, canAccess, isLoading };
}
```

### useBulkActions Hook

**File:** `apps/web/hooks/useBulkActions.ts`

```typescript
export function useBulkActions<T>(options: BulkActionOptions<T>) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const select = useCallback((id: string) => {
    setSelectedIds(prev => [...prev, id]);
  }, []);
  
  const deselect = useCallback((id: string) => {
    setSelectedIds(prev => prev.filter(x => x !== id));
  }, []);
  
  const toggleAll = useCallback((ids: string[]) => {
    setSelectedIds(prev => 
      prev.length === ids.length ? [] : ids
    );
  }, []);
  
  const execute = useCallback(async (action: (ids: string[]) => Promise<void>) => {
    setIsProcessing(true);
    setProgress(0);
    
    try {
      await action(selectedIds);
      setSelectedIds([]);
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  }, [selectedIds]);
  
  return {
    selectedIds,
    isSelected: useCallback((id: string) => selectedIds.includes(id), [selectedIds]),
    select,
    deselect,
    toggleAll,
    execute,
    isProcessing,
    progress,
    count: selectedIds.length,
  };
}
```

### useAdminFilters Hook

**File:** `apps/web/hooks/useAdminFilters.ts`

```typescript
export function useAdminFilters<T extends Record<string, any>>(
  key: FilterKey,
  defaultFilters: T
) {
  const router = useRouter();
  const store = useAdminStore();
  
  const filters = useMemo(() => {
    switch (key) {
      case 'users': return store.userFilters;
      case 'topics': return store.topicFilters;
      case 'documents': return store.documentFilters;
      case 'assessments': return store.assessmentFilters;
      case 'logs': return store.logFilters;
      default: return defaultFilters;
    }
  }, [key, store]);
  
  const updateFilters = useCallback((updates: Partial<T>) => {
    const newFilters = { ...filters, ...updates };
    
    switch (key) {
      case 'users': store.setUserFilters(newFilters as UserFilters); break;
      case 'topics': store.setTopicFilters(newFilters as TopicFilters); break;
      case 'documents': store.setDocumentFilters(newFilters as DocumentFilters); break;
      case 'assessments': store.setAssessmentFilters(newFilters as AssessmentFilters); break;
      case 'logs': store.setLogFilters(newFilters as LogFilters); break;
    }
    
    // Sync to URL
    const params = new URLSearchParams(filtersToQueryParams(newFilters));
    router.push(`?${params.toString()}`, { scroll: false });
  }, [filters, key, store, router]);
  
  const resetFilters = useCallback(() => {
    updateFilters(defaultFilters);
  }, [updateFilters, defaultFilters]);
  
  return { filters, updateFilters, resetFilters };
}
```

---

## Models/Types

**File:** `apps/web/types/admin.ts`

```typescript
// Admin Roles
export type AdminRole = 'super_admin' | 'moderator' | 'editor' | 'analyst';

// Admin Permissions
export interface AdminPermissions {
  canManageUsers: boolean;
  canManageTopics: boolean;
  canManageDocuments: boolean;
  canManageAssessments: boolean;
  canViewAnalytics: boolean;
  canManageSettings: boolean;
  canViewAuditLogs: boolean;
  canExportData: boolean;
  canDeleteContent: boolean;
  canSuspendUsers: boolean;
}

// User Management
export interface UserFilters {
  search?: string;
  roles?: AdminRole[];
  status?: ('active' | 'suspended')[];
  dateFrom?: Date;
  dateTo?: Date;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: AdminRole;
  status?: 'active' | 'suspended';
}

// Topic Management
export interface TopicFilters {
  search?: string;
  categories?: string[];
  status?: ('draft' | 'published' | 'archived')[];
  authors?: string[];
  dateFrom?: Date;
  dateTo?: Date;
}

export interface CreateTopicInput {
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  content: string;
  status: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
}

export interface UpdateTopicInput extends Partial<CreateTopicInput> {}

// Document Moderation
export interface DocumentFilters {
  search?: string;
  status?: ('pending' | 'approved' | 'rejected')[];
  types?: string[];
  submitters?: string[];
  dateFrom?: Date;
  dateTo?: Date;
}

// Assessment Management
export interface AssessmentFilters {
  search?: string;
  types?: ('quiz' | 'practice' | 'graded')[];
  topics?: string[];
  status?: ('draft' | 'published' | 'archived')[];
  dateFrom?: Date;
  dateTo?: Date;
}

export interface QuestionInput {
  id?: string;
  text: string;
  type: 'mcq' | 'true_false' | 'short_answer';
  options?: QuestionOption[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  order: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface CreateAssessmentInput {
  title: string;
  description: string;
  type: 'quiz' | 'practice' | 'graded';
  topicId: string;
  questions: QuestionInput[];
  timeLimitMinutes?: number;
  passingScorePercent?: number;
  shuffleQuestions: boolean;
  showResultsImmediately: boolean;
  allowRetakes: boolean;
  maxAttempts?: number;
  status: 'draft' | 'published';
}

export interface UpdateAssessmentInput extends Partial<CreateAssessmentInput> {}

// Analytics
export interface AnalyticsParams {
  dateFrom: Date;
  dateTo: Date;
  granularity: 'day' | 'week' | 'month';
}

export interface AnalyticsMetrics {
  totalUsers: number;
  activeUsers: number;
  newUsersThisPeriod: number;
  totalTopics: number;
  publishedTopics: number;
  totalDocuments: number;
  pendingDocuments: number;
  totalAssessments: number;
  assessmentCompletions: number;
  averageAssessmentScore: number;
}

export interface GrowthDataPoint {
  date: string;
  value: number;
}

export interface EngagementDataPoint {
  topicId: string;
  topicTitle: string;
  views: number;
  completions: number;
  averageTimeSpent: number;
}

export interface PerformanceDataPoint {
  assessmentId: string;
  assessmentTitle: string;
  attempts: number;
  passRate: number;
  averageScore: number;
}

// Settings
export interface SystemSettings {
  siteName: string;
  siteLogo: string;
  siteFavicon: string;
  defaultLanguage: string;
  timezone: string;
  sessionTimeoutMinutes: number;
  passwordMinLength: number;
  require2FA: boolean;
  defaultTopicVisibility: 'draft' | 'published';
  documentApprovalRequired: boolean;
  maxFileSizeMB: number;
  allowedFileTypes: string[];
  cdnUrl?: string;
  featureFlags: Record<string, boolean>;
}

export interface UpdateSettingsInput extends Partial<SystemSettings> {}

// Audit Logs
export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  resourceTitle?: string;
  ipAddress: string;
  userAgent: string;
  details: Record<string, any>;
}

export interface LogFilters {
  search?: string;
  users?: string[];
  actions?: string[];
  resourceTypes?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  ipAddresses?: string[];
}

// Bulk Actions
export interface BulkAction {
  id: string;
  label: string;
  icon: React.ComponentType;
  confirmation?: string;
  requiresReason?: boolean;
}

export interface BulkActionResult {
  success: number;
  failed: number;
  errors: Array<{ id: string; error: string }>;
}
```

---

## Folder Structure

```
apps/web/
├── app/
│   └── admin/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── users/
│       │   ├── page.tsx
│       │   └── [id]/
│       │       ├── page.tsx
│       │       └── edit/
│       │           └── page.tsx
│       ├── topics/
│       │   ├── page.tsx
│       │   ├── new/
│       │   │   └── page.tsx
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx
│       ├── documents/
│       │   ├── page.tsx
│       │   └── [id]/
│       │       └── page.tsx
│       ├── assessments/
│       │   ├── page.tsx
│       │   ├── new/
│       │   │   └── page.tsx
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx
│       ├── analytics/
│       │   └── page.tsx
│       ├── settings/
│       │   └── page.tsx
│       └── logs/
│           └── page.tsx
├── components/
│   └── admin/
│       ├── AdminLayout.tsx
│       ├── AdminSidebar.tsx
│       ├── AdminHeader.tsx
│       ├── ModerationQueue.tsx
│       ├── ModerationDetailCard.tsx
│       ├── TopicManager.tsx
│       ├── TopicEditor.tsx
│       ├── DocumentModerator.tsx
│       ├── AssessmentEditor.tsx
│       ├── QuestionBuilder.tsx
│       ├── AnalyticsDashboard.tsx
│       ├── ModerationActions.tsx
│       ├── StatusBadge.tsx
│       ├── AuditLogTable.tsx
│       ├── BulkActionToolbar.tsx
│       ├── FilterPanel.tsx
│       └── PaginationControls.tsx
├── hooks/
│   ├── useAdminAuth.ts
│   ├── useBulkActions.ts
│   └── useAdminFilters.ts
├── stores/
│   └── adminStore.ts
├── lib/
│   └── api/
│       └── admin.ts
└── types/
    └── admin.ts
```

---

## SEO

While admin pages are not public-facing, implement basic SEO hygiene:

```typescript
// Each admin page should have:
export const metadata: Metadata = {
  title: 'Admin Dashboard | Sijil',
  description: 'Sijil Administration Panel',
  robots: 'noindex, nofollow', // Prevent indexing
};

// Use canonical URLs
// Implement proper meta tags for admin context
```

---

## Loading States

```typescript
// Use skeletons for all tables and cards
// Example: ModerationQueueSkeleton.tsx

// Loading states:
- Page load: Full page skeleton
- Data refresh: Preserve layout, show shimmer on updating sections
- Actions: Button loading spinners, disable interactions
- Bulk operations: Progress bar with percentage

// Implementation:
<Suspense fallback={<AdminPageSkeleton />}>
  <AdminContent />
</Suspense>
```

---

## Error Handling

```typescript
// Error boundaries for each section
// Error states:
- API errors: Show toast notification + inline error message
- Permission errors: Redirect to dashboard with error message
- Not found: Show 404 page within admin layout
- Server errors: Show retry button + contact support message

// Error recovery:
- Auto-retry for transient failures (3 attempts)
- Manual retry button
- Preserve user input on error
- Clear error on successful retry
```

---

## Accessibility

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- All interactive elements focusable
- Logical tab order
- Skip links for main content
- Keyboard shortcuts for common actions (Ctrl+S save, Ctrl+F search)
- Escape closes modals/dropdowns

**Screen Readers:**
- ARIA labels for all buttons and icons
- ARIA live regions for dynamic updates (bulk action progress)
- Proper heading hierarchy (h1, h2, h3)
- Table captions and column headers with scope
- Form labels associated with inputs
- Error messages linked to inputs via aria-describedby

**Visual:**
- Color contrast ratio ≥ 4.5:1 for text
- Focus indicators visible (3px outline)
- No reliance on color alone for status
- Icons have text labels or aria-labels
- Responsive text sizing

**Cognitive:**
- Clear, consistent navigation
- Undo capability for destructive actions
- Confirmation dialogs for important actions
- Progress indicators for long operations
- Plain language in error messages

### Specific Implementations

```typescript
// Example: Accessible ModerationQueue
<table aria-label="Users table" role="grid">
  <caption className="sr-only">List of all users in the system</caption>
  <thead>
    <tr>
      <th scope="col">
        <input 
          type="checkbox" 
          aria-label="Select all users"
          onChange={handleSelectAll}
        />
      </th>
      <th scope="col" aria-sort={sortDirection}>
        <button onClick={handleSort}>
          Name
          <span aria-hidden="true">{sortIcon}</span>
        </button>
      </th>
      {/* ... */}
    </tr>
  </thead>
  <tbody>
    {users.map(user => (
      <tr key={user.id}>
        <td>
          <input
            type="checkbox"
            aria-label={`Select ${user.name}`}
            checked={isSelected(user.id)}
            onChange={() => toggle(user.id)}
          />
        </td>
        <td>{user.name}</td>
        {/* ... */}
      </tr>
    ))}
  </tbody>
</table>

// Example: Accessible Modal
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Confirm Delete</h2>
  <p id="modal-description">
    Are you sure you want to delete this user? This action cannot be undone.
  </p>
  {/* ... */}
</div>
```

---

## Responsive Behavior

### Breakpoints

```typescript
// Mobile: < 640px (admin is not optimized for mobile)
// Tablet: 640px - 1024px
// Desktop: > 1024px (primary target)
```

### Layout Adaptations

**Desktop (> 1024px):**
- Fixed sidebar (250px)
- Multi-column layouts
- Full tables with all columns
- Inline actions

**Tablet (640px - 1024px):**
- Collapsible sidebar (icon-only when collapsed)
- Two-column layouts stack to one
- Horizontal scroll for wide tables
- Action menus in dropdown

**Mobile (< 640px):**
- Hidden sidebar (hamburger menu)
- Single column layout
- Card view instead of tables
- Bottom sheet for actions
- Simplified forms

### Component-Specific Responses

```typescript
// ModerationQueue:
- Desktop: Full table with 8 columns
- Tablet: Hide less important columns (last active, created at)
- Mobile: Convert to card list

// AdminSidebar:
- Desktop: Always visible
- Tablet: Collapsible to icons
- Mobile: Off-canvas drawer

// FilterPanel:
- Desktop: Always visible above table
- Tablet/Mobile: Collapsible behind "Filters" button

// BulkActionToolbar:
- Desktop: Fixed top bar
- Tablet/Mobile: Bottom sheet when items selected
```

---

## Backend Integration

### Required API Endpoints

All endpoints require authentication and appropriate admin role.

```typescript
// Base URL: /api/v1/admin

// Users
GET    /users                    // List users (paginated)
GET    /users/:id                // Get user details
PATCH  /users/:id                // Update user
DELETE /users/:id                // Delete user
POST   /users/:id/suspend        // Suspend user
POST   /users/:id/unsuspend      // Unsuspend user

// Topics
GET    /topics                   // List topics (paginated)
POST   /topics                   // Create topic
PATCH  /topics/:id               // Update topic
DELETE /topics/:id               // Delete topic
POST   /topics/bulk-publish      // Bulk publish
POST   /topics/bulk-archive      // Bulk archive

// Documents
GET    /documents                // List documents (paginated)
PATCH  /documents/:id/approve    // Approve document
PATCH  /documents/:id/reject     // Reject document
POST   /documents/bulk-approve   // Bulk approve
POST   /documents/bulk-reject    // Bulk reject

// Assessments
GET    /assessments              // List assessments (paginated)
POST   /assessments              // Create assessment
PATCH  /assessments/:id          // Update assessment
DELETE /assessments/:id          // Delete assessment

// Analytics
GET    /analytics/overview       // Get overview metrics
GET    /analytics/user-growth    // User growth data
GET    /analytics/topic-engagement // Topic engagement data
GET    /analytics/assessment-performance // Assessment performance

// Settings
GET    /settings                 // Get system settings
PATCH  /settings                 // Update settings

// Audit Logs
GET    /logs                     // Get audit logs (paginated)
GET    /logs/export              // Export logs (CSV)

// Exports
POST   /export/users             // Export users (CSV)
POST   /export/topics            // Export topics (CSV)
POST   /export/documents         // Export documents (CSV)
POST   /export/assessments       // Export assessments (CSV)
```

### Request/Response Examples

```typescript
// GET /api/v1/admin/users?page=1&limit=20&role=moderator&status=active
Response: {
  data: User[],
  pagination: {
    page: 1,
    limit: 20,
    total: 150,
    totalPages: 8
  }
}

// PATCH /api/v1/admin/users/:id
Request: {
  role: "moderator",
  status: "active"
}
Response: User

// POST /api/v1/admin/documents/bulk-approve
Request: {
  documentIds: ["doc1", "doc2", "doc3"]
}
Response: {
  success: 3,
  failed: 0,
  errors: []
}

// GET /api/v1/admin/analytics/overview?from=2024-01-01&to=2024-01-31
Response: AnalyticsMetrics
```

### Error Responses

```typescript
// 401 Unauthorized
{
  error: "Unauthorized",
  message: "Authentication required"
}

// 403 Forbidden
{
  error: "Forbidden",
  message: "Insufficient permissions"
}

// 404 Not Found
{
  error: "Not Found",
  message: "User not found"
}

// 400 Bad Request
{
  error: "Bad Request",
  message: "Invalid email format",
  details: { field: "email", code: "invalid_format" }
}

// 409 Conflict
{
  error: "Conflict",
  message: "Email already exists"
}

// 500 Internal Server Error
{
  error: "Internal Server Error",
  message: "Something went wrong"
}
```

---

## Acceptance Checklist

### Pages
- [ ] Admin Dashboard loads with metrics
- [ ] User Management page displays user list
- [ ] User Detail page shows complete user info
- [ ] User Edit form saves changes
- [ ] Topic Management page lists all topics
- [ ] Topic Create/Edit forms work correctly
- [ ] Document Moderation queue functions properly
- [ ] Document Review page allows approve/reject
- [ ] Assessment Management page lists assessments
- [ ] Assessment Editor creates/edits assessments
- [ ] Analytics Dashboard displays charts
- [ ] Settings page loads and saves configuration
- [ ] Audit Logs page shows log entries

### Components
- [ ] AdminLayout renders correctly
- [ ] AdminSidebar navigation works
- [ ] ModerationQueue displays users with pagination
- [ ] ModerationDetailCard shows user information
- [ ] TopicManager handles topic CRUD
- [ ] DocumentModerator processes approvals
- [ ] AssessmentEditor builds assessments
- [ ] AnalyticsDashboard renders charts
- [ ] ModerationActions assigns roles
- [ ] StatusBadge displays statuses
- [ ] AuditLogTable shows logs
- [ ] BulkActionToolbar executes bulk actions
- [ ] FilterPanel filters data
- [ ] PaginationControls navigate pages

### Functionality
- [ ] User CRUD operations work
- [ ] Bulk user actions execute
- [ ] Topic CRUD operations work
- [ ] Bulk topic actions execute
- [ ] Document approval workflow functions
- [ ] Bulk document actions execute
- [ ] Assessment CRUD operations work
- [ ] Question builder creates questions
- [ ] Analytics data displays correctly
- [ ] Settings save and apply
- [ ] Audit logs record actions
- [ ] Data exports generate files

### Security
- [ ] Admin routes protected by authentication
- [ ] Role-based access control enforced
- [ ] Unauthorized access redirects
- [ ] CSRF tokens on mutations
- [ ] Input validation on all forms
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] Audit trail captures all actions

### Accessibility
- [ ] Keyboard navigation works throughout
- [ ] Screen readers can navigate admin
- [ ] ARIA labels present on interactive elements
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Form labels associated with inputs
- [ ] Error messages accessible
- [ ] Skip links functional

### Responsive
- [ ] Desktop layout optimal (> 1024px)
- [ ] Tablet layout functional (640-1024px)
- [ ] Mobile layout usable (< 640px)
- [ ] Sidebar responsive
- [ ] Tables adapt to screen size
- [ ] Forms usable on all devices
- [ ] Touch targets adequate (44px minimum)

### Performance
- [ ] Dashboard loads in < 2 seconds
- [ ] Tables paginate efficiently
- [ ] Charts render smoothly
- [ ] Bulk operations show progress
- [ ] Optimistic updates implemented
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] Caching configured

### Testing
- [ ] Unit tests for components
- [ ] Integration tests for workflows
- [ ] E2E tests for critical paths
- [ ] Accessibility tests pass
- [ ] Cross-browser testing complete
- [ ] Performance benchmarks met

### Documentation
- [ ] Component documentation complete
- [ ] API documentation up to date
- [ ] User guide for admins written
- [ ] Changelog updated
- [ ] CURRENT_PHASE.md updated
