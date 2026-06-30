import { siteConfig } from '@/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border bg-muted/40 py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row text-sm text-muted-foreground">
        <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
        <p className="text-xs">Engine Infrastructure Module — Phase 01</p>
      </div>
    </footer>
  );
}
