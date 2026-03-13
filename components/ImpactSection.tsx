'use client';

import { TrendingUp, Package, Users, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { stats, impactStories } from '@/lib/data';
import { CountUp } from './CountUp';

const icons  = [TrendingUp, Package, Users, Heart];
const colors = [
  { from: '#f97316', to: '#fb923c', glow: 'rgba(249,115,22,0.15)' },
  { from: '#22c55e', to: '#4ade80', glow: 'rgba(34,197,94,0.12)'  },
  { from: '#3b82f6', to: '#60a5fa', glow: 'rgba(59,130,246,0.12)' },
  { from: '#8b5cf6', to: '#a78bfa', glow: 'rgba(139,92,246,0.12)' },
];

/* Parse value string → number + suffix */
function parseValue(val: string): { num: number; suffix: string } {
  const match = val.match(/^([\d,]+)(\+)?(\s*.+)?$/);
  if (!match) return { num: 0, suffix: val };
  const num = parseInt(match[1].replace(/,/g, ''), 10);
  const suffix = (match[2] ?? '') + (match[3] ?? '');
  return { num, suffix };
}

const cardIn = {
  hidden: { opacity: 0, y: 36, scale: 0.95 },
  show:   { opacity: 1, y: 0,  scale: 1 },
};

const storyEmojis = ['🍞', '🎉', '⚡'];

export function ImpactSection() {
  return (
    <section className="impact-section">
      <div className="container">

        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 'var(--sp-14)', position: 'relative', zIndex: 1 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-label">
            <span>🌟</span>
            أثرنا بالأرقام
          </div>
          <h2 className="section-title section-title-center">
            كل رقم يمثل
            <br />
            <span className="gradient-text">وجبة وصلت لمستحقها</span>
          </h2>
          <p className="section-desc section-desc-center" style={{ marginTop: 'var(--sp-4)' }}>
            نقيس كل أثر بشفافية — من أول تبرع حتى آخر توصيل
          </p>
        </motion.div>

        {/* Metrics — staggered with CountUp */}
        <motion.div
          className="impact-metrics"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {stats.map((item, i) => {
            const Icon = icons[i] ?? TrendingUp;
            const c    = colors[i];
            const { num, suffix } = parseValue(item.value);
            return (
              <motion.div
                className="metric-card"
                key={item.label}
                variants={cardIn}
                whileHover={{ y: -6, boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${c.glow}` }}
                transition={{ duration: 0.22 }}
              >
                <div className="metric-icon" style={{ background: c.glow, color: c.from }}>
                  <Icon size={24} />
                </div>
                <div
                  className="metric-value"
                  style={{
                    background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <CountUp end={num} suffix={suffix} duration={2200} />
                </div>
                <div className="metric-label">{item.label}</div>
                <div className="metric-note">↑ مقياس هذا الشهر</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stories subheader */}
        <motion.div
          style={{ textAlign: 'center', margin: 'var(--sp-16) 0 var(--sp-8)', position: 'relative', zIndex: 1 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-2xl)', fontWeight: 900, color: 'var(--clr-text)', marginBottom: 'var(--sp-2)' }}>
            قصص من الميدان
          </h3>
          <p style={{ color: 'var(--clr-text-3)', fontSize: 'var(--fs-sm)' }}>
            تجارب حقيقية شكّلها الفريق والمتطوعون
          </p>
        </motion.div>

        {/* Stories — staggered */}
        <motion.div
          className="impact-stories"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-30px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {impactStories.map((story, i) => (
            <motion.div
              className="story-card"
              key={story.title}
              variants={cardIn}
              whileHover={{ y: -6, borderColor: 'rgba(249,115,22,0.22)' }}
              transition={{ duration: 0.22 }}
            >
              <div style={{ fontSize: 36, marginBottom: 'var(--sp-4)' }}>
                {storyEmojis[i]}
              </div>
              <h4>{story.title}</h4>
              <p>{story.text}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
