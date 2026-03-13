import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { NavigationEvents } from '@/components/NavigationEvents';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { FloatingActions } from '@/components/FloatingActions';
import { LiveToast } from '@/components/LiveToast';

export const metadata: Metadata = {
  title: 'Food Rescue Hub | منصة إنقاذ الطعام',
  description: 'منصة احترافية لتقليل هدر الطعام وربط الجهات المانحة بفرق الاستلام والتوزيع.',
  keywords: 'إنقاذ الطعام, تبرع, وجبات, العراق, بغداد, food rescue, Iraq',
  openGraph: {
    title: 'Food Rescue Hub | منصة إنقاذ الطعام',
    description: 'منصة رقمية احترافية لتقليل هدر الطعام في العراق.',
    locale: 'ar_IQ',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          crossOrigin=""
        />
        <meta name="theme-color" content="#020409" />
      </head>
      <body>
        {/* Fixed overlays */}
        <ScrollProgressBar />
        <FloatingActions />
        <LiveToast />

        {/* Page structure */}
        <Header />
        <NavigationEvents />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
