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
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const mode = await submitPickupRequest(form);
      setStatusType('success');
      setStatus(
        mode === 'firebase'
          ? '✅ تم تسجيل فريق الاستلام داخل Firebase بنجاح.'
          : '✅ تم الحفظ محليًا في الوضع التجريبي. أضف مفاتيح Firebase للحفظ المباشر.',
      );
      setForm(initialState);
    } catch {
      setStatusType('error');
      setStatus('❌ تعذر إرسال الطلب. تأكد من الإعدادات أو أعد المحاولة.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid two-cols">
        <label className="form-label">
          الاسم
          <input
            className="form-input"
            required
            placeholder="الاسم الكامل"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label className="form-label">
          اسم الجهة / الفريق
          <input
            className="form-input"
            required
            placeholder="اسم المبادرة أو الجمعية"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
          />
        </label>
        <label className="form-label">
          الهاتف
          <input
            className="form-input"
            required
            placeholder="+964 ..."
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>
        <label className="form-label">
          المنطقة
          <input
            className="form-input"
            required
            placeholder="المنطقة / الحي"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
          />
        </label>
        <label className="form-label">
          القدرة الاستيعابية
          <input
            className="form-input"
            required
            placeholder="مثال: 100 وجبة يومياً"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          />
        </label>
        <label className="form-label">
          أوقات التوفر
          <input
            className="form-input"
            required
            placeholder="مثال: يومياً 6م–10م"
            value={form.availability}
            onChange={(e) => setForm({ ...form, availability: e.target.value })}
          />
        </label>
        <label className="form-label full-span">
          ملاحظات إضافية
          <textarea
            className="form-input"
            rows={4}
            placeholder="أي معلومات إضافية عن إمكانيات الفريق أو متطلباته..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </label>
      </div>

      <button
        disabled={loading}
        className="btn btn-accent btn-wide"
        type="submit"
        style={{ marginTop: 'var(--sp-5)' }}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin-slow 0.7s linear infinite', display: 'inline-block' }} />
            جاري الإرسال...
          </span>
        ) : (
          'تسجيل فريق استلام ←'
        )}
      </button>

      {status && (
        <p className={`form-status ${statusType === 'error' ? 'error' : ''}`}>{status}</p>
      )}
    </form>
  );
}
