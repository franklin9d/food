import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <section className="sectionSpacing">
      <div className="container narrowContent contactLayout">
        <div>
          <span className="eyebrow">تواصل وشراكات</span>
          <h1 className="pageTitle">أرسل رسالة تُحفظ مباشرة داخل النظام</h1>
          <p className="pageText">
            هذه الصفحة مخصصة للشراكات مع المطاعم والفنادق والمبادرات، أو لطلب نسخة عرض وتخصيص إضافي للمشروع.
          </p>
          <div className="richTextCard compactInfoCard">
            <p><strong>البريد المقترح:</strong> hello@foodrescuehub.app</p>
            <p><strong>الهاتف المقترح:</strong> +964 770 000 0000</p>
            <p><strong>ملاحظة:</strong> كل رسالة تُحفظ في مجموعة <code>contact_messages</code> داخل Firestore.</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
