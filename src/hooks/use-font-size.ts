'use client';

import { useState, useEffect, useCallback } from 'react';

export type FontSize = 'small' | 'medium' | 'large';
export type ReadingTheme = 'light' | 'sepia' | 'dark';

const FONT_SIZE_KEY = 'reading-font-size';
const READING_THEME_KEY = 'reading-theme';

export const useFontSize = () => {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [theme, setTheme] = useState<ReadingTheme>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFontSize = localStorage.getItem(FONT_SIZE_KEY) as FontSize | null;
      const savedTheme = localStorage.getItem(READING_THEME_KEY) as ReadingTheme | null;
      
      if (savedFontSize && ['small', 'medium', 'large'].includes(savedFontSize)) {
        setFontSize(savedFontSize);
      }
      
      if (savedTheme && ['light', 'sepia', 'dark'].includes(savedTheme)) {
        setTheme(savedTheme);
      }
    }
  }, []);

  const changeFontSize = useCallback((size: FontSize) => {
    setFontSize(size);
    if (typeof window !== 'undefined') {
      localStorage.setItem(FONT_SIZE_KEY, size);
    }
  }, []);

  const changeTheme = useCallback((newTheme: ReadingTheme) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(READING_THEME_KEY, newTheme);
    }
  }, []);

  const getFontSizeClass = useCallback((): string => {
    switch (fontSize) {
      case 'small':
        return 'text-base';
      case 'medium':
        return 'text-lg';
      case 'large':
        return 'text-xl';
      default:
        return 'text-lg';
    }
  }, [fontSize]);

  const getThemeClass = useCallback((): string => {
    switch (theme) {
      case 'light':
        return 'bg-white text-gray-900';
      case 'sepia':
        return 'bg-[#f4ecd8] text-[#5b4636]';
      case 'dark':
        return 'bg-gray-900 text-gray-100';
      default:
        return 'bg-white text-gray-900';
    }
  }, [theme]);

  return {
    fontSize,
    theme,
    changeFontSize,
    changeTheme,
    getFontSizeClass,
    getThemeClass,
  };
};
