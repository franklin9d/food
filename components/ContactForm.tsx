'use client';

import { FormEvent, useState } from 'react';
import { submitContactMessage } from '@/lib/storage';

const initialState = {
  name: '',
  organization: '',
  phone: '',
  email: '',
  message: '',
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const mode = await submitContactMessage(form);
      setStatus(
        mode === 'firebase'
          ? 'تم إرسال الرسالة وحفظها داخل Firestore بنجاح.'
          : 'تم حفظ الرسالة محليًا في الوضع التجريبي.',
      );
      setForm(initialState);
    } catch {
      setStatus('تعذر إرسال الرسالة. تأكد من إعدادات Firestore ثم أعد المحاولة.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="formCard" onSubmit={handleSubmit}>
      <div className="formGrid twoCols">
        <label>
          الاسم الكامل
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          الجهة / المبادرة
          <input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
        </label>
        <label>
          رقم الهاتف
          <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </label>
        <label>
          البريد الإلكتروني
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label className="fullSpan">
          الرسالة
          <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </label>
      </div>
      <button disabled={loading} className="primaryButton submitButton" type="submit">
        {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
      </button>
      {status && <p className="formStatus">{status}</p>}
    </form>
  );
}
