# Phase 06: Document Viewer - Implementation Specification

## Self-Contained Implementation Guide

This document contains everything needed to implement the Document Viewer phase. No external references required.

---

## 1. Routes and Pages

### 1.1 Document Detail Route

**File:** `app/documents/[id]/page.tsx`

```typescript
// Server Component
import { getDocument, getDocumentMetadata } from '@/lib/api/documents'
import { DocumentViewer } from '@/components/documents/DocumentViewer'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ section?: string; theme?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  try {
    const doc = await getDocument(id)
    return {
      title: `${doc.title} | Sijil`,
      description: doc.excerpt || `Read ${doc.title} on Sijil`,
      openGraph: {
        title: doc.title,
        description: doc.excerpt,
        type: 'article',
        publishedTime: doc.createdAt,
        authors: doc.authors?.map(a => a.name),
      },
    }
  } catch {
    return {}
  }
}

export default async function DocumentPage({ params, searchParams }: Props) {
  const { id } = await params
  const { section } = await searchParams
  
  try {
    const [document, metadata] = await Promise.all([
      getDocument(id),
      getDocumentMetadata(id),
    ])
    
    return (
      <DocumentViewer 
        document={document}
        metadata={metadata}
        initialSection={section}
      />
    )
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      notFound()
    }
    throw error
  }
}
```

### 1.2 Loading State

**File:** `app/documents/[id]/loading.tsx`

```tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function DocumentLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-6 w-1/2 mb-8" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-3/4 mb-8" />
          
          {[...Array(20)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full mb-2" />
          ))}
        </div>
        
        <div className="hidden lg:block">
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}
```

### 1.3 Error State

**File:** `app/documents/[id]/error.tsx`

```tsx
'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function DocumentError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
        <h2 className="text-2xl font-bold">Failed to load document</h2>
        <p className="text-muted-foreground">{error.message}</p>
        <Button onClick={reset}>Try Again</Button>
      </div>
    </div>
  )
}
```

---

## 2. Core Components

### 2.1 DocumentViewer Component

**File:** `components/documents/DocumentViewer.tsx`

```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Document, DocumentMetadata } from '@/types/document'
import { DocumentText } from './DocumentText'
import { DocumentMetadata as DocMetadata } from './DocumentMetadata'
import { TableOfContents } from './TableOfContents'
import { ReadingProgress } from './ReadingProgress'
import { FontControls } from './FontControls'
import { CitationTool } from './CitationTool'
import { useReadingSession } from '@/hooks/useReadingSession'

interface Props {
  document: Document
  metadata: DocumentMetadata
  initialSection?: string
}

export function DocumentViewer({ document, metadata, initialSection }: Props) {
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light')
  const [showTOC, setShowTOC] = useState(true)
  
  const { trackReading, updatePosition } = useReadingSession(document.id)
  
  // Restore scroll position on mount
  useEffect(() => {
    const savedPosition = localStorage.getItem(`doc-${document.id}-position`)
    if (savedPosition && !initialSection) {
      const position = parseInt(savedPosition, 10)
      setTimeout(() => {
        window.scrollTo({ top: position, behavior: 'auto' })
      }, 100)
    } else if (initialSection) {
      const element = document.getElementById(initialSection)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [document.id, initialSection])
  
  // Save scroll position periodically
  const handleScroll = useCallback(() => {
    const position = window.scrollY
    localStorage.setItem(`doc-${document.id}-position`, position.toString())
    updatePosition(position)
  }, [document.id, updatePosition])
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])
  
  // Track reading session start
  useEffect(() => {
    trackReading()
  }, [trackReading])
  
  const sections = document.sections || []
  
  return (
    <div className={`min-h-screen bg-background ${theme}`}>
      <ReadingProgress documentId={document.id} />
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold truncate">{document.title}</h1>
          
          <div className="flex items-center gap-2">
            <FontControls 
              fontSize={fontSize} 
              onFontSizeChange={setFontSize}
              theme={theme}
              onThemeChange={setTheme}
            />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTOC(!showTOC)}
              aria-label="Toggle table of contents"
            >
              <ListIcon className="w-5 h-5" />
            </Button>
            
            <CitationTool document={document} />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Text Content */}
          <div className="lg:col-span-3">
            <DocumentText 
              content={document.content}
              fontSize={fontSize}
              theme={theme}
              sections={sections}
            />
          </div>
          
          {/* Sidebar */}
          {showTOC && (
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                <TableOfContents 
                  sections={sections}
                  currentSection={null} // Will be updated on scroll
                />
                
                <DocMetadata metadata={metadata} />
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}
```

### 2.2 DocumentText Component

**File:** `components/documents/DocumentText.tsx`

```typescript
'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Section {
  id: string
  title: string
  level: number
  content?: string
}

interface Props {
  content: string
  fontSize: 'sm' | 'md' | 'lg'
  theme: 'light' | 'sepia' | 'dark'
  sections?: Section[]
}

const fontSizeClasses = {
  sm: 'prose-sm',
  md: 'prose-base',
  lg: 'prose-lg',
}

const themeClasses = {
  light: 'prose-invert-0',
  sepia: 'bg-[#f4ecd8] dark:bg-[#f4ecd8]',
  dark: 'dark:text-white',
}

export function DocumentText({ content, fontSize, theme, sections }: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  
  // Highlight current section based on scroll position
  useEffect(() => {
    if (!sections || sections.length === 0) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update active section state in parent
            const sectionId = entry.target.id
            // Could emit event or update context here
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })
    
    return () => observer.disconnect()
  }, [sections])
  
  return (
    <article
      ref={contentRef}
      className={cn(
        'prose prose-slate max-w-none',
        fontSizeClasses[fontSize],
        themeClasses[theme]
      )}
    >
      {/* Render content with proper semantic HTML */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}
```

### 2.3 TableOfContents Component

**File:** `components/documents/TableOfContents.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Section {
  id: string
  title: string
  level: number
}

interface Props {
  sections: Section[]
  currentSection?: string
}

export function TableOfContents({ sections, currentSection }: Props) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  
  useEffect(() => {
    if (currentSection) {
      setActiveSection(currentSection)
    }
  }, [currentSection])
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }
  
  return (
    <nav aria-label="Table of contents" className="space-y-2">
      <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
        Contents
      </h3>
      
      <ScrollArea className="h-[calc(100vh-20rem)]">
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  'block w-full text-left py-1 px-2 rounded-md text-sm transition-colors',
                  activeSection === section.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-muted'
                )}
                style={{ paddingLeft: `${(section.level - 1) * 12 + 8}px` }}
                aria-current={activeSection === section.id ? 'true' : undefined}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </nav>
  )
}
```

### 2.4 DocumentMetadata Component

**File:** `components/documents/DocumentMetadata.tsx`

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Calendar, User, Book, Tag } from 'lucide-react'

interface Metadata {
  authors?: Array<{ name: string; id: string }>
  createdAt: string
  updatedAt: string
  collection?: { id: string; name: string }
  topics?: Array<{ id: string; name: string }>
  language?: string
  wordCount?: number
  readingTime?: number
  version?: number
}

interface Props {
  metadata: Metadata
}

export function DocumentMetadata({ metadata }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Document Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Authors */}
        {metadata.authors && metadata.authors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Authors</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {metadata.authors.map((author) => (
                <Badge key={author.id} variant="secondary">
                  {author.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Collection */}
        {metadata.collection && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Book className="w-4 h-4" />
              <span>Collection</span>
            </div>
            <Badge variant="outline">{metadata.collection.name}</Badge>
          </div>
        )}
        
        {/* Topics */}
        {metadata.topics && metadata.topics.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="w-4 h-4" />
              <span>Topics</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {metadata.topics.map((topic) => (
                <Badge key={topic.id} variant="outline">
                  {topic.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Stats */}
        <div className="pt-4 border-t space-y-2 text-sm">
          {metadata.wordCount && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Words</span>
              <span className="font-medium">{metadata.wordCount.toLocaleString()}</span>
            </div>
          )}
          
          {metadata.readingTime && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reading time</span>
              <span className="font-medium">{metadata.readingTime} min</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Published</span>
            <span className="font-medium">
              {format(new Date(metadata.createdAt), 'MMM d, yyyy')}
            </span>
          </div>
          
          {metadata.version && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium">v{metadata.version}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
```

### 2.5 FontControls Component

**File:** `components/documents/FontControls.tsx`

```typescript
'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Type, Sun, Moon } from 'lucide-react'

interface Props {
  fontSize: 'sm' | 'md' | 'lg'
  onFontSizeChange: (size: 'sm' | 'md' | 'lg') => void
  theme: 'light' | 'sepia' | 'dark'
  onThemeChange: (theme: 'light' | 'sepia' | 'dark') => void
}

export function FontControls({ fontSize, onFontSizeChange, theme, onThemeChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      {/* Font Size */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Adjust font size">
            <Type className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onFontSizeChange('sm')}>
            Small
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFontSizeChange('md')}>
            Medium
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFontSizeChange('lg')}>
            Large
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Theme */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Change reading theme">
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onThemeChange('light')}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onThemeChange('sepia')}>
            Sepia
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onThemeChange('dark')}>
            Dark
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
```

### 2.6 ReadingProgress Component

**File:** `components/documents/ReadingProgress.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  documentId: string
}

export function ReadingProgress({ documentId }: Props) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(progress)
      
      // Save to localStorage for analytics
      localStorage.setItem(`doc-${documentId}-progress`, progress.toString())
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [documentId])
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
      <div
        className={cn(
          'h-full bg-primary transition-all duration-150 ease-out'
        )}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
    </div>
  )
}
```

### 2.7 CitationTool Component

**File:** `components/documents/CitationTool.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Quote, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Document } from '@/types/document'

interface Props {
  document: Document
}

export function CitationTool({ document }: Props) {
  const [copied, setCopied] = useState(false)
  
  const generateCitation = (style: 'apa' | 'mla' | 'chicago'): string => {
    const authors = document.authors?.map(a => a.name).join(', ') || 'Unknown'
    const year = new Date(document.createdAt).getFullYear()
    const title = document.title
    
    switch (style) {
      case 'apa':
        return `${authors} (${year}). ${title}. Sijil Digital Library.`
      case 'mla':
        return `${authors}. "${title}." Sijil Digital Library, ${year}.`
      case 'chicago':
        return `${authors}. "${title}." Sijil Digital Library, ${year}.`
      default:
        return ''
    }
  }
  
  const copyCitation = (style: 'apa' | 'mla' | 'chicago') => {
    const citation = generateCitation(style)
    navigator.clipboard.writeText(citation)
    setCopied(true)
    toast.success(`${style.toUpperCase()} citation copied!`)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Copy citation">
          <Quote className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => copyCitation('apa')}>
          Copy APA
          {copied && <Check className="w-4 h-4 ml-auto text-green-600" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCitation('mla')}>
          Copy MLA
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCitation('chicago')}>
          Copy Chicago
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## 3. Hooks

### 3.1 useReadingSession Hook

**File:** `hooks/useReadingSession.ts`

```typescript
import { useCallback, useRef } from 'react'
import { apiClient } from '@/lib/api/client'

export function useReadingSession(documentId: string) {
  const sessionId = useRef<string | null>(null)
  
  const trackReading = useCallback(async () => {
    try {
      const response = await apiClient.post('/analytics/read', {
        documentId,
        startedAt: new Date().toISOString(),
      })
      sessionId.current = response.sessionId
    } catch (error) {
      console.error('Failed to track reading session:', error)
    }
  }, [documentId])
  
  const updatePosition = useCallback(async (position: number) => {
    if (!sessionId.current) return
    
    try {
      await apiClient.patch(`/analytics/read/${sessionId.current}`, {
        currentPosition: position,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Failed to update reading position:', error)
    }
  }, [])
  
  const completeReading = useCallback(async () => {
    if (!sessionId.current) return
    
    try {
      await apiClient.post(`/analytics/read/${sessionId.current}/complete`, {
        completedAt: new Date().toISOString(),
      })
      sessionId.current = null
    } catch (error) {
      console.error('Failed to complete reading session:', error)
    }
  }, [])
  
  return { trackReading, updatePosition, completeReading }
}
```

---

## 4. API Integration

### 4.1 Document API Functions

**File:** `lib/api/documents.ts`

```typescript
import { apiClient } from './client'
import { Document, DocumentMetadata } from '@/types/document'

export async function getDocument(id: string): Promise<Document> {
  return apiClient.get(`/documents/${id}`)
}

export async function getDocumentMetadata(id: string): Promise<DocumentMetadata> {
  return apiClient.get(`/documents/${id}/metadata`)
}

export async function trackReadEvent(data: {
  documentId: string
  startedAt: string
}): Promise<{ sessionId: string }> {
  return apiClient.post('/analytics/read', data)
}

export async function updateReadingPosition(
  sessionId: string,
  position: number
): Promise<void> {
  return apiClient.patch(`/analytics/read/${sessionId}`, {
    currentPosition: position,
    timestamp: new Date().toISOString(),
  })
}
```

---

## 5. TypeScript Types

**File:** `types/document.ts`

```typescript
export interface Author {
  id: string
  name: string
  slug?: string
}

export interface Topic {
  id: string
  name: string
  slug: string
}

export interface Collection {
  id: string
  name: string
  slug: string
}

export interface Section {
  id: string
  title: string
  level: number
  content?: string
}

export interface Document {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  sections?: Section[]
  authors?: Author[]
  topics?: Topic[]
  collection?: Collection
  createdAt: string
  updatedAt: string
  publishedAt?: string
  language?: string
  status: 'draft' | 'published' | 'archived'
}

export interface DocumentMetadata {
  wordCount?: number
  readingTime?: number
  version?: number
  authors?: Author[]
  collection?: Collection
  topics?: Topic[]
  createdAt: string
  updatedAt: string
  language?: string
}
```

---

## 6. Styling

### 6.1 Print Styles

**File:** `styles/print.css`

```css
@media print {
  /* Hide non-essential elements */
  header, footer, aside, nav, button {
    display: none !important;
  }
  
  /* Optimize text for printing */
  article {
    font-size: 12pt;
    line-height: 1.6;
    max-width: none;
  }
  
  /* Remove background colors */
  * {
    background: transparent !important;
    color: black !important;
    box-shadow: none !important;
  }
  
  /* Ensure page breaks are handled well */
  h1, h2, h3 {
    page-break-after: avoid;
  }
  
  section {
    page-break-inside: avoid;
  }
}
```

### 6.2 Theme Classes

Add to `globals.css`:

```css
/* Reading themes */
.reading-theme-light {
  --background: #ffffff;
  --foreground: #1a1a1a;
}

.reading-theme-sepia {
  --background: #f4ecd8;
  --foreground: #5b4636;
}

.reading-theme-dark {
  --background: #1a1a1a;
  --foreground: #e5e5e5;
}
```

---

## 7. Accessibility Requirements

1. **ARIA Labels:**
   - All interactive elements must have `aria-label`
   - Table of contents must have `aria-label="Table of contents"`
   - Progress bar must have `role="progressbar"` with value attributes

2. **Keyboard Navigation:**
   - All controls accessible via Tab key
   - Enter/Space activates buttons
   - Arrow keys navigate TOC when focused

3. **Screen Reader Support:**
   - Semantic HTML structure (article, section, nav)
   - Proper heading hierarchy (h1 → h2 → h3)
   - Skip links to main content

4. **Focus Management:**
   - Visible focus indicators on all interactive elements
   - Focus trapped in modals/dialogs
   - Focus returned after closing dialogs

---

## 8. Responsive Behavior

| Breakpoint | Layout | Features |
|------------|--------|----------|
| Mobile (< 768px) | Single column | Collapsible TOC, simplified metadata |
| Tablet (768px - 1024px) | Two columns | TOC sidebar, full metadata |
| Desktop (> 1024px) | Three columns | TOC, metadata, wider text area |

**Mobile-Specific:**
- TOC in drawer/modal instead of sidebar
- Metadata in collapsible accordion
- Larger touch targets (44px minimum)
- Swipe gestures for navigation (optional)

---

## 9. Performance Optimizations

1. **Virtual Scrolling:** For documents > 50k words, implement virtual scrolling
2. **Lazy Loading:** Load sections below fold lazily
3. **Image Optimization:** Use Next.js Image component for any images
4. **Code Splitting:** Split heavy components (TOC, metadata) into separate chunks
5. **Caching:** Cache document content in React Query with stale-time: 300000 (5 min)
6. **Debounced Scroll:** Debounce scroll position saves (200ms)

---

## 10. Error Handling

1. **Document Not Found:** Show 404 page with suggestion to browse topics
2. **API Failure:** Show error state with retry button
3. **Partial Load:** Show available content with warning about missing sections
4. **Network Loss:** Show offline banner with cached content indicator

---

## 11. SEO Implementation

```typescript
// In page.tsx generateMetadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const doc = await getDocument(params.id)
  
  return {
    title: `${doc.title} | Sijil`,
    description: doc.excerpt,
    openGraph: {
      title: doc.title,
      description: doc.excerpt,
      type: 'article',
      publishedTime: doc.createdAt,
      authors: doc.authors?.map(a => a.name),
      images: [], // Add if document has cover image
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: doc.excerpt,
    },
  }
}
```

---

## 12. Folder Structure Changes

```
app/
  documents/
    [id]/
      page.tsx           # New
      loading.tsx        # New
      error.tsx          # New
      not-found.tsx      # New (if not exists)

components/
  documents/             # New directory
    DocumentViewer.tsx   # New
    DocumentText.tsx     # New
    DocumentMetadata.tsx # New
    TableOfContents.tsx  # New
    FontControls.tsx     # New
    ReadingProgress.tsx  # New
    CitationTool.tsx     # New

hooks/
  useReadingSession.ts   # New

lib/
  api/
    documents.ts         # New

types/
  document.ts            # New

styles/
  print.css              # New
```

---

## 13. Environment Variables

No new environment variables required for this phase.

---

## 14. Testing Requirements

See `tests.md` for complete manual verification checklist.

Key areas:
- Document loads correctly
- Typography is readable at all sizes
- TOC navigation works smoothly
- Scroll position persists across sessions
- Citation copying functions correctly
- Mobile layout is usable
- Keyboard navigation complete
- Screen reader compatibility

---

## 15. Acceptance Criteria Summary

Implementation is complete when ALL criteria in `acceptance.md` pass:

✓ Document renders with correct content
✓ All 8 components implemented
✓ 3 font sizes functional
✓ 3 themes working
✓ TOC navigation smooth
✓ Scroll position persists
✓ Citations copy correctly
✓ Responsive on all breakpoints
✓ Accessibility audit passes
✓ Performance metrics met
✓ No mocked data used
✓ All APIs connected
✓ Error states handled
✓ Loading states implemented
✓ Print styles applied
✓ TypeScript strict mode passes
✓ Lint passes
✓ Build succeeds

---

## 16. Common Mistakes to Avoid

1. ❌ Using `dangerouslySetInnerHTML` without sanitization
   ✅ Sanitize HTML content before rendering

2. ❌ Saving scroll position too frequently (performance hit)
   ✅ Debounce scroll saves (200ms minimum)

3. ❌ Hardcoding font sizes in pixels
   ✅ Use Tailwind's prose classes

4. ❌ Ignoring mobile TOC experience
   ✅ Implement drawer/modal for mobile

5. ❌ Not handling very long documents
   ✅ Implement virtual scrolling for >50k words

6. ❌ Forgetting print styles
   ✅ Test print preview before deployment

7. ❌ Missing ARIA labels on custom controls
   ✅ Audit with screen reader

8. ❌ Not restoring scroll position on mount
   ✅ Implement in useEffect with localStorage

9. ❌ Blocking main thread with scroll listeners
   ✅ Use passive event listeners

10. ❌ Not tracking reading analytics
    ✅ Implement useReadingSession hook

---

## 17. Next Steps After Implementation

1. Run all manual tests from `tests.md`
2. Verify acceptance criteria from `acceptance.md`
3. Update `CURRENT_PHASE.md` status
4. Update `CHANGELOG.md` with completion
5. Create pull request
6. Await code review
7. Do NOT proceed to Phase 07 until approved
