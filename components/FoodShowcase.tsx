'use client';

import { Utensils } from 'lucide-react';

const foods = [
  // Iraqi foods - with real image URLs from Wikimedia
  {
    name: 'دولمة',
    desc: 'ورق عنب محشو بالأرز واللحم العراقي الأصيل',
    badge: 'iraqi',
    category: 'عراقي أصيل',
    emoji: '🫙',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dolma_at_a_Turkish_restaurant.jpg/400px-Dolma_at_a_Turkish_restaurant.jpg',
  },
  {
    name: 'كباب عراقي',
    desc: 'كباب مشوي على الفحم بتوابل عراقية',
    badge: 'iraqi',
    category: 'عراقي أصيل',
    emoji: '🍢',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Kebabs_with_bread.jpg/400px-Kebabs_with_bread.jpg',
  },
  {
    name: 'مسقوف',
    desc: 'سمك المسقوف البغدادي المشوي على النار',
    badge: 'iraqi',
    category: 'عراقي أصيل',
    emoji: '🐟',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Masgouf.jpg/400px-Masgouf.jpg',
  },
  {
    name: 'باچة',
    desc: 'طبق الباچة العراقي التقليدي',
    badge: 'iraqi',
    category: 'عراقي أصيل',
    emoji: '🍲',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Boza_Soup.jpg/400px-Boza_Soup.jpg',
  },
  {
    name: 'تشريب',
    desc: 'تشريب الدجاج أو اللحم مع خبز التنور',
    badge: 'iraqi',
    category: 'عراقي أصيل',
    emoji: '🍲',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Tashreeb.jpg/400px-Tashreeb.jpg',
  },
  {
    name: 'قيمة',
    desc: 'مرق القيمة مع الخضروات والبهارات',
    badge: 'iraqi',
    category: 'عراقي أصيل',
    emoji: '🥘',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Qeema2.jpg/400px-Qeema2.jpg',
  },
  {
    name: 'خبز تنور',
    desc: 'خبز تنور عراقي طازج ساخن',
    badge: 'iraqi',
    category: 'عراقي أصيل',
    emoji: '🫓',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Making_flatbread.jpg/400px-Making_flatbread.jpg',
  },
  {
    name: 'حريسة',
    desc: 'حريسة القمح مع الدجاج أو اللحم',
    badge: 'iraqi',
    category: 'عراقي أصيل',
    emoji: '🥣',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Harees_2.jpg/400px-Harees_2.jpg',
  },
  // Fast foods popular in Iraq
  {
    name: 'كنتاكي',
    desc: 'دجاج مقلي كنتاكي ستايل — الأكثر طلباً',
    badge: 'western',
    category: 'وجبات سريعة',
    emoji: '🍗',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Chicken_fingers.jpg/400px-Chicken_fingers.jpg',
  },
  {
    name: 'بيتزا',
    desc: 'بيتزا بعجينة إيطالية وجبن موزاريلا',
    badge: 'western',
    category: 'وجبات سريعة',
    emoji: '🍕',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/400px-Eq_it-na_pizza-margherita_sep2005_sml.jpg',
  },
  {
    name: 'برغر',
    desc: 'برغر لحم طازج مع صوص خاص',
    badge: 'western',
    category: 'وجبات سريعة',
    emoji: '🍔',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/400px-Cheeseburger.jpg',
  },
  {
    name: 'شاورما',
    desc: 'شاورما دجاج أو لحم بالخبز العربي',
    badge: 'western',
    category: 'وجبات سريعة',
    emoji: '🌮',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Shawarma_closeup.jpg/400px-Shawarma_closeup.jpg',
  },
  {
    name: 'صاج',
    desc: 'صاج دجاج أو لحم على الصاجية',
    badge: 'western',
    category: 'وجبات سريعة',
    emoji: '🥙',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Chicken-Tawook.jpg/400px-Chicken-Tawook.jpg',
  },
  {
    name: 'كص',
    desc: 'كص عراقي — لحم مشوي على الفحم',
    badge: 'western',
    category: 'وجبات سريعة',
    emoji: '🍖',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Kebabs_with_bread.jpg/400px-Kebabs_with_bread.jpg',
  },
  {
    name: 'ساندويچ فلافل',
    desc: 'ساندويچ فلافل بالخضار الطازجة',
    badge: 'western',
    category: 'وجبات سريعة',
    emoji: '🥙',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/010_couscous.jpg/400px-010_couscous.jpg',
  },
  {
    name: 'بطاطا مقلية',
    desc: 'بطاطا مقلية مقرمشة — إضافة جانبية',
    badge: 'western',
    category: 'وجبات سريعة',
    emoji: '🍟',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Fast_food_french_fries.jpg/400px-Fast_food_french_fries.jpg',
  },
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
        width: '100%',
        height: 140,
        overflow: 'hidden',
        borderRadius: '12px 12px 0 0',
        background: 'rgba(249,115,22,0.05)',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={food.img}
          alt={food.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:60px">${food.emoji}</div>`;
            }
          }}
        />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '40%',
          background: 'linear-gradient(transparent, rgba(10,10,15,0.7))',
        }} />
      </div>

      <div className="food-card-badge" style={{
        position: 'absolute',
        top: 10, right: 10,
        background: food.badge === 'iraqi'
          ? 'rgba(249,115,22,0.85)'
          : 'rgba(59,130,246,0.85)',
        backdropFilter: 'blur(4px)',
        color: 'white',
        padding: '3px 10px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
      }}>
        {food.badge === 'iraqi' ? '🇮🇶' : '⚡'} {food.category}
      </div>

      <div className="food-card-body" style={{ padding: '12px 14px 14px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
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
    <section
      className="food-section"
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.03) 50%, transparent 100%)' }}
    >
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
            المنصة تدعم جميع أنواع الطعام — من الأكلات العراقية الأصيلة إلى الوجبات السريعة
            <br />
            <span style={{ fontSize: 13, opacity: 0.7 }}>
              💡 عند كتابة نوع الطعام في النموذج — تظهر صورته تلقائياً
            </span>
          </p>
        </div>

        {/* Iraqi foods */}
        <div style={{ marginTop: 'var(--sp-10)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'var(--sp-3)',
            marginBottom: 'var(--sp-5)',
          }} data-reveal>
            <span style={{
              padding: '6px 16px',
              borderRadius: 'var(--r-full)',
              background: 'rgba(249,115,22,0.12)',
              border: '1px solid rgba(249,115,22,0.3)',
              fontSize: 'var(--fs-xs)',
              fontWeight: 700,
              color: 'var(--clr-primary-2)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              🇮🇶 الأكلات العراقية الأصيلة
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--clr-border)' }} />
          </div>
          <div className="food-grid">
            {foods.filter((f) => f.badge === 'iraqi').map((food, i) => (
              <FoodCard key={food.name} food={food} index={i} />
            ))}
          </div>
        </div>

        {/* Fast foods */}
        <div style={{ marginTop: 'var(--sp-10)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'var(--sp-3)',
            marginBottom: 'var(--sp-5)',
          }} data-reveal>
            <span style={{
              padding: '6px 16px',
              borderRadius: 'var(--r-full)',
              background: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(59,130,246,0.3)',
              fontSize: 'var(--fs-xs)',
              fontWeight: 700,
              color: '#60a5fa',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              ⚡ الوجبات السريعة الشائعة في العراق
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--clr-border)' }} />
          </div>
          <div className="food-grid">
            {foods.filter((f) => f.badge === 'western').map((food, i) => (
              <FoodCard key={food.name} food={food} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
