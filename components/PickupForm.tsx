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

const sendWhatsAppPickupNotification = (phone: string, name: string, org: string, area: string) => {
  if (!phone) return;
  const clean = phone.replace(/[^\d+]/g, '').replace(/^\+/, '');
  const message = encodeURIComponent(
    `✅ مرحباً ${name}!\n\n` +
    `تم تسجيل فريقك في Food Rescue Hub بنجاح:\n\n` +
    `👤 الاسم: ${name}\n` +
    `🏪 الجهة: ${org}\n` +
    `📍 المنطقة: ${area}\n\n` +
    `سنتواصل معك فور توفر فائض طعام في منطقتك.\n` +
    `شكراً لتطوعك! ❤️\n\n` +
    `— فريق Food Rescue Hub`
  );
  window.open(`https://wa.me/${clean}?text=${message}`, '_blank');
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
          ? '✅ تم تسجيل فريقك بنجاح! ستصلك إشعارات عند توفر فائض قريب منك.'
          : '✅ تم تسجيل فريقك بنجاح! ستصلك إشعارات عند توفر فائض قريب منك.',
      );

      // Send WhatsApp notification
      if (form.phone) {
        setTimeout(() => {
          sendWhatsAppPickupNotification(form.phone, form.name, form.organization, form.area);
        }, 1500);
      }

      setForm(initialState);
    } catch {
      setStatusType('error');
      setStatus('❌ تعذر إرسال الطلب. تأكد من البيانات وأعد المحاولة.');
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
            placeholder="اسمك الكامل"
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

        {/* Phone with call/whatsapp buttons */}
        <label className="form-label">
          رقم الهاتف
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              className="form-input"
              required
              placeholder="+964 7XX XXX XXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={{ flex: 1 }}
            />
            {form.phone && (
              <>
                <a
                  href={`tel:${form.phone}`}
                  title="اتصال"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(34,197,94,0.12)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    textDecoration: 'none', fontSize: 18,
                  }}
                >
                  📞
                </a>
                <a
                  href={`https://wa.me/${form.phone.replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="واتساب"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(37,211,102,0.12)',
                    border: '1px solid rgba(37,211,102,0.3)',
                    textDecoration: 'none', fontSize: 18,
                  }}
                >
                  💬
                </a>
              </>
            )}
          </div>
        </label>

        <label className="form-label">
          المنطقة / الحي
          <input
            className="form-input"
            required
            placeholder="مثال: المنصور، الكرادة، الزعفرانية..."
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
            rows={3}
            placeholder="أي معلومات إضافية عن إمكانيات الفريق أو متطلباته..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </label>
      </div>

      {/* WhatsApp info note */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(37,211,102,0.06)',
        border: '1px solid rgba(37,211,102,0.2)',
        borderRadius: 10,
        fontSize: 13,
        color: 'var(--clr-text-muted)',
        display: 'flex', alignItems: 'center', gap: 10,
        marginTop: 8,
      }}>
        <span style={{ fontSize: 20 }}>💬</span>
        <span>
          بعد التسجيل ستصلك رسالة واتساب تأكيدية فيها كل تفاصيل تسجيلك — وستُبلَّغ عند توفر فائض في منطقتك.
        </span>
      </div>

      <button
        disabled={loading}
        className="btn btn-accent btn-wide"
        type="submit"
        style={{ marginTop: 'var(--sp-5)' }}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: 'white',
              animation: 'spin-slow 0.7s linear infinite',
              display: 'inline-block'
            }} />
            جاري التسجيل...
          </span>
        ) : (
          '🚚 تسجيل فريق استلام ←'
        )}
      </button>

      {status && (
        <p className={`form-status ${statusType === 'error' ? 'error' : ''}`}>{status}</p>
      )}
    </form>
  );
}
