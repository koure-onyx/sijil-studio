import React from 'react';
import { Header } from './header';
import { Footer } from './footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background antialiased selection:bg-primary/10">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl animate-fade-in focus:outline-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
