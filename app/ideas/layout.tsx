'use client';

import { Suspense, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { usePageTracking } from '@/app/hooks/usePageTracking';
import { isGALoaded } from '@/app/lib/analytics/analytics';
import { trackInteraction } from '@/app/lib/analytics/events';

function PageTracker() {
  usePageTracking();
  return null;
}

export default function IdeasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lastClickTime = useRef<number>(0);

  const handleClick = useCallback(() => {
    // Debounce: track max once per second
    const now = Date.now();
    if (now - lastClickTime.current < 1000) return;
    lastClickTime.current = now;

    if (!isGALoaded()) return;

    const pageSlug = pathname?.split('/').filter(Boolean).pop() || 'unknown';

    trackInteraction({
      interaction_type: 'page_click',
      project_context: pageSlug,
      event_label: `click_on_${pageSlug}`,
    });
  }, [pathname]);

  return (
    <>
      <Suspense fallback={null}>
        <PageTracker />
      </Suspense>
      <div onClick={handleClick} style={{ display: 'contents' }}>
        {children}
      </div>
    </>
  );
}
