'use client';

import { useCallback } from 'react';
import { isGALoaded } from '@/app/lib/analytics/analytics';
import {
  trackProjectView,
  trackModal,
  trackExternalLink,
  trackInteraction,
} from '@/app/lib/analytics/events';
import type {
  ProjectViewEvent,
  ModalEvent,
  ExternalLinkEvent,
  InteractionEvent,
} from '@/app/lib/analytics/types';

export function useAnalytics() {
  const logProjectView = useCallback((params: ProjectViewEvent) => {
    if (isGALoaded()) {
      trackProjectView(params);
    }
  }, []);

  const logModal = useCallback((params: ModalEvent) => {
    if (isGALoaded()) {
      trackModal(params);
    }
  }, []);

  const logExternalLink = useCallback((params: ExternalLinkEvent) => {
    if (isGALoaded()) {
      trackExternalLink(params);
    }
  }, []);

  const logInteraction = useCallback((params: InteractionEvent) => {
    if (isGALoaded()) {
      trackInteraction(params);
    }
  }, []);

  return {
    logProjectView,
    logModal,
    logExternalLink,
    logInteraction,
    isLoaded: isGALoaded(),
  };
}
