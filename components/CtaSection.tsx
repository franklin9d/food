'use client';

import Link from 'next/link';
import { ArrowLeft, Heart, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const partners = [
  { emoji: '🍽️', name: 'مطاعم بغداد'           },
  { emoji: '🏨', name: 'فنادق خمس نجوم'         },
  { emoji: '🥖', name: 'مخابز عراقية'           },
  { emoji: '🏫', name: 'مدارس وجامعات'          },
  { emoji: '🎉', name: 'قاعات الأفراح'          },
  { emoji: '🏪', name: 'محلات السوبرماركت'      },
  { emoji: '🍗', name: 'مطاعم وجبات سريعة'      },
  { emoji: '🌿', name: 'مبادرات المجتمع'        },
];

const foodEmojis = ['🍱', '🥖', '🍗', '🌮', '🥘'];

export function CtaSection() {
  return (
    <>
      {/* Partners marquee */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...partners, ...partners].map((p, i) => (
            <div className="marquee-item" key={i}>
              <span>{p.emoji}</span>
              {p.name}
              <span style={{ color: 'rgba(249,115,22,0.3)', marginRight: 'var(--sp-5)' }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main CTA */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-panel"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="cta-panel-content">

              {/* Floating food emojis */}
              <motion.div
                style={{ display: 'flex', justifyContent: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
              >
                {foodEmojis.map((e, i) => (
                  <motion.div
                    key={i}
                    style={{
                      width: 52, height: 52,
                      borderRadius: 'var(--r-lg)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 24,
                    }}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.8 },
                      show:   { opacity: 1, y: 0,  scale: 1 },
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3 + i * 0.4, ease: 'easeInOut', repeat: Infinity, delay: i * 0.3 }}
                  >
                    {e}
                  </motion.div>
                ))}
              </motion.div>

              <h2 className="cta-title">
                كل وجبة تنقذها
                <br />
                <span className="gradient-text">تُغيّر حياة</span>
              </h2>
              <p className="cta-desc">
                انضم لشبكة من أكثر من 96 مطعمًا ومخبزًا وفندقًا يساهمون يوميًا في تقليل الهدر الغذائي
                وإيصال الطعام لمن يحتاجه في بغداد والمحافظات.
              </p>

              {/* Stats row */}
              <motion.div
                style={{ display: 'flex', justifyContent: 'center', gap: 'var(--sp-8)', marginBottom: 'var(--sp-8)', flexWrap: 'wrap' }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
              >
                {[
                  { icon: <Heart size={16} />, value: '12,480+', label: 'وجبة منقذة' },
                  { icon: <Users size={16} />, value: '3,240+',  label: 'مستفيد'     },
                  { icon: '🤝',                value: '96+',     label: 'شريك فاعل'  },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    style={{ textAlign: 'center' }}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show:   { opacity: 1, y: 0 },
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-2)', fontFamily: 'var(--font-display)', fontSize: 'var(--fs-2xl)', fontWeight: 900, color: 'var(--clr-primary-2)', marginBottom: 4 }}>
                      {s.icon}
                      {s.value}
                    </div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-text-3)', fontWeight: 600 }}>
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="cta-actions">
                <Link href="/donate" className="btn btn-primary btn-xl">
                  تبرع بالفائض الآن
                  <ArrowLeft size={20} />
                </Link>
                <Link href="/request" className="btn btn-secondary btn-xl">
                  <Users size={18} />
                  اطلب استلام طعام
                </Link>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
