import { DashboardPreview } from '@/components/DashboardPreview';

export default function DashboardPage() {
  return (
    <section className="sectionSpacing">
      <div className="container">
        <div className="sectionHeading leftAligned narrowHeading">
          <span>لوحة الأثر</span>
          <h1>لوحة حية تقرأ البيانات الفعلية من المشروع</h1>
          <p>
            هذه الصفحة لم تعد مجرد عرض ثابت؛ هي تقرأ أحدث التبرعات وطلبات الاستلام ورسائل التواصل من Firestore مباشرة،
            أو من التخزين المحلي إذا فتحتها بدون قاعدة بيانات.
          </p>
        </div>
        <DashboardPreview />
      </div>
    </section>
  );
}
