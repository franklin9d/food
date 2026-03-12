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
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const mode = await submitDonation(form);
      setStatusType('success');
      setStatus(
        mode === 'firebase'
          ? '✅ تم إرسال التبرع إلى Firebase بنجاح.'
          : '✅ تم حفظ التبرع في الوضع التجريبي. أضف مفاتيح Firebase ليصبح الحفظ مباشرًا.',
      );
      setForm(initialState);
    } catch {
      setStatusType('error');
      setStatus('❌ حدث خطأ أثناء الإرسال. تأكد من إعدادات Firebase أو أعد المحاولة.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid two-cols">
        <label className="form-label">
          اسم الجهة
          <input
            className="form-input"
            required
            placeholder="مثال: مطعم البيت الدمشقي"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
          />
        </label>
        <label className="form-label">
          اسم المسؤول
          <input
            className="form-input"
            required
            placeholder="الاسم الكامل"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
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
          نوع الطعام
          <input
            className="form-input"
            required
            placeholder="وجبات مطبوخة، خبز، حلويات..."
            value={form.foodType}
            onChange={(e) => setForm({ ...form, foodType: e.target.value })}
          />
        </label>
        <label className="form-label">
          الكمية التقريبية
          <input
            className="form-input"
            required
            placeholder="مثال: 50 وجبة"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
        </label>
        <label className="form-label">
          وقت الجاهزية للاستلام
          <input
            className="form-input"
            required
            type="datetime-local"
            value={form.pickupTime}
            onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}
          />
        </label>
        <label className="form-label full-span">
          المنطقة
          <input
            className="form-input"
            required
            placeholder="المنطقة / الحي"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
          />
        </label>
        <label className="form-label full-span">
          ملاحظات السلامة أو التعبئة
          <textarea
            className="form-input"
            rows={4}
            placeholder="أي ملاحظات خاصة بالتعبئة أو التخزين أو السلامة الغذائية..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
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
          'إرسال التبرع الآن ←'
        )}
      </button>

      {status && (
        <p className={`form-status ${statusType === 'error' ? 'error' : ''}`}>{status}</p>
      )}
    </form>
  );
}
