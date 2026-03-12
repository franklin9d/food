import Link from 'next/link';
import { ArrowLeft, Heart, Users } from 'lucide-react';

const partners = [
  { emoji: '🍽️', name: 'مطاعم بغداد' },
  { emoji: '🏨', name: 'فنادق خمس نجوم' },
  { emoji: '🥖', name: 'مخابز عراقية' },
  { emoji: '🏫', name: 'مدارس وجامعات' },
  { emoji: '🎉', name: 'قاعات الأفراح' },
  { emoji: '🏪', name: 'محلات السوبرماركت' },
  { emoji: '🍗', name: 'مطاعم وجبات سريعة' },
  { emoji: '🌿', name: 'مبادرات المجتمع' },
];

export function CtaSection() {
  return (
    <>
      {/* Partners marquee */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...partners, ...partners].map((p, i) => (
            <div className="marquee-item" key={i}>
              <span>{p.emoji}</span>
              {p.name}
              <span style={{ color: 'rgba(249,115,22,0.3)', marginRight: 'var(--sp-5)' }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-panel" data-reveal>
            <div className="cta-panel-content">

              {/* Icons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
                {['🍱', '🥖', '🍗', '🌮', '🥘'].map((e, i) => (
                  <div
                    key={i}
                    style={{
                      width: 52, height: 52,
                      borderRadius: 'var(--r-lg)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 24,
                      animation: `floatY ${3 + i * 0.4}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {e}
                  </div>
                ))}
              </div>

              <h2 className="cta-title">
                كل وجبة تنقذها
                <br />
                <span className="gradient-text">تُغيّر حياة</span>
              </h2>
              <p className="cta-desc">
                انضم لشبكة من أكثر من 96 مطعمًا ومخبزًا وفندقًا يساهمون يوميًا في تقليل الهدر الغذائي
                وإيصال الطعام لمن يحتاجه في بغداد والمحافظات.
              </p>

              {/* Stats row */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'var(--sp-8)',
                marginBottom: 'var(--sp-8)',
                flexWrap: 'wrap',
              }}>
                {[
                  { icon: <Heart size={16} />, value: '12,480+', label: 'وجبة منقذة' },
                  { icon: <Users size={16} />, value: '3,240+', label: 'مستفيد' },
                  { icon: '🤝', value: '96+', label: 'شريك فاعل' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: 'var(--sp-2)',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--fs-2xl)',
                      fontWeight: 900,
                      color: 'var(--clr-primary-2)',
                      marginBottom: 4,
                    }}>
                      {typeof s.icon === 'string' ? s.icon : s.icon}
                      {s.value}
                    </div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-text-3)', fontWeight: 600 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cta-actions">
                <Link href="/donate" className="btn btn-primary btn-xl">
                  تبرع بالفائض الآن
                  <ArrowLeft size={20} />
                </Link>
                <Link href="/request" className="btn btn-secondary btn-xl">
                  <Users size={18} />
                  اطلب استلام طعام
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
