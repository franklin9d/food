'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  subscribeDashboardData,
  type ContactRecord,
  type DonationRecord,
  type PickupRecord,
} from '@/lib/storage';
import { DonationModal } from './DonationModal';
import { getFoodImage, getFoodEmoji } from '@/lib/foodImages';

type DashboardState = {
  donations: DonationRecord[];
  pickups: PickupRecord[];
  messages: ContactRecord[];
  source: 'firebase' | 'demo';
};

const readLocalAll = (): DashboardState => ({
  donations: (() => { try { return JSON.parse(localStorage.getItem('food-rescue-donations') || '[]'); } catch { return []; } })(),
  pickups:   (() => { try { return JSON.parse(localStorage.getItem('food-rescue-pickups')   || '[]'); } catch { return []; } })(),
  messages:  (() => { try { return JSON.parse(localStorage.getItem('food-rescue-messages')  || '[]'); } catch { return []; } })(),
  source: 'demo',
});

const formatDate = (value?: string) => {
  if (!value) return 'الآن';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'الآن';
  return new Intl.DateTimeFormat('ar-IQ', { dateStyle: 'medium', timeStyle: 'short' }).format(d);
};

const callPhone = (phone: string) => { window.location.href = `tel:${phone.replace(/\s+/g, '')}`; };
const openWhatsApp = (phone: string) => {
  const clean = phone.replace(/[^\d+]/g, '').replace(/^\+/, '');
  window.open(`https://wa.me/${clean}`, '_blank');
};

export function DashboardPreview() {
  // ✅ Initialise SYNCHRONOUSLY from localStorage — no flicker/reload needed
  const [data, setData] = useState<DashboardState>(() => {
    if (typeof window === 'undefined') return { donations: [], pickups: [], messages: [], source: 'demo' };
    return readLocalAll();
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const [selectedDonation, setSelectedDonation] = useState<DonationRecord | null>(null);

  const handleData = useCallback((result: DashboardState) => {
    setData(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;

    // Subscribe to live updates (Firebase or localStorage events)
    const unsubscribe = subscribeDashboardData(
      (result) => { if (mounted) handleData(result); },
      (msg)    => { if (mounted) setError(msg); },
    );

    // Also listen to storage changes from other tabs
    const onStorage = () => { if (mounted) setData(readLocalAll()); };
    window.addEventListener('storage', onStorage);
    window.addEventListener('storage-sync', onStorage);

    return () => {
      mounted = false;
      unsubscribe();
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('storage-sync', onStorage);
    };
  }, [handleData]);

  const metrics = useMemo(() => {
    const completed   = data.donations.filter((d) => d.status === 'completed').length;
    const newDonations = data.donations.filter((d) => d.status === 'new').length;
    return [
      { icon: '🍱', title: 'التبرعات المسجلة', value: String(data.donations.length), note: data.source === 'firebase' ? 'قراءة مباشرة' : 'مُحدَّث لحظياً' },
      { icon: '🚚', title: 'فرق الاستلام',     value: String(data.pickups.length),   note: 'جهات ومتطوعون جاهزون' },
      { icon: '💬', title: 'رسائل التواصل',     value: String(data.messages.length),  note: 'استفسارات وشراكات' },
      { icon: '🆕', title: 'الحالات الجديدة',   value: String(newDonations),          note: completed > 0 ? `${completed} مكتملة` : 'جاهزة للمتابعة' },
    ];
  }, [data]);

  return (
    <>
      {/* ── Modal ── */}
      <DonationModal donation={selectedDonation} onClose={() => setSelectedDonation(null)} />

      <div className="dashboard-shell">

        {/* Meta bar */}
        <div className="dashboard-meta-bar">
          <span className={`source-badge ${data.source === 'firebase' ? 'live' : ''}`}>
            <span className="dot" />
            {data.source === 'firebase' ? 'Live · Firestore' : 'محلي · مُحدَّث فوري'}
          </span>
          <p>اضغط على أي تبرع لعرض تفاصيله الكاملة وصورة الأكلة.</p>
        </div>

        {/* Metric cards */}
        <div className="metric-grid">
          {metrics.map((m, i) => (
            <article className="metric-card" key={m.title} data-reveal data-reveal-delay={String(i + 1)}>
              <span style={{ fontSize: 26, marginBottom: 4, display: 'block' }}>{m.icon}</span>
              <span>{m.title}</span>
              <strong>{m.value}</strong>
              <small>{m.note}</small>
            </article>
          ))}
        </div>

        {error   && <p className="error-state">⚠️ {error}</p>}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', padding: '16px 0', color: 'var(--clr-text-muted)', fontSize: 14 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(249,115,22,0.3)', borderTopColor: 'var(--clr-primary-2)', animation: 'spin-slow 0.7s linear infinite', display: 'inline-block' }} />
            جاري التحديث...
          </div>
        )}

        <div className="table-stack">

          {/* ── Donations table ── */}
          <div className="table-card" data-reveal>
            <div className="table-header">
              <div>
                <span>آخر التبرعات</span>
                <h3>سجل الجهات المانحة</h3>
              </div>
              <span style={{ fontSize: 12, color: 'var(--clr-text-muted)', fontWeight: 400 }}>
                اضغط على الصف لعرض التفاصيل 👆
              </span>
            </div>
            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <th>الأكلة</th>
                    <th>الجهة</th>
                    <th>المسؤول</th>
                    <th>المنطقة</th>
                    <th>الهاتف</th>
                    <th>الوقت</th>
                  </tr>
                </thead>
                <tbody>
                  {data.donations.length ? data.donations.map((row) => {
                    const img   = getFoodImage(row.foodType);
                    const emoji = getFoodEmoji(row.foodType);
                    return (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedDonation(row)}
                        style={{ cursor: 'pointer', transition: 'background 0.15s' }}
                        className="clickable-row"
                      >
                        {/* Food cell with image */}
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{
                              width: 42, height: 42, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
                              background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.15)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                            }}>
                              {img ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={img} alt={row.foodType} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                              ) : emoji}
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--clr-text)' }}>
                              {row.foodType}
                            </span>
                          </div>
                        </td>
                        <td style={{ fontWeight: 700, color: 'var(--clr-text)' }}>{row.organization}</td>
                        <td style={{ color: 'var(--clr-text-muted)', fontSize: 13 }}>{row.contact}</td>
                        <td>
                          <span style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.15)', padding: '3px 8px', borderRadius: 999, fontSize: 12 }}>
                            {row.area}
                          </span>
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          {row.phone ? (
                            <div style={{ display: 'flex', gap: 5 }}>
                              <button onClick={() => callPhone(row.phone)} title="اتصال"
                                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 7, padding: '4px 9px', cursor: 'pointer', fontSize: 13, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4 }}>
                                📞 {row.phone}
                              </button>
                              <button onClick={() => openWhatsApp(row.phone)} title="واتساب"
                                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: 7, padding: '4px 8px', cursor: 'pointer', fontSize: 13 }}>
                                💬
                              </button>
                            </div>
                          ) : '—'}
                        </td>
                        <td style={{ fontSize: 12, color: 'var(--clr-text-muted)' }}>{formatDate(row.createdAt)}</td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan={6} className="empty-cell">لا توجد تبرعات بعد. ابدأ بإضافة تبرع!</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Pickups table ── */}
          <div className="table-card" data-reveal>
            <div className="table-header">
              <div><span>فرق الاستلام</span><h3>الفرق والمبادرات</h3></div>
            </div>
            <div className="responsive-table">
              <table>
                <thead>
                  <tr><th>الاسم</th><th>الجهة</th><th>المنطقة</th><th>القدرة</th><th>الهاتف</th><th>التوفر</th></tr>
                </thead>
                <tbody>
                  {data.pickups.length ? data.pickups.map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: 'var(--clr-text)' }}>{row.name}</td>
                      <td>{row.organization}</td>
                      <td><span style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)', padding: '3px 8px', borderRadius: 999, fontSize: 12 }}>{row.area}</span></td>
                      <td>{row.capacity}</td>
                      <td>
                        {row.phone ? (
                          <div style={{ display: 'flex', gap: 5 }}>
                            <button onClick={() => callPhone(row.phone)} title="اتصال"
                              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 7, padding: '4px 9px', cursor: 'pointer', fontSize: 13, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4 }}>
                              📞 {row.phone}
                            </button>
                            <button onClick={() => openWhatsApp(row.phone)} title="واتساب"
                              style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: 7, padding: '4px 8px', cursor: 'pointer', fontSize: 13 }}>
                              💬
                            </button>
                          </div>
                        ) : '—'}
                      </td>
                      <td>{row.availability}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={6} className="empty-cell">لا توجد طلبات استلام بعد.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Messages table ── */}
          <div className="table-card" data-reveal>
            <div className="table-header">
              <div><span>رسائل التواصل</span><h3>رسائل محفوظة في النظام</h3></div>
            </div>
            <div className="responsive-table">
              <table>
                <thead>
                  <tr><th>الاسم</th><th>الجهة</th><th>الهاتف</th><th>الإيميل</th><th>الرسالة</th></tr>
                </thead>
                <tbody>
                  {data.messages.length ? data.messages.map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: 'var(--clr-text)' }}>{row.name}</td>
                      <td>{row.organization || '—'}</td>
                      <td>
                        {row.phone ? (
                          <div style={{ display: 'flex', gap: 5 }}>
                            <button onClick={() => callPhone(row.phone)} title="اتصال"
                              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 7, padding: '4px 9px', cursor: 'pointer', fontSize: 13, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4 }}>
                              📞 {row.phone}
                            </button>
                            <button onClick={() => openWhatsApp(row.phone)} title="واتساب"
                              style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: 7, padding: '4px 8px', cursor: 'pointer', fontSize: 13 }}>
                              💬
                            </button>
                          </div>
                        ) : '—'}
                      </td>
                      <td>{row.email}</td>
                      <td className="message-cell">{row.message}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="empty-cell">لا توجد رسائل بعد.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* clickable-row hover style */}
      <style>{`
        .clickable-row:hover { background: rgba(249,115,22,0.05) !important; }
      `}</style>
    </>
  );
}
