import Link from 'next/link';

export function Footer() {
  return (
    <footer className="siteFooter">
      <div className="container footerGrid">
        <div>
          <h3>Food Rescue Hub</h3>
          <p>
            منصة رقمية لتقليل هدر الطعام وربط الجهات المانحة بفرق الاستلام والتوزيع بطريقة منظمة وسريعة.
          </p>
        </div>
        <div>
          <h4>روابط سريعة</h4>
          <div className="footerLinks">
            <Link href="/donate">تبرع بالفائض</Link>
            <Link href="/request">طلب استلام</Link>
            <Link href="/dashboard">لوحة الأثر</Link>
            <Link href="/contact">تواصل</Link>
          </div>
        </div>
        <div>
          <h4>جاهز للربط مع Firebase</h4>
          <p>أضف مفاتيح البيئة في Vercel ليصبح حفظ البيانات مباشرًا داخل قاعدة Firestore.</p>
        </div>
      </div>
    </footer>
  );
}
