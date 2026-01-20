import type { Metadata } from 'next';
import { getIdeaBySlug } from '@/app/ideas/registry';

const SITE_NAME = 'One Shot Idea';
const DEFAULT_OG_IMAGE = '/og-default.png';

/**
 * Generates Next.js Metadata object for an idea page
 * @param slug - The idea's URL slug
 * @returns Metadata object for Next.js
 */
export function generateIdeaMetadata(slug: string): Metadata {
  const idea = getIdeaBySlug(slug);

  if (!idea) {
    return {
      title: `${SITE_NAME} - Creative Experiments`,
      description: 'A collection of creative web experiments',
    };
  }

  const title = idea.title;
  const ogTitle = idea.ogTitle || idea.title;
  const ogImage = idea.ogImage || DEFAULT_OG_IMAGE;

  return {
    title,
    description: idea.description,
    openGraph: {
      title: ogTitle,
      description: idea.description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${idea.title} Preview`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: idea.description,
      images: [ogImage],
    },
  };
}
