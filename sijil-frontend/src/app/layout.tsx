import './globals.css';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { QueryProvider } from '@/components/providers/query-provider';
import { MainLayout } from '@/components/layout/main-layout';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <QueryProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
