import type { Metadata } from 'next';
import { generateIdeaMetadata } from '@/app/lib/metadata/ideaMetadata';

export const metadata: Metadata = generateIdeaMetadata('a-train-retro-sim');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
