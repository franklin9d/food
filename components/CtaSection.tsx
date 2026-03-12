import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="sectionSpacing">
      <div className="container">
        <div className="ctaPanel">
          <div>
            <span>ابدأ الآن</span>
            <h2>جاهز لتحويل المشروع إلى منصة حقيقية على Firebase وVercel؟</h2>
            <p>الموقع يعمل الآن بوضع تجريبي، وبمجرد إضافة بيانات Firebase سيبدأ الحفظ المباشر داخل قاعدة البيانات.</p>
          </div>
          <div className="ctaActions">
            <Link href="/donate" className="primaryButton">إضافة تبرع</Link>
            <Link href="/contact" className="secondaryButton light">طلب تخصيص إضافي</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
