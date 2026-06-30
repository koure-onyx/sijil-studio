'use client';

import { useState, useEffect, useCallback } from 'react';
import { Document, DocumentMetadata } from '@/types/document';
import { DocumentText } from './DocumentText';
import { DocumentMetadata as DocMetadata } from './DocumentMetadata';
import { TableOfContents } from './TableOfContents';
import { ReadingProgress } from './ReadingProgress';
import { FontControls } from './FontControls';
import { CitationTool } from './CitationTool';
import { useReadingSession } from '@/hooks/use-reading-session';
import { Button } from '@/components/ui/button';
import { ListIcon } from 'lucide-react';

interface Props {
  document: Document;
  metadata: DocumentMetadata;
  initialSection?: string;
}

export function DocumentViewer({ document, metadata, initialSection }: Props) {
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [showTOC, setShowTOC] = useState(true);
  
  const { trackReading, updatePosition } = useReadingSession(document.id);
  
  // Restore scroll position on mount
  useEffect(() => {
    const savedPosition = localStorage.getItem(`doc-${document.id}-position`);
    if (savedPosition && !initialSection) {
      const position = parseInt(savedPosition, 10);
      setTimeout(() => {
        window.scrollTo({ top: position, behavior: 'auto' });
      }, 100);
    } else if (initialSection) {
      const element = document.getElementById(initialSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [document.id, initialSection]);
  
  // Save scroll position periodically
  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    localStorage.setItem(`doc-${document.id}-position`, position.toString());
    updatePosition(position);
  }, [document.id, updatePosition]);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  // Track reading session start
  useEffect(() => {
    trackReading();
  }, [trackReading]);
  
  const sections = document.sections || [];
  
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
                  currentSection={null}
                />
                
                <DocMetadata metadata={metadata} />
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
