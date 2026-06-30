import { Metadata } from 'next';
import { getDocument, getDocumentMetadata } from '@/lib/api';
import { DocumentViewer } from '@/components/documents/DocumentViewer';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ section?: string; theme?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const doc = await getDocument(id);
    return {
      title: `${doc.title} | Sijil`,
      description: doc.excerpt || `Read ${doc.title} on Sijil`,
      openGraph: {
        title: doc.title,
        description: doc.excerpt,
        type: 'article',
        publishedTime: doc.createdAt,
        authors: doc.authors?.map(a => a.name),
      },
    };
  } catch {
    return {};
  }
}

export default async function DocumentPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { section } = await searchParams;
  
  try {
    const [document, metadata] = await Promise.all([
      getDocument(id),
      getDocumentMetadata(id),
    ]);
    
    return (
      <DocumentViewer 
        document={document}
        metadata={metadata}
        initialSection={section}
      />
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      notFound();
    }
    throw error;
  }
}
