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
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Clock, User, Building2, Utensils, Truck, Mail, MessageSquare, Package } from 'lucide-react';

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

const callPhone    = (phone: string) => { window.location.href = `tel:${phone.replace(/\s+/g, '')}`; };
const openWhatsApp = (phone: string) => {
  const clean = phone.replace(/[^\d+]/g, '').replace(/^\+/, '');
  window.open(`https://wa.me/${clean}`, '_blank');
};

/* ─── Status badge ─── */
const statusMap: Record<string, { label: string; cls: string }> = {
  new:       { label: 'جديد',         cls: 'status-new'    },
  active:    { label: 'قيد التوزيع',  cls: 'status-active' },
  completed: { label: 'مكتمل',        cls: 'status-done'   },
};

/* ─── Card entrance variant ─── */
const cardAnim = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0  },
};

/* ──────────────────────────────────────────────────────────────
   DONATION CARD
────────────────────────────────────────────────────────────── */
function DonationCard({ row, onClick }: { row: DonationRecord; onClick: () => void }) {
  const img   = getFoodImage(row.foodType);
  const emoji = getFoodEmoji(row.foodType);
  const st    = statusMap[row.status ?? 'new'] ?? statusMap.new;

  return (
    <motion.article
      className="db-card"
      variants={cardAnim}
      onClick={onClick}
      whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 20px rgba(249,115,22,0.07)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Top row: food image + name + status */}
      <div className="db-card-top">
        <div className="db-food-thumb">
          {img
            ? <img src={img} alt={row.foodType} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            : <span>{emoji}</span>
          }
        </div>
        <div className="db-card-title-group">
          <strong className="db-card-title">{row.foodType || 'غير محدد'}</strong>
          <span className="db-card-org">{row.organization}</span>
        </div>
        <span className={`status-badge ${st.cls}`}>{st.label}</span>
      </div>

      {/* Info rows */}
      <div className="db-card-info">
        {row.contact && (
          <div className="db-info-row">
            <User size={13} />
            <span>{row.contact}</span>
          </div>
        )}
        {row.area && (
          <div className="db-info-row">
            <MapPin size={13} />
            <span>{row.area}</span>
          </div>
        )}
        {row.quantity && (
          <div className="db-info-row">
            <Package size={13} />
            <span>{row.quantity}</span>
          </div>
        )}
        <div className="db-info-row">
          <Clock size={13} />
          <span>{formatDate(row.createdAt)}</span>
        </div>
      </div>

      {/* Phone buttons */}
      {row.phone && (
        <div className="db-card-actions" onClick={(e) => e.stopPropagation()}>
          <button className="db-btn-call" onClick={() => callPhone(row.phone)}>
            <Phone size={14} />
            <span>{row.phone}</span>
          </button>
          <button className="db-btn-wa" onClick={() => openWhatsApp(row.phone)}>
            <MessageCircle size={14} />
          </button>
        </div>
      )}
    </motion.article>
  );
}

/* ──────────────────────────────────────────────────────────────
   PICKUP CARD
────────────────────────────────────────────────────────────── */
function PickupCard({ row }: { row: PickupRecord }) {
  return (
    <motion.article
      className="db-card"
      variants={cardAnim}
      whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 20px rgba(34,197,94,0.07)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="db-card-top">
        <div className="db-food-thumb db-food-thumb--green">
          <Truck size={20} />
        </div>
        <div className="db-card-title-group">
          <strong className="db-card-title">{row.name}</strong>
          <span className="db-card-org">{row.organization || 'فريق مستقل'}</span>
        </div>
        {row.availability && (
          <span className="db-avail-badge">{row.availability}</span>
        )}
      </div>

      <div className="db-card-info">
        {row.area && (
          <div className="db-info-row">
            <MapPin size={13} />
            <span>{row.area}</span>
          </div>
        )}
        {row.capacity && (
          <div className="db-info-row">
            <Package size={13} />
            <span>الطاقة: {row.capacity}</span>
          </div>
        )}
      </div>

      {row.phone && (
        <div className="db-card-actions">
          <button className="db-btn-call" onClick={() => callPhone(row.phone)}>
            <Phone size={14} />
            <span>{row.phone}</span>
          </button>
          <button className="db-btn-wa" onClick={() => openWhatsApp(row.phone)}>
            <MessageCircle size={14} />
          </button>
        </div>
      )}
    </motion.article>
  );
}

/* ──────────────────────────────────────────────────────────────
   MESSAGE CARD
────────────────────────────────────────────────────────────── */
function MessageCard({ row }: { row: ContactRecord }) {
  return (
    <motion.article
      className="db-card db-card--message"
      variants={cardAnim}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <div className="db-card-top">
        <div className="db-food-thumb db-food-thumb--violet">
          <MessageSquare size={18} />
        </div>
        <div className="db-card-title-group">
          <strong className="db-card-title">{row.name}</strong>
          {row.organization && <span className="db-card-org">{row.organization}</span>}
        </div>
      </div>

      <div className="db-card-info">
        {row.email && (
          <div className="db-info-row">
            <Mail size={13} />
            <span className="db-truncate">{row.email}</span>
          </div>
        )}
        {row.message && (
          <div className="db-message-body">
            {row.message}
          </div>
        )}
      </div>

      {row.phone && (
        <div className="db-card-actions">
          <button className="db-btn-call" onClick={() => callPhone(row.phone)}>
            <Phone size={14} />
            <span>{row.phone}</span>
          </button>
          <button className="db-btn-wa" onClick={() => openWhatsApp(row.phone)}>
            <MessageCircle size={14} />
          </button>
        </div>
      )}
    </motion.article>
  );
}

/* ──────────────────────────────────────────────────────────────
   SECTION HEADER
────────────────────────────────────────────────────────────── */
function SectionHead({ icon, label, title, count }: { icon: React.ReactNode; label: string; title: string; count: number }) {
  return (
    <div className="db-section-head">
      <div className="db-section-icon">{icon}</div>
      <div>
        <span className="db-section-label">{label}</span>
        <h2 className="db-section-title">{title}</h2>
      </div>
      <span className="db-section-count">{count}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────────────── */
export function DashboardPreview() {
  const [data, setData] = useState<DashboardState>(() => {
    if (typeof window === 'undefined') return { donations: [], pickups: [], messages: [], source: 'demo' };
    return readLocalAll();
  });
  const [loading,           setLoading]           = useState(false);
  const [error,             setError]             = useState('');
  const [selectedDonation,  setSelectedDonation]  = useState<DonationRecord | null>(null);

  const handleData = useCallback((result: DashboardState) => {
    setData(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;
    const unsubscribe = subscribeDashboardData(
      (r) => { if (mounted) handleData(r); },
      (m) => { if (mounted) setError(m);   },
    );
    const onStorage = () => { if (mounted) setData(readLocalAll()); };
    window.addEventListener('storage',      onStorage);
    window.addEventListener('storage-sync', onStorage);
    return () => {
      mounted = false;
      unsubscribe();
      window.removeEventListener('storage',      onStorage);
      window.removeEventListener('storage-sync', onStorage);
    };
  }, [handleData]);

  const metrics = useMemo(() => {
    const completed    = data.donations.filter((d) => d.status === 'completed').length;
    const newDonations = data.donations.filter((d) => d.status === 'new').length;
    return [
      { icon: '🍱', title: 'التبرعات المسجلة', value: String(data.donations.length), note: data.source === 'firebase' ? 'قراءة مباشرة' : 'مُحدَّث لحظياً', color: 'orange' },
      { icon: '🚚', title: 'فرق الاستلام',     value: String(data.pickups.length),   note: 'جهات ومتطوعون جاهزون',                                         color: 'green'  },
      { icon: '💬', title: 'رسائل التواصل',     value: String(data.messages.length),  note: 'استفسارات وشراكات',                                             color: 'violet' },
      { icon: '🆕', title: 'الحالات الجديدة',   value: String(newDonations),          note: completed > 0 ? `${completed} مكتملة` : 'جاهزة للمتابعة',       color: 'blue'   },
    ];
  }, [data]);

  return (
    <>
      <DonationModal donation={selectedDonation} onClose={() => setSelectedDonation(null)} />

      <div className="db-shell">

        {/* ── Source badge ── */}
        <div className="db-meta-bar">
          <span className={`source-badge ${data.source === 'firebase' ? 'live' : ''}`}>
            <span className="dot" />
            {data.source === 'firebase' ? 'Live · Firestore' : 'محلي · مُحدَّث فوري'}
          </span>
          <p>اضغط على أي بطاقة تبرع لعرض تفاصيلها الكاملة</p>
        </div>

        {/* ── Metric cards ── */}
        <motion.div
          className="db-metrics"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {metrics.map((m) => (
            <motion.article
              key={m.title}
              className={`db-metric db-metric--${m.color}`}
              variants={cardAnim}
            >
              <span className="db-metric-emoji">{m.icon}</span>
              <strong className="db-metric-value">{m.value}</strong>
              <span className="db-metric-title">{m.title}</span>
              <small className="db-metric-note">{m.note}</small>
            </motion.article>
          ))}
        </motion.div>

        {error   && <p className="error-state">⚠️ {error}</p>}
        {loading && (
          <div className="db-loading">
            <span className="db-spinner" />
            جاري التحديث...
          </div>
        )}

        {/* ════════════ DONATIONS ════════════ */}
        <div className="db-section">
          <SectionHead
            icon={<Utensils size={18} />}
            label="آخر التبرعات"
            title="سجل الجهات المانحة"
            count={data.donations.length}
          />
          {data.donations.length ? (
            <motion.div
              className="db-cards-grid"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            >
              {data.donations.map((row) => (
                <DonationCard key={row.id} row={row} onClick={() => setSelectedDonation(row)} />
              ))}
            </motion.div>
          ) : (
            <div className="db-empty">
              <span>🍽️</span>
              <p>لا توجد تبرعات بعد — ابدأ بإضافة أول تبرع!</p>
            </div>
          )}
        </div>

        {/* ════════════ PICKUPS ════════════ */}
        <div className="db-section">
          <SectionHead
            icon={<Truck size={18} />}
            label="فرق الاستلام"
            title="الفرق والمبادرات"
            count={data.pickups.length}
          />
          {data.pickups.length ? (
            <motion.div
              className="db-cards-grid"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            >
              {data.pickups.map((row) => (
                <PickupCard key={row.id} row={row} />
              ))}
            </motion.div>
          ) : (
            <div className="db-empty">
              <span>🚚</span>
              <p>لا توجد طلبات استلام بعد.</p>
            </div>
          )}
        </div>

        {/* ════════════ MESSAGES ════════════ */}
        <div className="db-section">
          <SectionHead
            icon={<MessageSquare size={18} />}
            label="رسائل التواصل"
            title="رسائل محفوظة في النظام"
            count={data.messages.length}
          />
          {data.messages.length ? (
            <motion.div
              className="db-cards-grid"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            >
              {data.messages.map((row) => (
                <MessageCard key={row.id} row={row} />
              ))}
            </motion.div>
          ) : (
            <div className="db-empty">
              <span>💬</span>
              <p>لا توجد رسائل بعد.</p>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
