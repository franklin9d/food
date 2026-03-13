'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset all previously-visible elements so they can re-animate on new route
    const reset = document.querySelectorAll('[data-reveal].is-visible');
    reset.forEach((el) => el.classList.remove('is-visible'));

    // Small delay so the new page DOM is fully painted
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      const elements = document.querySelectorAll('[data-reveal]');
      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 80);

    return () => clearTimeout(timer);
  }, [pathname]); // 🔑 re-run on every route change

  return null;
}
