import { TrendingUp, Package, Users, Heart } from 'lucide-react';
import { stats, impactStories } from '@/lib/data';

const icons = [TrendingUp, Package, Users, Heart];
const colors = [
  { from: '#f97316', to: '#fb923c', glow: 'rgba(249,115,22,0.15)' },
  { from: '#22c55e', to: '#4ade80', glow: 'rgba(34,197,94,0.12)' },
  { from: '#3b82f6', to: '#60a5fa', glow: 'rgba(59,130,246,0.12)' },
  { from: '#8b5cf6', to: '#a78bfa', glow: 'rgba(139,92,246,0.12)' },
];

export function ImpactSection() {
  return (
    <section className="impact-section">
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-14)', position: 'relative', zIndex: 1 }} data-reveal>
          <div className="section-label">
            <span>🌟</span>
            أثرنا بالأرقام
          </div>
          <h2 className="section-title section-title-center">
            كل رقم يمثل
            <br />
            <span className="gradient-text">وجبة وصلت لمستحقها</span>
          </h2>
          <div className="glow-divider" />
        </div>

        {/* Metrics */}
        <div className="impact-metrics">
          {stats.map((item, i) => {
            const Icon = icons[i] ?? TrendingUp;
            const c = colors[i];
            return (
              <div className="metric-card" key={item.label} data-reveal data-reveal-delay={String(i + 1)}>
                <div
                  className="metric-icon"
                  style={{
                    background: c.glow,
                    color: c.from,
                  }}
                >
                  <Icon size={24} />
                </div>
                <div
                  className="metric-value"
                  style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  {item.value}
                </div>
                <div className="metric-label">{item.label}</div>
                <div className="metric-note">↑ مقياس هذا الشهر</div>
              </div>
            );
          })}
        </div>

        {/* Stories */}
        <div
          style={{
            textAlign: 'center',
            margin: 'var(--sp-16) 0 var(--sp-8)',
            position: 'relative',
            zIndex: 1,
          }}
          data-reveal
        >
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-2xl)',
            fontWeight: 900,
            color: 'var(--clr-text)',
            marginBottom: 'var(--sp-2)',
          }}>
            قصص من الميدان
          </h3>
          <p style={{ color: 'var(--clr-text-3)', fontSize: 'var(--fs-sm)' }}>
            تجارب حقيقية شكّلها الفريق والمتطوعون
          </p>
        </div>

        <div className="impact-stories">
          {impactStories.map((story, i) => (
            <div className="story-card" key={story.title} data-reveal data-reveal-delay={String(i + 1)}>
              <div
                style={{
                  fontSize: 36,
                  marginBottom: 'var(--sp-4)',
                }}
              >
                {['🍞', '🎉', '⚡'][i]}
              </div>
              <h4>{story.title}</h4>
              <p>{story.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
