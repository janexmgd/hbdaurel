import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti'; 
import { Lock, Timer, ArrowRight, MessageCircleHeart, KeyRound, Heart } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { BIRTHDAY_CONFIG } from './config';

// --- DATA JSON UCAPAN ---
const wishesData = BIRTHDAY_CONFIG.wishesData;

function WishCard({ wish, sender }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-sm w-full mx-auto bg-[#140F16] p-6 rounded-2xl border border-zinc-800 transition-all duration-300 text-left"
    >
      {/* Icon Header Simpel */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-[#F48FB1] border border-zinc-800">
          <MessageCircleHeart size={18} strokeWidth={1.5} />
        </div>
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">
          Message
        </div>
      </div>

      {/* Isi Wish / Harapan */}
      <p className="text-zinc-300 text-sm leading-relaxed font-sans mb-4">
        "{wish}"
      </p>

      {/* Garis Pembatas Flat */}
      <div className="h-[1px] w-full bg-zinc-800 mb-3" />

      {/* Nama Pengirim */}
      <div className="flex justify-between items-center">
        <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">From:</span>
        <span className="text-sm font-medium tracking-wide text-[#F48FB1]">
          {sender}
        </span>
      </div>
    </motion.div>
  );
}

// --- KOMPONEN UTAMA APLIKASI ---
function App() {
  const [isAccessible, setIsAccessible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [age, setAge] = useState(0);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  
  const [inputPasskey, setInputPasskey] = useState('');
  const [isBypassed, setIsBypassed] = useState(false);

  // Fungsi pembantu untuk mendapatkan objek waktu saat ini khusus dalam Zona WIB (Asia/Jakarta)
  const getWIBDate = () => {
    const localDate = new Date();
    const wibString = localDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    return new Date(wibString);
  };

  // 1. LOGIKA COUNTDOWN AKSES (BERDASARKAN WIB) & HITUNG UMUR
  useEffect(() => {
    const checkAccess = () => {
      const nowWIB = getWIBDate();
      const currentYear = nowWIB.getFullYear();
      
      let calculatedAge = currentYear - BIRTHDAY_CONFIG.birthYear;
      const hasPassedBirthday = 
        nowWIB.getMonth() > BIRTHDAY_CONFIG.birthMonth - 1 || 
        (nowWIB.getMonth() === BIRTHDAY_CONFIG.birthMonth - 1 && nowWIB.getDate() >= BIRTHDAY_CONFIG.birthDate);
      
      if (!hasPassedBirthday) {
        calculatedAge -= 1;
      }
      setAge(calculatedAge);

      if (isBypassed) {
        setIsAccessible(true);
        return;
      }

      const targetDateWIB = new Date(currentYear, BIRTHDAY_CONFIG.birthMonth - 1, BIRTHDAY_CONFIG.birthDate, 0, 0, 0);
      const expiryDateWIB = new Date(currentYear, BIRTHDAY_CONFIG.birthMonth - 1, 31, 23, 59, 59);

      if (nowWIB >= targetDateWIB && nowWIB <= expiryDateWIB) {
        setIsAccessible(true);
      } else {
        setIsAccessible(false);
        let countdownTarget = targetDateWIB;
        
        if (nowWIB > expiryDateWIB) {
          countdownTarget = new Date(currentYear + 1, BIRTHDAY_CONFIG.birthMonth - 1, BIRTHDAY_CONFIG.birthDate, 0, 0, 0);
        }
        
        const difference = countdownTarget - nowWIB;
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    checkAccess();
    const timer = setInterval(checkAccess, 1000);
    return () => clearInterval(timer);
  }, [isBypassed]);

  const handlePasskeyChange = (e) => {
    const value = e.target.value;
    setInputPasskey(value);
    if (value === BIRTHDAY_CONFIG.passkey) {
      setIsBypassed(true);
      setIsAccessible(true);
    }
  };

  // 2. EFEK KEMBANG API TERUS-MENERUS
  useEffect(() => {
    if (!isAccessible) return;

    confetti({ particleCount: 60, spread: 50, colors: ['#F48FB1', '#F8BBD0', '#FFE082'] });
    const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 20 };
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const particleCount = 15; 
      confetti({ ...defaults, particleCount, colors: ['#F48FB1', '#FF9800', '#F8BBD0'], origin: { x: randomInRange(0, 0.15), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, colors: ['#F48FB1', '#FF9800', '#F8BBD0'], origin: { x: randomInRange(0.85, 1), y: Math.random() - 0.2 } });
    }, 600);

    return () => clearInterval(interval);
  }, [isAccessible]);

  const handleNextWish = () => {
    setCurrentWishIndex((prevIndex) => (prevIndex + 1) % wishesData.length);
  };

  return (
    /* Menggunakan min-h-screen cair, overflow-y-auto, serta class scrollbar-none milik Tailwind */
    <div className="min-h-screen bg-[#0A070B] text-[#E2E8F0] font-sans relative select-none flex flex-col overflow-y-auto [&::-webkit-scrollbar]:none [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {/* Background Glow Tetap Fixed agar tidak ikut ter-scroll */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-[#C2185B]/5 rounded-full filter blur-[150px] pointer-events-none z-0"></div>

      {/* Konten Utama - Menggunakan padding atas-bawah (py-12) agar tidak mentok ujung layar */}
      <div className="flex-grow relative flex items-center justify-center w-full py-12 px-6 z-10">
        <AnimatePresence mode="wait">
          {!isAccessible ? (
            /* --- TAMPILAN LOCK (ACCESS DENIED) --- */
            <motion.div
              key="lock-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-md w-full bg-[#140F16]/80 backdrop-blur-xl p-8 rounded-3xl border border-pink-950/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6"
            >
              <div className="mx-auto w-16 h-16 rounded-2xl bg-[#C2185B]/10 flex items-center justify-center text-[#F48FB1] border border-[#C2185B]/20 shadow-inner">
                <Lock size={24} strokeWidth={1.5} className="animate-pulse" />
              </div>

              <div className="space-y-2 text-center">
                <h1 className="text-xl font-semibold tracking-wide text-white">Galaxy Archive Secured</h1>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[280px] mx-auto">
                  Akses menuju halaman perayaan akan terbuka otomatis tepat pada tanggal <span className="text-[#F48FB1] font-medium">{BIRTHDAY_CONFIG.birthDate} Oktober</span> berlandaskan zona waktu <span className="text-zinc-300 font-medium tracking-wide">WIB</span>.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 bg-[#0A070B]/60 p-4 rounded-2xl border border-pink-950/20 text-center">
                {[
                  { label: 'Days', val: timeLeft.days },
                  { label: 'Hours', val: timeLeft.hours },
                  { label: 'Mins', val: timeLeft.minutes },
                  { label: 'Secs', val: timeLeft.seconds }
                ].map((t, idx) => (
                  <div key={idx}>
                    <div className="text-2xl font-bold font-mono text-[#F48FB1] drop-shadow-[0_0_10px_rgba(244,143,177,0.3)]">
                      {String(t.val).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-500 font-medium mt-0.5">{t.label}</div>
                  </div>
                ))}
              </div>

              {/* INPUT PASSKEY RAHASIA */}
              <div className="relative max-w-[240px] mx-auto w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
                  <KeyRound size={14} />
                </div>
                <input
                  type="password"
                  value={inputPasskey}
                  onChange={handlePasskeyChange}
                  placeholder="Enter secret alignment key..."
                  className="w-full bg-zinc-950/60 border border-zinc-800 text-zinc-300 text-xs rounded-xl pl-9 pr-3 py-2.5 text-center placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors duration-200 font-mono tracking-wide"
                />
              </div>

              <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1.5 tracking-widest uppercase">
                <Timer size={12} className="text-[#F48FB1]/70" /> Awaiting Alignment (WIB)...
              </div>
            </motion.div>
          ) : (
            /* --- TAMPILAN UTAMA (HAPPY BIRTHDAY) --- */
            <motion.div
              key="birthday-screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ ease: "easeOut", duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-6 w-full max-w-xl mx-auto"
            >
              {/* Judul Atas */}
              <h3 className="font-sans text-[#F48FB1] text-2xl font-semibold tracking-widest uppercase text-center drop-shadow-[0_0_20px_rgba(244,143,177,0.2)]">
                🎊 Happy {age}th Birthday ✨
              </h3>

              {/* Frame Foto Tengah */}
              <div className="relative p-1.5 bg-gradient-to-b from-pink-500/20 to-transparent rounded-2xl shadow-[0_0_40px_rgba(194,24,91,0.25)]">
                <img
                  src={BIRTHDAY_CONFIG.imagePath}
                  alt="Birthday Archive"
                  className="w-[260px] h-[240px] sm:w-[280px] sm:h-[260px] object-cover rounded-xl border border-pink-950/40 relative z-10"
                />
              </div>

              {/* Nama Dinamis dengan Typewriter */}
              <h1 className="font-sans text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide text-center min-h-[50px]">
                <Typewriter
                  options={{
                    strings: BIRTHDAY_CONFIG.typewriterNames,
                    delay: 50,
                    autoStart: true,
                    loop: true,
                    cursor: '<span style="color: #ffffff;">_</span>',
                    wrapperClassName: 'text-xl italic text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-pink-200'
                  }}
                />
              </h1>

              {/* Area Wish Card & Navigasi */}
              <div className="flex flex-col items-center gap-4 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentWishIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <WishCard 
                      wish={wishesData[currentWishIndex].wish} 
                      sender={wishesData[currentWishIndex].sender} 
                    />
                  </motion.div>
                </AnimatePresence>

                {wishesData.length > 1 && (
                  <button
                    onClick={handleNextWish}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-xs tracking-wider uppercase font-medium text-zinc-400 border border-zinc-800 hover:text-[#F48FB1] hover:border-zinc-700 active:scale-95 transition-all duration-200"
                  >
                    Next Wish <ArrowRight size={14} />
                  </button>
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- KOMPONEN FOOTER --- */}
      <footer className="w-full text-center py-6 z-20 pointer-events-none select-none mt-auto">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-medium flex items-center justify-center gap-1.5">
          Made with 
          <span className="inline-block text-[#F48FB1] animate-pulse">
            <Heart size={10} fill="currentColor" />
          </span> 
          by denny
        </p>
      </footer>
    </div>
  );
}

export default App;