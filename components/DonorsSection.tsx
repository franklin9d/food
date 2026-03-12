import Link from 'next/link';
import { Trophy, Clock, ArrowLeft } from 'lucide-react';

const topDonors = [
  { rank: 1, emoji: '🏅', name: 'مطعم البيت الدمشقي', area: 'المنصور', meals: '340 وجبة', type: 'وجبات مطبوخة' },
  { rank: 2, emoji: '🥈', name: 'مخبز السنابل الذهبية', area: 'الكرادة', meals: '280 وجبة', type: 'خبز ومعجنات' },
  { rank: 3, emoji: '🥉', name: 'فندق السلام الدولي', area: 'الرصافة', meals: '210 وجبة', type: 'بوفيه فندقي' },
  { rank: 4, emoji: '🍽️', name: 'قاعة ليلك للأفراح', area: 'الجادرية', meals: '190 وجبة', type: 'وجبات مناسبات' },
  { rank: 5, emoji: '🍗', name: 'مطعم البصرة الأصيل', area: 'الزعفرانية', meals: '165 وجبة', type: 'مشاوي وكباب' },
];

const recentActivity = [
  { time: 'منذ 12 دقيقة', emoji: '🥙', donor: 'مطعم ألف ليلة', amount: '30 وجبة', status: 'جاهز', statusClass: 'status-done' },
  { time: 'منذ 28 دقيقة', emoji: '🍞', donor: 'مخبز الفرح', amount: '60 قطعة خبز', status: 'قيد التوزيع', statusClass: 'status-active' },
  { time: 'منذ 45 دقيقة', emoji: '🍱', donor: 'كافتيريا الجامعة', amount: '25 وجبة', status: 'تم التسليم', statusClass: 'status-done' },
  { time: 'منذ ساعة', emoji: '🥗', donor: 'مطعم زهرة البستان', amount: '18 وجبة', status: 'تم التسليم', statusClass: 'status-done' },
];

export function DonorsSection() {
  return (
    <section style={{ padding: 'var(--sp-24) 0' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-14)' }} data-reveal>
          <div className="section-label">
            <Trophy size={14} />
            المتبرعون الأبطال
          </div>
          <h2 className="section-title section-title-center">
            شركاؤنا في صناعة
            <br />
            <span className="gradient-text">الأثر المجتمعي</span>
          </h2>
          <div className="glow-divider" />
          <p className="section-desc section-desc-center">
            هؤلاء الشركاء يقودون التغيير يومًا بيوم
          </p>
        </div>

        <div className="donors-grid">
          {/* Leaderboard */}
          <div className="donors-list" data-reveal data-reveal-delay="1">
            <div className="donors-list-header">
              <h3>🏆 لوحة المتصدرين</h3>
              <span className="live-badge">
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--clr-accent)', animation: 'dotBlink 1.5s ease infinite', display: 'inline-block' }} />
                هذا الشهر
              </span>
            </div>
            {topDonors.map((d, i) => (
              <div className="donor-row" key={d.name}>
                <div className={`donor-rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}`}>
                  {i < 3 ? d.emoji : `#${d.rank}`}
                </div>
                <div className="donor-avatar">{d.emoji}</div>
                <div className="donor-info">
                  <strong>{d.name}</strong>
                  <span>{d.area} · {d.type}</span>
                </div>
                <div className="donor-amount">
                  <strong>{d.meals}</strong>
                  <span>منقذة</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent activity */}
          <div className="recent-donations-panel" data-reveal data-reveal-delay="2">
            <div className="table-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                <Clock size={18} style={{ color: 'var(--clr-primary-2)' }} />
                آخر التبرعات
              </h3>
              <Link href="/dashboard" className="btn btn-ghost btn-sm">
                عرض الكل
              </Link>
            </div>
            <div>
              {recentActivity.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--sp-4)',
                    padding: 'var(--sp-4) var(--sp-6)',
                    borderBottom: i < recentActivity.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    transition: 'background var(--dur-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                >
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: 'var(--r-md)',
                    background: 'rgba(249,115,22,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, flexShrink: 0,
                  }}>
                    {a.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--clr-text)' }}>
                      {a.donor}
                    </strong>
                    <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-text-3)' }}>
                      {a.amount}
                    </span>
                  </div>
                  <div style={{ textAlign: 'end' }}>
                    <span className={`status-badge ${a.statusClass}`} style={{ display: 'block', marginBottom: 4 }}>
                      {a.status}
                    </span>
                    <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-text-muted)' }}>
                      {a.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA to join */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 'var(--sp-10)',
            padding: 'var(--sp-8)',
            background: 'rgba(249,115,22,0.04)',
            border: '1px solid rgba(249,115,22,0.12)',
            borderRadius: 'var(--r-xl)',
          }}
          data-reveal
        >
          <p style={{ fontSize: 'var(--fs-md)', color: 'var(--clr-text-2)', marginBottom: 'var(--sp-5)' }}>
            انضم لقائمة الشركاء المؤثرين وابدأ في إنقاذ الطعام اليوم
          </p>
          <Link href="/donate" className="btn btn-primary btn-xl">
            سجّل جهتك الآن
            <ArrowLeft size={20} />
          </Link>
        </div>

      </div>
    </section>
  );
}
