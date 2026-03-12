import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 70% 0%, rgba(139,92,246,0.1) 0%, transparent 60%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div data-reveal>
            <span className="section-label">تواصل وشراكات</span>
            <h1 className="page-title" style={{ marginTop: 'var(--sp-4)' }}>
              أرسل رسالة تُحفظ
              <br />
              <span className="gradient-text">مباشرة داخل النظام</span>
            </h1>
            <p className="page-subtitle">
              للشراكات مع المطاعم والفنادق والمبادرات، أو لطلب تخصيص إضافي للمشروع.
            </p>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="contact-grid">

            {/* Info */}
            <div data-reveal>
              <div className="info-card" style={{ marginBottom: 'var(--sp-5)' }}>
                <h3>📬 تواصل مباشر</h3>
                <div style={{ display: 'grid', gap: 'var(--sp-3)', marginTop: 'var(--sp-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', background: 'rgba(249,115,22,0.1)', display: 'grid', placeItems: 'center', fontSize: '1rem', flexShrink: 0 }}>
                      📧
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-text-muted)', margin: 0 }}>البريد الإلكتروني</p>
                      <strong style={{ fontSize: 'var(--fs-sm)', color: 'var(--clr-text)', display: 'block' }}>hello@foodrescuehub.app</strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', background: 'rgba(34,197,94,0.1)', display: 'grid', placeItems: 'center', fontSize: '1rem', flexShrink: 0 }}>
                      📱
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-text-muted)', margin: 0 }}>الهاتف</p>
                      <strong style={{ fontSize: 'var(--fs-sm)', color: 'var(--clr-text)', display: 'block' }}>+964 770 000 0000</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>💾 الحفظ التلقائي</h3>
                <p>كل رسالة تُحفظ في مجموعة <code>contact_messages</code> داخل Firestore فور الإرسال.</p>
              </div>

              <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(59,130,246,0.04))', borderColor: 'rgba(139,92,246,0.15)', marginTop: 'var(--sp-5)' }}>
                <h3 style={{ color: '#a78bfa' }}>🤝 أنواع الشراكات</h3>
                <div style={{ display: 'grid', gap: 'var(--sp-2)', marginTop: 'var(--sp-3)' }}>
                  {['مطاعم وكافيهات', 'مخابز ومعجنات', 'فنادق وقاعات', 'مؤسسات أكاديمية', 'جمعيات خيرية'].map((p) => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--fs-xs)', color: 'var(--clr-text-3)' }}>
                      <span style={{ color: 'var(--clr-accent)', fontSize: '0.7rem' }}>✓</span>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div data-reveal data-reveal-delay="2">
              <ContactForm />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
