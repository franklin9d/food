'use client';

import { FormEvent, useState } from 'react';
import { submitDonation } from '@/lib/storage';

const initialState = {
  organization: '',
  contact: '',
  phone: '',
  foodType: '',
  quantity: '',
  pickupTime: '',
  area: '',
  notes: '',
};

export function DonateForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const mode = await submitDonation(form);
      setStatus(
        mode === 'firebase'
          ? 'تم إرسال التبرع إلى Firebase بنجاح.'
          : 'تم حفظ التبرع في الوضع التجريبي. أضف مفاتيح Firebase ليصبح الحفظ مباشرًا.',
      );
      setForm(initialState);
    } catch {
      setStatus('حدث خطأ أثناء الإرسال. تأكد من إعدادات Firebase أو أعد المحاولة.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="formCard" onSubmit={handleSubmit}>
      <div className="formGrid twoCols">
        <label>
          اسم الجهة
          <input required value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
        </label>
        <label>
          اسم المسؤول
          <input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
        </label>
        <label>
          رقم الهاتف
          <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </label>
        <label>
          نوع الطعام
          <input required value={form.foodType} onChange={(e) => setForm({ ...form, foodType: e.target.value })} />
        </label>
        <label>
          الكمية التقريبية
          <input required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        </label>
        <label>
          وقت الجاهزية للاستلام
          <input required type="datetime-local" value={form.pickupTime} onChange={(e) => setForm({ ...form, pickupTime: e.target.value })} />
        </label>
        <label className="fullSpan">
          المنطقة
          <input required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
        </label>
        <label className="fullSpan">
          ملاحظات السلامة أو التعبئة
          <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </label>
      </div>
      <button disabled={loading} className="primaryButton submitButton" type="submit">
        {loading ? 'جاري الإرسال...' : 'إرسال التبرع'}
      </button>
      {status && <p className="formStatus">{status}</p>}
    </form>
  );
}
