import { Utensils } from 'lucide-react';

const foods = [
  // Iraqi foods
  { emoji: '🫙', name: 'دولمة', desc: 'ورق عنب محشو بالأرز واللحم', badge: 'iraqi', category: 'عراقي أصيل' },
  { emoji: '🍢', name: 'كباب', desc: 'كباب عراقي مشوي طازج', badge: 'iraqi', category: 'عراقي أصيل' },
  { emoji: '🥘', name: 'قيمة', desc: 'مرق القيمة مع الخضروات', badge: 'iraqi', category: 'عراقي أصيل' },
  { emoji: '🍲', name: 'باچة', desc: 'طبق عراقي تقليدي', badge: 'iraqi', category: 'عراقي أصيل' },
  { emoji: '🥗', name: 'تبولة', desc: 'سلطة التبولة الطازجة', badge: 'iraqi', category: 'عراقي أصيل' },
  { emoji: '🫓', name: 'خبز تنور', desc: 'خبز تنور عراقي طازج', badge: 'iraqi', category: 'عراقي أصيل' },
  { emoji: '🍳', name: 'مسقوف', desc: 'سمك المسقوف البغدادي', badge: 'iraqi', category: 'عراقي أصيل' },
  { emoji: '🥣', name: 'حريسة', desc: 'حريسة القمح والدجاج', badge: 'iraqi', category: 'عراقي أصيل' },
  // Western/Fast food in Iraq
  { emoji: '🍗', name: 'كنتاكي', desc: 'دجاج مقلي كنتاكي ستايل', badge: 'western', category: 'وجبات غربية' },
  { emoji: '🍔', name: 'برغر', desc: 'برغر لحم طازج مع الصوص', badge: 'western', category: 'وجبات غربية' },
  { emoji: '🍕', name: 'بيتزا', desc: 'بيتزا بعجينة إيطالية', badge: 'western', category: 'وجبات غربية' },
  { emoji: '🌮', name: 'شاورما', desc: 'شاورما دجاج أو لحم', badge: 'western', category: 'وجبات غربية' },
];

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
            المنصة تدعم جميع أنواع الطعام — من الأكلات العراقية الأصيلة إلى الوجبات العالمية
          </p>
        </div>

        {/* Iraqi foods */}
        <div style={{ marginTop: 'var(--sp-10)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'var(--sp-3)',
            marginBottom: 'var(--sp-5)',
          }} data-reveal>
            <span style={{
              padding: '5px 14px',
              borderRadius: 'var(--r-full)',
              background: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.25)',
              fontSize: 'var(--fs-xs)',
              fontWeight: 700,
              color: 'var(--clr-primary-2)',
            }}>🇮🇶 الأكلات العراقية الأصيلة</span>
            <div style={{ flex: 1, height: 1, background: 'var(--clr-border)' }} />
          </div>
          <div className="food-grid">
            {foods.filter(f => f.badge === 'iraqi').map((food, i) => (
              <div className="food-card" key={food.name} data-reveal data-reveal-delay={String((i % 4) + 1)}>
                <div className="food-emoji-display">{food.emoji}</div>
                <div className="food-card-badge badge-iraqi">{food.category}</div>
                <div className="food-card-body">
                  <h4>{food.name}</h4>
                  <p>{food.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Western foods */}
        <div style={{ marginTop: 'var(--sp-10)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'var(--sp-3)',
            marginBottom: 'var(--sp-5)',
          }} data-reveal>
            <span style={{
              padding: '5px 14px',
              borderRadius: 'var(--r-full)',
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.25)',
              fontSize: 'var(--fs-xs)',
              fontWeight: 700,
              color: '#60a5fa',
            }}>🌍 الوجبات الغربية</span>
            <div style={{ flex: 1, height: 1, background: 'var(--clr-border)' }} />
          </div>
          <div className="food-grid">
            {foods.filter(f => f.badge === 'western').map((food, i) => (
              <div className="food-card" key={food.name} data-reveal data-reveal-delay={String((i % 4) + 1)}>
                <div className="food-emoji-display">{food.emoji}</div>
                <div className="food-card-badge badge-western">{food.category}</div>
                <div className="food-card-body">
                  <h4>{food.name}</h4>
                  <p>{food.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
