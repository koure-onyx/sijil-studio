import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Header() {
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
      </div>
    </header>
  );
}
