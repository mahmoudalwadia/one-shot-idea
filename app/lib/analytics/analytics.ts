import { AnalyticsEvent } from './types';

export const GA_MEASUREMENT_ID = 'G-CY0KFPVD9K';

// Initialize GA (called once in GoogleAnalytics component)
export const initGA = () => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

// Track page view
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('[Analytics] gtag not initialized');
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom event
export const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('[Analytics] gtag not initialized');
    return;
  }

  try {
    window.gtag('event', event.name, event.params);
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
};

// Helper to check if GA is loaded
export const isGALoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};
