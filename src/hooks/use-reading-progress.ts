'use client';

import { useState, useEffect, useCallback } from 'react';

export const useReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 0) {
        const progress = (scrollTop / scrollHeight) * 100;
        setProgress(progress);
        setScrollPosition(scrollTop);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const restoreScrollPosition = useCallback((position: number) => {
    window.scrollTo({ top: position, behavior: 'smooth' });
  }, []);

  const saveScrollPosition = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('reading-scroll-position', scrollPosition.toString());
    }
  }, [scrollPosition]);

  const loadScrollPosition = useCallback((): number => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('reading-scroll-position');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  }, []);

  return {
    progress,
    scrollPosition,
    restoreScrollPosition,
    saveScrollPosition,
    loadScrollPosition,
  };
};
