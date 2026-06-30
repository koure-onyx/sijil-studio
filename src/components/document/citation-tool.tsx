'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Document } from '@/types/document';
import { Copy, Check } from 'lucide-react';

interface Props {
  document: Document;
}

export function CitationTool({ document }: Props) {
  const [copied, setCopied] = useState(false);

  const generateCitation = (format: 'apa' | 'mla' | 'chicago') => {
    const authors = document.authors?.map(a => a.name).join(', ') || 'Unknown Author';
    const year = new Date(document.createdAt).getFullYear();
    const title = document.title;

    switch (format) {
      case 'apa':
        return `${authors} (${year}). ${title}. Sijil.`;
      case 'mla':
        return `${authors}. "${title}." Sijil, ${year}.`;
      case 'chicago':
        return `${authors}. "${title}." Sijil. ${year}.`;
      default:
        return '';
    }
  };

  const copyCitation = async (format: 'apa' | 'mla' | 'chicago') => {
    const citation = generateCitation(format);
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Copy citation">
          {copied ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => copyCitation('apa')}>
          Copy APA
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCitation('mla')}>
          Copy MLA
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyCitation('chicago')}>
          Copy Chicago
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
