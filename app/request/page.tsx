import { PickupForm } from '@/components/PickupForm';

export default function RequestPage() {
  return (
    <>
      <div className="page-hero">
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 80% 0%, rgba(34,197,94,0.1) 0%, transparent 60%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div data-reveal>
            <span className="section-label">فرق الاستلام</span>
            <h1 className="page-title" style={{ marginTop: 'var(--sp-4)' }}>
              سجل فريقك
              <br />
              <span className="gradient-text">لاستلام الفائض</span>
            </h1>
            <p className="page-subtitle">
              للمتطوعين والجهات الشريكة. يمكن ربط هذه البيانات بلوحة إدارة متقدمة ونظام صلاحيات كامل.
            </p>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="page-split">

            {/* Sidebar */}
            <div className="info-sidebar" data-reveal>
              <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.04))', borderColor: 'rgba(34,197,94,0.2)' }}>
                <h3 style={{ color: 'var(--clr-accent)' }}>🚀 كيف تنضم للفريق؟</h3>
                <p>سجّل بياناتك والمنطقة التي تغطيها، وسيصلك إشعار عند توفر فائض قريب منك.</p>
              </div>
              <div className="info-card">
                <h3>📍 التغطية الجغرافية</h3>
                <p>النظام يوزع الطلبات حسب المنطقة لضمان أسرع وقت استجابة ممكن.</p>
              </div>
              <div className="info-card">
                <h3>⏰ أوقات التوفر</h3>
                <p>حدد الأوقات المتاحة لك حتى يتمكن النظام من تحويل الطلبات المناسبة.</p>
              </div>
              <div className="info-card">
                <h3>📦 القدرة الاستيعابية</h3>
                <p>أدخل الحد الأقصى للوجبات التي يمكن لفريقك استلامها وتوزيعها يومياً.</p>
              </div>
            </div>

            {/* Form */}
            <div data-reveal data-reveal-delay="2">
              <PickupForm />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
