'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

export function Header() {
  const pathname  = usePathname();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, height: 0, y: -8 },
    show:   { opacity: 1, height: 'auto', y: 0,   transition: { duration: 0.35, ease: 'easeOut' } },
    exit:   { opacity: 0, height: 0,      y: -8,  transition: { duration: 0.25, ease: 'easeIn'  } },
  };

  return (
    <motion.header
      className={`site-header ${scrolled ? 'scrolled' : 'at-top'}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
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
        <nav className="nav-links-desktop" role="navigation" aria-label="التنقل الرئيسي">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: 'easeOut' }}
                style={{ position: 'relative' }}
              >
                <Link
                  href={link.href}
                  className={`nav-link ${isActive ? 'nav-active' : ''}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="nav-active-underline"
                      layoutId="nav-underline"
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Link href="/donate" className="btn btn-primary btn-sm nav-hide-mobile">
              تبرع الآن ←
            </Link>
          </motion.div>

          <button
            className="menu-btn"
            onClick={() => setOpen(s => !s)}
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open
                ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={20} /></motion.span>
                : <motion.span key="menu"  initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={20} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="mobile-menu-inner">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.3, ease: 'easeOut' }}
                  >
                    <Link
                      href={link.href}
                      className={`mobile-nav-link ${isActive ? 'mobile-nav-active' : ''}`}
                      onClick={() => setOpen(false)}
                    >
                      <span className="mobile-nav-icon">{link.icon}</span>
                      <span>{link.label}</span>
                      {isActive && <span className="mobile-nav-dot" />}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                <Link
                  href="/donate"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', borderRadius: 16 }}
                  onClick={() => setOpen(false)}
                >
                  🍱 تبرع بالفائض الآن
                </Link>
                <a
                  href="https://wa.me/9647752550255"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', borderRadius: 16 }}
                >
                  💬 تواصل عبر واتساب
                </a>
              </motion.div>

              {/* Footer hint */}
              <div className="mobile-menu-footer">
                <span>📍 بغداد، العراق</span>
                <a href="tel:07752550255" style={{ color: 'var(--clr-primary-2)', fontWeight: 700 }}>
                  07752550255
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
