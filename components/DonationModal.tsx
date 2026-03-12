'use client';

import { useEffect } from 'react';
import { type DonationRecord } from '@/lib/storage';
import { getFoodImage, getFoodEmoji } from '@/lib/foodImages';

interface DonationModalProps {
  donation: DonationRecord | null;
  onClose: () => void;
}

const formatDate = (value?: string) => {
  if (!value) return 'الآن';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'الآن';
  return new Intl.DateTimeFormat('ar-IQ', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);
};

const callPhone = (phone: string) => {
  if (!phone) return;
  window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
};

const openWhatsApp = (phone: string, orgName: string, foodType: string) => {
  if (!phone) return;
  const clean = phone.replace(/[^\d+]/g, '').replace(/^\+/, '');
  const msg = encodeURIComponent(
    `مرحباً ${orgName}،\n\nرأينا تبرعكم بـ (${foodType}) على منصة Food Rescue Hub.\nنود تنسيق الاستلام في أقرب وقت.\nشكراً! 🙏`
  );
  window.open(`https://wa.me/${clean}?text=${msg}`, '_blank');
};

const openMaps = (area: string) => {
  const query = encodeURIComponent(area + ' بغداد العراق');
  window.open(`https://www.google.com/maps/search/${query}`, '_blank');
};

export function DonationModal({ donation, onClose }: DonationModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = donation ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [donation, onClose]);

  if (!donation) return null;

  const foodImg = getFoodImage(donation.foodType);
  const foodEmoji = getFoodEmoji(donation.foodType);
  const statusColor = donation.status === 'new' ? '#22c55e' : donation.status === 'completed' ? '#60a5fa' : '#f97316';
  const statusLabel = donation.status === 'new' ? 'جاهز للاستلام' : donation.status === 'completed' ? 'تم التسليم' : 'قيد التوزيع';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1001,
          width: 'min(520px, 95vw)',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--clr-surface)',
          border: '1px solid rgba(249,115,22,0.25)',
          borderRadius: 20,
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.1)',
          animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Food image header */}
        <div style={{ position: 'relative', height: 200, overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
          {foodImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={foodImg}
              alt={donation.foodType}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 80,
            }}>
              {foodEmoji}
            </div>
          )}
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(transparent 40%, rgba(10,10,15,0.9) 100%)',
          }} />
          {/* Food type badge */}
          <div style={{
            position: 'absolute', bottom: 16, right: 16,
            background: 'rgba(249,115,22,0.9)',
            backdropFilter: 'blur(8px)',
            color: 'white', fontWeight: 700, fontSize: 15,
            padding: '6px 16px', borderRadius: 999,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span>{foodEmoji}</span>
            {donation.foodType}
          </div>
          {/* Status badge */}
          <div style={{
            position: 'absolute', bottom: 16, left: 16,
            background: `rgba(${statusColor === '#22c55e' ? '34,197,94' : statusColor === '#60a5fa' ? '96,165,250' : '249,115,22'},0.15)`,
            border: `1px solid ${statusColor}40`,
            color: statusColor, fontSize: 12, fontWeight: 700,
            padding: '5px 12px', borderRadius: 999,
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: statusColor, display: 'inline-block',
              boxShadow: `0 0 6px ${statusColor}`,
            }} />
            {statusLabel}
          </div>
          {/* Close btn */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 12, left: 12,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white', cursor: 'pointer', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px 24px 28px' }}>
          {/* Restaurant name */}
          <h2 style={{
            fontSize: 22, fontWeight: 800, margin: '0 0 4px',
            color: 'var(--clr-text)',
          }}>
            {donation.organization}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--clr-text-muted)', margin: '0 0 20px' }}>
            المسؤول: {donation.contact}
          </p>

          {/* Info grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 12, marginBottom: 20,
          }}>
            {[
              { icon: '🍽️', label: 'نوع الطعام', val: donation.foodType },
              { icon: '📦', label: 'الكمية', val: donation.quantity },
              { icon: '📍', label: 'المنطقة', val: donation.area },
              { icon: '🕐', label: 'وقت الاستلام', val: donation.pickupTime ? new Intl.DateTimeFormat('ar-IQ', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(donation.pickupTime)) : '—' },
            ].map((item) => (
              <div key={item.label} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12, padding: '12px 14px',
              }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: 11, color: 'var(--clr-text-muted)', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--clr-text)' }}>{item.val || '—'}</div>
              </div>
            ))}
          </div>

          {/* Notes */}
          {donation.notes && (
            <div style={{
              background: 'rgba(249,115,22,0.05)',
              border: '1px solid rgba(249,115,22,0.15)',
              borderRadius: 10, padding: '12px 14px', marginBottom: 20,
            }}>
              <div style={{ fontSize: 12, color: 'var(--clr-text-muted)', marginBottom: 4 }}>📝 ملاحظات</div>
              <div style={{ fontSize: 14, color: 'var(--clr-text)', lineHeight: 1.6 }}>{donation.notes}</div>
            </div>
          )}

          {/* Time registered */}
          <div style={{
            fontSize: 12, color: 'var(--clr-text-muted)',
            marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span>🕐</span>
            تم التسجيل: {formatDate(donation.createdAt)}
          </div>

          {/* Action buttons */}
          {donation.phone && (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={() => callPhone(donation.phone)}
                style={{
                  flex: 1, minWidth: 130,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.08))',
                  border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: 12, padding: '12px 16px',
                  cursor: 'pointer', color: '#22c55e',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
                }}
              >
                📞 اتصال
                <span style={{ fontSize: 12, opacity: 0.8, fontWeight: 400 }}>{donation.phone}</span>
              </button>

              <button
                onClick={() => openWhatsApp(donation.phone, donation.organization, donation.foodType)}
                style={{
                  flex: 1, minWidth: 130,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: 'linear-gradient(135deg, rgba(37,211,102,0.15), rgba(37,211,102,0.08))',
                  border: '1px solid rgba(37,211,102,0.3)',
                  borderRadius: 12, padding: '12px 16px',
                  cursor: 'pointer', color: '#25d366',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
                }}
              >
                💬 واتساب
              </button>

              {donation.area && (
                <button
                  onClick={() => openMaps(donation.area)}
                  style={{
                    flex: 1, minWidth: 130,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.08))',
                    border: '1px solid rgba(59,130,246,0.3)',
                    borderRadius: 12, padding: '12px 16px',
                    cursor: 'pointer', color: '#60a5fa',
                    fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
                  }}
                >
                  🗺️ الموقع
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translate(-50%,-44%) } to { opacity:1; transform:translate(-50%,-50%) } }
      `}</style>
    </>
  );
}
