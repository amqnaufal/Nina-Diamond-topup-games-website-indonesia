/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ReactNode, useState, useEffect, FormEvent } from 'react';
import {
  Search,
  LogIn,
  UserPlus,
  LayoutGrid,
  ReceiptText,
  Calculator,
  Star,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Sun,
  Instagram,
  ClipboardPaste,
  BarChart3,
  FileSearch,
  X,
  EyeOff,
  Eye,
  Lock,
  Loader2,
  Flame,
  QrCode,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { RegionModal } from './components/RegionModal';
import { Logo } from './components/Logo';
import { InvoiceModal } from './components/InvoiceModal';

interface TrendingGame {
  name: string;
  publisher: string;
  img: string;
  badge?: string;
}

const TRENDING_GAMES: TrendingGame[] = [
  { name: 'Mobile Legends', publisher: 'Moonton', img: 'https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FMLIndonesia-ezgif.com-jpg-to-webp-converter%20(1).webp&w=1080&q=75' },
  { name: 'Free Fire', publisher: 'Garena', img: 'https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FIconCoba-ezgif.com-jpg-to-webp-converter%20(2)%20(1).webp&w=1080&q=75' },
  { name: 'Magic Chess : Go Go', publisher: 'Vizta Games', img: 'https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2F2605.webp&w=1080&q=75' },
  { name: 'PUBG Mobile', publisher: 'Tencent Games', img: 'https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fb94ea08a-6890-4dfd-8073-7b8479722504.png&w=1080&q=75' },
  { name: 'Roblox - Voucher', publisher: 'Roblox Corporation', img: 'https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fthumbnail%20roblox.webp&w=1080&q=75' },
  { name: 'Blood Strike', publisher: 'NetEase', img: 'https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FIconCoba-ezgif.com-jpg-to-webp-converter%20(3)%20(1).webp&w=1080&q=75' },
  { name: 'Steam Wallet', publisher: 'Valve', img: 'https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2F49fdb2f7-41d0-4daa-b115-d75717eaa6f2.webp&w=1080&q=75' },
  { name: 'Zenless Zone Zero', publisher: 'HoYoverse', img: 'https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FICONGAME-ezgif.com-jpg-to-webp-converter%20(1).webp&w=1920&q=75' },
];

const ALL_GAMES = [
  { name: "Mobile Legends", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FMLIndonesia-ezgif.com-jpg-to-webp-converter%20(1).webp&w=1080&q=75" },
  { name: "Free Fire Max", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Feb2e29bd-78d5-41db-9712-f3e6c55d73a0.jpg&w=1920&q=75" },
  { name: "Magic Chess", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2F2605.webp&w=750&q=75" },
  { name: "PUBG Mobile", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fb94ea08a-6890-4dfd-8073-7b8479722504.png&w=750&q=75" },
  { name: "Genshin Impact", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fbbcbed30-004a-490e-80da-6da748fe302f.jpg&w=1920&q=75" },
  { name: "Valorant", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F7881fb56-29c7-4baa-9e1e-539615b1d0aa.jpg&w=750&q=75" },
  { name: "Roblox", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fthumbnail%20roblox.webp&w=750&q=75" },
  { name: "Blood Strike", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FIconCoba-ezgif.com-jpg-to-webp-converter%20(3)%20(1).webp&w=750&q=75" },
  { name: "Honor of Kings", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F9916bb72-8991-4239-afbb-cb74ea22b3d6.webp&w=750&q=75" },
  { name: "Steam Wallet", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2F49fdb2f7-41d0-4daa-b115-d75717eaa6f2.webp&w=750&q=75" },
  { name: "TikTok Coins", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2F3.jpg&w=750&q=75" },
  { name: "Call of Duty Mobile", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F741e9167-79ff-4e4d-bd71-f9ddb26b173b.jpg&w=750&q=75" },
  { name: "Honkai Star Rail", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Feb34737a-d6c4-4292-8a43-da5892a1dde2.webp&w=750&q=75" },
  { name: "Point Blank", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F532f2316-10c0-41a8-b024-9ca487c6848c.webp&w=750&q=75" },
  { name: "ZZZ", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FICONGAME-ezgif.com-jpg-to-webp-converter%20(1).webp&w=640&q=75" },
  { name: "Where Winds Meet", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FWWMt.webp&w=640&q=75" },
  { name: "Delta Force", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FThumbnail-18-ezgif.com-png-to-webp-converter.webp&w=640&q=75" },
  { name: "One Punch Man", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2F50b8c697-8f29-4851-967e-b2237e56e4fe.webp&w=640&q=75" },
  { name: "Lineage II", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Flineage2m-ezgif.webp&w=640&q=75" },
  { name: "Zepeto", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F4bec12cf-39b5-4557-a3f1-218bcee69b04.webp&w=640&q=75" },
  { name: "Metal Slug", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F9470379d-1836-4297-a582-b9f41eaa3789.webp&w=640&q=75" },
  { name: "Undawn", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F70378e94-0b50-4b4e-b2de-b19d14371017.webp&w=640&q=75" },
  { name: "Eggy Party", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F0744c20a-06d2-4b0a-af0c-8335897c73a6.webp&w=640&q=75" },
  { name: "League of Legends", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fcc5bf754-7177-44a3-8843-1979db5e0eae.jpg&w=640&q=75" },
  { name: "Honkai Impact 3", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2F95026951-2bb2-48b2-a3c8-a3310fe5d1d6.webp&w=640&q=75" },
  { name: "Tower of Fantasy", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fa432d22d-5431-4a48-8cd1-0d8da930829f.jpg&w=640&q=75" },
  { name: "Revelation", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fd75927c8-fc0d-4959-ba7a-107503758b1d.webp&w=640&q=75" },
  { name: "Marvel Snap", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fthumb%20marvel%20snap.webp&w=640&q=75" },
  { name: "Super Sus", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F0bbd1877-2987-4160-809c-ec73c4082f83.webp&w=640&q=75" },
  { name: "Sausage Man", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2F2481e97e-e19b-40a3-927c-889716f17ba7.webp&w=640&q=75" },
  { name: "Seal M", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fda8297c5-f7e1-4a12-a87d-89c3c7a8e80c.webp&w=640&q=75" },
  { name: "Marvel Super War", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2F54a16d71-f189-412c-b587-5714b993631c.webp&w=640&q=75" },
  { name: "Alchemy Stars", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F06483660-bc05-4dcb-aabd-25ed52bcb1f0.webp&w=640&q=75" },
  { name: "EA FC Mobile", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F15f8dac8-779e-4059-b77d-506f41fd86fe.webp&w=640&q=75" },
  { name: "Identity V", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fad610298-569c-4ee2-a094-5d948f04ad1c.webp&w=640&q=75" },
  { name: "Cloud Song", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2F2128f4cd-89dc-4572-b6c1-b2c46b68b782.webp&w=640&q=75" },
  { name: "Be The King", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2F408b64ac-763a-4a41-9e0c-b340058310fe.webp&w=1200&q=75" },
  { name: "Project Entropy", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fad0bc400-85db-441d-b274-a7251c03d0b5.webp&w=1200&q=75" },
  { name: "Football Master 2", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2F309014f3-b20c-46a1-bb78-bb8665823ab8.webp&w=640&q=75" },
  { name: "Sky", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2Ffdcf3006-6d5b-45a8-a487-04ad2b88665d.webp&w=640&q=75" },
  { name: "Ragnarok X", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2Fb0ad914f-ba1e-451d-ae22-d44bdb909c54.webp&w=640&q=75" },
  { name: "Ragnarok Eternal Love", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2Fb43a02d5-805e-4913-af00-703a1b32dfaa.webp&w=640&q=75" },
  { name: "Astral Guardians", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2Fd0f78229-e464-4b55-84b5-04ce1eb0fc43.webp&w=1200&q=75" }
];

const HERO_SLIDES = [
  {
    image: "/banner1.png",
  },
  {
    image: "/banner2.png",
  },
  {
    image: "/banner3.png",
  },
  {
    image: "/banner4.jpg",
  }
];

import { auth, googleProvider, db, handleFirestoreError, OperationType } from './lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, orderBy, limit, getDocs, onSnapshot } from 'firebase/firestore';

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'topup' | 'cek-transaksi'>(
    searchParams.get('tab') === 'cek-transaksi' ? 'cek-transaksi' : 'topup'
  );
  const [activeCategory, setActiveCategory] = useState<'Top Up Games' | 'Game Baru' | 'Voucher'>('Top Up Games');
  const [isRegisterOpen, setIsRegisterOpen] = useState(searchParams.get('register') === 'true');
  const [isLoginOpen, setIsLoginOpen] = useState(searchParams.get('login') === 'true');

  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab') === 'cek-transaksi' ? 'cek-transaksi' : 'topup');
    }
    if (searchParams.get('login') === 'true') {
      setIsLoginOpen(true);
      setIsRegisterOpen(false);
    }
    if (searchParams.get('register') === 'true') {
      setIsRegisterOpen(true);
      setIsLoginOpen(false);
    }
  }, [searchParams]);

  // Clean URL when modals close
  useEffect(() => {
    if (!isLoginOpen && !isRegisterOpen && searchParams.get('tab') === null) {
      if (searchParams.has('login') || searchParams.has('register')) {
        setSearchParams(new URLSearchParams());
      }
    }
  }, [isLoginOpen, isRegisterOpen, searchParams, setSearchParams]);

  
  // Auth Form State
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [searchInvoiceId, setSearchInvoiceId] = useState('');
  const [searchedInvoice, setSearchedInvoice] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (activeTab === 'cek-transaksi' && user) {
      const q = query(
        collection(db, 'transactions'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      const unsub = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTransactions(data);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'transactions');
      });
      return unsub;
    } else {
      setTransactions([]);
    }
  }, [activeTab, user]);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAuthError('Kata sandi tidak cocok!');
      return;
    }
    setAuthError(null);
    setAuthLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // Create user doc
      try {
        await setDoc(doc(db, 'users', cred.user.uid), {
          fullName,
          email,
          whatsapp,
          role: 'user',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } catch (dbErr) {
        handleFirestoreError(dbErr, OperationType.CREATE, `users/${cred.user.uid}`);
      }
      setIsRegisterOpen(false);
    } catch (err: any) {
      setAuthError(err.message || 'Gagal mendaftar. Silakan coba lagi.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoginOpen(false);
    } catch (err: any) {
      setAuthError('Email atau kata sandi salah.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleSSO = async () => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      try {
        // Attempt to create user document if it's their first time
        // The security rules specify we can create if valid. It might error if it already exists or missing data but this is basic.
        await setDoc(doc(db, 'users', cred.user.uid), {
          fullName: cred.user.displayName || 'Google User',
          email: cred.user.email,
          role: 'user',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }, { merge: true }); // merge true so we don't overwrite if existing, though our rules strictly require exact keys for create, it might fail. For now this is fine.
      } catch (dbErr) {
        console.warn('Could not create/update user profile', dbErr);
      }
      setIsLoginOpen(false);
      setIsRegisterOpen(false);
    } catch (err: any) {
      setAuthError(err.message || 'Login dengan Google gagal');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSearchInvoice = async () => {
    if (!searchInvoiceId) return;
    try {
      const docRef = doc(db, 'transactions', searchInvoiceId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setSearchedInvoice({ id: snap.id, ...snap.data() });
        return;
      }
    } catch (e) {
      console.error(e);
    }
    const found = transactions.find(t => t.invoiceId === searchInvoiceId);
    if (found) {
      setSearchedInvoice(found);
    } else {
      alert("Invoice tidak ditemukan.\n(Gunakan invoice id yang valid)");
    }
  };

  const resetAuthForms = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setWhatsapp('');
    setAuthError(null);
  };


  const CATEGORIES = ['Top Up Games', 'Game Baru', 'Voucher'] as const;

  const NEW_GAMES = [
    { name: "Legend of Aoqi", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2Fd0f78229-e464-4b55-84b5-04ce1eb0fc43.webp&w=1200&q=75" },
    { name: "Dream Record", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fthumbnail%20dream%20record.webp&w=640&q=75" },
    { name: "LineageW", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FLineageW-T.webp&w=640&q=75" },
    { name: "Racing Master", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FThumbnail-RacingMasterr_2025-04-02_23-12-22.webp&w=640&q=75" },
    { name: "Dragon Nest Classic", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FDragonnest%20M%20classic%20thumb.webp&w=640&q=75" },
    { name: "Ragnarok", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FThumbnai-ROMC_2025-02-22_15-32-41.webp&w=640&q=75" },
    { name: "Growtopia", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fa2523eb2-3e1a-4b37-b79e-db4c2c425fff.webp&w=640&q=75" },
    { name: "The Ants", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F2810c13d-d2f4-4bc5-a609-a325c5800474.jpg&w=640&q=75" },
    { name: "Star Dive", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FThumbnail%20Baru%20(2).png&w=640&q=75" },
    { name: "Nine Artifacts", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fthumnail-nasr.webp&w=640&q=75" },
    { name: "Cross Fire", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FCL1.webp&w=640&q=75" },
    { name: "Bleach Soul Resonance", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FBSRt.webp&w=640&q=75" },
    { name: "Seven Knights Rebirth", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FSKRBKt.webp&w=640&q=75" },
    { name: "Haikyu!!", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fthumbnail%20Haikyuu.webp&w=640&q=75" },
    { name: "Soul Land", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FICONGAME-ezgif.com-jpg-to-webp-converter%20(3)%20(1).webp&w=640&q=75" },
    { name: "Delta Force", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FdeltaforceSTEAM%20T.webp&w=640&q=75" },
    { name: "Asphalt 9", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fasphalt.png&w=640&q=75" },
    { name: "LoA Crystal of Atlan", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FTHUm%20COA%20.webp&w=640&q=75" },
    { name: "Idle Berserker", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fidle%20berserker%20thumb%20client.webp&w=640&q=75" },
    { name: "Whiteout Survival", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FWS.webp&w=640&q=75" },
    { name: "Wuthering Waves", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fthumbnail%20wuthuring%20waves.webp&w=1920&q=75" },
    { name: "Dragon Nest Classic 2", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FThumbnail-DragonestClassic_2025-04-08_23-55-23.webp&w=750&q=75" },
    { name: "Machina", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FThumbnailProduct6-ezgif_2025-04-04_23-14-51.webp&w=750&q=75" },
    { name: "Love and Deepspace", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2F76e65580-7bd0-4b8d-8faa-9221db85222d.webp&w=750&q=75" },
    { name: "Age of Empires Mobile", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fageofempire-ezgif.webp&w=750&q=75" },
    { name: "Arena Breakout Infinite", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Farena-breakeout-ezgif.com-jpg-to-webp-converter%20(2)%20(1).webp&w=750&q=75" },
    { name: "Pokemon Unite", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fpokemonunite-ezgif.webp&w=750&q=75" },
    { name: "King's Choice", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FKingsChoice-ezgif.com-jpg-to-webp-converter%20(1).webp&w=750&q=75" },
    { name: "Jung Games", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F5a14e8c1-cef6-455b-bf20-e9575ee3fce5.png&w=750&q=75" },
    { name: "Teamfight Tactics", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F6919725e-f653-46d6-9b41-a371cacb56b9.webp&w=1920&q=75" }
  ];
  
  const VOUCHERS = [
    { name: "Honkai Impact 3", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FHI3.webp&w=750&q=75" },
    { name: "Zenless Zone Zero", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FZenlessZero.webp&w=750&q=75" },
    { name: "Google Play", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FIcon1-ezgif.com-jpg-to-webp-converter.webp&w=750&q=75" },
    { name: "Razer Gold", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2F8352083f-441d-4b02-8c52-2c592d212610.webp&w=750&q=75" },
    { name: "Discord", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FDiscord512512-1.jpg&w=750&q=75" },
    { name: "Spotify", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fspotify%20thumbnail_2025-04-21_04-41-52.webp&w=750&q=75" },
    { name: "Megaxus", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2F602fbc8b-18c5-435e-8272-007c8331a1a6.webp&w=750&q=75" },
    { name: "Bstation", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2Fa6c14036-be67-4c86-a2a7-a92461f89956.jpeg&w=750&q=75" },
    { name: "PlayStation Store", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2Fa7f40e94-cea2-4f5f-8d07-c3ce5064f2e0.webp&w=750&q=75" },
    { name: "Valorant Voucher", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fc0bd92a7-6b9f-4498-bc68-a17a5f2a40a8.jpg&w=750&q=75" },
    { name: "Nintendo eShop", img: "https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2F454d5052-9afe-43c1-b3c4-dbf024df0e29.webp&w=750&q=75" }
  ];
  
  const displayGames = activeCategory === 'Game Baru' ? NEW_GAMES 
                     : activeCategory === 'Voucher' ? VOUCHERS 
                     : ALL_GAMES;

  return (
      <div className="relative min-h-screen flex flex-col bg-[#121212] font-sans text-white">
      <RegionModal isOpen={isRegionModalOpen} onClose={() => setIsRegionModalOpen(false)} />
      <InvoiceModal invoice={searchedInvoice} onClose={() => setSearchedInvoice(null)} />
      {/* Top Header */}
      <header className="sticky top-0 z-50 flex w-full flex-col shadow-sm">
        {/* Upper Nav */}
        <div className="flex flex-wrap items-center justify-between gap-y-3 border-b border-black/20 bg-[#242424] px-4 py-3 md:flex-nowrap md:gap-4 md:px-8">
          {/* Logo */}
          <div className="flex shrink-0 items-center justify-center pt-1 leading-none pb-1 order-1">
             <Logo scale={0.7} />
          </div>

          {/* Search & Region */}
          <div className="order-2 flex w-full flex-1 gap-2 md:ml-4 items-center md:w-auto">
            {/* Search Bar */}
            <div className="flex w-full flex-1 items-center rounded-lg bg-[#333333] px-3 py-2 transition-colors focus-within:bg-[#3a3a3a] md:py-2">
              <Search className="mr-2 md:mr-3 h-[18px] w-[18px] text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Cari Game atau Voucher"
                className="w-full bg-transparent text-xs md:text-sm text-white placeholder-gray-400 outline-none"
              />
            </div>

            {/* Region / Currency Toggle */}
            <button 
              onClick={() => setIsRegionModalOpen(true)}
              className="flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/5 bg-[#1F1F1F] px-3 py-2 md:px-4 h-full md:py-2.5 text-[11px] md:text-sm font-semibold transition hover:bg-black/60 cursor-pointer"
            >
              {/* Simple Indonesia Flag icon via CSS block */}
              <span className="relative h-4 w-4 shrink-0 overflow-hidden rounded-full drop-shadow-sm border border-white/10">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-[#ff0000]"></span>
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-white"></span>
              </span>
              ID / IDR
            </button>
          </div>
        </div>

        {/* Lower Nav */}
        <div className="flex items-center justify-between bg-[#242424] px-4 border-b border-white/5 md:px-8">
          <div className="scrollbar-hide flex flex-1 items-center gap-6 md:gap-8 overflow-x-auto whitespace-nowrap text-xs md:text-sm">
            <button 
              onClick={() => setActiveTab('topup')}
              className={`flex items-center gap-1.5 py-3 font-medium transition border-b-[3px] ${activeTab === 'topup' ? 'border-[#ff8a00] text-[#ff8a00]' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'}`}
            >
              <ShoppingBag className="h-[18px] w-[18px] shrink-0" />
              Topup
            </button>
            <button 
              onClick={() => setActiveTab('cek-transaksi')}
              className={`flex items-center gap-1.5 py-3 font-medium transition border-b-[3px] ${activeTab === 'cek-transaksi' ? 'border-[#ff8a00] text-[#ff8a00]' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'}`}
            >
              <FileSearch className="h-[18px] w-[18px] shrink-0" />
              Cek Transaksi
            </button>
          </div>
          <div className="flex shrink-0 items-center justify-end gap-4 md:gap-6 text-xs md:text-sm ml-4 py-3">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="font-semibold text-[#ff8a00] hidden md:block">Hi, {user.email || 'User'}</span>
                <button onClick={handleLogout} className="flex items-center gap-1.5 font-medium text-gray-300 transition hover:text-white">
                  Keluar
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => { setIsLoginOpen(true); resetAuthForms(); }} className="flex items-center gap-1.5 font-medium text-gray-300 transition hover:text-white">
                  <LogIn className="h-[16px] w-[16px]" />
                  Masuk
                </button>
                <button onClick={() => { setIsRegisterOpen(true); resetAuthForms(); }} className="flex items-center gap-1.5 font-medium text-gray-300 transition hover:text-white">
                  <UserPlus className="h-[16px] w-[16px]" />
                  Daftar
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 mx-auto w-full max-w-[1300px] px-4 py-6 md:px-8">
        {activeTab === 'topup' && (
          <>
            {/* Hero Section */}
        <section className="relative mb-6 md:mb-10 w-full overflow-hidden rounded-2xl md:rounded-[24px]">
          <div className="w-full relative group cursor-pointer overflow-hidden">
            <div 
              className="flex w-full transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {HERO_SLIDES.map((slide, i) => (
                <div key={i} className="relative w-full flex-none shrink-0 cursor-pointer bg-neutral-900 overflow-hidden aspect-[163/64]">
                  <img 
                    src={slide.image} 
                    alt={`Promo Banner ${i + 1}`} 
                    className="absolute inset-0 w-full h-full object-cover block"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/40 text-white hover:bg-black/60 transition z-10"
            >
              <ChevronLeft className="h-6 w-6 md:h-7 md:w-7 pr-0.5" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/40 text-white hover:bg-black/60 transition z-10"
            >
              <ChevronRight className="h-6 w-6 md:h-7 md:w-7 pl-0.5" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-10">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-6 md:w-8 bg-[#ff8a00]' : 'w-1.5 md:w-2 bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
              <Star className="h-6 w-6 text-yellow-500 fill-yellow-500 drop-shadow-lg animate-pulse" />
              TRENDING
            </h2>
            <p className="mt-1 text-sm text-gray-400">Berikut adalah beberapa produk yang paling populer saat ini.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {TRENDING_GAMES.map((game, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate('/id-id/mobile-legends')}
                className="group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-xl bg-[#2e2e2e] p-3 shadow-md transition-all hover:bg-[#353535] hover:shadow-lg hover:-translate-y-0.5 border border-white/5 hover:border-white/10"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-800">
                  <img src={game.img} alt={game.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                  {game.badge && (
                      <div className="absolute top-0 left-0 bg-yellow-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-br-lg z-10">
                          {game.badge}
                      </div>
                  )}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <h3 className="truncate text-sm font-bold text-white transition-colors group-hover:text-[#ff8a00]">{game.name}</h3>
                  <p className="truncate text-xs text-gray-400">{game.publisher}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category Pills */}
        <section className="mb-6">
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-2">
            {CATEGORIES.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-md px-4 py-2 text-sm transition shadow-sm border ${
                  activeCategory === category 
                  ? 'bg-[#ff8a00] font-bold text-white border-transparent hover:bg-[#e07a00]' 
                  : 'bg-[#333333] font-medium text-gray-300 border-white/5 hover:bg-[#3a3a3a] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* All Games Grid */}
        <section>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 lg:gap-4">
            {displayGames.map((game, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate('/id-id/mobile-legends')}
                className="group relative flex aspect-[3/4] cursor-pointer flex-col justify-end overflow-hidden rounded-xl bg-gray-800 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:ring-2 ring-[#ff8a00]/50"
              >
                <img 
                  src={game.img} 
                  alt={game.name} 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-90"
                  loading="lazy"
                />
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                <div className="relative z-10 px-3 pb-3 pt-6 text-center">
                  <h3 className="text-sm font-bold leading-tight text-white line-clamp-2 drop-shadow-md">{game.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
          </>
        )}

        {activeTab === 'cek-transaksi' && (
          <div className="mx-auto w-full pt-8 pb-16 flex flex-col items-center">
            {/* Top Container */}
            <div className="w-full rounded-[24px] bg-gradient-to-b from-[#3a352f] to-[#25221e] px-4 py-16 text-center shadow-lg mb-16 relative overflow-hidden">
               {/* Background subtle noise or gradient if needed, but solid gradient is fine */}
               <h1 className="text-2xl md:text-[32px] font-bold text-white mb-3">Cek Invoice Kamu dengan Mudah dan Cepat</h1>
               <p className="text-sm md:text-base text-gray-300 mb-8">Lihat detail pembelian kamu menggunakan nomor Invoice.</p>
               
               <div className="mx-auto max-w-xl w-full bg-[#1b1917] rounded-xl p-5 text-left border border-white/5">
                  <h3 className="text-sm font-semibold text-white mb-3">Cari detail pembelian kamu disini</h3>
                  
                  <div className="flex items-center w-full bg-[#3d3d3d] rounded-md px-3 py-2.5 mb-4 border border-transparent focus-within:border-[#ff8a00] transition-colors">
                    <input 
                      type="text" 
                      value={searchInvoiceId}
                      onChange={(e) => setSearchInvoiceId(e.target.value)}
                      placeholder="Masukkan nomor Invoice Kamu (Contoh: LDXXXXXXXXXXXXXX)"
                      className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                    />
                    <button onClick={async () => {
                      const text = await navigator.clipboard.readText();
                      setSearchInvoiceId(text);
                    }} className="shrink-0 ml-2 text-gray-400 hover:text-white transition-colors">
                      <ClipboardPaste className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button onClick={handleSearchInvoice} className="w-full bg-[#ff8a00] hover:bg-[#e07a00] text-white font-bold py-2.5 rounded-md text-sm transition-colors flex items-center justify-center gap-2">
                    <FileSearch className="h-4 w-4" />
                    Cari Invoice
                  </button>
               </div>
            </div>

            {/* Table Section */}
            <div className="w-full text-center">
               <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Transaksi Real-Time</h2>
               <p className="text-sm text-gray-400 mb-6">Berikut ini Real-Time data pesanan masuk terbaru NINA DIAMOND.</p>

               <div className="w-full rounded-xl border border-white/10 bg-[#1e1c1a]/50 overflow-hidden text-left min-h-[300px] flex flex-col">
                  {/* Table Header */}
                  <div className="grid grid-cols-5 border-b border-white/10 px-6 py-4 text-xs font-semibold text-white">
                     <div>Tanggal</div>
                     <div>Nomor Invoice</div>
                     <div>No. Handphone</div>
                     <div>Harga</div>
                     <div>Status</div>
                  </div>

                  {transactions.length > 0 ? (
                    <div className="flex-1 flex flex-col w-full">
                      {transactions.map(tx => (
                        <div key={tx.id} className="grid grid-cols-5 border-b border-white/5 px-6 py-4 text-xs text-white items-center">
                          <div>
                            {tx.createdAt ? new Date(tx.createdAt.toMillis ? tx.createdAt.toMillis() : Date.now()).toLocaleDateString('id-ID') : 'Baru saja'}
                          </div>
                          <div className="font-mono text-[#ff8a00]">{tx.invoiceId}</div>
                          <div className="text-gray-400">{tx.gameName}</div>
                          <div className="font-semibold">Rp {tx.price.toLocaleString('id-ID')}</div>
                          <div>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              tx.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              tx.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {tx.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
                       <BarChart3 className="h-12 w-12 text-gray-400 mb-4 stroke-[1.5]" />
                       <h3 className="text-base font-bold text-white mb-1">Data tidak ditemukan!</h3>
                       <p className="text-sm text-gray-400">Tidak ada aktifitas data.</p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        )}

      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 rounded-full bg-[#ff8a00] px-4 py-3 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(255,138,0,0.39)] transition hover:bg-[#e07a00] hover:shadow-lg hover:-translate-y-0.5">
         <Headphones className="h-5 w-5" />
         CHAT CS
      </button>

      {/* Footer Area with SVG Wave above it */}
      <div className="relative mt-20 pt-20 bg-[#161616]">
          {/* Wave SVG separator */}
          <div className="absolute -top-[1px] md:-top-[20px] lg:-top-[30px] xl:-top-[60px] left-0 w-full overflow-hidden leading-0">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto transform rotate-180 drop-shadow-xl" preserveAspectRatio="none">
               <path fill="#222222" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
             </svg>
          </div>

          <div className="mx-auto max-w-[1300px] px-4 pb-8 pt-10 md:px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                  
                  {/* Brand Column */}
                  <div className="col-span-1 md:col-span-1 flex flex-col items-start gap-4">
                     <Logo scale={1} />
                     <p className="text-sm text-gray-400 mt-2 max-w-sm leading-relaxed">
                        Website Top Up Game Termurah Dan Tercepat Se-Indonesia
                     </p>
                     
                     <div className="mt-4">
                        <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white transition hover:opacity-80">
                           <Instagram className="h-5 w-5" />
                        </a>
                     </div>
                  </div>

                  {/* Empty Spacer or Links */}
                  <div className="md:col-span-1"></div>

                  {/* Link Columns */}
                  <div className="col-span-1 grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-2 text-sm text-gray-400">
                      
                      <div className="flex flex-col gap-3">
                         <h4 className="font-bold text-[#ff8a00] mb-2 uppercase tracking-wide text-xs">Peta Situs</h4>
                         <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('topup'); window.scrollTo(0, 0); }} className="hover:text-white transition">Beranda</a>
                         <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginOpen(true); resetAuthForms(); window.scrollTo(0, 0); }} className="hover:text-white transition">Masuk</a>
                         <a href="#" onClick={(e) => { e.preventDefault(); setIsRegisterOpen(true); resetAuthForms(); window.scrollTo(0, 0); }} className="hover:text-white transition">Daftar</a>
                         <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('cek-transaksi'); window.scrollTo(0, 0); }} className="hover:text-white transition">Cek Transaksi</a>
                         <a href="#" className="hover:text-white transition">Hubungi Kami</a>
                         <a href="#" className="hover:text-white transition">Ulasan</a>
                      </div>

                      <div className="flex flex-col gap-3">
                         <h4 className="font-bold text-[#ff8a00] mb-2 uppercase tracking-wide text-xs">Dukungan</h4>
                         {/* Empty in reference screenshot except for title but let's leave space */}
                      </div>

                      <div className="flex flex-col gap-3">
                         <h4 className="font-bold text-[#ff8a00] mb-2 uppercase tracking-wide text-xs">Legalitas</h4>
                         <a href="#" className="hover:text-white transition">Kebijakan Pribadi</a>
                         <a href="#" className="hover:text-white transition">Syarat & Ketentuan</a>
                      </div>

                  </div>
              </div>

              <div className="mt-16 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-6 text-xs text-gray-500">
                  <p>© 2026 NINA DIAMOND. All rights reserved.</p>
                  
                  <div className="mt-4 md:mt-0">
                      <button className="flex items-center justify-center h-8 w-8 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition">
                          <Sun className="h-4 w-4" />
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-[100] flex font-sans">
          {/* Left Panel */}
          <div className="relative flex w-[480px] w-full shrink-0 flex-col overflow-y-auto bg-[#2b2b2b] p-6 md:p-12">
            {/* Close Button */}
            <button 
              onClick={() => setIsRegisterOpen(false)}
              className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-md bg-[#1a1a1a] text-gray-400 transition-colors hover:bg-[#333333] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mt-12 flex flex-col">
              <h1 className="mb-2 text-3xl font-bold text-white">Daftar</h1>
              <p className="mb-8 text-sm text-gray-300">Masukkan informasi pendaftaran yang valid.</p>

              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                {authError && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-2 rounded-md">
                    {authError}
                  </div>
                )}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label className="text-xs font-semibold text-white">Nama lengkap</label>
                    <input 
                      type="text" 
                      placeholder="Nama lengkap" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full rounded-md bg-[#646e77] px-4 py-2.5 text-sm text-white placeholder-[#9ca3af] outline-none transition focus:ring-1 focus:ring-[#ff8a00]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label className="text-xs font-semibold text-white">Username</label>
                    <input 
                      type="text" 
                      placeholder="Username" 
                      className="w-full rounded-md bg-[#646e77] px-4 py-2.5 text-sm text-white placeholder-[#9ca3af] outline-none transition focus:ring-1 focus:ring-[#ff8a00]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white">Alamat email</label>
                  <input 
                    type="email" 
                    placeholder="Alamat email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-md bg-[#646e77] px-4 py-2.5 text-sm text-white placeholder-[#9ca3af] outline-none transition focus:ring-1 focus:ring-[#ff8a00]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white">Nomor whatsapp</label>
                  <div className="flex items-center w-full rounded-md bg-[#646e77] overflow-hidden">
                    <div className="flex items-center gap-1.5 px-3 py-2.5 border-r border-[#40444b]">
                      <span className="relative h-3 w-4 shrink-0 overflow-hidden bg-red-500 shadow-sm">
                        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-white"></span>
                      </span>
                      <ChevronRight className="h-3 w-3 text-white rotate-90" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="+62" 
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-[#9ca3af] outline-none transition focus:ring-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label className="text-xs font-semibold text-white">Kata sandi</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Kata sandi" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-md bg-[#646e77] pl-4 pr-10 py-2.5 text-sm text-white placeholder-[#9ca3af] outline-none transition focus:ring-1 focus:ring-[#ff8a00]"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white">
                        {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label className="text-xs font-semibold text-white">Konfirmasi kata sandi</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Konfirmasi kata sandi" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full rounded-md bg-[#646e77] pl-4 pr-10 py-2.5 text-sm text-white placeholder-[#9ca3af] outline-none transition focus:ring-1 focus:ring-[#ff8a00]"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white">
                        {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <label className="mt-2 flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-[#333] text-[#ff8a00] focus:ring-offset-0 focus:ring-[#ff8a00]" />
                  <span className="text-xs text-white">
                    Saya setuju dengan <a href="#" className="font-semibold text-[#ff8a00] hover:underline">Syarat dan Ketentuan</a> dan <a href="#" className="font-semibold text-[#ff8a00] hover:underline">Kebijakan Pribadi</a>.
                  </span>
                </label>

                <button type="submit" disabled={authLoading} className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-[#f77e21] py-2.5 text-sm font-bold text-white transition hover:bg-[#df6d15] disabled:opacity-75 disabled:cursor-not-allowed">
                  {authLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  {authLoading ? 'Memproses...' : 'Daftar'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-white">
                Sudah memiliki akun? <button onClick={() => {setIsRegisterOpen(false); setIsLoginOpen(true); resetAuthForms();}} className="font-bold text-[#ff8a00] hover:underline">Masuk</button>
              </p>

              <div className="my-6 flex items-center justify-center">
                <span className="block h-[1px] flex-1 bg-white/10"></span>
                <span className="px-4 text-xs font-medium text-white">Atau lanjutkan dengan</span>
                <span className="block h-[1px] flex-1 bg-white/10"></span>
              </div>

              <button type="button" onClick={handleGoogleSSO} disabled={authLoading} className="flex w-full items-center justify-center gap-3 rounded-md border border-white/10 bg-[#1a1a1a] py-2.5 transition hover:bg-[#333333] disabled:opacity-75 disabled:cursor-not-allowed">
                {/* SVG Google Logo */}
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-semibold text-white">Google</span>
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="hidden flex-1 bg-[#ff7300] md:flex items-end justify-end p-8 relative">
            <button className="flex items-center gap-2 text-white font-medium text-sm drop-shadow-md transition hover:opacity-80">
                <Headphones className="h-5 w-5" />
                CHAT CS
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[100] flex font-sans">
          {/* Left Panel */}
          <div className="relative flex w-[480px] w-full shrink-0 flex-col overflow-y-auto bg-[#2b2b2b] p-6 md:p-12">
            {/* Close Button */}
            <button 
              onClick={() => setIsLoginOpen(false)}
              className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-md bg-[#1a1a1a] text-gray-400 transition-colors hover:bg-[#333333] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mt-12 flex flex-col">
              <h1 className="mb-2 text-3xl font-bold text-white">Masuk</h1>
              <p className="mb-8 text-sm text-gray-300">Masuk dengan akun yang telah Kamu daftarkan.</p>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                {authError && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-2 rounded-md">
                    {authError}
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white">Alamat Email / Username</label>
                  <input 
                    type="email" 
                    placeholder="Alamat Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-md bg-[#646e77] px-4 py-2.5 text-sm text-white placeholder-[#9ca3af] outline-none transition focus:ring-1 focus:ring-[#ff8a00]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white">Kata sandi</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Kata sandi" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-md bg-[#e5e7eb] pl-4 pr-10 py-2.5 text-sm text-black placeholder-[#9ca3af] outline-none transition focus:ring-1 focus:ring-[#ff8a00]"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-[#333] text-[#ff8a00] focus:ring-offset-0 focus:ring-[#ff8a00]" />
                    <span className="text-xs text-white">Ingat akun ku</span>
                  </label>
                  <a href="#" className="flex items-center text-xs font-semibold text-[#ff8a00] hover:underline">
                    Lupa kata sandi mu?
                  </a>
                </div>

                <button type="submit" disabled={authLoading} className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-[#f77e21] py-2.5 text-sm font-bold text-white transition hover:bg-[#df6d15] disabled:opacity-75 disabled:cursor-not-allowed">
                  {authLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                  {authLoading ? 'Memproses...' : 'Masuk'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-white">
                Belum memiliki akun? <button onClick={() => {setIsLoginOpen(false); setIsRegisterOpen(true); resetAuthForms();}} className="font-bold text-[#ff8a00] hover:underline">Daftar</button>
              </p>

              <div className="my-6 flex items-center justify-center">
                <span className="block h-[1px] flex-1 bg-white/10"></span>
                <span className="px-4 text-xs font-medium text-white">Atau lanjutkan dengan</span>
                <span className="block h-[1px] flex-1 bg-white/10"></span>
              </div>

              <button type="button" onClick={handleGoogleSSO} disabled={authLoading} className="flex w-full items-center justify-center gap-3 rounded-md border border-white/10 bg-[#1a1a1a] py-2.5 transition hover:bg-[#333333] disabled:opacity-75 disabled:cursor-not-allowed">
                {/* SVG Google Logo */}
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-semibold text-white">Google</span>
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="hidden flex-1 bg-[#ff7300] md:flex items-end justify-end p-8 relative">
            <button className="flex items-center gap-2 text-white font-medium text-sm drop-shadow-md transition hover:opacity-80">
                <Headphones className="h-5 w-5" />
                CHAT CS
            </button>
          </div>
      </div>
    )}

    {/* Floating Chat CS Button */}
    <button className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 rounded-r-none rounded-l-full bg-[#f97316] px-5 py-3 font-bold text-white shadow-lg transition hover:bg-[#ea580c] md:rounded-full" style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
      <Headphones className="h-5 w-5" />
      <span className="hidden leading-none sm:block">CHAT CS</span>
    </button>
  </div>
  );
}

