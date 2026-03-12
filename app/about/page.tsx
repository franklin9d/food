export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.1) 0%, transparent 60%)',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div data-reveal>
            <span className="section-label">عن المشروع</span>
            <h1 className="page-title" style={{ marginTop: 'var(--sp-4)' }}>
              لماذا Food Rescue Hub
              <br />
              <span className="gradient-text">فكرة قوية للابتكار المجتمعي؟</span>
            </h1>
            <p className="page-subtitle">
              مشروع يعالج ثلاث مشكلات حقيقية في نفس الوقت ويحوّلها إلى حل واحد متكامل.
            </p>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container-narrow">
          <div className="about-content" data-reveal>
            <p>
              المشروع يعالج ثلاث مشكلات في وقت واحد: <strong style={{ color: 'var(--clr-primary-2)' }}>هدر الطعام</strong>، بطء الوصول إلى المحتاجين، وتشتت جهود المبادرات.
            </p>
            <p>
              المنصة تحول العملية من اجتهادات متفرقة إلى نظام رقمي واضح: تسجيل فائض، قبول استلام، متابعة، ثم قياس أثر.
            </p>
            <p>
              هذا يجعلها مناسبة جدًا للمسابقات لأنها تجمع بين الحل التقني، الفائدة الاجتماعية، وقابلية التوسع على مستوى المدن والجامعات والمناسبات والفنادق.
            </p>
          </div>

          {/* Values grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-5)',
            marginTop: 'var(--sp-10)',
          }}>
            {[
              { icon: '🌱', title: 'الاستدامة', text: 'تقليل الهدر الغذائي للحفاظ على الموارد.' },
              { icon: '🤝', title: 'التعاون', text: 'ربط المانحين والمتطوعين والمستفيدين.' },
              { icon: '📈', title: 'القياس', text: 'توثيق كل أثر بأرقام شفافة وموثوقة.' },
            ].map((v, i) => (
              <div
                key={v.title}
                className="feature-card"
                data-reveal
                data-reveal-delay={String(i + 1)}
                style={{ padding: 'var(--sp-6)' }}
              >
                <div className="feature-icon" style={{ marginBottom: 'var(--sp-4)' }}>{v.icon}</div>
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
