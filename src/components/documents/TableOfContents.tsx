'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Section {
  id: string;
  title: string;
  level: number;
}

interface Props {
  sections: Section[];
  currentSection?: string | null;
}

export function TableOfContents({ sections, currentSection }: Props) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  useEffect(() => {
    if (currentSection) {
      setActiveSection(currentSection);
    }
  }, [currentSection]);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };
  
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
  );
}
