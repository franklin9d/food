'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Play, TrendingUp, Users, Package, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
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
  { icon: '🍱', title: 'مطعم البيت الدمشقي', subtitle: '45 وجبة · المنصور', badge: 'جاهز', badgeClass: 'status-done' },
  { icon: '🥖', title: 'مخبز السنابل', subtitle: '80 قطعة · الكرادة', badge: 'قيد التوزيع', badgeClass: 'status-active' },
  { icon: '🍽️', title: 'قاعة ليلك', subtitle: '60 وجبة · الجادرية', badge: 'تم التسليم', badgeClass: 'status-done' },
];

const statIcons = [TrendingUp, Package, Users, Heart];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
      {/* Background slider */}
      <div className="hero-slider-bg">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide-bg ${i === current ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.bg})` }}
          />
        ))}
        <div className="hero-overlay" />
        <div className="hero-noise" />
        {/* Site background orbs */}
        <div className="site-orb site-orb-1" />
        <div className="site-orb site-orb-2" />
        <div className="site-orb site-orb-3" />
        <div className="site-grid-overlay" />
      </div>

      <div className="hero-content">
        <div className="container">
          <div className="hero-grid">

            {/* Left / Text */}
            <div>
              <div className="eyebrow-badge" data-reveal>
                <span className="live-dot" />
                ابتكار مجتمعي · تقليل الهدر · أثر قابل للقياس
              </div>

              <h1 className="hero-title" data-reveal data-reveal-delay="1">
                {slides[current].title}
                <br />
                <span className="gradient-text">{slides[current].subtitle}</span>
                <br />
                يصل للمحتاجين
              </h1>

              <p className="hero-desc" data-reveal data-reveal-delay="2">
                {slides[current].desc}
              </p>

              <div className="hero-actions" data-reveal data-reveal-delay="3">
                <Link href="/donate" className="btn btn-primary btn-xl">
                  ابدأ التبرع الآن
                  <ArrowLeft size={20} />
                </Link>
                <Link href="/dashboard" className="btn btn-secondary btn-xl">
                  <Play size={18} />
                  شاهد لوحة الأثر
                </Link>
              </div>

              {/* Slider controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', marginBottom: 'var(--sp-8)' }} data-reveal data-reveal-delay="3">
                <button onClick={prev} className="btn btn-secondary btn-icon" aria-label="السابق" style={{ borderRadius: 'var(--r-full)', width: '44px', height: '44px', flexShrink: 0 }}>
                  <ChevronRight size={18} />
                </button>
                <div className="hero-slider-nav" style={{ position: 'static', transform: 'none', display: 'flex', gap: 'var(--sp-2)' }}>
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      className={`slider-dot ${i === current ? 'active' : ''}`}
                      onClick={() => goTo(i)}
                      aria-label={`الشريحة ${i + 1}`}
                    />
                  ))}
                </div>
                <button onClick={next} className="btn btn-secondary btn-icon" aria-label="التالي" style={{ borderRadius: 'var(--r-full)', width: '44px', height: '44px', flexShrink: 0 }}>
                  <ChevronLeft size={18} />
                </button>
              </div>

              {/* Stats */}
              <div className="hero-stats" data-reveal data-reveal-delay="4">
                {stats.map((item, i) => {
                  const Icon = statIcons[i] ?? TrendingUp;
                  return (
                    <div className="hero-stat" key={item.label}>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right / Visual */}
            <div className="hero-visual" data-reveal data-reveal-delay="2">
              <div className="hero-visual-inner">

                {/* Floating top card */}
                <div className="float-card float-card-top">
                  <div className="float-card-status" style={{ color: '#4ade80' }}>
                    <span className="dot dot-green" />
                    تحديث مباشر
                  </div>
                  <strong>18 طلب جاهز للاستلام</strong>
                  <p>أقرب متطوع يبعد 7 دقائق</p>
                </div>

                {/* Main card */}
                <div className="hero-card-main">
                  <div className="live-panel">
                    <div className="live-panel-header">
                      <span style={{ fontWeight: 800, fontSize: 'var(--fs-sm)', color: 'var(--clr-text)' }}>
                        آخر التبرعات
                      </span>
                      <span className="live-badge">
                        <span
                          style={{
                            width: 7, height: 7,
                            borderRadius: '50%',
                            background: 'var(--clr-accent)',
                            animation: 'dotBlink 1.5s ease infinite',
                            display: 'inline-block',
                            boxShadow: '0 0 6px rgba(34,197,94,0.6)',
                          }}
                        />
                        مباشر
                      </span>
                    </div>
                    <div className="live-items">
                      {liveItems.map((item) => (
                        <div className="live-item" key={item.title}>
                          <div className="live-item-icon">{item.icon}</div>
                          <div className="live-item-text">
                            <strong>{item.title}</strong>
                            <span>{item.subtitle}</span>
                          </div>
                          <span className={`status-badge ${item.badgeClass}`}>{item.badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating bottom card */}
                <div className="float-card float-card-bottom">
                  <div className="float-card-status" style={{ color: 'var(--clr-primary-2)' }}>
                    <span className="dot dot-orange" />
                    إجمالي الأثر
                  </div>
                  <strong>1.9 طن طعام منقذ</strong>
                  <p>هذا الشهر من 31 جهة شريكة</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
