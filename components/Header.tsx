'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Scroll detection */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <motion.header
      className={`site-header ${scrolled ? 'scrolled' : 'at-top'}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container nav-bar">

        {/* Brand */}
        <Link href="/" className="nav-brand">
          <motion.div
            className="brand-logo"
            whileHover={{ scale: 1.06, rotate: -4 }}
            transition={{ duration: 0.25 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10" />
              <path d="M12 6a6 6 0 0 0-6 6" />
              <path d="M12 10a2 2 0 1 0 2 2" />
              <path d="M22 2 12 12" />
            </svg>
          </motion.div>
          <div className="brand-text">
            <strong>Food Rescue Hub</strong>
            <em>منصة إنقاذ الطعام</em>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`nav-links ${open ? 'open' : ''}`} role="navigation">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.45, ease: "easeOut" }}
            >
              <Link
                href={link.href}
                className={pathname === link.href ? 'nav-active' : ''}
                onClick={() => setOpen(false)}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    className="nav-active-underline"
                    layoutId="nav-underline"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </Link>
            </motion.div>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Link href="/donate" className="btn btn-primary btn-sm nav-hide-mobile">
              تبرع الآن
            </Link>
          </motion.div>
          <button
            className="menu-btn"
            onClick={() => setOpen((s) => !s)}
            aria-label="القائمة"
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open
                ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={20} /></motion.span>
                : <motion.span key="menu"  initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={20} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>

      </div>
    </motion.header>
  );
}
