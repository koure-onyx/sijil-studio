# Sijil — Frontend Execution: Component Registry

**Generated:** 2026-06-27
**Source:** `docs/frontend-discovery/09-component-inventory.md`
**Total Components:** 94

---

## Overview

This registry documents every reusable component required for the Sijil frontend. Each component is traceable to its source in the discovery documents and mapped to its usage locations.

---

## Category 1: Layout Components (5 total)

### 1.1 MainLayout
| Attribute | Value |
|-----------|-------|
| **Purpose** | Root layout wrapper for all pages |
| **Children** | Header, Footer, Page Content |
| **Props** | `children: ReactNode`, `variant?: "default" \| "admin"` |
| **Where Used** | All pages (via App Router layouts) |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | Header, Footer, Container |
| **State** | None |

### 1.2 AdminLayout
| Attribute | Value |
|-----------|-------|
| **Purpose** | Layout for admin pages with sidebar navigation |
| **Children** | AdminSidebar, Header, Content |
| **Props** | `children: ReactNode` |
| **Where Used** | All `/admin/*` routes |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | AdminSidebar, Header |
| **State** | None |
| **Auth Required** | Yes (admin role) |

### 1.3 Container
| Attribute | Value |
|-----------|-------|
| **Purpose** | Max-width content container |
| **Props** | `size?: "sm" \| "md" \| "lg" \| "xl" \| "full"`, `centered?: boolean` |
| **Where Used** | All pages |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | None (primitive) |

### 1.4 Grid
| Attribute | Value |
|-----------|-------|
| **Purpose** | Responsive grid system |
| **Props** | `columns?: number`, `gap?: spacingValue` |
| **Where Used** | Document list, Subject browse, Search results |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | None (primitive) |

### 1.5 Stack
| Attribute | Value |
|-----------|-------|
| **Purpose** | Vertical/horizontal flex stack |
| **Props** | `orientation?: "vertical" \| "horizontal"`, `gap?: spacingValue`, `align?: string`, `justify?: string` |
| **Where Used** | Throughout application |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | None (primitive) |

---

## Category 2: Navigation Components (8 total)

### 2.1 Header
| Attribute | Value |
|-----------|-------|
| **Purpose** | Global header with logo, search, navigation |
| **APIs** | `/api/search/suggest` (autocomplete) |
| **Props** | `user?: User`, `onSearch?: (query: string) => void` |
| **Where Used** | All pages (MainLayout, AdminLayout) |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | SearchBar, Logo, BrowseDropdown |

### 2.2 Footer
| Attribute | Value |
|-----------|-------|
| **Purpose** | Global footer with links |
| **Props** | `links?: Array<{label: string, href: string}>` |
| **Where Used** | All pages (MainLayout) |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | None |

### 2.3 Breadcrumb
| Attribute | Value |
|-----------|-------|
| **Purpose** | Hierarchical navigation trail |
| **Data Source** | `seo.breadcrumb` array from topic/document metadata |
| **Props** | `items: Array<{label: string, href: string}>` |
| **Where Used** | Document detail, Topic pages |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | None |

### 2.4 Sidebar
| Attribute | Value |
|-----------|-------|
| **Purpose** | Topic page sidebar with TOC and related topics |
| **Props** | `tocItems: TOCItem[]`, `relatedTopics: Topic[]`, `exportAction?: () => void` |
| **Where Used** | Topic pages (right sidebar) |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | ExportButton, ShareButton |

### 2.5 TabNavigation
| Attribute | Value |
|-----------|-------|
| **Purpose** | Tabbed navigation within pages |
| **Props** | `tabs: Tab[]`, `activeTab: string`, `onChange: (tab: string) => void` |
| **Where Used** | Topic page (Content/Assets/Assessments tabs) |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | None |

### 2.6 Pagination
| Attribute | Value |
|-----------|-------|
| **Purpose** | Paginated list navigation |
| **Props** | `currentPage: number`, `totalPages: number`, `totalItems: number`, `onPageChange: (page: number) => void` |
| **Where Used** | Document list, Search results |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | None |

### 2.7 MobileMenu
| Attribute | Value |
|-----------|-------|
| **Purpose** | Hamburger menu for mobile |
| **Props** | `isOpen: boolean`, `onClose: () => void`, `navItems: NavItem[]` |
| **Where Used** | Header (mobile breakpoint) |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | Drawer |

### 2.8 BottomTabBar
| Attribute | Value |
|-----------|-------|
| **Purpose** | Mobile bottom navigation |
| **Props** | `activeTab: string`, `onTabChange: (tab: string) => void`, `tabs: Tab[]` |
| **Where Used** | Mobile views (<768px) |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | None |

---

## Category 3: Content Display Components (18 total)

### 3.1 BlockRenderer
| Attribute | Value |
|-----------|-------|
| **Purpose** | Polymorphic renderer for 17 content block types |
| **Data Source** | `content_blocks` array from `/api/topics/:id/content` |
| **Props** | `blocks: ContentBlock[]`, `options?: RenderOptions` |
| **Where Used** | Topic pages |
| **Source** | `09-component-inventory.md` |
| **Dependencies** | All 17 block type components |
| **Block Types** | Heading, Paragraph, Formula, Figure, Table, Callout, MCQ, Example, List, Definition, LearningOutcomes, ComparisonView, QuranVerse, QuranReference, Activity, Equation, Numerical |

### 3.2 HeadingBlock
| Attribute | Value |
|-----------|-------|
| **Props** | `level: 1-6`, `text: string`, `slugAnchor?: string` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.3 ParagraphBlock
| Attribute | Value |
|-----------|-------|
| **Props** | `html: string`, `containsFormula?: boolean`, `keyTerms?: string[]` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.4 FormulaBlock
| Attribute | Value |
|-----------|-------|
| **Purpose** | Render LaTeX formula with variables |
| **Dependencies** | KaTeX library |
| **Props** | `formulaId: string`, `name: string`, `latex: string`, `text: string`, `variables?: string[]`, `formulaType?: string` |
| **Where Used** | BlockRenderer, FormulaCard |
| **Source** | `09-component-inventory.md` |

### 3.5 FigureBlock
| Attribute | Value |
|-----------|-------|
| **Purpose** | Display figure with multiple render strategies |
| **Props** | `figureNumber?: string`, `caption?: string`, `alt?: string`, `imageUrl?: string`, `renderStrategy: "image" \| "svg" \| "animation" \| "3d"`, `svgCode?: string`, `hasLabels?: boolean` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.6 TableBlock
| Attribute | Value |
|-----------|-------|
| **Purpose** | Render data table or chart |
| **Props** | `tableNumber?: string`, `caption?: string`, `headers: string[]`, `rows: string[][]`, `renderAs: "styled-table" \| "chart" \| "infographic"` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.7 CalloutBlock
| Attribute | Value |
|-----------|-------|
| **Purpose** | Highlight boxes (note, warning, tip, etc.) |
| **Props** | `variant: "note" \| "warning" \| "tip" \| "info"`, `title?: string`, `text: string`, `icon?: ReactNode` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.8 MCQBlock
| Attribute | Value |
|-----------|-------|
| **Purpose** | Interactive multiple choice question |
| **Props** | `mcqId: string`, `questionText: string`, `options: MCQOption[]`, `correctAnswer: "a" \| "b" \| "c" \| "d"`, `explanation?: string`, `difficulty: "easy" \| "medium" \| "hard"` |
| **Where Used** | BlockRenderer, Assessment pages |
| **Source** | `09-component-inventory.md` |

### 3.9 ExampleBlock
| Attribute | Value |
|-----------|-------|
| **Props** | `exampleNumber?: string`, `title?: string`, `problemText: string`, `solutionSteps: string[]`, `finalAnswer: string` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.10 ListBlock
| Attribute | Value |
|-----------|-------|
| **Props** | `listType: "ordered" \| "unordered"`, `items: string[]` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.11 DefinitionBlock
| Attribute | Value |
|-----------|-------|
| **Props** | `term: string`, `definitionText: string` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.12 LearningOutcomesBlock
| Attribute | Value |
|-----------|-------|
| **Props** | `outcomes: string[]` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.13 ComparisonViewBlock
| Attribute | Value |
|-----------|-------|
| **Props** | `headers: string[]`, `rows: ComparisonRow[]`, `designHint?: string` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.14 QuranVerseBlock
| Attribute | Value |
|-----------|-------|
| **Props** | `surah: number`, `ayah: number`, `urduTranslation: string`, `wordAlignments?: WordAlignment[]` |
| **Where Used** | BlockRenderer, Quran pages |
| **Source** | `09-component-inventory.md` |

### 3.15 QuranReferenceBlock
| Attribute | Value |
|-----------|-------|
| **Props** | `surah: number`, `ayahStart: number`, `ayahEnd: number`, `curriculumId?: string` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.16 ActivityBlock
| Attribute | Value |
|-----------|-------|
| **Props** | `title: string`, `activityType: string`, `apparatus: string[]`, `procedureSteps: string[]`, `precautions?: string[]` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.17 EquationBlock
| Attribute | Value |
|-----------|-------|
| **Props** | `latex: string`, `text: string` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

### 3.18 NumericalBlock
| Attribute | Value |
|-----------|-------|
| **Props** | `problemText: string`, `given: string`, `required: string`, `solutionSteps: string[]`, `finalAnswer: string` |
| **Where Used** | BlockRenderer |
| **Source** | `09-component-inventory.md` |

---

## Category 4: Card Components (7 total)

### 4.1 DocumentCard
| Attribute | Value |
|-----------|-------|
| **Purpose** | Display document summary in lists |
| **Data Source** | `/api/documents` response |
| **Props** | `document: {id, title, subject, grade, type, topicCount}` |
| **Where Used** | Document list, Subject detail |
| **Source** | `09-component-inventory.md` |

### 4.2 TopicCard
| Attribute | Value |
|-----------|-------|
| **Purpose** | Display topic preview |
| **Props** | `topic: {id, title, slug, difficulty, formulaCount, mcqCount}` |
| **Where Used** | Document detail, Related topics |
| **Source** | `09-component-inventory.md` |

### 4.3 SearchResultCard
| Attribute | Value |
|-----------|-------|
| **Purpose** | Display search result with snippets |
| **Data Source** | `/api/search` response |
| **Props** | `result: {title, snippet, badges, url}` |
| **Where Used** | Search results page |
| **Source** | `09-component-inventory.md` |

### 4.4 FormulaCard
| Attribute | Value |
|-----------|-------|
| **Purpose** | Display formula with LaTeX preview |
| **Data Source** | `/api/search/formulas` response |
| **Props** | `formula: {name, latex, variables, sourceTopic}` |
| **Actions** | Copy LaTeX, Navigate to source |
| **Where Used** | Formula search results |
| **Source** | `09-component-inventory.md` |

### 4.5 SubjectCard
| Attribute | Value |
|-----------|-------|
| **Purpose** | Display subject area |
| **Props** | `subject: {name, documentCount, icon}` |
| **Where Used** | Homepage, Subject browse |
| **Source** | `09-component-inventory.md` |

### 4.6 StatCard
| Attribute | Value |
|-----------|-------|
| **Purpose** | Display statistics on dashboard |
| **Props** | `label: string`, `value: string | number`, `trend?: string`, `icon?: ReactNode` |
| **Where Used** | Admin dashboard, Homepage |
| **Source** | `09-component-inventory.md` |

### 4.7 RecentArrivalCard
| Attribute | Value |
|-----------|-------|
| **Props** | `topic: {title, addedDate, subject, grade}` |
| **Where Used** | Homepage |
| **Source** | `09-component-inventory.md` |

---

## Category 5: Form Components (10 total)

### 5.1 SearchBar
| Attribute | Value |
|-----------|-------|
| **Purpose** | Global search input with autocomplete |
| **APIs** | `/api/search/suggest` |
| **Props** | `placeholder?: string`, `onSearch: (query: string) => void`, `debounceMs?: number`, `showSuggestions?: boolean` |
| **Where Used** | Header, Search page |
| **Source** | `09-component-inventory.md` |

### 5.2 FilterPanel
| Attribute | Value |
|-----------|-------|
| **Purpose** | Faceted search filters |
| **Props** | `filters: FilterConfig[]`, `onFilterChange: (filters: Filters) => void`, `values: Filters` |
| **Where Used** | Search page, Document list |
| **Source** | `09-component-inventory.md` |

### 5.3 JsonEditor
| Attribute | Value |
|-----------|-------|
| **Purpose** | Code editor for JSON ingestion |
| **Dependencies** | Monaco Editor or CodeMirror |
| **Props** | `value: string`, `onChange: (value: string) => void`, `readOnly?: boolean`, `schema?: JSONSchema` |
| **Where Used** | Admin ingestion page |
| **Source** | `09-component-inventory.md` |

### 5.4 Select
| Attribute | Value |
|-----------|-------|
| **Props** | `options: SelectOption[]`, `value?: string | string[]`, `onChange: (value: string | string[]) => void`, `placeholder?: string`, `multiple?: boolean` |
| **Where Used** | Forms throughout app |
| **Source** | `09-component-inventory.md` |

### 5.5 Input
| Attribute | Value |
|-----------|-------|
| **Props** | `type?: string`, `value: string`, `onChange: (e: ChangeEvent) => void`, `placeholder?: string`, `error?: string` |
| **Where Used** | Forms throughout app |
| **Source** | `09-component-inventory.md` |

### 5.6 TextArea
| Attribute | Value |
|-----------|-------|
| **Props** | `value: string`, `onChange: (e: ChangeEvent) => void`, `rows?: number`, `placeholder?: string` |
| **Where Used** | Forms throughout app |
| **Source** | `09-component-inventory.md` |

### 5.7 Checkbox
| Attribute | Value |
|-----------|-------|
| **Props** | `checked: boolean`, `onChange: (checked: boolean) => void`, `label?: string` |
| **Where Used** | Forms throughout app |
| **Source** | `09-component-inventory.md` |

### 5.8 RadioGroup
| Attribute | Value |
|-----------|-------|
| **Props** | `options: RadioOption[]`, `value: string`, `onChange: (value: string) => void` |
| **Where Used** | Forms throughout app |
| **Source** | `09-component-inventory.md` |

### 5.9 DatePicker
| Attribute | Value |
|-----------|-------|
| **Props** | `value?: Date`, `onChange: (date: Date) => void`, `range?: boolean` |
| **Where Used** | Admin forms |
| **Source** | `09-component-inventory.md` |

### 5.10 FileUpload
| Attribute | Value |
|-----------|-------|
| **Props** | `accept?: string`, `onUpload: (files: File[]) => void`, `multiple?: boolean` |
| **Where Used** | Ingestion form, Batch import |
| **Source** | `09-component-inventory.md` |

---

## Category 6: Feedback Components (8 total)

### 6.1 Spinner
| Attribute | Value |
|-----------|-------|
| **Purpose** | Loading indicator |
| **Props** | `size?: "sm" \| "md" \| "lg"`, `color?: string` |
| **Where Used** | Loading states throughout app |
| **Source** | `09-component-inventory.md` |

### 6.2 ProgressBar
| Attribute | Value |
|-----------|-------|
| **Purpose** | Progress indication |
| **Props** | `value: number`, `max: number`, `label?: string`, `showStripes?: boolean` |
| **Where Used** | Import status, Export status |
| **Source** | `09-component-inventory.md` |

### 6.3 MultiStageProgress
| Attribute | Value |
|-----------|-------|
| **Purpose** | Multi-stage progress dashboard (import) |
| **Stages** | SCANNING, VALIDATING, IMPORTING, INDEXING |
| **Props** | `stages: Array<{name: string, status: string, progress: number}>` |
| **Where Used** | Import status page |
| **Source** | `09-component-inventory.md` |

### 6.4 Alert
| Attribute | Value |
|-----------|-------|
| **Purpose** | Status messages |
| **Props** | `variant: "info" \| "success" \| "warning" \| "error"`, `title?: string`, `message: string`, `dismissible?: boolean` |
| **Where Used** | Forms, Error states |
| **Source** | `09-component-inventory.md` |

### 6.5 Toast
| Attribute | Value |
|-----------|-------|
| **Purpose** | Temporary notifications |
| **Props** | `message: string`, `variant: "info" \| "success" \| "warning" \| "error"`, `duration?: number`, `onDismiss: () => void` |
| **Where Used** | Global notifications |
| **Source** | `09-component-inventory.md` |

### 6.6 Modal
| Attribute | Value |
|-----------|-------|
| **Purpose** | Overlay dialog |
| **Props** | `isOpen: boolean`, `onClose: () => void`, `title?: string`, `children: ReactNode`, `size?: "sm" \| "md" \| "lg"` |
| **Where Used** | Export modal, Confirmations |
| **Source** | `09-component-inventory.md` |

### 6.7 EmptyState
| Attribute | Value |
|-----------|-------|
| **Purpose** | No results/content placeholder |
| **Props** | `icon?: ReactNode`, `title: string`, `message: string`, `action?: ReactNode` |
| **Where Used** | Search no results, Empty lists |
| **Source** | `09-component-inventory.md` |

### 6.8 ErrorBoundary
| Attribute | Value |
|-----------|-------|
| **Purpose** | Catch and display errors |
| **Props** | `fallback?: ReactNode`, `onError?: (error: Error) => void` |
| **Where Used** | App root, Feature boundaries |
| **Source** | `09-component-inventory.md` |

---

## Category 7: Interactive Components (11 total)

### 7.1 ExportButton
| Attribute | Value |
|-----------|-------|
| **Purpose** | Trigger export job |
| **APIs** | `POST /api/exports`, `GET /api/exports/:id` |
| **Props** | `topicId: string`, `availableFormats?: string[]`, `onComplete?: (jobId: string) => void` |
| **Where Used** | Topic sidebar, Topic page |
| **Source** | `09-component-inventory.md` |

### 7.2 ExportModal
| Attribute | Value |
|-----------|-------|
| **Purpose** | Export format selection and progress |
| **Props** | `isOpen: boolean`, `topicId: string`, `onClose: () => void` |
| **Where Used** | Export trigger |
| **Source** | `09-component-inventory.md` |

### 7.3 ShareButton
| Attribute | Value |
|-----------|-------|
| **Purpose** | Social sharing |
| **Props** | `url: string`, `title: string`, `platforms?: string[]` |
| **Where Used** | Topic sidebar |
| **Source** | `09-component-inventory.md` |

### 7.4 CopyButton
| Attribute | Value |
|-----------|-------|
| **Purpose** | Copy to clipboard |
| **Props** | `text: string`, `onCopy?: () => void`, `tooltip?: string` |
| **Where Used** | Formula cards, Code blocks |
| **Source** | `09-component-inventory.md` |

### 7.5 LikeButton
| Attribute | Value |
|-----------|-------|
| **Props** | `liked: boolean`, `count: number`, `onToggle: () => void` |
| **Where Used** | Future feature (not in MVP) |
| **Source** | `09-component-inventory.md` |

### 7.6 Accordion
| Attribute | Value |
|-----------|-------|
| **Purpose** | Expandable sections |
| **Props** | `items: Array<{title: string, content: ReactNode}>`, `allowMultiple?: boolean` |
| **Where Used** | FAQ sections, Collapsible content |
| **Source** | `09-component-inventory.md` |

### 7.7 Tabs
| Attribute | Value |
|-----------|-------|
| **Props** | `tabs: Tab[]`, `activeTab: string`, `onChange: (tab: string) => void`, `children: ReactNode` |
| **Where Used** | Topic page variants |
| **Source** | `09-component-inventory.md` |

### 7.8 Tooltip
| Attribute | Value |
|-----------|-------|
| **Props** | `content: ReactNode`, `position?: "top" \| "bottom" \| "left" \| "right"`, `children: ReactNode` |
| **Where Used** | Icons, Buttons |
| **Source** | `09-component-inventory.md` |

### 7.9 Popover
| Attribute | Value |
|-----------|-------|
| **Props** | `content: ReactNode`, `trigger?: "click" \| "hover"`, `children: ReactNode` |
| **Where Used** | Help text, Additional info |
| **Source** | `09-component-inventory.md` |

### 7.10 Dropdown
| Attribute | Value |
|-----------|-------|
| **Props** | `trigger: ReactNode`, `menuItems: MenuItem[]`, `onSelect: (item: MenuItem) => void` |
| **Where Used** | Header browse menu, Action menus |
| **Source** | `09-component-inventory.md` |

### 7.11 Drawer
| Attribute | Value |
|-----------|-------|
| **Props** | `isOpen: boolean`, `onClose: () => void`, `side?: "left" \| "right"`, `children: ReactNode`, `size?: "sm" \| "md" \| "lg"` |
| **Where Used** | Mobile menu, Slide-over panels |
| **Source** | `09-component-inventory.md` |

---

## Category 8: Data Display Components (9 total)

### 8.1 DataTable
| Attribute | Value |
|-----------|-------|
| **Purpose** | Tabular data display |
| **Props** | `columns: Column[]`, `data: any[]`, `sortable?: boolean`, `pagination?: boolean` |
| **Where Used** | Admin dashboards |
| **Source** | `09-component-inventory.md` |

### 8.2 Badge
| Attribute | Value |
|-----------|-------|
| **Purpose** | Status/category indicator |
| **Props** | `variant: "default" \| "success" \| "warning" \| "error"`, `children: ReactNode`, `size?: "sm" \| "md"` |
| **Where Used** | Document cards, Search results |
| **Source** | `09-component-inventory.md` |

### 8.3 Tag
| Attribute | Value |
|-----------|-------|
| **Purpose** | Clickable tag/chip |
| **Props** | `label: string`, `onClick?: () => void`, `removable?: boolean` |
| **Where Used** | Search filters, Topic tags |
| **Source** | `09-component-inventory.md` |

### 8.4 Avatar
| Attribute | Value |
|-----------|-------|
| **Props** | `src?: string`, `alt?: string`, `size?: "sm" \| "md" \| "lg"`, `fallback?: string` |
| **Where Used** | User profiles (future) |
| **Source** | `09-component-inventory.md` |

### 8.5 Skeleton
| Attribute | Value |
|-----------|-------|
| **Purpose** | Loading placeholder |
| **Props** | `variant: "text" \| "circle" \| "rect"`, `width?: string`, `height?: string` |
| **Where Used** | Loading states |
| **Source** | `09-component-inventory.md` |

### 8.6 CodeBlock
| Attribute | Value |
|-----------|-------|
| **Purpose** | Syntax-highlighted code |
| **Props** | `code: string`, `language?: string`, `showLineNumbers?: boolean` |
| **Where Used** | Code examples |
| **Source** | `09-component-inventory.md` |

### 8.7 MarkdownRenderer
| Attribute | Value |
|-----------|-------|
| **Purpose** | Render markdown content |
| **Props** | `markdown: string`, `components?: MDXComponents` |
| **Where Used** | Documentation pages |
| **Source** | `09-component-inventory.md` |

### 8.8 LatexRenderer
| Attribute | Value |
|-----------|-------|
| **Purpose** | Render LaTeX math |
| **Dependencies** | KaTeX |
| **Props** | `latex: string`, `displayMode?: boolean` |
| **Where Used** | Formula blocks, Formula cards |
| **Source** | `09-component-inventory.md` |

### 8.9 ImageWithFallback
| Attribute | Value |
|-----------|-------|
| **Props** | `src: string`, `alt: string`, `fallbackSrc?: string`, `loading?: "lazy" \| "eager"` |
| **Where Used** | Figures, Document covers |
| **Source** | `09-component-inventory.md` |

---

## Category 9: Admin-Specific Components (8 total)

### 9.1 AdminDashboard
| Attribute | Value |
|-----------|-------|
| **Purpose** | Admin overview dashboard |
| **APIs** | `/api/utility/platform-stats`, recent jobs endpoints |
| **Props** | `stats: PlatformStats`, `recentImports: ImportBatch[]`, `recentIngists: IngestJob[]` |
| **Where Used** | `/admin` route |
| **Source** | `09-component-inventory.md` |

### 9.2 IngestionForm
| Attribute | Value |
|-----------|-------|
| **Purpose** | JSON submission form |
| **APIs** | `POST /api/ingest/json` |
| **Props** | `onSubmit: (json: string) => void`, `onValidate: (json: string) => ValidationResult` |
| **Where Used** | `/admin/ingest` route |
| **Source** | `09-component-inventory.md` |

### 9.3 JobStatusTracker
| Attribute | Value |
|-----------|-------|
| **Purpose** | Track job progress |
| **APIs** | Polling on status endpoint |
| **Props** | `trackingId: string`, `type: "ingest" \| "import" \| "export"` |
| **Where Used** | Ingestion status, Import status pages |
| **Source** | `09-component-inventory.md` |

### 9.4 ImportPreviewTable
| Attribute | Value |
|-----------|-------|
| **Purpose** | Show files to be imported |
| **Props** | `files: ImportFile[]`, `documentsFound: number`, `topicsFound: number` |
| **Where Used** | Batch import preview |
| **Source** | `09-component-inventory.md` |

### 9.5 ImportErrorLog
| Attribute | Value |
|-----------|-------|
| **Props** | `errors: Array<{file: string, error: string, line?: number}>` |
| **Where Used** | Batch import status |
| **Source** | `09-component-inventory.md` |

### 9.6 AnalyticsChart
| Attribute | Value |
|-----------|-------|
| **Purpose** | Display analytics data |
| **APIs** | `/api/utility/analytics/*` |
| **Props** | `data: ChartData`, `type: "line" \| "bar" \| "pie"`, `timeRange?: string` |
| **Where Used** | `/admin/analytics` route |
| **Source** | `09-component-inventory.md` |

### 9.7 VersionDiffViewer
| Attribute | Value |
|-----------|-------|
| **Purpose** | Show differences between versions |
| **Props** | `versionA: Version`, `versionB: Version`, `diff: DiffResult` |
| **Where Used** | Version history page |
| **Source** | `09-component-inventory.md` |

### 9.8 AuditLogTable
| Attribute | Value |
|-----------|-------|
| **Props** | `logs: AuditLog[]` |
| **Where Used** | Admin audit view |
| **Source** | `09-component-inventory.md` |

---

## Category 10: SEO Components (4 total)

### 10.1 MetaTags
| Attribute | Value |
|-----------|-------|
| **Purpose** | Inject meta tags for SEO |
| **Data Source** | `seo.meta_title`, `seo.meta_description` from API |
| **Props** | `title: string`, `description: string`, `keywords?: string[]`, `canonical?: string` |
| **Where Used** | All public pages |
| **Source** | `09-component-inventory.md` |

### 10.2 JsonLdScript
| Attribute | Value |
|-----------|-------|
| **Purpose** | Inject JSON-LD structured data |
| **APIs** | `/api/seo/topic/:id/jsonld` |
| **Props** | `data: JsonLdObject` |
| **Where Used** | Topic pages, Document pages |
| **Source** | `09-component-inventory.md` |

### 10.3 OpenGraphTags
| Attribute | Value |
|-----------|-------|
| **Props** | `title: string`, `description: string`, `image?: string`, `url: string`, `type?: string` |
| **Where Used** | All public pages |
| **Source** | `09-component-inventory.md` |

### 10.4 TwitterCardTags
| Attribute | Value |
|-----------|-------|
| **Props** | `card: "summary" \| "summary_large_image"`, `title: string`, `description: string`, `image?: string` |
| **Where Used** | All public pages |
| **Source** | `09-component-inventory.md` |

---

## Category 11: Utility Components (6 total)

### 11.1 ConditionalWrapper
| Attribute | Value |
|-----------|-------|
| **Purpose** | Conditionally wrap children |
| **Props** | `condition: boolean`, `wrapper: ComponentType`, `children: ReactNode` |
| **Where Used** | Dynamic layouts |
| **Source** | `09-component-inventory.md` |

### 11.2 DeferRender
| Attribute | Value |
|-----------|-------|
| **Purpose** | Lazy render after mount |
| **Props** | `children: ReactNode`, `delay?: number` |
| **Where Used** | Heavy components |
| **Source** | `09-component-inventory.md` |

### 11.3 Portal
| Attribute | Value |
|-----------|-------|
| **Purpose** | Render outside DOM hierarchy |
| **Props** | `children: ReactNode`, `container?: HTMLElement` |
| **Where Used** | Modals, Tooltips |
| **Source** | `09-component-inventory.md` |

### 11.4 ResizeObserver
| Attribute | Value |
|-----------|-------|
| **Purpose** | Detect element resize |
| **Props** | `onResize: (rect: DOMRect) => void`, `children: ReactNode` |
| **Where Used** | Responsive components |
| **Source** | `09-component-inventory.md` |

### 11.5 IntersectionObserver
| Attribute | Value |
|-----------|-------|
| **Purpose** | Detect visibility |
| **Props** | `onIntersect: (isIntersecting: boolean) => void`, `threshold?: number`, `children: ReactNode` |
| **Where Used** | Lazy loading, Analytics tracking |
| **Source** | `09-component-inventory.md` |

### 11.6 ErrorHandler
| Attribute | Value |
|-----------|-------|
| **Purpose** | Centralized error handling |
| **Props** | `onError: (error: Error) => void`, `children: ReactNode` |
| **Where Used** | App root, Feature boundaries |
| **Source** | `09-component-inventory.md` |

---

## Summary by Category

| Category | Component Count |
|----------|-----------------|
| Layout | 5 |
| Navigation | 8 |
| Content Display | 18 |
| Cards | 7 |
| Forms | 10 |
| Feedback | 8 |
| Interactive | 11 |
| Data Display | 9 |
| Admin | 8 |
| SEO | 4 |
| Utility | 6 |
| **Total** | **94** |

---

## Implementation Priority

### Phase 1 (Foundation)
- All Layout components (5)
- Core Navigation (Header, Footer, Breadcrumb) (3)
- Feedback components (Spinner, Alert, EmptyState, ErrorBoundary) (4)
- Utility components (6)
- **Subtotal: 18**

### Phase 2 (Core Content)
- BlockRenderer + all 17 block types (18)
- Card components (DocumentCard, TopicCard, SubjectCard) (3)
- Basic Form components (Input, Select, TextArea) (3)
- **Subtotal: 24**

### Phase 3 (Advanced Features)
- Search components (SearchBar, FilterPanel, SearchResultCard) (3)
- Interactive components (ExportButton, ExportModal, ShareButton, CopyButton) (4)
- Data Display components (DataTable, Badge, Tag, Skeleton) (4)
- **Subtotal: 11**

### Phase 4 (Admin)
- All Admin components (8)
- Advanced Form components (JsonEditor, FileUpload, DatePicker) (3)
- **Subtotal: 11**

### Phase 5 (SEO & Polish)
- All SEO components (4)
- Remaining Navigation (MobileMenu, BottomTabBar) (2)
- Remaining Interactive (Accordion, Tabs, Tooltip, Popover, Dropdown, Drawer) (6)
- Remaining Cards (FormulaCard, StatCard, RecentArrivalCard) (3)
- Remaining Feedback (ProgressBar, MultiStageProgress, Toast, Modal) (4)
- Remaining Data Display (CodeBlock, MarkdownRenderer, LatexRenderer, ImageWithFallback) (4)
- **Subtotal: 23**

---

## Traceability Matrix

All 94 components are traced to:
- **Source Document:** `docs/frontend-discovery/09-component-inventory.md`
- **Usage Locations:** Mapped in "Where Used" field
- **Dependencies:** Listed per component
- **APIs:** Referenced where applicable

No components invented; all derived from backend capabilities and discovery analysis.
