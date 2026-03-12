'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="siteHeader">
      <div className="container navBar">
        <Link href="/" className="brand">
          <span className="brandBadge">FR</span>
          <div>
            <strong>Food Rescue Hub</strong>
            <span>منصة إنقاذ الطعام</span>
          </div>
        </Link>

        <nav className={`navLinks ${open ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={pathname === link.href ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navActions">
          <Link href="/donate" className="primaryButton smallButton">تبرع الآن</Link>
          <button className="menuButton" onClick={() => setOpen((s) => !s)} aria-label="menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
