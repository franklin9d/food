import { ClipboardList, Truck, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'الجهة المانحة تضيف الفائض',
    desc: 'نوع الطعام، الكمية التقريبية، وقت الاستلام، الموقع الجغرافي الدقيق، وملاحظات السلامة الغذائية — كل ذلك في أقل من دقيقة.',
    color: 'var(--clr-primary)',
    glow: 'rgba(249,115,22,0.15)',
  },
  {
    step: '02',
    icon: Truck,
    title: 'المتطوع يستلم الإشعار',
    desc: 'يصل الإشعار الفوري لأقرب جهة استلام مع عرض كامل للتفاصيل وخريطة للوصول السريع.',
    color: 'var(--clr-accent)',
    glow: 'rgba(34,197,94,0.15)',
  },
  {
    step: '03',
    icon: Star,
    title: 'التسليم وتوثيق الأثر',
    desc: 'يتم التسليم للمستفيدين مع تحديث مباشر للحالة وإضافة الإحصاءات لوحة الأثر المجتمعي.',
    color: 'var(--clr-violet)',
    glow: 'rgba(139,92,246,0.15)',
  },
];

export function HowItWorks() {
  return (
    <section className="hiw-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-14)' }} data-reveal>
          <div className="section-label">
            <span>⚡</span>
            كيف يعمل النظام
          </div>
          <h2 className="section-title section-title-center">
            ثلاث خطوات بسيطة
            <br />
            <span className="gradient-text">لأثر لا يُقدَّر</span>
          </h2>
          <div className="glow-divider" />
          <p className="section-desc section-desc-center">
            من لحظة تسجيل الفائض حتى وصوله للمستفيد — النظام يدير كل شيء بشكل آلي وشفاف.
          </p>
        </div>

        <div className="hiw-grid">
          <div className="hiw-connector" />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div className="hiw-step" key={s.step} data-reveal data-reveal-delay={String(i + 1)}>
                <div
                  className="hiw-step-number"
                  style={{
                    background: s.glow,
                    borderColor: s.color + '40',
                    color: s.color,
                    boxShadow: `0 0 20px ${s.glow}`,
                  }}
                >
                  {s.step}
                </div>
                <div
                  style={{
                    width: 52, height: 52,
                    borderRadius: 'var(--r-lg)',
                    background: s.glow,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--sp-5)',
                    color: s.color,
                  }}
                >
                  <Icon size={24} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--sp-10)' }} data-reveal>
          <Link href="/donate" className="btn btn-primary btn-xl">
            ابدأ الآن مجانًا
            <ArrowLeft size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
