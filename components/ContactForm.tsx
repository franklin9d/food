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
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const mode = await submitContactMessage(form);
      setStatusType('success');
      setStatus(
        mode === 'firebase'
          ? '✅ تم إرسال الرسالة وحفظها داخل Firestore بنجاح.'
          : '✅ تم حفظ الرسالة محليًا في الوضع التجريبي.',
      );
      setForm(initialState);
    } catch {
      setStatusType('error');
      setStatus('❌ تعذر إرسال الرسالة. تأكد من إعدادات Firestore ثم أعد المحاولة.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid two-cols">
        <label className="form-label">
          الاسم الكامل
          <input
            className="form-input"
            required
            placeholder="الاسم الكامل"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label className="form-label">
          الجهة / المبادرة
          <input
            className="form-input"
            placeholder="اسم المؤسسة أو الجمعية (اختياري)"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
          />
        </label>
        <label className="form-label">
          رقم الهاتف
          <input
            className="form-input"
            required
            placeholder="+964 ..."
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>
        <label className="form-label">
          البريد الإلكتروني
          <input
            className="form-input"
            type="email"
            required
            placeholder="example@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label className="form-label full-span">
          الرسالة
          <textarea
            className="form-input"
            rows={5}
            required
            placeholder="اكتب رسالتك هنا..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </label>
      </div>

      <button
        disabled={loading}
        className="btn btn-primary btn-wide"
        type="submit"
        style={{ marginTop: 'var(--sp-5)' }}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin-slow 0.7s linear infinite', display: 'inline-block' }} />
            جاري الإرسال...
          </span>
        ) : (
          'إرسال الرسالة ←'
        )}
      </button>

      {status && (
        <p className={`form-status ${statusType === 'error' ? 'error' : ''}`}>{status}</p>
      )}
    </form>
  );
}
