'use client';

import { FormEvent, useState } from 'react';
import { submitPickupRequest } from '@/lib/storage';

const initialState = {
  name: '',
  organization: '',
  phone: '',
  area: '',
  capacity: '',
  availability: '',
  notes: '',
};

export function PickupForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const mode = await submitPickupRequest(form);
      setStatus(
        mode === 'firebase'
          ? 'تم تسجيل فريق الاستلام داخل Firebase بنجاح.'
          : 'تم الحفظ محليًا في الوضع التجريبي. أضف مفاتيح Firebase للحفظ المباشر.',
      );
      setForm(initialState);
    } catch {
      setStatus('تعذر إرسال الطلب. تأكد من الإعدادات أو أعد المحاولة.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="formCard" onSubmit={handleSubmit}>
      <div className="formGrid twoCols">
        <label>
          الاسم
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          اسم الجهة / الفريق
          <input required value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
        </label>
        <label>
          الهاتف
          <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </label>
        <label>
          المنطقة
          <input required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
        </label>
        <label>
          القدرة الاستيعابية
          <input required value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
        </label>
        <label>
          أوقات التوفر
          <input required value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} />
        </label>
        <label className="fullSpan">
          ملاحظات
          <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </label>
      </div>
      <button disabled={loading} className="primaryButton submitButton" type="submit">
        {loading ? 'جاري الإرسال...' : 'تسجيل فريق استلام'}
      </button>
      {status && <p className="formStatus">{status}</p>}
    </form>
  );
}
