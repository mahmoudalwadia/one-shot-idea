import type { Metadata } from 'next';
import { generateIdeaMetadata } from '@/app/lib/metadata/ideaMetadata';

export const metadata: Metadata = generateIdeaMetadata('ascii-cortex');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
