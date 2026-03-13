'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const actions = [
    {
      id: 'donate',
      href: '/donate',
      icon: '🍱',
      label: 'تبرع الآن',
      bg: 'linear-gradient(135deg,#f97316,#ea580c)',
      shadow: '0 8px 28px rgba(249,115,22,0.55)',
    },
    {
      id: 'whatsapp',
      href: 'https://wa.me/9647752550255',
      icon: '💬',
      label: 'واتساب',
      bg: 'linear-gradient(135deg,#25d366,#128c3e)',
      shadow: '0 8px 28px rgba(37,211,102,0.45)',
      external: true,
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: 32,
            left: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 12,
            zIndex: 900,
          }}
        >
          {/* Action buttons - shown when expanded */}
          <AnimatePresence>
            {expanded && (
              <>
                {actions.map((action, i) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.8 }}
                    transition={{ delay: i * 0.07, duration: 0.25 }}
                  >
                    {action.external ? (
                      <a
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '10px 20px',
                          background: action.bg,
                          borderRadius: 999,
                          color: '#fff',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          textDecoration: 'none',
                          boxShadow: action.shadow,
                          whiteSpace: 'nowrap',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <span style={{ fontSize: 18 }}>{action.icon}</span>
                        {action.label}
                      </a>
                    ) : (
                      <Link
                        href={action.href}
                        onClick={() => setExpanded(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '10px 20px',
                          background: action.bg,
                          borderRadius: 999,
                          color: '#fff',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          textDecoration: 'none',
                          boxShadow: action.shadow,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <span style={{ fontSize: 18 }}>{action.icon}</span>
                        {action.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <motion.button
            onClick={() => setExpanded(s => !s)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: expanded
                ? 'rgba(255,255,255,0.1)'
                : 'linear-gradient(135deg,#f97316,#ea580c)',
              border: expanded ? '1px solid rgba(255,255,255,0.15)' : 'none',
              color: '#fff',
              fontSize: 22,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: expanded
                ? '0 4px 20px rgba(0,0,0,0.4)'
                : '0 8px 32px rgba(249,115,22,0.5)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s ease',
            }}
            aria-label={expanded ? 'إغلاق' : 'تواصل وتبرع'}
          >
            <motion.span
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'inline-flex' }}
            >
              {expanded ? '✕' : '🌟'}
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
