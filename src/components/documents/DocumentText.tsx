'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  title: string;
  level: number;
  content?: string;
}

interface Props {
  content: string;
  fontSize: 'sm' | 'md' | 'lg';
  theme: 'light' | 'sepia' | 'dark';
  sections?: Section[];
}

const fontSizeClasses = {
  sm: 'prose-sm',
  md: 'prose-base',
  lg: 'prose-lg',
};

const themeClasses = {
  light: '',
  sepia: 'bg-[#f4ecd8]',
  dark: 'dark:bg-gray-900 dark:text-white',
};

export function DocumentText({ content, fontSize, theme, sections }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Highlight current section based on scroll position
  useEffect(() => {
    if (!sections || sections.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // Could emit event or update context here
            console.log('Current section:', sectionId);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, [sections]);
  
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
  );
}
