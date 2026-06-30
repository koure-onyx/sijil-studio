'use client';

import { useState, useEffect } from 'react';
import { DocumentSection } from '@/types/document';

interface SectionNavigatorProps {
  sections: DocumentSection[];
  onNavigate: (sectionId: string) => void;
}

export default function SectionNavigator({ sections, onNavigate }: SectionNavigatorProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="sticky top-20 bg-white border-l border-gray-200 p-4 overflow-y-auto max-h-[calc(100vh-8rem)]" aria-label="Document sections">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Sections</h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => {
                onNavigate(section.id);
                setActiveSection(section.id);
              }}
              className={`w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              aria-current={activeSection === section.id ? 'true' : undefined}
            >
              <span className="line-clamp-2">{section.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
