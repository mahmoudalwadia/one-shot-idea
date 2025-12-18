// Global gtag types for Google Analytics
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// Base event parameters
export interface BaseEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

// Project navigation event
export interface ProjectViewEvent extends BaseEventParams {
  project_slug: string;
  project_title: string;
  from_page?: string;
}

// Modal/dialog interaction event
export interface ModalEvent extends BaseEventParams {
  modal_name: string;
  action: 'open' | 'close';
  trigger?: string; // e.g., 'button', 'url', 'escape'
}

// External link click event
export interface ExternalLinkEvent extends BaseEventParams {
  link_url: string;
  link_text: string;
  link_domain: string;
}

// Generic interaction event
export interface InteractionEvent extends BaseEventParams {
  interaction_type: string;
  element_id?: string;
  element_text?: string;
  project_context?: string;
}

// Union type for all events
export type AnalyticsEvent =
  | { name: 'project_view'; params: ProjectViewEvent }
  | { name: 'modal_interaction'; params: ModalEvent }
  | { name: 'external_link_click'; params: ExternalLinkEvent }
  | { name: 'user_interaction'; params: InteractionEvent }
  | { name: string; params: BaseEventParams }; // Fallback for custom events

export {};
