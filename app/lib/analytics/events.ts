import { trackEvent } from './analytics';
import type {
  ProjectViewEvent,
  ModalEvent,
  ExternalLinkEvent,
  InteractionEvent,
} from './types';

// Track project/idea navigation
export const trackProjectView = (params: ProjectViewEvent) => {
  trackEvent({
    name: 'project_view',
    params: {
      event_category: 'navigation',
      ...params,
    },
  });
};

// Track modal interactions
export const trackModal = (params: ModalEvent) => {
  trackEvent({
    name: 'modal_interaction',
    params: {
      event_category: 'engagement',
      ...params,
    },
  });
};

// Track external link clicks
export const trackExternalLink = (params: ExternalLinkEvent) => {
  trackEvent({
    name: 'external_link_click',
    params: {
      event_category: 'outbound',
      ...params,
    },
  });
};

// Track generic interactions (games, buttons, etc.)
export const trackInteraction = (params: InteractionEvent) => {
  trackEvent({
    name: 'user_interaction',
    params: {
      event_category: 'interaction',
      ...params,
    },
  });
};
