'use client';

import {
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, firebaseEnabled } from './firebase';

export type DonationFormData = {
  organization: string;
  contact: string;
  phone: string;
  foodType: string;
  quantity: string;
  pickupTime: string;
  area: string;
  notes: string;
};

export type PickupRequestData = {
  name: string;
  organization: string;
  phone: string;
  area: string;
  capacity: string;
  availability: string;
  notes: string;
};

export type ContactFormData = {
  name: string;
  organization: string;
  phone: string;
  email: string;
  message: string;
};

export type DonationRecord = DonationFormData & {
  id: string;
  status: string;
  createdAt?: string;
};

export type PickupRecord = PickupRequestData & {
  id: string;
  status: string;
  createdAt?: string;
};

export type ContactRecord = ContactFormData & {
  id: string;
  status: string;
  createdAt?: string;
};

const toIsoDate = (value: unknown) => {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === 'object' && value !== null && 'seconds' in value) {
    const seconds = Number((value as { seconds: unknown }).seconds);
    return Number.isFinite(seconds) ? new Date(seconds * 1000).toISOString() : undefined;
  }
  return undefined;
};

const pushLocal = (key: string, payload: Record<string, string>) => {
  const current = JSON.parse(localStorage.getItem(key) || '[]');
  current.unshift({ ...payload, id: crypto.randomUUID(), status: 'new', createdAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(current));
  window.dispatchEvent(new Event('storage-sync'));
};

const mapCollection = <T extends { id: string; createdAt?: string }>(
  docs: Array<{ id: string; [key: string]: unknown }>,
): T[] =>
  docs.map((doc) => {
    const mapped = { ...doc, createdAt: toIsoDate(doc.createdAt) };
    return mapped as T;
  });

export const submitDonation = async (payload: DonationFormData) => {
  if (firebaseEnabled && db) {
    await addDoc(collection(db, 'donations'), {
      ...payload,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    return 'firebase';
  }

  pushLocal('food-rescue-donations', payload);
  return 'demo';
};

export const submitPickupRequest = async (payload: PickupRequestData) => {
  if (firebaseEnabled && db) {
    await addDoc(collection(db, 'pickup_requests'), {
      ...payload,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    return 'firebase';
  }

  pushLocal('food-rescue-pickups', payload);
  return 'demo';
};

export const submitContactMessage = async (payload: ContactFormData) => {
  if (firebaseEnabled && db) {
    await addDoc(collection(db, 'contact_messages'), {
      ...payload,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    return 'firebase';
  }

  pushLocal('food-rescue-messages', payload);
  return 'demo';
};

const readLocal = <T,>(key: string): T[] => JSON.parse(localStorage.getItem(key) || '[]') as T[];

export const loadDashboardData = async () => {
  if (firebaseEnabled && db) {
    const [donationsSnapshot, pickupsSnapshot, messagesSnapshot] = await Promise.all([
      getDocs(query(collection(db, 'donations'), orderBy('createdAt', 'desc'), limit(12))),
      getDocs(query(collection(db, 'pickup_requests'), orderBy('createdAt', 'desc'), limit(12))),
      getDocs(query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'), limit(12))),
    ]);

    return {
      donations: mapCollection<DonationRecord>(donationsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))),
      pickups: mapCollection<PickupRecord>(pickupsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))),
      messages: mapCollection<ContactRecord>(messagesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))),
      source: 'firebase' as const,
    };
  }

  return {
    donations: readLocal<DonationRecord>('food-rescue-donations'),
    pickups: readLocal<PickupRecord>('food-rescue-pickups'),
    messages: readLocal<ContactRecord>('food-rescue-messages'),
    source: 'demo' as const,
  };
};

export const subscribeDashboardData = (
  callback: (data: Awaited<ReturnType<typeof loadDashboardData>>) => void,
  onError?: (message: string) => void,
) => {
  if (firebaseEnabled && db) {
    const donationQuery = query(collection(db, 'donations'), orderBy('createdAt', 'desc'), limit(12));
    const pickupQuery = query(collection(db, 'pickup_requests'), orderBy('createdAt', 'desc'), limit(12));
    const messagesQuery = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'), limit(12));

    let donations: DonationRecord[] = [];
    let pickups: PickupRecord[] = [];
    let messages: ContactRecord[] = [];

    const emit = () => callback({ donations, pickups, messages, source: 'firebase' as const });

    const unsubDonations = onSnapshot(
      donationQuery,
      (snapshot) => {
        donations = mapCollection<DonationRecord>(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        emit();
      },
      () => onError?.('تعذر قراءة بيانات التبرعات من Firestore.'),
    );

    const unsubPickups = onSnapshot(
      pickupQuery,
      (snapshot) => {
        pickups = mapCollection<PickupRecord>(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        emit();
      },
      () => onError?.('تعذر قراءة بيانات فرق الاستلام من Firestore.'),
    );

    const unsubMessages = onSnapshot(
      messagesQuery,
      (snapshot) => {
        messages = mapCollection<ContactRecord>(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        emit();
      },
      () => onError?.('تعذر قراءة رسائل التواصل من Firestore.'),
    );

    return () => {
      unsubDonations();
      unsubPickups();
      unsubMessages();
    };
  }

  const readAll = () => {
    callback({
      donations: readLocal<DonationRecord>('food-rescue-donations'),
      pickups: readLocal<PickupRecord>('food-rescue-pickups'),
      messages: readLocal<ContactRecord>('food-rescue-messages'),
      source: 'demo' as const,
    });
  };

  readAll();
  window.addEventListener('storage-sync', readAll);
  window.addEventListener('storage', readAll);

  return () => {
    window.removeEventListener('storage-sync', readAll);
    window.removeEventListener('storage', readAll);
  };
};
