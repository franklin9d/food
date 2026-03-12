'use client';

import { useEffect, useRef, useState } from 'react';

interface LocationPickerProps {
  value: string;
  onChange: (location: string, lat: number, lng: number) => void;
  lat?: number;
  lng?: number;
}

export function LocationPicker({ value, onChange, lat, lng }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null);
  const markerRef = useRef<import('leaflet').Marker | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');
  const [mapReady, setMapReady] = useState(false);
  const [currentLat, setCurrentLat] = useState(lat || 33.3152);
  const [currentLng, setCurrentLng] = useState(lng || 44.3661);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      // Fix leaflet icon issue with Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      const initLat = lat || 33.3152;
      const initLng = lng || 44.3661;

      const map = L.map(mapRef.current!, {
        center: [initLat, initLng],
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const customIcon = L.divIcon({
        html: `<div style="
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 3px 12px rgba(249,115,22,0.5);
          display: flex; align-items: center; justify-content: center;
        ">
          <span style="transform: rotate(45deg); font-size: 16px; color: white; line-height: 1;">🍴</span>
        </div>`,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

      if (lat && lng) {
        const marker = L.marker([lat, lng], { icon: customIcon, draggable: true }).addTo(map);
        markerRef.current = marker;
        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          setCurrentLat(pos.lat);
          setCurrentLng(pos.lng);
          getAddressFromCoords(pos.lat, pos.lng, onChange);
        });
      }

      map.on('click', (e: import('leaflet').LeafletMouseEvent) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        setCurrentLat(clickLat);
        setCurrentLng(clickLng);

        if (markerRef.current) {
          markerRef.current.setLatLng([clickLat, clickLng]);
        } else {
          const marker = L.marker([clickLat, clickLng], { icon: customIcon, draggable: true }).addTo(map);
          markerRef.current = marker;
          marker.on('dragend', () => {
            const pos = marker.getLatLng();
            setCurrentLat(pos.lat);
            setCurrentLng(pos.lng);
            getAddressFromCoords(pos.lat, pos.lng, onChange);
          });
        }
        getAddressFromCoords(clickLat, clickLng, onChange);
      });

      mapInstanceRef.current = map;
      setMapReady(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAddressFromCoords = async (
    latVal: number,
    lngVal: number,
    cb: (location: string, la: number, ln: number) => void,
  ) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latVal}&lon=${lngVal}&accept-language=ar`,
        { headers: { 'Accept-Language': 'ar' } },
      );
      const data = await res.json();
      const addr = data.display_name || `${latVal.toFixed(5)}, ${lngVal.toFixed(5)}`;
      cb(addr, latVal, lngVal);
    } catch {
      cb(`${latVal.toFixed(5)}, ${lngVal.toFixed(5)}`, latVal, lngVal);
    }
  };

  const handleGpsLocate = () => {
    if (!navigator.geolocation) {
      setGpsError('المتصفح لا يدعم تحديد الموقع');
      return;
    }
    setGpsLoading(true);
    setGpsError('');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLat(latitude);
        setCurrentLng(longitude);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 16);

          // Update or create marker
          import('leaflet').then((L) => {
            const customIcon = L.divIcon({
              html: `<div style="
                width: 36px; height: 36px;
                background: linear-gradient(135deg, #f97316, #ea580c);
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 3px 12px rgba(249,115,22,0.5);
              ">
                <span style="transform: rotate(45deg); font-size: 16px; color: white; display: block; text-align: center; margin-top: 4px;">🍴</span>
              </div>`,
              className: '',
              iconSize: [36, 36],
              iconAnchor: [18, 36],
            });

            if (markerRef.current) {
              markerRef.current.setLatLng([latitude, longitude]);
            } else if (mapInstanceRef.current) {
              const marker = L.marker([latitude, longitude], { icon: customIcon, draggable: true }).addTo(mapInstanceRef.current);
              markerRef.current = marker;
              marker.on('dragend', () => {
                const pos = marker.getLatLng();
                setCurrentLat(pos.lat);
                setCurrentLng(pos.lng);
                getAddressFromCoords(pos.lat, pos.lng, onChange);
              });
            }
          });
        }

        await getAddressFromCoords(latitude, longitude, onChange);
        setGpsLoading(false);
      },
      (err) => {
        setGpsLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGpsError('تم رفض إذن الوصول للموقع. يرجى السماح من إعدادات المتصفح.');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setGpsError('تعذر تحديد موقعك الجغرافي. تأكد من تفعيل GPS.');
        } else {
          setGpsError('تعذر الحصول على الموقع. حاول مرة أخرى.');
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };

  const openInMaps = () => {
    if (currentLat && currentLng) {
      window.open(`https://www.google.com/maps?q=${currentLat},${currentLng}`, '_blank');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* GPS Button */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={handleGpsLocate}
          disabled={gpsLoading}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: gpsLoading
              ? 'rgba(249,115,22,0.05)'
              : 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.08))',
            border: '1px solid rgba(249,115,22,0.35)',
            borderRadius: 10,
            padding: '10px 18px',
            cursor: gpsLoading ? 'not-allowed' : 'pointer',
            color: 'var(--clr-primary-2)',
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 600,
            transition: 'all 0.2s',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {gpsLoading ? (
            <>
              <span style={{
                width: 16, height: 16,
                borderRadius: '50%',
                border: '2px solid rgba(249,115,22,0.3)',
                borderTopColor: 'var(--clr-primary-2)',
                animation: 'spin-slow 0.7s linear infinite',
                display: 'inline-block'
              }} />
              جاري تحديد موقعك...
            </>
          ) : (
            <>
              📍 تحديد موقعي تلقائياً
            </>
          )}
        </button>

        {(currentLat !== 33.3152 || currentLng !== 44.3661) && (
          <button
            type="button"
            onClick={openInMaps}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: 10,
              padding: '10px 14px',
              cursor: 'pointer',
              color: '#60a5fa',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            🗺️ فتح في خرائط
          </button>
        )}
      </div>

      {gpsError && (
        <p style={{
          color: '#f87171',
          fontSize: 13,
          padding: '8px 12px',
          background: 'rgba(248,113,113,0.08)',
          border: '1px solid rgba(248,113,113,0.2)',
          borderRadius: 8,
          margin: 0,
        }}>
          ⚠️ {gpsError}
        </p>
      )}

      {/* Map container */}
      <div
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid rgba(249,115,22,0.2)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          height: 280,
          position: 'relative',
        }}
      >
        {!mapReady && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'var(--clr-surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 10, zIndex: 10,
          }}>
            <span style={{
              width: 30, height: 30, borderRadius: '50%',
              border: '3px solid rgba(249,115,22,0.2)',
              borderTopColor: 'var(--clr-primary-2)',
              animation: 'spin-slow 0.7s linear infinite',
              display: 'inline-block'
            }} />
            <span style={{ color: 'var(--clr-text-muted)', fontSize: 13 }}>جاري تحميل الخريطة...</span>
          </div>
        )}
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Selected location display */}
      {value && (
        <div style={{
          padding: '10px 14px',
          background: 'rgba(34,197,94,0.06)',
          border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: 8,
          fontSize: 13,
          color: 'var(--clr-text)',
          display: 'flex', alignItems: 'flex-start', gap: 8,
        }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>📌</span>
          <span style={{ direction: 'rtl', lineHeight: 1.5 }}>{value}</span>
        </div>
      )}

      <p style={{ fontSize: 12, color: 'var(--clr-text-muted)', margin: 0 }}>
        💡 انقر على الخريطة لتحديد الموقع، أو اسحب العلامة لتعديله
      </p>
    </div>
  );
}
