# Sijil — Frontend Execution: Data Models

**Generated:** 2026-06-27
**Source:** `docs/frontend-discovery/03-model-dictionary.md`
**Backend Schema Version:** 2.0.0

---

## Overview

This document defines all TypeScript interfaces that the frontend will use, mapped directly to backend MongoDB schemas. Each interface is traceable to its source model file.

---

## Core Entities

### Document

**Backend Model:** `src/models/document.model.js`
**Collection:** `documents`
**ID Prefix:** `doc_`

```typescript
interface Document {
  _id: string;                    // nanoid with prefix "doc_"
  title?: string;
  slug?: string;
  schema_version: string;         // default "2.0.0"
  schema_type: string;
  ingest_metadata?: {
    ingest_id: string;
    source_file_sha256?: string;
    status: "pending" | "processing" | "complete" | "error";
    zod_validation_passed: boolean;
  };
  document_metadata: {
    _id: string;
    document_id: string;
    title: string;
    subject?: string;
    subject_slug?: string;
    grade_numeric?: number;
    document_type?: string;
    language: string;             // default "english"
    script_direction: "ltr" | "rtl";
    access_control: {
      is_premium: boolean;
      allowed_roles: string[];    // default ["anonymous"]
    };
  };
  container?: {
    _id: string;
    container_type: string;       // default "chapter"
    number: number;
    title: string;
    slug: string;
  };
  topic_refs?: Array<{
    slug_global: string;
  }>;
  document_aggregates?: Record<string, unknown>;
  seo_master?: Record<string, unknown>;
  publishing: {
    status: "draft" | "processing" | "published";
  };
  version_control: {
    is_latest: boolean;
  };
  type_specific_data?: unknown;
  created_at: Date;
  updated_at: Date;
}
```

**Frontend Usage:**
- Document list page
- Document detail page
- Subject browse pages
- Search results

**APIs:**
- `GET /api/documents`
- `GET /api/documents/:id`
- `GET /api/documents/:id/aggregates`

---

### Topic

**Backend Model:** `src/models/topic.model.js`
**Collection:** `topics`
**ID Prefix:** `top_`

```typescript
interface Topic {
  _id: string;                    // nanoid with prefix "top_"
  document_id: string;
  chapter_id: string;
  parent_topic_id?: string | null;
  title: string;
  title_vernacular: string;
  slug: string;
  slug_global: string;            // unique indexed
  url_path: string;
  section_number?: string;
  display_order: number;
  topic_type: "content" | "exercise" | "intro" | "summary" | "quran";
  difficulty: "easy" | "medium" | "hard";
  difficulty_score: number;       // min 0, max 1
  estimated_read_time_minutes?: number;
  bloom_level?: string;
  subject?: string;
  grade_numeric?: number;
  language: string;
  locale: string;
  publishing_status: "draft" | "processing" | "published";
  keywords?: string[];
  key_terms_preview?: string[];
  formula_count: number;
  figure_count: number;
  mcq_count: number;
  has_interactive: boolean;
  source_page_start?: number;
  source_page_end?: number;
  seo: {
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    breadcrumb?: Array<{
      label: string;
      href: string;
    }>;
  };
  geo?: Record<string, unknown>;
  design_meta: {
    layout_template: "standard" | "two-col" | "formula-heavy" | "image-heavy" | "comparison";
  };
  is_latest: boolean;
  is_archived: boolean;
  archived_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}
```

**Frontend Usage:**
- Topic pages
- Search results
- Related topics
- Navigation

**APIs:**
- `GET /api/topics/slug/:slug`
- `GET /api/topics/:id`
- `GET /api/topics/:id/page`

---

### TopicContent

**Backend Model:** `src/models/topicContent.model.js`
**Collection:** `topic_content`

```typescript
interface TopicContent {
  _id: string;
  topic_id: string;
  document_id: string;
  raw_text?: string;
  clean_html?: string;
  content_blocks: ContentBlock[];
  formulas?: Array<{
    formula_id: string;
    latex?: string;
  }>;
  key_terms?: Array<{
    term: string;
    definition: string;
  }>;
  examples?: Example[];
  callouts?: Callout[];
  ai_answer_hub?: Array<{
    question: string;
    answer: string;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  entity_extraction?: Record<string, unknown>;
  downloadable_outputs?: Record<string, unknown>;
  source_citations?: Array<{
    type: string;
    reference: string;
  }>;
  quran_data?: {
    surah: number;
    ayah: number;
    urdu_translation: string;
    word_alignments?: unknown[];
  } | null;
  created_at: Date;
  updated_at: Date;
}
```

**Frontend Usage:**
- BlockRenderer input
- Formula extraction
- Key terms display

**APIs:**
- `GET /api/topics/:id/content`

---

## Content Blocks (17 Types)

### Base ContentBlock Type

```typescript
type ContentBlock = 
  | HeadingBlock
  | ParagraphBlock
  | FormulaBlock
  | FigureBlock
  | TableBlock
  | CalloutBlock
  | MCQBlock
  | ExampleBlock
  | ListBlock
  | DefinitionBlock
  | LearningOutcomesBlock
  | ComparisonViewBlock
  | QuranVerseBlock
  | QuranReferenceBlock
  | ActivityBlock
  | EquationBlock
  | NumericalBlock;
```

### Individual Block Types

```typescript
interface HeadingBlock {
  block_type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  slug_anchor?: string;
}

interface ParagraphBlock {
  block_type: "paragraph";
  html: string;
  contains_formula?: boolean;
  key_terms?: string[];
}

interface FormulaBlock {
  block_type: "formula";
  formula_id: string;
  name: string;
  latex: string;
  text: string;
  variables?: string[];
  formula_type?: string;
}

interface FigureBlock {
  block_type: "figure";
  figure_number?: string;
  caption?: string;
  alt?: string;
  image_url?: string;
  render_strategy: "image" | "svg" | "animation" | "3d";
  svg_code?: string;
  has_labels?: boolean;
}

interface TableBlock {
  block_type: "table";
  table_number?: string;
  caption?: string;
  headers: string[];
  rows: string[][];
  render_as: "styled-table" | "chart" | "infographic";
}

interface CalloutBlock {
  block_type: "callout";
  variant: "note" | "warning" | "tip" | "info";
  title?: string;
  text: string;
  icon?: string;
}

interface MCQBlock {
  block_type: "mcq";
  mcq_id: string;
  question_text: string;
  options: Array<{
    key: "a" | "b" | "c" | "d";
    text: string;
  }>;
  correct_answer: "a" | "b" | "c" | "d";
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
}

interface ExampleBlock {
  block_type: "example";
  example_number?: string;
  title?: string;
  problem_text: string;
  solution_steps: string[];
  final_answer: string;
}

interface ListBlock {
  block_type: "list";
  list_type: "ordered" | "unordered";
  items: string[];
}

interface DefinitionBlock {
  block_type: "definition";
  term: string;
  definition_text: string;
}

interface LearningOutcomesBlock {
  block_type: "learning_outcomes";
  outcomes: string[];
}

interface ComparisonViewBlock {
  block_type: "comparison_view";
  headers: string[];
  rows: Array<{
    label: string;
    values: string[];
  }>;
  design_hint?: string;
}

interface QuranVerseBlock {
  block_type: "quran_verse";
  surah: number;
  ayah: number;
  urdu_translation: string;
  word_alignments?: unknown[];
}

interface QuranReferenceBlock {
  block_type: "quran_reference";
  surah: number;
  ayah_start: number;
  ayah_end: number;
  curriculum_id?: string;
}

interface ActivityBlock {
  block_type: "activity";
  title: string;
  activity_type: string;
  apparatus: string[];
  procedure_steps: string[];
  precautions?: string[];
}

interface EquationBlock {
  block_type: "equation";
  latex: string;
  text: string;
}

interface NumericalBlock {
  block_type: "numerical";
  problem_text: string;
  given: string;
  required: string;
  solution_steps: string[];
  final_answer: string;
}
```

---

## Topic Assets

**Backend Model:** `src/models/topicAsset.model.js`
**Collection:** `topic_assets`

```typescript
interface TopicAssets {
  _id: string;
  topic_id: string;
  document_id: string;
  figures?: Array<{
    figure_number?: string;
    caption?: string;
    alt?: string;
    image_url?: string;
    render_strategy: "image" | "svg" | "animation" | "3d";
    svg_code?: string;
  }>;
  tables?: Array<{
    table_number?: string;
    caption?: string;
    headers: string[];
    rows: string[][];
    render_as: "styled-table" | "chart" | "infographic";
  }>;
  created_at: Date;
  updated_at: Date;
}
```

**APIs:**
- `GET /api/topics/:id/assets`

---

## Topic Assessments

**Backend Model:** `src/models/topicAssessment.model.js`
**Collection:** `topic_assessments`

```typescript
interface TopicAssessments {
  _id: string;
  topic_id: string;
  document_id: string;
  book_mcqs?: Array<{
    mcq_id: string;
    question_text: string;
    options: Array<{
      key: "a" | "b" | "c" | "d";
      text: string;
    }>;
    correct_answer: "a" | "b" | "c" | "d";
    explanation?: string;
    difficulty: "easy" | "medium" | "hard";
  }>;
  book_short_questions?: Array<{
    question_id: string;
    question_text: string;
    marks?: number;
  }>;
  book_problems?: Array<{
    problem_id: string;
    problem_text: string;
    solution_steps?: string[];
    final_answer?: string;
  }>;
  activities?: Array<{
    activity_id: string;
    title: string;
    activity_type: string;
    apparatus: string[];
    procedure_steps: string[];
    precautions?: string[];
  }>;
  flashcards?: Array<{
    card_id: string;
    front: string;
    back: string;
  }>;
  created_at: Date;
  updated_at: Date;
}
```

**APIs:**
- `GET /api/topics/:id/assessments`

---

## Formula Index

**Backend Model:** `src/models/formulaIndex.model.js`
**Collection:** `formula_index`

```typescript
interface FormulaIndex {
  _id: string;
  name?: string;
  latex?: string;
  text?: string;
  latex_normalized?: string;
  variables?: string[];
  topic_id: string;
  document_id?: string;
  subject?: string;
  grade?: number;
  created_at: Date;
}
```

**Frontend Usage:**
- Formula search results
- Formula cards

**APIs:**
- `GET /api/search/formulas`

---

## Export Jobs

**Backend Model:** `src/models/exportJob.model.js`
**Collection:** `export_jobs`
**ID Prefix:** `exp_`

```typescript
interface ExportJob {
  _id: string;                    // nanoid with prefix "exp_"
  topic_id: string;
  format: "formula_pack" | "mcq_pack" | "revision_pack" | "offline_html" | "flashcard_pack" | "topic_pack";
  status: "pending" | "processing" | "complete" | "error";
  output_url?: string;
  document_type?: string;
  package_url?: string;
  source_content_hash?: string;
  is_stale: boolean;
  attempts: number;
  error_log?: unknown[];
  created_at: Date;
  completed_at?: Date | null;
  updated_at: Date;
}
```

**Frontend Usage:**
- Export status tracking
- Download management

**APIs:**
- `POST /api/exports`
- `GET /api/exports/:id`
- `GET /api/export/download`

---

## Import Batch

**Backend Model:** `src/models/importBatch.model.js`
**Collection:** `import_batch`

```typescript
interface ImportBatch {
  batch_id: string;               // unique
  repo_url: string;
  repo_owner: string;
  repo_name: string;
  commit_sha: string;
  source_type: "book" | "textbook" | "sop" | "manual" | "research_paper";
  status: "PENDING" | "SCANNING" | "VALIDATING" | "READY" | "IMPORTING" | "COMPLETED" | "FAILED" | "PARTIAL_SUCCESS";
  total_documents: number;
  imported_documents: number;
  failed_documents: number;
  successful_files?: Array<{
    filename: string;
    documents_imported: number;
  }>;
  failed_files?: Array<{
    filename: string;
    error: string;
  }>;
  warnings?: Array<{
    message: string;
    file?: string;
  }>;
  errors?: Array<{
    message: string;
    file?: string;
    line?: number;
  }>;
  report?: unknown | null;
  progress: {
    scanning?: { status: string; progress: number };
    validating?: { status: string; progress: number };
    importing?: { status: string; progress: number };
    indexing?: { status: string; progress: number };
  };
  started_at?: Date | null;
  completed_at?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
```

**Frontend Usage:**
- Import status page
- Progress tracking

**APIs:**
- `POST /api/admin/import/preview`
- `POST /api/admin/import/start`
- `GET /api/admin/import/:batchId`

---

## Ingest Queue

**Backend Model:** `src/models/ingestQueue.model.js`
**Collection:** `ingest_queue`
**ID Prefix:** `ing_`

```typescript
interface IngestJob {
  _id: string;                    // nanoid with prefix "ing_"
  source_file_name: string;
  source_file_sha256: string;
  document_id?: string;
  bullmq_job_id?: string;
  status: "pending" | "processing" | "complete" | "error" | "duplicate";
  attempts: number;
  source?: string;
  processing_summary?: unknown;
  error_log?: unknown[];
  created_at: Date;
  updated_at: Date;
  completed_at?: Date | null;
  processing_time_seconds?: number;
}
```

**Frontend Usage:**
- Ingestion status tracking

**APIs:**
- `POST /api/ingest/json`
- `GET /api/ingest/:trackingId`

---

## Platform Stats

**Backend Model:** `src/models/platformStats.model.js`
**Collection:** `platform_stats`
**Singleton ID:** `global_stats`

```typescript
interface PlatformStats {
  _id: string;                    // always "global_stats"
  counts_by_type?: Record<string, number>;
  total_documents: number;
  total_topics: number;
  total_formulas: number;
  total_mcqs: number;
  total_assets: number;
  recent_arrivals?: Array<{
    topic_id: string;
    title: string;
    added_date: Date;
    subject: string;
    grade: number;
  }>;
  last_updated: Date;
  last_ingested_at?: Date | null;
}
```

**Frontend Usage:**
- Homepage stats widgets
- Admin dashboard

**APIs:**
- `GET /api/utility/platform-stats`

---

## Popular Topics

**Backend Model:** `src/models/popularTopic.model.js`
**Collection:** `popular_topics`

```typescript
interface PopularTopic {
  _id: string;
  topic_id: string;
  view_count: number;
  search_hit_count: number;
  last_30_days_views: number;
  created_at: Date;
  updated_at: Date;
}
```

**APIs:**
- `GET /api/utility/popular-topics`

---

## Popular Searches

**Backend Model:** `src/models/popularSearch.model.js`
**Collection:** `popular_searches`

```typescript
interface PopularSearch {
  _id: string;
  query: string;
  count: number;
  last_searched: Date;
  top_result_id?: string | null;
}
```

**APIs:**
- `GET /api/search/trending`

---

## Failed Searches

**Backend Model:** `src/models/failedSearch.model.js`
**Collection:** `failed_searches`

```typescript
interface FailedSearch {
  _id: string;
  query: string;
  count: number;
  last_searched: Date;
  created_at: Date;
}
```

**APIs:**
- `GET /api/utility/failed-searches`

---

## Quran Surahs

**Backend Model:** `src/models/quranSurah.model.js`
**Collection:** `quran_surahs`

```typescript
interface QuranSurah {
  surah_number: number;           // min 1, max 114
  name_arabic: string;
  name_english: string;
  name_urdu?: string;
  name_transliteration?: string;
  total_ayahs: number;
  revelation_type: "Meccan" | "Medinan";
  juz_start?: number;
  _seeded_at: Date;
  _source: string;                // "quran.com/api/v4"
}
```

**Frontend Usage:**
- Quran browser
- Surah selector

**APIs:**
- `GET /api/quran`
- `GET /api/quran/:surahNumber`

---

## Quran Ayahs

**Backend Model:** `src/models/quranAyah.model.js`
**Collection:** `quran_ayahs`

```typescript
interface QuranAyah {
  surah: number;                  // min 1, max 114
  ayah: number;                   // min 1
  text_uthmani: string;
  translation_ur?: string;
  translation_en?: string;
  juz?: number;
  page?: number;
  hizb?: number;
  ruku?: number;
  _seeded_at: Date;
  _source: string;                // "quran.com/api/v4"
}
```

**Frontend Usage:**
- Ayah display
- Translation toggle

**APIs:**
- `GET /api/quran/:surahNumber`
- `GET /api/quran/ayah/:surah/:ayah`

---

## Audit Log

**Backend Model:** `src/models/auditLog.model.js`
**Collection:** `auditlogs`

```typescript
interface AuditLog {
  _id: string;                    // ObjectId
  action: "IMPORT_PREVIEW" | "IMPORT_START" | "IMPORT_CANCEL" | "IMPORT_RETRY" | "INGEST_JSON" | "INGEST_CANCEL" | "INGEST_RETRY";
  admin_id?: string;              // default "bootstrap_admin"
  admin_email?: string | null;
  batch_id?: string | null;
  ingest_id?: string | null;
  document_id?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  input_data?: unknown | null;
  result: "success" | "failure" | "partial";
  error_message?: string | null;
  metadata?: unknown | null;
  createdAt: Date;
  updatedAt: Date;
}
```

**APIs:**
- Admin audit views

---

## Slug Registry

**Backend Model:** `src/models/slugRegistry.model.js`
**Collection:** `slug_registry`

```typescript
interface SlugRegistry {
  _id: string;
  slug: string;                   // unique
  slug_global?: string;
  document_id?: string;
  topic_id?: string | null;
  entity_type: "document" | "chapter" | "topic";
  url_path: string;
  title_normalized: string;
  created_at: Date;
  updated_at: Date;
}
```

**APIs:**
- `GET /api/utility/slug/resolve`

---

## Version

**Backend Model:** `src/models/version.model.js`
**Collection:** `versions`

```typescript
interface Version {
  scope: "document" | "topic";
  entity_id: string;
  document_id: string;
  version: string;
  parent_version_id?: string | null;
  diff_summary?: string;
  snapshot_ref?: string;
  timestamp: Date;
}
```

**APIs:**
- `GET /api/versions/:entityType/:entityId`

---

## Search Result

**Derived from API response structure**

```typescript
interface SearchResult {
  id: string;
  title: string;
  snippet?: string;
  url: string;
  badges?: Array<{
    label: string;
    variant: "subject" | "grade" | "difficulty";
  }>;
  score?: number;
  type: "topic" | "document" | "formula";
}
```

**APIs:**
- `GET /api/search`

---

## Search Suggestion

**Derived from API response structure**

```typescript
interface SearchSuggestion {
  query: string;
  count?: number;
}
```

**APIs:**
- `GET /api/search/suggest`

---

## Summary: Model-to-API Mapping

| Model | Primary APIs | Frontend Pages |
|-------|-------------|----------------|
| Document | `/api/documents`, `/api/documents/:id` | DocumentList, DocumentDetail |
| Topic | `/api/topics/slug/:slug`, `/api/topics/:id` | TopicPage |
| TopicContent | `/api/topics/:id/content` | BlockRenderer |
| TopicAssets | `/api/topics/:id/assets` | TopicPage |
| TopicAssessments | `/api/topics/:id/assessments` | Assessment views |
| FormulaIndex | `/api/search/formulas` | FormulaSearch |
| ExportJob | `/api/exports` | ExportModal, ExportStatus |
| ImportBatch | `/api/admin/import/*` | ImportStatus |
| IngestJob | `/api/ingest/*` | IngestionStatus |
| PlatformStats | `/api/utility/platform-stats` | Homepage, AdminDashboard |
| PopularTopic | `/api/utility/popular-topics` | Homepage |
| PopularSearch | `/api/search/trending` | Search page |
| FailedSearch | `/api/utility/failed-searches` | AdminAnalytics |
| QuranSurah | `/api/quran` | QuranBrowser |
| QuranAyah | `/api/quran/:surah` | QuranSurahPage |
| AuditLog | Admin endpoints | AdminAudit |
| SlugRegistry | `/api/utility/slug/resolve` | 404 handler |
| Version | `/api/versions/*` | VersionHistory |

---

## Traceability

All interfaces are derived from:
- **Source:** `docs/frontend-discovery/03-model-dictionary.md`
- **Backend Models:** `src/models/*.model.js`
- **Schema Version:** 2.0.0

No fields invented; all mapped from backend schemas.
