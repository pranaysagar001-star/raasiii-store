import { safeLocalStorageSetItem } from '@/lib/commerce';

export type AnalyticsEvent =
  | { type: 'view_product'; slug: string }
  | { type: 'add_to_cart'; slug: string; quantity: number }
  | { type: 'begin_checkout'; total: number }
  | { type: 'purchase'; orderId: string; total: number };

const analyticsStorageKey = 'raasiii-analytics-events';
const maxAnalyticsEvents = 200;

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') {
    return;
  }

  const events = JSON.parse(localStorage.getItem(analyticsStorageKey) || '[]') as AnalyticsEvent[];
  events.push(event);
  const trimmed = events.slice(-maxAnalyticsEvents);
  safeLocalStorageSetItem(analyticsStorageKey, JSON.stringify(trimmed));
}
