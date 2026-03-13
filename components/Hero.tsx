'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { stats } from '@/lib/data';

const slides = [
  {
    bg: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80',
    title: 'حوّل فائض الطعام',
    subtitle: 'إلى أثر حقيقي',
    desc: 'منصة رقمية احترافية تربط المطاعم والمخابز والفنادق بفرق التوزيع لإنقاذ الطعام.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80',
    title: 'أطعمة عراقية أصيلة',
    subtitle: 'لا تُهدر أبدًا',
    desc: 'من الدولمة والكباب إلى الباچة والقيمة — كل وجبة تستحق أن تصل إلى مستحقيها.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1600&q=80',
    title: 'شبكة موثوقة',
    subtitle: 'من المانح للمستفيد',
    desc: 'نظام متكامل لتوثيق كل وجبة منقذة مع تتبع مباشر وإحصاءات مجتمعية دقيقة.',
  },
];

const liveItems = [
  { icon: '🍱', title: 'مطعم البيت الدمشقي', subtitle: '45 وجبة · المنصور',   badge: 'جاهز',          badgeClass: 'status-done'   },
  { icon: '🥖', title: 'مخبز السنابل',        subtitle: '80 قطعة · الكرادة',   badge: 'قيد التوزيع',   badgeClass: 'status-active' },
  { icon: '🍽️', title: 'قاعة ليلك',          subtitle: '60 وجبة · الجادرية',  badge: 'تم التسليم',    badgeClass: 'status-done'   },
];

/* ─── Stagger variants ─── */
const heroTextContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const heroTextItem = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0 },
};
const visualSegments = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};
const segItem = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show:   { opacity: 1, y: 0,  scale: 1 },
};

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const bgY      = useTransform(scrollY, [0, 600], [0, 120]);
  const contentY = useTransform(scrollY, [0, 600], [0, -40]);

  const goTo = useCallback((idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 1200);
  }, [isAnimating]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="hero-section">
      {/* ── Parallax background slider ── */}
      <motion.div className="hero-slider-bg" style={{ y: bgY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            className="hero-slide-bg active"
            style={{ backgroundImage: `url(${slides[current].bg})` }}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        <div className="hero-overlay" />
        <div className="hero-noise" />
        <div className="site-orb site-orb-1" />
        <div className="site-orb site-orb-2" />
        <div className="site-orb site-orb-3" />
        <div className="site-grid-overlay" />
      </motion.div>

      {/* ── Content ── */}
      <motion.div className="hero-content" style={{ y: contentY }}>
        <div className="container">
          <div className="hero-grid">

            {/* ── Left / Text — staggered entrance ── */}
            <motion.div variants={heroTextContainer} initial="hidden" animate="show">

              <motion.div className="eyebrow-badge" variants={heroTextItem}>
                <span className="live-dot" />
                ابتكار مجتمعي · تقليل الهدر · أثر قابل للقياس
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.h1
                  key={current}
                  className="hero-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  {slides[current].title}
                  <br />
                  <span className="gradient-text">{slides[current].subtitle}</span>
                  <br />
                  يصل للمحتاجين
                </motion.h1>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${current}`}
                  className="hero-desc"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {slides[current].desc}
                </motion.p>
              </AnimatePresence>

              <motion.div className="hero-actions" variants={heroTextItem}>
                <Link href="/donate" className="btn btn-primary btn-xl">
                  ابدأ التبرع الآن
                  <ArrowLeft size={20} />
                </Link>
                <Link href="/dashboard" className="btn btn-secondary btn-xl">
                  <Play size={18} />
                  شاهد لوحة الأثر
                </Link>
              </motion.div>

              {/* Slider controls */}
              <motion.div
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', marginBottom: 'var(--sp-8)' }}
                variants={heroTextItem}
              >
                <motion.button
                  onClick={prev}
                  className="btn btn-secondary btn-icon"
                  aria-label="السابق"
                  style={{ borderRadius: 'var(--r-full)', width: '44px', height: '44px', flexShrink: 0 }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.08 }}
                >
                  <ChevronRight size={18} />
                </motion.button>
                <div className="hero-slider-nav" style={{ position: 'static', transform: 'none', display: 'flex', gap: 'var(--sp-2)' }}>
                  {slides.map((_, i) => (
                    <motion.button
                      key={i}
                      className={`slider-dot ${i === current ? 'active' : ''}`}
                      onClick={() => goTo(i)}
                      aria-label={`الشريحة ${i + 1}`}
                      whileTap={{ scale: 0.85 }}
                    />
                  ))}
                </div>
                <motion.button
                  onClick={next}
                  className="btn btn-secondary btn-icon"
                  aria-label="التالي"
                  style={{ borderRadius: 'var(--r-full)', width: '44px', height: '44px', flexShrink: 0 }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.08 }}
                >
                  <ChevronLeft size={18} />
                </motion.button>
              </motion.div>

              {/* Stats — staggered */}
              <motion.div className="hero-stats" variants={heroTextItem}>
                {stats.map((item) => (
                  <div className="hero-stat" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right / Segmented visual ── */}
            <motion.div
              className="hero-visual"
              variants={visualSegments}
              initial="hidden"
              animate="show"
            >
              <div className="hero-visual-inner">

                {/* Segment 1 — floating top card */}
                <motion.div className="float-card float-card-top" variants={segItem}>
                  <div className="float-card-status" style={{ color: '#4ade80' }}>
                    <span className="dot dot-green" />
                    تحديث مباشر
                  </div>
                  <strong>18 طلب جاهز للاستلام</strong>
                  <p>أقرب متطوع يبعد 7 دقائق</p>
                </motion.div>

                {/* Segment 2 — main panel */}
                <motion.div className="hero-card-main" variants={segItem}>
                  <div className="live-panel">
                    <div className="live-panel-header">
                      <span style={{ fontWeight: 800, fontSize: 'var(--fs-sm)', color: 'var(--clr-text)' }}>
                        آخر التبرعات
                      </span>
                      <span className="live-badge">
                        <span className="live-badge-dot" />
                        مباشر
                      </span>
                    </div>
                    <div className="live-items">
                      {liveItems.map((item, i) => (
                        <motion.div
                          className="live-item"
                          key={item.title}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.12, duration: 0.45, ease: "easeOut" }}
                        >
                          <div className="live-item-icon">{item.icon}</div>
                          <div className="live-item-text">
                            <strong>{item.title}</strong>
                            <span>{item.subtitle}</span>
                          </div>
                          <span className={`status-badge ${item.badgeClass}`}>{item.badge}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Segment 3 — floating bottom card */}
                <motion.div className="float-card float-card-bottom" variants={segItem}>
                  <div className="float-card-status" style={{ color: 'var(--clr-primary-2)' }}>
                    <span className="dot dot-orange" />
                    إجمالي الأثر
                  </div>
                  <strong>1.9 طن طعام منقذ</strong>
                  <p>هذا الشهر من 31 جهة شريكة</p>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
