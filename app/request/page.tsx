import Image from 'next/image';
import { PickupForm } from '@/components/PickupForm';

export default function RequestPage() {
  return (
    <section className="sectionSpacing altSection">
      <div className="container pageHero splitSection">
        <div className="imageFrame compactFrame orderMobileLast">
          <Image src="/images/pickup-team.svg" alt="Pickup team" width={580} height={500} />
        </div>
        <div>
          <span className="eyebrow">فرق الاستلام</span>
          <h1 className="pageTitle">سجل فريقك أو مبادرتك لاستلام الفائض</h1>
          <p className="pageText">
            للمتطوعين والجهات الشريكة. يمكن ربط هذه البيانات لاحقًا بلوحة إدارة متقدمة أو نظام صلاحيات كامل.
          </p>
          <PickupForm />
        </div>
      </div>
    </section>
  );
}
