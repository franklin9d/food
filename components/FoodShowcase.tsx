'use client';

import { Utensils } from 'lucide-react';

// AI-generated images (Banana model — generated for this project)
const AI_IMGS: Record<string, string> = {
  كباب:    'https://www.genspark.ai/api/files/s/OtzDmt2d?cache_control=3600',
  مسقوف:   'https://www.genspark.ai/api/files/s/xeV65Gxs?cache_control=3600',
  دولمة:   'https://www.genspark.ai/api/files/s/zxk8Tz7L?cache_control=3600',
  تشريب:   'https://www.genspark.ai/api/files/s/Vw3lOKtl?cache_control=3600',
  باچة:    'https://www.genspark.ai/api/files/s/G4kDtQUs?cache_control=3600',
  قيمة:    'https://www.genspark.ai/api/files/s/1PREdQVx?cache_control=3600',
  خبز:     'https://www.genspark.ai/api/files/s/ZqjJJvpZ?cache_control=3600',
  كنتاكي:  'https://www.genspark.ai/api/files/s/fgEqFfnv?cache_control=3600',
  شاورما:  'https://www.genspark.ai/api/files/s/cx73CfEU?cache_control=3600',
  بيتزا:   'https://www.genspark.ai/api/files/s/nxuqUmce?cache_control=3600',
  صاج:     'https://www.genspark.ai/api/files/s/rlTZsIdc?cache_control=3600',
  برغر:    'https://www.genspark.ai/api/files/s/KiYqxB1P?cache_control=3600',
};

const foods = [
  { name: 'دولمة',      desc: 'ورق عنب محشو بالأرز واللحم العراقي الأصيل',  badge: 'iraqi',   category: 'عراقي أصيل',   emoji: '🫙', img: AI_IMGS['دولمة'] },
  { name: 'كباب عراقي', desc: 'كباب مشوي على الفحم بتوابل عراقية',           badge: 'iraqi',   category: 'عراقي أصيل',   emoji: '🍢', img: AI_IMGS['كباب'] },
  { name: 'مسقوف',      desc: 'سمك المسقوف البغدادي المشوي على النار',       badge: 'iraqi',   category: 'عراقي أصيل',   emoji: '🐟', img: AI_IMGS['مسقوف'] },
  { name: 'تشريب',      desc: 'تشريب الدجاج أو اللحم مع خبز التنور',         badge: 'iraqi',   category: 'عراقي أصيل',   emoji: '🍲', img: AI_IMGS['تشريب'] },
  { name: 'باچة',       desc: 'طبق الباچة العراقي التقليدي الأصيل',          badge: 'iraqi',   category: 'عراقي أصيل',   emoji: '🍲', img: AI_IMGS['باچة'] },
  { name: 'قيمة',       desc: 'مرق القيمة مع الخضروات والبهارات',            badge: 'iraqi',   category: 'عراقي أصيل',   emoji: '🥘', img: AI_IMGS['قيمة'] },
  { name: 'خبز تنور',   desc: 'خبز تنور عراقي طازج ساخن من الفرن',          badge: 'iraqi',   category: 'عراقي أصيل',   emoji: '🫓', img: AI_IMGS['خبز'] },
  { name: 'كنتاكي',     desc: 'دجاج مقلي كنتاكي ستايل — الأكثر طلباً',      badge: 'western', category: 'وجبات سريعة',  emoji: '🍗', img: AI_IMGS['كنتاكي'] },
  { name: 'بيتزا',      desc: 'بيتزا بعجينة إيطالية وجبن موزاريلا',          badge: 'western', category: 'وجبات سريعة',  emoji: '🍕', img: AI_IMGS['بيتزا'] },
  { name: 'برغر',       desc: 'برغر لحم طازج مع صوص خاص وخضار',             badge: 'western', category: 'وجبات سريعة',  emoji: '🍔', img: AI_IMGS['برغر'] },
  { name: 'شاورما',     desc: 'شاورما دجاج أو لحم بالخبز العربي',            badge: 'western', category: 'وجبات سريعة',  emoji: '🌮', img: AI_IMGS['شاورما'] },
  { name: 'صاج',        desc: 'صاج دجاج أو لحم على الصاجية بالتوابل',       badge: 'western', category: 'وجبات سريعة',  emoji: '🥙', img: AI_IMGS['صاج'] },
];

function FoodCard({ food, index }: { food: typeof foods[0]; index: number }) {
  return (
    <div
      className="food-card"
      data-reveal
      data-reveal-delay={String((index % 4) + 1)}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Food image */}
      <div style={{
        width: '100%', height: 160,
        overflow: 'hidden',
        borderRadius: '12px 12px 0 0',
        background: 'rgba(249,115,22,0.05)',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={food.img}
          alt={food.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          loading="lazy"
          onError={(e) => {
            const t = e.currentTarget as HTMLImageElement;
            t.style.display = 'none';
            const p = t.parentElement;
            if (p) p.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:64px">${food.emoji}</div>`;
          }}
        />
        {/* Gradient */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(transparent, rgba(10,10,15,0.75))' }} />
      </div>

      {/* Badge */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        background: food.badge === 'iraqi' ? 'rgba(249,115,22,0.88)' : 'rgba(59,130,246,0.88)',
        backdropFilter: 'blur(4px)', color: 'white',
        padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700,
      }}>
        {food.badge === 'iraqi' ? '🇮🇶' : '⚡'} {food.category}
      </div>

      <div className="food-card-body" style={{ padding: '12px 14px 16px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontSize: 15 }}>
          <span style={{ fontSize: 20 }}>{food.emoji}</span>
          {food.name}
        </h4>
        <p style={{ fontSize: 13, color: 'var(--clr-text-muted)', margin: 0, lineHeight: 1.5 }}>
          {food.desc}
        </p>
      </div>
    </div>
  );
}

export function FoodShowcase() {
  return (
    <section className="food-section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.03) 50%, transparent 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center' }} data-reveal>
          <div className="section-label">
            <Utensils size={14} />
            أنواع الطعام المدعومة
          </div>
          <h2 className="section-title section-title-center">
            من مطبخنا العراقي
            <br />
            <span className="gradient-text">إلى كل الأذواق</span>
          </h2>
          <div className="glow-divider" />
          <p className="section-desc section-desc-center">
            المنصة تدعم جميع أنواع الطعام — الصور مولّدة بالذكاء الاصطناعي
            <br />
            <span style={{ fontSize: 13, opacity: 0.7 }}>
              💡 اكتب اسم الأكلة في نموذج التبرع — تظهر صورتها تلقائياً
            </span>
          </p>
        </div>

        {/* Iraqi */}
        <div style={{ marginTop: 'var(--sp-10)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-5)' }} data-reveal>
            <span style={{ padding: '6px 16px', borderRadius: 'var(--r-full)', background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--clr-primary-2)', display: 'flex', alignItems: 'center', gap: 6 }}>
              🇮🇶 الأكلات العراقية الأصيلة
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--clr-border)' }} />
          </div>
          <div className="food-grid">
            {foods.filter((f) => f.badge === 'iraqi').map((food, i) => <FoodCard key={food.name} food={food} index={i} />)}
          </div>
        </div>

        {/* Fast food */}
        <div style={{ marginTop: 'var(--sp-10)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-5)' }} data-reveal>
            <span style={{ padding: '6px 16px', borderRadius: 'var(--r-full)', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', fontSize: 'var(--fs-xs)', fontWeight: 700, color: '#60a5fa', display: 'flex', alignItems: 'center', gap: 6 }}>
              ⚡ الوجبات السريعة الشائعة في العراق
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--clr-border)' }} />
          </div>
          <div className="food-grid">
            {foods.filter((f) => f.badge === 'western').map((food, i) => <FoodCard key={food.name} food={food} index={i} />)}
          </div>
        </div>

      </div>
    </section>
  );
}
