'use client';

import dynamic from 'next/dynamic';
import { FormEvent, useState } from 'react';
import { submitDonation } from '@/lib/storage';

// Food type to image mapping
const foodImages: Record<string, string> = {
  // Iraqi foods
  'دولمة': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dolma.jpg/400px-Dolma.jpg',
  'كباب': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Iraqi_kebab.jpg/400px-Iraqi_kebab.jpg',
  'قيمة': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Qeema.jpg/400px-Qeema.jpg',
  'باچة': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bacha.jpg/400px-Bacha.jpg',
  'مسقوف': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Masgouf.jpg/400px-Masgouf.jpg',
  'تشريب': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tashreeb.jpg/400px-Tashreeb.jpg',
  'عقيلي': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dolma.jpg/400px-Dolma.jpg',
  // Fast foods
  'كنتاكي': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Fried_chicken_KFC.jpg/400px-Fried_chicken_KFC.jpg',
  'بيتزا': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/400px-Eq_it-na_pizza-margherita_sep2005_sml.jpg',
  'برغر': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/400px-Cheeseburger.jpg',
  'شاورما': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Shawarma_closeup.jpg/400px-Shawarma_closeup.jpg',
  'صاج': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dolma.jpg/400px-Dolma.jpg',
  'كص': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Qeema.jpg/400px-Qeema.jpg',
};

const foodKeywords: Record<string, string> = {
  'كنتاكي': '🍗',
  'بيتزا': '🍕',
  'برغر': '🍔',
  'شاورما': '🌮',
  'صاج': '🥙',
  'كص': '🍖',
  'دولمة': '🫙',
  'كباب': '🍢',
  'قيمة': '🥘',
  'باچة': '🍲',
  'مسقوف': '🐟',
  'تشريب': '🍲',
  'خبز': '🫓',
  'رز': '🍚',
  'دجاج': '🍗',
  'لحم': '🥩',
  'سمك': '🐟',
  'حلويات': '🍮',
  'كيك': '🎂',
  'وجبات': '🍱',
};

const getFoodEmoji = (foodType: string): string => {
  const lower = foodType.toLowerCase();
  for (const [key, emoji] of Object.entries(foodKeywords)) {
    if (lower.includes(key)) return emoji;
  }
  return '🍽️';
};

const getFoodImage = (foodType: string): string | null => {
  const lower = foodType;
  for (const [key, url] of Object.entries(foodImages)) {
    if (lower.includes(key)) return url;
  }
  return null;
};

const LocationPicker = dynamic(
  () => import('./LocationPicker').then((m) => m.LocationPicker),
  { ssr: false, loading: () => (
    <div style={{
      height: 340,
      background: 'var(--clr-surface)',
      borderRadius: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '1px solid var(--clr-border)',
      flexDirection: 'column', gap: 10,
    }}>
      <span style={{ fontSize: 30 }}>🗺️</span>
      <span style={{ color: 'var(--clr-text-muted)', fontSize: 14 }}>جاري تحميل الخريطة...</span>
    </div>
  )},
);

const initialState = {
  organization: '',
  contact: '',
  phone: '',
  foodType: '',
  quantity: '',
  pickupTime: '',
  area: '',
  locationAddress: '',
  locationLat: 0,
  locationLng: 0,
  notes: '',
};

const sendWhatsAppNotification = (phone: string, orgName: string, foodType: string, area: string) => {
  if (!phone) return;
  const clean = phone.replace(/[^\d+]/g, '').replace(/^\+/, '');
  const message = encodeURIComponent(
    `✅ مرحباً بك في Food Rescue Hub!\n\n` +
    `تم تسجيل تبرعك بنجاح:\n` +
    `🏪 الجهة: ${orgName}\n` +
    `🍽️ نوع الطعام: ${foodType}\n` +
    `📍 المنطقة: ${area}\n\n` +
    `سيتواصل معك فريق الاستلام قريباً. شكراً لمساهمتك! 🙏`
  );
  window.open(`https://wa.me/${clean}?text=${message}`, '_blank');
};

export function DonateForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(false);
  const [foodEmoji, setFoodEmoji] = useState('🍽️');
  const [foodImageUrl, setFoodImageUrl] = useState<string | null>(null);

  const handleFoodTypeChange = (value: string) => {
    setForm({ ...form, foodType: value });
    setFoodEmoji(getFoodEmoji(value));
    setFoodImageUrl(getFoodImage(value));
  };

  const handleLocationChange = (locationAddress: string, lat: number, lng: number) => {
    setForm((prev) => ({ ...prev, locationAddress, locationLat: lat, locationLng: lng }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const payload = {
        organization: form.organization,
        contact: form.contact,
        phone: form.phone,
        foodType: form.foodType,
        quantity: form.quantity,
        pickupTime: form.pickupTime,
        area: form.locationAddress || form.area,
        notes: form.notes,
      };
      const mode = await submitDonation(payload);
      setStatusType('success');
      setStatus(
        mode === 'firebase'
          ? '✅ تم إرسال التبرع بنجاح! سيتواصل معك فريق الاستلام قريباً.'
          : '✅ تم حفظ التبرع بنجاح! سيظهر في لوحة المتابعة.',
      );
      
      // Send WhatsApp notification
      if (form.phone) {
        setTimeout(() => {
          sendWhatsAppNotification(form.phone, form.organization, form.foodType, form.locationAddress || form.area);
        }, 1500);
      }
      
      setForm(initialState);
      setFoodEmoji('🍽️');
      setFoodImageUrl(null);
    } catch {
      setStatusType('error');
      setStatus('❌ حدث خطأ أثناء الإرسال. تأكد من البيانات وأعد المحاولة.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid two-cols">
        
        {/* Organization name */}
        <label className="form-label">
          اسم المطعم / الجهة
          <input
            className="form-input"
            required
            placeholder="مثال: مطعم أبو علي — كنتاكي المنصور"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
          />
        </label>

        {/* Contact person */}
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

        {/* Phone - with call/whatsapp buttons */}
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

        {/* Food type - with auto emoji/image */}
        <label className="form-label">
          نوع الطعام
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8, flexShrink: 0,
              background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, overflow: 'hidden',
            }}>
              {foodImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={foodImageUrl}
                  alt={form.foodType}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                  onError={() => setFoodImageUrl(null)}
                />
              ) : (
                <span>{foodEmoji}</span>
              )}
            </div>
            <input
              className="form-input"
              required
              placeholder="كنتاكي، صاج، كباب، بيتزا، دولمة..."
              value={form.foodType}
              onChange={(e) => handleFoodTypeChange(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
        </label>

        {/* Quantity */}
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

        {/* Pickup time */}
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

        {/* Location map - full span */}
        <div className="full-span">
          <label className="form-label" style={{ display: 'block', marginBottom: 8 }}>
            📍 موقع المطعم على الخريطة
            <span style={{ fontSize: 12, color: 'var(--clr-text-muted)', marginRight: 6, fontWeight: 400 }}>
              (انقر على الخريطة أو اضغط تحديد موقعي)
            </span>
          </label>
          <LocationPicker
            value={form.locationAddress}
            onChange={handleLocationChange}
            lat={form.locationLat || undefined}
            lng={form.locationLng || undefined}
          />
        </div>

        {/* Area (fallback or manual) */}
        <label className="form-label full-span">
          المنطقة / الحي (يدوي)
          <input
            className="form-input"
            placeholder="مثال: المنصور، الكرادة، الزعفرانية..."
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
          />
        </label>

        {/* Notes */}
        <label className="form-label full-span">
          ملاحظات السلامة أو التعبئة
          <textarea
            className="form-input"
            rows={3}
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
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: 'white',
              animation: 'spin-slow 0.7s linear infinite',
              display: 'inline-block'
            }} />
            جاري الإرسال...
          </span>
        ) : (
          '🍽️ إرسال التبرع الآن ←'
        )}
      </button>

      {status && (
        <div className={`form-status ${statusType === 'error' ? 'error' : ''}`} style={{
          display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 18px',
          borderRadius: 10, marginTop: 12,
        }}>
          <span>{status}</span>
          {statusType === 'success' && form.phone === '' && (
            <span style={{ fontSize: 12, opacity: 0.8 }}>
              سيُرسل إشعار واتساب للرقم المسجل
            </span>
          )}
        </div>
      )}
    </form>
  );
}
