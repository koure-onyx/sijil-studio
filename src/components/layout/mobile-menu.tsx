'use client';

import Link from 'next/link';
import { useUIStore } from '@/store/use-ui-store';

export function MobileMenu() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  if (!sidebarOpen) return null;

  return (
    <div className="fixed inset-0 top-16 z-40 h-[calc(100vh-4rem)] w-full bg-background animate-in fade-in slide-in-from-top-5 md:hidden">
      <nav className="flex flex-col space-y-4 p-6 border-t border-border">
        <Link 
          href="/" 
          className="text-lg font-medium transition-colors hover:text-primary"
          onClick={() => setSidebarOpen(false)}
        >
          Dashboard
        </Link>
      </nav>
    </div>
  );
}
