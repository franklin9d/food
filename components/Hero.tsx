import Link from 'next/link';
import Image from 'next/image';
import { stats } from '@/lib/data';

export function Hero() {
  return (
    <section className="heroSection">
      <div className="container heroGrid">
        <div>
          <span className="eyebrow">ابتكار مجتمعي · تقليل الهدر · أثر قابل للقياس</span>
          <h1>حوّل فائض الطعام إلى أثر حقيقي يصل للمحتاجين بسرعة وأناقة.</h1>
          <p className="heroText">
            موقع احترافي يربط المطاعم والمخابز والفنادق وفرق التوزيع في منصة واحدة لإدارة فائض الطعام، تقليل
            الهدر، وتوثيق الأثر المجتمعي.
          </p>
          <div className="heroActions">
            <Link href="/donate" className="primaryButton">ابدأ التبرع</Link>
            <Link href="/dashboard" className="secondaryButton">شاهد لوحة الأثر</Link>
          </div>

          <div className="statsGrid">
            {stats.map((item) => (
              <div className="statCard" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="heroVisual">
          <div className="glassCard floatingCard">
            <span>تحديث مباشر</span>
            <strong>18 طلب جاهز للاستلام</strong>
            <p>أقرب متطوع يبعد 7 دقائق</p>
          </div>
          <Image src="/images/hero-food-rescue.svg" alt="Food Rescue Illustration" width={720} height={620} priority />
        </div>
      </div>
    </section>
  );
}
