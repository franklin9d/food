import { Zap, MapPin, BarChart3, Shield, Users, Leaf } from 'lucide-react';

const bentoItems = [
  {
    col: 'bento-c1',
    icon: Zap,
    iconClass: 'bento-icon-primary',
    tag: 'سريع',
    title: 'تسجيل فائض الطعام بسرعة',
    desc: 'المطاعم والمخابز والفنادق يضيفون الفائض خلال أقل من دقيقة مع تحديد الكمية ووقت الجاهزية ونوع الطعام.',
    stats: [
      { value: '< 60ث', label: 'وقت التسجيل' },
      { value: '97%', label: 'نسبة النجاح' },
    ],
    large: true,
  },
  {
    col: 'bento-c2',
    icon: MapPin,
    iconClass: 'bento-icon-green',
    tag: 'ذكي',
    title: 'استلام ذكي حسب الموقع',
    desc: 'توزيع الطلبات تلقائيًا على أقرب فريق أو متطوع بناءً على الموقع الجغرافي الفعلي لتقليل وقت الاستجابة وضمان وصول الطعام ساخنًا.',
    bar: 84,
    large: true,
  },
  {
    col: 'bento-c3',
    icon: Shield,
    iconClass: 'bento-icon-violet',
    tag: 'آمن',
    title: 'توثيق كامل ومشفّر',
    desc: 'كل عملية موثقة بختم زمني وبيانات المانح والمستلم مع ضمان الخصوصية.',
  },
  {
    col: 'bento-c4',
    icon: BarChart3,
    iconClass: 'bento-icon-blue',
    tag: 'إحصاء',
    title: 'لوحة أثر مجتمعي',
    desc: 'إحصائيات مرئية تساعد المبادرات والجهات الداعمة على قياس الأثر الحقيقي بالأرقام.',
  },
  {
    col: 'bento-c5',
    icon: Users,
    iconClass: 'bento-icon-cyan',
    tag: 'مجتمع',
    title: 'شبكة متطوعين نشطة',
    desc: '420+ متطوع معتمد منتشر في أحياء بغداد والمدن العراقية للاستجابة الفورية.',
  },
];

export function FeatureSection() {
  return (
    <section className="features-section section-spacing">
      <div className="container">
        <div className="features-section-header" data-reveal>
          <div className="section-label">
            <Leaf size={14} />
            لماذا Food Rescue Hub
          </div>
          <h2 className="section-title section-title-center">
            منصة مصممة للكفاءة
            <br />
            <span className="gradient-text">والأثر الحقيقي</span>
          </h2>
          <div className="glow-divider" />
          <p className="section-desc section-desc-center">
            تقنيات متقدمة وتجربة مستخدم احترافية لإنقاذ أكبر قدر ممكن من الطعام.
          </p>
        </div>

        <div className="features-bento">
          {bentoItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`bento-card ${item.col} ${item.large ? 'bento-card-large' : ''}`}
                data-reveal
                data-reveal-delay={String(i + 1)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--sp-4)' }}>
                  <div className={`bento-icon ${item.iconClass}`}>
                    <Icon size={26} />
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--r-full)',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--clr-text-3)',
                  }}>{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                {item.stats && (
                  <div className="bento-mini-stats">
                    {item.stats.map((s) => (
                      <div className="bento-mini-stat" key={s.label}>
                        <strong>{s.value}</strong>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {item.bar !== undefined && (
                  <>
                    <div style={{ marginTop: 'var(--sp-5)', display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-2)' }}>
                      <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-text-3)' }}>معدل الاستجابة</span>
                      <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-accent)', fontWeight: 700 }}>{item.bar}%</span>
                    </div>
                    <div className="bento-bar">
                      <div className="bento-bar-fill" style={{ width: `${item.bar}%` }} />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
