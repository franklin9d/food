import { DashboardPreview } from '@/components/DashboardPreview';

export default function DashboardPage() {
  return (
    <>
      <div className="page-hero">
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 60%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div data-reveal>
            <span className="section-label">لوحة المتابعة</span>
            <h1 className="page-title" style={{ marginTop: 'var(--sp-4)' }}>
              متابعة التبرعات
              <br />
              <span className="gradient-text">بشكل مباشر</span>
            </h1>
            <p className="page-subtitle">
              جميع التبرعات وفرق الاستلام ورسائل التواصل في مكان واحد — مع إمكانية الاتصال المباشر.
            </p>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <DashboardPreview />
        </div>
      </div>
    </>
  );
}
