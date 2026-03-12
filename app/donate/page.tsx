import { DonateForm } from '@/components/DonateForm';

export default function DonatePage() {
  return (
    <>
      <div className="page-hero">
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 30% 0%, rgba(249,115,22,0.12) 0%, transparent 60%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div data-reveal>
            <span className="section-label">تبرع بالفائض</span>
            <h1 className="page-title" style={{ marginTop: 'var(--sp-4)' }}>
              أضف فائض الطعام
              <br />
              <span className="gradient-text">خلال دقيقة واحدة</span>
            </h1>
            <p className="page-subtitle">
              سجّل بيانات مطعمك وحدد موقعه على الخريطة — سيتواصل معك فريق الاستلام فوراً.
            </p>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="page-split">

            {/* Sidebar info */}
            <div className="info-sidebar" data-reveal>
              <div className="info-card">
                <h3>📌 ماذا تحتاج؟</h3>
                <p>اسم المطعم، نوع الطعام، الكمية، وقت الاستلام، وتحديد الموقع على الخريطة.</p>
              </div>
              <div className="info-card">
                <h3>⚡ كيف يعمل؟</h3>
                <p>بعد الإرسال يظهر طلبك مباشرة لفرق الاستلام القريبة منك.</p>
              </div>
              <div className="info-card">
                <h3>📍 الخريطة التفاعلية</h3>
                <p>اضغط &quot;تحديد موقعي&quot; أو انقر على الخريطة لتحديد موقع مطعمك بدقة.</p>
              </div>
              <div className="info-card">
                <h3>💬 إشعار واتساب</h3>
                <p>بعد التسجيل ستصلك رسالة واتساب تأكيدية فيها كل تفاصيل التبرع.</p>
              </div>
              <div className="info-card" style={{
                background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(34,197,94,0.06))',
                borderColor: 'rgba(249,115,22,0.2)'
              }}>
                <h3 style={{ color: 'var(--clr-primary-2)' }}>🍽️ صورة الأكلة</h3>
                <p>اكتب نوع الطعام (كنتاكي، صاج، كباب...) وستظهر صورته تلقائياً!</p>
              </div>
            </div>

            {/* Form */}
            <div data-reveal data-reveal-delay="2">
              <DonateForm />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
