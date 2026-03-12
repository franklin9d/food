'use client';

import { useEffect, useMemo, useState } from 'react';
import { loadDashboardData, subscribeDashboardData, type ContactRecord, type DonationRecord, type PickupRecord } from '@/lib/storage';

type DashboardState = {
  donations: DonationRecord[];
  pickups: PickupRecord[];
  messages: ContactRecord[];
  source: 'firebase' | 'demo';
};

const formatDate = (value?: string) => {
  if (!value) return 'الآن';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'الآن';
  return new Intl.DateTimeFormat('ar-IQ', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

export function DashboardPreview() {
  const [data, setData] = useState<DashboardState>({ donations: [], pickups: [], messages: [], source: 'demo' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    loadDashboardData()
      .then((result) => {
        if (mounted) { setData(result); setLoading(false); }
      })
      .catch(() => {
        if (mounted) { setError('تعذر تحميل البيانات الحالية.'); setLoading(false); }
      });

    const unsubscribe = subscribeDashboardData(
      (result) => { if (mounted) { setData(result); setLoading(false); } },
      (message) => setError(message),
    );

    return () => { mounted = false; unsubscribe(); };
  }, []);

  const metrics = useMemo(() => {
    const completed = data.donations.filter((item) => item.status === 'completed').length;
    const newDonations = data.donations.filter((item) => item.status === 'new').length;
    return [
      {
        title: 'التبرعات المسجلة',
        value: String(data.donations.length),
        note: data.source === 'firebase' ? 'قراءة مباشرة من Firestore' : 'قراءة من الوضع التجريبي',
      },
      {
        title: 'فرق الاستلام',
        value: String(data.pickups.length),
        note: 'جهات ومتطوعون جاهزون للاستلام',
      },
      {
        title: 'رسائل التواصل',
        value: String(data.messages.length),
        note: 'استفسارات وشراكات مقترحة',
      },
      {
        title: 'الحالات الجديدة',
        value: String(newDonations),
        note: completed > 0 ? `${completed} حالة مكتملة` : 'جاهزة للمتابعة',
      },
    ];
  }, [data]);

  return (
    <div className="dashboard-shell">

      {/* Meta bar */}
      <div className="dashboard-meta-bar">
        <span className={`source-badge ${data.source === 'firebase' ? 'live' : ''}`}>
          <span className="dot" />
          {data.source === 'firebase' ? 'Live · Firestore' : 'Demo · Local'}
        </span>
        <p>اللوحة تعرض أحدث التبرعات وطلبات الاستلام ورسائل التواصل بشكل مباشر.</p>
      </div>

      {/* Metric cards */}
      <div className="metric-grid">
        {metrics.map((metric, i) => (
          <article className="metric-card" key={metric.title} data-reveal data-reveal-delay={String(i + 1)}>
            <span>{metric.title}</span>
            <strong>{metric.value}</strong>
            <small>{metric.note}</small>
          </article>
        ))}
      </div>

      {error && <p className="error-state">{error}</p>}
      {loading && <p className="loading-state">⏳ جاري تحميل البيانات...</p>}

      <div className="table-stack">

        {/* Donations table */}
        <div className="table-card" data-reveal>
          <div className="table-header">
            <div>
              <span>آخر التبرعات</span>
              <h3>سجل الجهات المانحة</h3>
            </div>
          </div>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>الجهة</th>
                  <th>المسؤول</th>
                  <th>النوع</th>
                  <th>المنطقة</th>
                  <th>الوقت</th>
                </tr>
              </thead>
              <tbody>
                {data.donations.length ? data.donations.map((row) => (
                  <tr key={row.id}>
                    <td style={{ fontWeight: 700, color: 'var(--clr-text)' }}>{row.organization}</td>
                    <td>{row.contact}</td>
                    <td>{row.foodType}</td>
                    <td>
                      <span style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.12)', padding: '3px 8px', borderRadius: 999, fontSize: 12 }}>
                        {row.area}
                      </span>
                    </td>
                    <td>{formatDate(row.createdAt)}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="empty-cell">لا توجد تبرعات بعد. ابدأ بإضافة تبرع!</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pickups table */}
        <div className="table-card" data-reveal>
          <div className="table-header">
            <div>
              <span>فرق الاستلام</span>
              <h3>الفرق والمبادرات</h3>
            </div>
          </div>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>الجهة</th>
                  <th>المنطقة</th>
                  <th>القدرة</th>
                  <th>التوفر</th>
                </tr>
              </thead>
              <tbody>
                {data.pickups.length ? data.pickups.map((row) => (
                  <tr key={row.id}>
                    <td style={{ fontWeight: 700, color: 'var(--clr-text)' }}>{row.name}</td>
                    <td>{row.organization}</td>
                    <td>
                      <span style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.12)', padding: '3px 8px', borderRadius: 999, fontSize: 12 }}>
                        {row.area}
                      </span>
                    </td>
                    <td>{row.capacity}</td>
                    <td>{row.availability}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="empty-cell">لا توجد طلبات استلام بعد.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Messages table */}
        <div className="table-card" data-reveal>
          <div className="table-header">
            <div>
              <span>رسائل التواصل</span>
              <h3>رسائل محفوظة في النظام</h3>
            </div>
          </div>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>الجهة</th>
                  <th>الهاتف</th>
                  <th>الإيميل</th>
                  <th>الرسالة</th>
                </tr>
              </thead>
              <tbody>
                {data.messages.length ? data.messages.map((row) => (
                  <tr key={row.id}>
                    <td style={{ fontWeight: 700, color: 'var(--clr-text)' }}>{row.name}</td>
                    <td>{row.organization || '—'}</td>
                    <td>{row.phone}</td>
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
  );
}
