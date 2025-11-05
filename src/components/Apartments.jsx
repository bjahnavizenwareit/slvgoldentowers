import React, { useEffect, useMemo, useRef, useState } from "react";

/* ---------- Data (unchanged) ---------- */
const TABS = [
  { id: "play", title: "Childrens Play Area", img: "/images/childrens_play_area.png", heading: "Childrens Play Area",
    desc: "A safe and vibrant space designed for endless fun, where kids can play, explore and create joyful memories in a secure environment." },
  { id: "pool", title: "Swimming Pool", img: "/images/swimming_pool.png", heading: "Swimming Pool",
    desc: "Enjoy a luxurious main pool for relaxation and fitness, while the kids pool offers a safe and fun space for little swimmers to splash and play." },
  { id: "entry", title: "Entry and Exit", img: "/images/entry.png", heading: "Entry and Exit",
    desc: "Gated Entry with 24/7 Security. Separate Entry & Exit Points for Efficient Traffic Flow. Boom Barriers & RFID Access for Residents. Visitor Management System for Added Security. Well-Lit Driveways & Pedestrian-Friendly Access." },
  { id: "lawn", title: "Multipurpose Lawn", img: "/images/lawn.png", heading: "Multipurpose Lawn",
    desc: "Relax & Rejuvenate – perfect for yoga, picnics and gatherings. Play & Sports – ideal for football, badminton, and outdoor games. Events & Functions – Host celebrations and social gatherings. Green & Serene – enhances community living with natural beauty." },
  { id: "parking", title: "Visitors Parking Area", img: "/images/parking_area.png", heading: "Visitors Parking Area",
    desc: "A well-sheltered bus waiting area ensures comfort and convenience, while a spacious visitors parking provides hassle-free and secure access for your guests." },
];

/* ---------- Design tokens (new look) ---------- */
const BG = "#1f2937"; // deep teal
const ACCENT = "#c79354"; // warm gold

/**
 * New component: full-bleed hero gallery with autoplay, swipe, thumb rail,
 * overlay content card, and accessible controls. Hash deep-linking retained.
 */
export default function ApartmentsShowcase() {
  const [active, setActive] = useState(TABS[0].id);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const idx = useMemo(() => Math.max(0, TABS.findIndex(t => t.id === active)), [active]);
  const nextId = useMemo(() => TABS[(idx + 1) % TABS.length].id, [idx]);
  const prevId = useMemo(() => TABS[(idx - 1 + TABS.length) % TABS.length].id, [idx]);

  const heroRef = useRef(null);
  const thumbsRef = useRef(null);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const progressRef = useRef(null);

  /* Deep-link on load */
  useEffect(() => {
    const id = window.location.hash?.slice(1);
    if (id && TABS.some(t => t.id === id)) setActive(id);
  }, []);
  /* Reflect hash */
  useEffect(() => { if (active) history.replaceState(null, "", `#${active}`); }, [active]);

  /* Autoplay with pause on hover/focus */
  useEffect(() => {
    if (!playing || hover) return; // paused
    const int = setInterval(() => setActive(TABS[(idx + 1) % TABS.length].id), 4500);
    return () => clearInterval(int);
  }, [idx, playing, hover]);

  /* Animate progress bar each slide */
  useEffect(() => {
    if (!progressRef.current) return;
    progressRef.current.style.transition = "none";
    progressRef.current.style.width = "0%";
    // next frame
    requestAnimationFrame(() => {
      progressRef.current.style.transition = "width 4.4s linear";
      progressRef.current.style.width = playing && !hover ? "100%" : "0%";
    });
  }, [active, playing, hover]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setActive(nextId);
      else if (e.key === "ArrowLeft") setActive(prevId);
      else if (e.key === " ") { e.preventDefault(); setPlaying(p => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextId, prevId]);

  /* Ensure active thumb is in view */
  useEffect(() => {
    const el = document.getElementById(`thumb-${active}`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const onSwipeStart = (x) => { startX.current = x; deltaX.current = 0; };
  const onSwipeMove = (x) => { deltaX.current = x - startX.current; };
  const onSwipeEnd = () => {
    const THRESH = 40; // px
    if (deltaX.current > THRESH) setActive(prevId);
    else if (deltaX.current < -THRESH) setActive(nextId);
    startX.current = 0; deltaX.current = 0;
  };

  const current = TABS[idx] || TABS[0];

  return (
    <section id="apartments" className="py-8 sm:py-10 md:py-12" style={{ background: `linear-gradient(180deg, ${BG} 0%, #092322 100%)` }}>
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-10">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] tracking-[0.12em] uppercase" style={{background:"rgba(255,255,255,0.08)", color:"#cde6e3", border:"1px solid rgba(255,255,255,0.08)"}}>Apartments Details</div>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Discover Apartments</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPlaying(p => !p)} className="rounded-full border px-3 py-1 text-sm text-white/90 hover:text-white hover:bg-white/10 border-white/20">
              {playing ? "Pause" : "Play"}
            </button>
            <button onClick={() => setShowGrid(true)} className="rounded-full border px-3 py-1 text-sm text-white/90 hover:text-white hover:bg-white/10 border-white/20">View all</button>
          </div>
        </div>

        {/* HERO */}
        <div
          ref={heroRef}
          className="relative mt-6 md:mt-8 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onTouchStart={(e) => onSwipeStart(e.touches[0].clientX)}
          onTouchMove={(e) => onSwipeMove(e.touches[0].clientX)}
          onTouchEnd={onSwipeEnd}
        >
          {/* Parallax-ish track */}
          <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[600px]">
            {/* Current image */}
            <img
              key={current.id}
              src={current.img}
              alt={current.heading}
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{ transform: `translateX(${Math.max(-12, Math.min(12, -deltaX.current/12))}px)` }}
              loading="lazy"
              decoding="async"
            />

            {/* Dark gradient for overlay text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-black/5 to-transparent" />

            {/* Overlay content card */}
            <div className="absolute left-4 sm:left-6 md:left-8 bottom-4 sm:bottom-6 md:bottom-8">
              <div className="max-w-[680px] backdrop-blur-[2px] rounded-2xl p-4 sm:p-5 md:p-6 ring-1 ring-white/15" style={{background:"linear-gradient(180deg, rgba(15,60,57,0.45) 0%, rgba(15,60,57,0.18) 100%)"}}>
                <div className="inline-block rounded-full px-3 py-1 text-xs tracking-wide" style={{background:ACCENT, color:"#0d2221"}}>{current.title}</div>
                <h3 className="mt-3 text-white text-xl sm:text-2xl md:text-3xl font-semibold">{current.heading}</h3>
                <p className="mt-2 text-white/85 text-[15px] leading-relaxed">{current.desc}</p>
                <div className="mt-4 flex items-center gap-2">
                  <button onClick={() => setActive(prevId)} className="rounded-xl px-3 py-2 text-sm bg-white/10 hover:bg-white/15 text-white ring-1 ring-white/20">Prev</button>
                  <button onClick={() => setActive(nextId)} className="rounded-xl px-3 py-2 text-sm bg-white/10 hover:bg-white/15 text-white ring-1 ring-white/20">Next</button>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/10">
              <div ref={progressRef} className="h-full" style={{background:ACCENT, width:"0%"}} />
            </div>
          </div>
        </div>

        {/* Thumbnails rail */}
        <div ref={thumbsRef} className="mt-4 md:mt-6 flex gap-3 overflow-x-auto no-scrollbar pb-1" aria-label="Feature thumbnails">
          {TABS.map(t => {
            const activeThumb = t.id === active;
            return (
              <button
                key={t.id}
                id={`thumb-${t.id}`}
                onClick={() => setActive(t.id)}
                className={`group relative shrink-0 rounded-xl ring-1 ${activeThumb ? "ring-[var(--accent)]" : "ring-white/10"}`}
                style={{
                  width: 160, height: 100,
                  // CSS var for outline color
                  outline: activeThumb ? `2px solid ${ACCENT}` : "none",
                  '--accent': ACCENT,
                }}
                aria-current={activeThumb}
              >
                <img src={t.img} alt="" className="w-full h-full object-cover rounded-xl" loading="lazy" />
                <div className="absolute inset-0 rounded-xl bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute left-2 bottom-2 text-[12px] text-white drop-shadow">{t.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} className="w-2.5 h-2.5 rounded-full" aria-label={`Go to ${t.title}`} style={{ background: t.id === active ? ACCENT : "#ffffff33" }} />
          ))}
        </div>
      </div>

      {/* Grid modal */}
      {showGrid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowGrid(false)} />
          <div className="relative w-full max-w-6xl max-h-[85vh] overflow-hidden rounded-2xl bg-[#0b2726] ring-1 ring-white/10">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h4 className="text-white text-lg font-semibold">All Amenities</h4>
              <button onClick={() => setShowGrid(false)} className="text-white/80 hover:text-white">✕</button>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto" style={{ maxHeight: "calc(85vh - 56px)" }}>
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setActive(t.id); setShowGrid(false); }}
                  className="text-left group rounded-xl overflow-hidden ring-1 ring-white/10 hover:ring-white/20"
                >
                  <div className="relative h-40">
                    <img src={t.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute left-3 bottom-3 text-white font-medium drop-shadow">{t.title}</div>
                  </div>
                  <div className="p-3">
                    <div className="text-white/90 font-semibold">{t.heading}</div>
                    <p className="mt-1 text-white/70 text-sm leading-relaxed line-clamp-3">{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
