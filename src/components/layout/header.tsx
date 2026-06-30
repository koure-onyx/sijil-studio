'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useUIStore } from '@/store/use-ui-store';
import { MobileMenu } from './mobile-menu';

export function Header() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight text-primary">
          {siteConfig.name}
        </Link>
        
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">
            Dashboard
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle Trigger */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-sm font-medium hover:bg-muted md:hidden cursor-pointer"
          aria-label="Toggle structural menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      <MobileMenu />
    </header>
  );
}
