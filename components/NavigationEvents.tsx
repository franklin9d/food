'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * NavigationEvents
 * – Scrolls to top instantly on every client-side route change
 * – Fires a custom 'routechange' event so other components can react
 */
export function NavigationEvents() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    // Instant scroll to top (no smooth scroll, to avoid clash with page transition)
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Dispatch a custom event for any component that needs to react
    window.dispatchEvent(new CustomEvent('routechange', { detail: { pathname } }));
  }, [pathname]);

  return null;
}
