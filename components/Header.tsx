'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { useState, useEffect } from 'react';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : 'at-top'}`}>
      <div className="container nav-bar">

        {/* Brand */}
        <Link href="/" className="nav-brand">
          <div className="brand-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10" />
              <path d="M12 6a6 6 0 0 0-6 6" />
              <path d="M12 10a2 2 0 1 0 2 2" />
              <path d="M22 2 12 12" />
            </svg>
          </div>
          <div className="brand-text">
            <strong>Food Rescue Hub</strong>
            <em>منصة إنقاذ الطعام</em>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`nav-links ${open ? 'open' : ''}`} role="navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'nav-active' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile CTA */}
          <Link
            href="/donate"
            className="btn btn-primary btn-sm"
            style={{ marginTop: 'var(--sp-3)', display: 'none' }}
            onClick={() => setOpen(false)}
            id="mobile-cta"
          >
            تبرع الآن
          </Link>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <Link href="/donate" className="btn btn-primary btn-sm nav-hide-mobile">
            تبرع الآن
          </Link>
          <button
            className="menu-btn"
            onClick={() => setOpen((s) => !s)}
            aria-label="القائمة"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>
    </header>
  );
}
