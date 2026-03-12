import Link from 'next/link';
import { Mail, Instagram, MapPin } from 'lucide-react';

const quickLinks = [
  { href: '/donate', label: 'تبرع بالفائض' },
  { href: '/request', label: 'طلب استلام' },
  { href: '/dashboard', label: 'لوحة الأثر' },
  { href: '/about', label: 'عن المشروع' },
  { href: '/contact', label: 'تواصل معنا' },
];

const foodTypes = [
  'أكلات عراقية أصيلة',
  'مخابز وحلويات',
  'وجبات سريعة',
  'بوفيهات الفعاليات',
  'منتجات يومية',
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand column */}
          <div className="footer-brand">
            <div className="brand-wrap">
              <div className="brand-logo" style={{ width: 44, height: 44, fontSize: 18 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10" />
                  <path d="M12 6a6 6 0 0 0-6 6" />
                  <path d="M12 10a2 2 0 1 0 2 2" />
                  <path d="M22 2 12 12" />
                </svg>
              </div>
              <div>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-base)', fontWeight: 800, color: 'var(--clr-text)' }}>
                  Food Rescue Hub
                </strong>
                <em style={{ display: 'block', fontStyle: 'normal', fontSize: 'var(--fs-xs)', color: 'var(--clr-primary-2)' }}>
                  منصة إنقاذ الطعام العراقية
                </em>
              </div>
            </div>
            <p>
              منصة رقمية احترافية لتقليل هدر الطعام وربط الجهات المانحة بفرق الاستلام والتوزيع بطريقة منظمة وسريعة وموثوقة.
            </p>
            {/* Social */}
            <div className="footer-social">
              <a
                href="https://instagram.com/f3u"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Instagram"
                title="@f3u"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:vip.frml@gmail.com"
                className="social-btn"
                aria-label="Email"
                title="vip.frml@gmail.com"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4>روابط سريعة</h4>
            <div className="footer-links">
              {quickLinks.map((l) => (
                <Link key={l.href} href={l.href}>
                  <span style={{ fontSize: 12, color: 'var(--clr-primary)', opacity: 0.7 }}>◆</span>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Food types */}
          <div className="footer-col">
            <h4>أنواع الطعام</h4>
            <div className="footer-links">
              {foodTypes.map((f) => (
                <span key={f} style={{ fontSize: 'var(--fs-sm)', color: 'var(--clr-text-3)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                  <span style={{ fontSize: 12, color: 'var(--clr-accent)', opacity: 0.7 }}>✓</span>
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>تواصل معنا</h4>
            <div>
              <div className="footer-contact-item">
                <Mail size={16} />
                <a
                  href="mailto:vip.frml@gmail.com"
                  style={{ fontSize: 'var(--fs-sm)', color: 'var(--clr-text-3)', transition: 'color var(--dur-fast)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--clr-primary-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--clr-text-3)')}
                >
                  vip.frml@gmail.com
                </a>
              </div>
              <div className="footer-contact-item">
                <Instagram size={16} />
                <a
                  href="https://instagram.com/f3u"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 'var(--fs-sm)', color: 'var(--clr-text-3)', transition: 'color var(--dur-fast)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--clr-primary-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--clr-text-3)')}
                >
                  @f3u
                </a>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--clr-text-3)' }}>
                  بغداد، العراق
                </span>
              </div>
            </div>

            {/* Mini CTA */}
            <div style={{
              marginTop: 'var(--sp-5)',
              padding: 'var(--sp-4)',
              background: 'rgba(249,115,22,0.06)',
              border: '1px solid rgba(249,115,22,0.15)',
              borderRadius: 'var(--r-lg)',
            }}>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-text-3)', lineHeight: 1.7, marginBottom: 'var(--sp-3)' }}>
                هل أنت مطعم أو مخبز أو فندق؟ انضم لشبكتنا اليوم
              </p>
              <Link href="/contact" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center', borderRadius: 'var(--r-lg)' }}>
                انضم الآن
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Food Rescue Hub — جميع الحقوق محفوظة
          </p>
          <div className="footer-bottom-links">
            <Link href="/about">عن المشروع</Link>
            <Link href="/contact">تواصل</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
