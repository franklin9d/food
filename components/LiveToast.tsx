'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notifications = [
  { emoji: '🍱', text: 'مطعم البيت الدمشقي أضاف 45 وجبة', area: 'المنصور', color: '#f97316' },
  { emoji: '🥖', text: 'مخبز السنابل تبرع بـ 80 قطعة خبز', area: 'الكرادة',  color: '#22c55e' },
  { emoji: '🍽️', text: 'قاعة ليلك أضافت بوفيه كامل', area: 'الجادرية', color: '#8b5cf6' },
  { emoji: '🚚', text: 'تم استلام 60 وجبة وتوزيعها', area: 'الزعفرانية', color: '#3b82f6' },
  { emoji: '🥗', text: 'كافتيريا جامعة تبرعت بـ 25 وجبة', area: 'باب المعظم', color: '#f59e0b' },
  { emoji: '🏨', text: 'فندق السلام أضاف بوفيه فندقي', area: 'الرصافة', color: '#06b6d4' },
];

export function LiveToast() {
  const [current, setCurrent] = useState<number | null>(null);
  const [index, setIndex] = useState(0);

  const showNext = useCallback(() => {
    setIndex(i => (i + 1) % notifications.length);
    setCurrent(Date.now());

    setTimeout(() => setCurrent(null), 4500);
  }, []);

  useEffect(() => {
    // First toast after 3s
    const first = setTimeout(showNext, 3000);
    // Then every 12s
    const interval = setInterval(showNext, 12000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, [showNext]);

  const notif = notifications[index];

  return (
    <AnimatePresence>
      {current !== null && (
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 60, scale: 0.9, x: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: 100,
            left: 24,
            zIndex: 800,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 18px',
            background: 'rgba(7,13,26,0.95)',
            border: `1px solid ${notif.color}30`,
            borderLeft: `3px solid ${notif.color}`,
            borderRadius: 16,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${notif.color}15`,
            maxWidth: 300,
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => setCurrent(null)}
        >
          {/* pulse ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: '50%',
              background: `${notif.color}15`,
              border: `1px solid ${notif.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>
              {notif.emoji}
            </div>
            <span style={{
              position: 'absolute',
              top: -2, right: -2,
              width: 10, height: 10,
              borderRadius: '50%',
              background: notif.color,
              boxShadow: `0 0 8px ${notif.color}`,
              animation: 'livePulse 1.5s ease infinite',
            }} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#f0f4ff',
              marginBottom: 2,
              lineHeight: 1.4,
              fontFamily: 'var(--font-display)',
            }}>
              {notif.text}
            </p>
            <span style={{
              fontSize: '0.7rem',
              color: notif.color,
              fontWeight: 600,
            }}>
              📍 {notif.area} · الآن
            </span>
          </div>

          {/* progress bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0, left: 0,
              height: 2,
              background: notif.color,
              borderRadius: '0 0 16px 16px',
            }}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 4.5, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
