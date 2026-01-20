import type { Metadata } from 'next';
import { generateIdeaMetadata } from '@/app/lib/metadata/ideaMetadata';

export const metadata: Metadata = generateIdeaMetadata('world-explorer');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
