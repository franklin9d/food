export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.1) 0%, transparent 60%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div data-reveal>
            <span className="section-label">عن المشروع</span>
            <h1 className="page-title" style={{ marginTop: 'var(--sp-4)' }}>
              لماذا Food Rescue Hub
              <br />
              <span className="gradient-text">مبادرة تغيير حقيقي</span>
            </h1>
            <p className="page-subtitle">
              نربط الجهات المانحة بفرق الاستلام لإنقاذ الطعام ووصوله لمن يحتاجه.
            </p>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container-narrow">
          <div className="about-content" data-reveal>
            <p>
              في العراق يُهدَر كميات كبيرة من الطعام يومياً من المطاعم والمخابز والفعاليات،
              بينما كثير من الأسر تحتاج لدعم غذائي.
              <strong style={{ color: 'var(--clr-primary-2)' }}> Food Rescue Hub</strong> جاء ليحل هذه الفجوة.
            </p>
            <p>
              المنصة تحول العملية من اجتهادات متفرقة إلى نظام رقمي واضح:
              تسجيل فائض → إشعار فوري لأقرب فريق → استلام وتوزيع → قياس الأثر.
            </p>
            <p>
              قابلة للتوسع على مستوى المدن والجامعات والمناسبات والفنادق في جميع أنحاء العراق.
            </p>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'var(--sp-4)',
            marginTop: 'var(--sp-8)',
          }} data-reveal>
            {[
              { icon: '🍱', val: '12,480+', label: 'وجبة تم إنقاذها' },
              { icon: '🏪', val: '96+', label: 'مطعم وشريك' },
              { icon: '👨‍👩‍👧', val: '3,240+', label: 'أسرة ومستفيد' },
              { icon: '🚚', val: '420+', label: 'متطوع نشط' },
            ].map((s, i) => (
              <div
                key={s.label}
                className="metric-card"
                data-reveal
                data-reveal-delay={String(i + 1)}
                style={{ textAlign: 'center', padding: 'var(--sp-6)' }}
              >
                <span style={{ fontSize: 30, display: 'block', marginBottom: 8 }}>{s.icon}</span>
                <strong style={{ fontSize: 'var(--fs-xl)', display: 'block', color: 'var(--clr-primary-2)' }}>{s.val}</strong>
                <small style={{ color: 'var(--clr-text-muted)', fontSize: 13 }}>{s.label}</small>
              </div>
            ))}
          </div>

          {/* Values grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--sp-5)',
            marginTop: 'var(--sp-10)',
          }}>
            {[
              { icon: '🌱', title: 'الاستدامة', text: 'تقليل الهدر الغذائي وحماية الموارد للأجيال القادمة.' },
              { icon: '🤝', title: 'التعاون', text: 'ربط المانحين والمتطوعين والمستفيدين في منظومة واحدة.' },
              { icon: '📈', title: 'القياس', text: 'توثيق كل أثر بأرقام شفافة وموثوقة للجميع.' },
            ].map((v, i) => (
              <div
                key={v.title}
                className="feature-card"
                data-reveal
                data-reveal-delay={String(i + 1)}
                style={{ padding: 'var(--sp-6)' }}
              >
                <div className="feature-icon" style={{ marginBottom: 'var(--sp-4)', fontSize: 32 }}>{v.icon}</div>
                <h3 style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-2)' }}>{v.title}</h3>
                <p style={{ fontSize: 'var(--fs-xs)' }}>{v.text}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
