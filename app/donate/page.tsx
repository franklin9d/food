import Image from 'next/image';
import { DonateForm } from '@/components/DonateForm';

export default function DonatePage() {
  return (
    <section className="sectionSpacing">
      <div className="container pageHero splitSection">
        <div>
          <span className="eyebrow">تبرع بالفائض</span>
          <h1 className="pageTitle">أضف فائض الطعام خلال دقيقة واحدة</h1>
          <p className="pageText">
            هذه الصفحة تعمل الآن بالكامل. عند ربط Firebase سيتم إرسال كل التبرعات مباشرة إلى Firestore، وبدون الربط
            ستبقى شغالة في وضع تجريبي محلي.
          </p>
          <DonateForm />
        </div>
        <div className="imageFrame compactFrame">
          <Image src="/images/donation-form-visual.svg" alt="Donation visual" width={580} height={500} />
        </div>
      </div>
    </section>
  );
}
