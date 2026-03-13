'use client';

import Link from 'next/link';
import { Trophy, Clock, ArrowLeft, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const topDonors = [
  { rank: 1, emoji: '🏅', name: 'مطعم البيت الدمشقي',      area: 'المنصور',     meals: '340', type: 'وجبات مطبوخة',   color: '#fbbf24' },
  { rank: 2, emoji: '🥈', name: 'مخبز السنابل الذهبية',     area: 'الكرادة',     meals: '280', type: 'خبز ومعجنات',     color: '#94a3b8' },
  { rank: 3, emoji: '🥉', name: 'فندق السلام الدولي',        area: 'الرصافة',     meals: '210', type: 'بوفيه فندقي',     color: '#cd7c43' },
  { rank: 4, emoji: '🍽️', name: 'قاعة ليلك للأفراح',       area: 'الجادرية',    meals: '190', type: 'وجبات مناسبات',   color: '#8b5cf6' },
  { rank: 5, emoji: '🍗', name: 'مطعم البصرة الأصيل',       area: 'الزعفرانية',  meals: '165', type: 'مشاوي وكباب',     color: '#f97316' },
];

const recentActivity = [
  { time: 'منذ 12 دقيقة', emoji: '🥙', donor: 'مطعم ألف ليلة',       amount: '30 وجبة',       status: 'جاهز',          statusClass: 'status-done'   },
  { time: 'منذ 28 دقيقة', emoji: '🍞', donor: 'مخبز الفرح',          amount: '60 قطعة خبز',   status: 'قيد التوزيع',   statusClass: 'status-active' },
  { time: 'منذ 45 دقيقة', emoji: '🍱', donor: 'كافتيريا الجامعة',    amount: '25 وجبة',       status: 'تم التسليم',    statusClass: 'status-done'   },
  { time: 'منذ ساعة',     emoji: '🥗', donor: 'مطعم زهرة البستان',   amount: '18 وجبة',       status: 'تم التسليم',    statusClass: 'status-done'   },
];

/* ─── Motion variants ─── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1 },
};
const rowVariant = {
  hidden: { opacity: 0, x: 20 },
  show:   { opacity: 1, x: 0  },
};

export function DonorsSection() {
  return (
    <section className="donors-section">
      <div className="container">

        {/* ── Section header ── */}
        <motion.div
          className="donors-section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <Trophy size={14} />
            المتبرعون الأبطال
          </div>
          <h2 className="section-title">
            شركاؤنا في صناعة
            <br />
            <span className="gradient-text">الأثر المجتمعي</span>
          </h2>
          <p className="section-desc section-desc-center">
            هؤلاء الشركاء يقودون التغيير يومًا بيوم — كل وجبة تُحسب
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="donors-bento">

          {/* ── Leaderboard card (wide) ── */}
          <motion.div
            className="donors-glass-card donors-leaderboard"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Card header */}
            <div className="donors-card-header">
              <div className="donors-card-title">
                <span className="donors-title-icon">🏆</span>
                <span>لوحة المتصدرين</span>
              </div>
              <span className="live-badge">
                <span className="live-badge-dot" />
                هذا الشهر
              </span>
            </div>

            {/* Donor rows */}
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {topDonors.map((d, i) => (
                <motion.div
                  key={d.name}
                  className="donor-bento-row"
                  variants={rowVariant}
                  whileHover={{ x: -4, backgroundColor: 'rgba(255,255,255,0.04)' }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Rank */}
                  <div
                    className="donor-bento-rank"
                    style={{ color: d.color }}
                  >
                    {i < 3 ? d.emoji : `#${d.rank}`}
                  </div>

                  {/* Avatar */}
                  <div className="donor-bento-avatar" style={{ borderColor: `${d.color}30` }}>
                    {d.emoji}
                  </div>

                  {/* Info */}
                  <div className="donor-bento-info">
                    <strong>{d.name}</strong>
                    <span>{d.area} · {d.type}</span>
                  </div>

                  {/* Amount */}
                  <div className="donor-bento-amount">
                    <strong style={{ color: d.color }}>{d.meals}</strong>
                    <span>وجبة منقذة</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Recent activity card ── */}
          <motion.div
            className="donors-glass-card donors-recent"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="donors-card-header">
              <div className="donors-card-title">
                <Clock size={16} style={{ color: 'var(--clr-primary-2)' }} />
                <span>آخر التبرعات</span>
              </div>
              <Link href="/dashboard" className="btn btn-ghost btn-sm">
                عرض الكل
              </Link>
            </div>

            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {recentActivity.map((a, i) => (
                <motion.div
                  key={i}
                  className="activity-bento-row"
                  variants={rowVariant}
                  whileHover={{ x: -4, backgroundColor: 'rgba(255,255,255,0.04)' }}
                >
                  <div className="activity-bento-icon">{a.emoji}</div>
                  <div className="activity-bento-info">
                    <strong>{a.donor}</strong>
                    <span>{a.amount}</span>
                  </div>
                  <div className="activity-bento-meta">
                    <span className={`status-badge ${a.statusClass}`}>{a.status}</span>
                    <span className="activity-time">{a.time}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Mini stat cards (bottom row) ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-30px' }}
            className="donors-mini-row"
          >
            {[
              { icon: '🍽️', value: '1,847', label: 'وجبة هذا الشهر',   color: '#f97316' },
              { icon: '🏢', value: '31',     label: 'جهة شريكة نشطة',   color: '#22c55e' },
              { icon: '⚡', value: '< 18د',  label: 'متوسط وقت الاستجابة', color: '#8b5cf6' },
              { icon: '♻️', value: '1.9 طن', label: 'طعام منقذ من الهدر', color: '#3b82f6' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="donors-mini-card"
                variants={cardVariant}
                whileHover={{ y: -6, scale: 1.02 }}
                style={{ '--accent': s.color } as React.CSSProperties}
              >
                <span className="donors-mini-emoji">{s.icon}</span>
                <strong className="donors-mini-value" style={{ color: s.color }}>{s.value}</strong>
                <span className="donors-mini-label">{s.label}</span>
                <div className="donors-mini-glow" style={{ background: `radial-gradient(circle, ${s.color}22 0%, transparent 70%)` }} />
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* ── CTA join banner ── */}
        <motion.div
          className="donors-cta-banner"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="donors-cta-glow" />
          <div className="donors-cta-content">
            <Star size={18} style={{ color: 'var(--clr-primary-2)', flexShrink: 0 }} />
            <p>انضم لقائمة الشركاء المؤثرين وابدأ في إنقاذ الطعام اليوم</p>
          </div>
          <Link href="/donate" className="btn btn-primary btn-xl">
            سجّل جهتك الآن
            <ArrowLeft size={18} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
