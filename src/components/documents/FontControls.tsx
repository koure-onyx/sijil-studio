'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Type, Sun, Moon } from 'lucide-react';

interface Props {
  fontSize: 'sm' | 'md' | 'lg';
  onFontSizeChange: (size: 'sm' | 'md' | 'lg') => void;
  theme: 'light' | 'sepia' | 'dark';
  onThemeChange: (theme: 'light' | 'sepia' | 'dark') => void;
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
        <DropdownMenuContent>
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
            {theme === 'dark' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
  );
}
