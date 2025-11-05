// components/NearByFacilities.jsx
import React, { useMemo, useState } from "react";

/* ---- THEME ---- */
const BG = "#0f3c39";      // deep teal (section bg + CTA bar)
const BG_BADGE = "#1c5551"; // darker teal (FACILITIES & SLV DEVELOPERS badge)
const ACCENT = "#c79354";   // warm gold (ticks, button)

/* ---- CONFIG ---- */
const YT_URL = "https://youtu.be/EhUefdh1UXA?si=Vmk-Xy1U-UvLzxb0";

// Put the PDF in /public/brochures/SLV GOLDEN TOWERS.pdf
const BROCHURE_URL = "/brochures/SLV GOLDEN TOWERS.pdf";
const BROCHURE_FILENAME = "SLV GOLDEN TOWERS.pdf";

const DATA = [
  {
    group: "International School",
    items: [
      "Stone Hills Int School 10 min",
      "Delhi Public School 15 min",
      "National Public School 15 min",
      "Orchids Int School 15 min",
      "Canadian Int School 20 min",
    ],
  },
  {
    group: "Malls",
    items: [
      "Galleria Mall 2 min",
      "Mall of Asia 5 min",
      "Garuda Mall 15 min",
      "Bhartiya Mall of Bengaluru 10 min",
    ],
  },
  {
    group: "Tech Parks",
    items: [
      "Manyata Tech Park 20 min",
      "Embassy Business Park 5 min",
      "Bagmane Tech Park 30 min",
      "Bharthiya City Technology 15 min",
      "International Tech Park Blr (ITPB) 20 min",
      "Philips 5 min",
      "L&T Tech Park 10 min",
      "Sattiva Global City 15 min",
      "Ecopolis 10 min",
    ],
  },
  {
    group: "Hospitals",
    items: [
      "Sparsh Hospital 500 meters",
      "Aster CMI Hospital 20mins",
      "Apex Multi Speciality Hospital within 2 km",
      "Manipal Hospital 200 meters",
    ],
  },
];

/* ---- UTIL ---- */
function getYouTubeId(url = "") {
  const m = String(url).match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );
  return m ? m[1] : null;
}

function Bullet({ children }) {
  return (
    <li className="flex gap-3 leading-8 text-white/90">
      <span
        className="mt-[10px] inline-block h-2.5 w-2.5 rounded-[3px] rotate-45"
        style={{ backgroundColor: ACCENT }}
        aria-hidden
      />
      <span>{children}</span>
    </li>
  );
}

/* ---- MODAL FORM ---- */
function BrochureModal({ open, onClose, brochureUrl = BROCHURE_URL }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [touched, setTouched] = useState(false);

  if (!open) return null;

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isValidPhone = (p) => /^[0-9]{7,15}$/.test(p);
  const canSubmit =
    form.name.trim().length >= 2 && isValidEmail(form.email) && isValidPhone(form.phone);

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;

    // Force download of the brochure (keeps functionality gated after form)
    if (brochureUrl) {
      const a = document.createElement("a");
      a.href = encodeURI(brochureUrl); // handles spaces in filename
      a.download = BROCHURE_FILENAME;  // suggests download name
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[90]">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
      {/* dialog */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div
          className="w-full max-w-lg rounded-2xl p-6 sm:p-7 shadow-xl"
          style={{ backgroundColor: BG }}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-white text-2xl font-semibold">Download Brochure</h3>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-white/90 text-sm mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                className="w-full rounded-lg bg-white/95 px-3 py-2.5 outline-none"
              />
              {touched && form.name.trim().length < 2 && (
                <p className="text-red-300 text-sm mt-1">Please enter your name.</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/90 text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                className="w-full rounded-lg bg-white/95 px-3 py-2.5 outline-none"
              />
              {touched && !isValidEmail(form.email) && (
                <p className="text-red-300 text-sm mt-1">Enter a valid email.</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white/90 text-sm mb-1">Mobile</label>
              <input
                type="tel"
                placeholder="Enter your phone"
                value={form.phone}
                onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                className="w-full rounded-lg bg-white/95 px-3 py-2.5 outline-none"
              />
              {touched && !isValidPhone(form.phone) && (
                <p className="text-red-300 text-sm mt-1">Enter a valid phone (7–15 digits).</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl px-4 py-3 text-white font-semibold"
              style={{ backgroundColor: ACCENT }}
            >
              Download Brochure
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---- MAIN COMPONENT ---- */
export default function NearByFacilities() {
  const [play, setPlay] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const ytId = useMemo(() => getYouTubeId(YT_URL), []);

  return (
    <section id="nearby-facilities" className="relative w-full" style={{ backgroundColor: BG }}>
      {/* ====== FACILITIES (TOP) ====== */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-10 pb-10 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left title column */}
          <div className="flex flex-col">
            <span
              className="self-start rounded-md px-3 py-1 text-xs font-semibold tracking-wider"
              style={{ color: "#e9edef", background: BG_BADGE }}
            >
              FACILITIES
            </span>

            <h2 className="mt-6 text-white text-5xl sm:text-6xl font-semibold leading-[1.05]">
              <span className="block">Near By</span>
              <span className="block">Golden</span>
              <span className="block">Towers</span>
            </h2>
          </div>

          {/* Right lists (two columns) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {/* Left column groups */}
            <div>
              <h3 className="text-white font-semibold text-lg">International School</h3>
              <ul className="mt-4">
                {DATA[0].items.map((t) => (
                  <Bullet key={t}>{t}</Bullet>
                ))}
              </ul>

              <h3 className="mt-10 text-white font-semibold text-lg">Malls</h3>
              <ul className="mt-4">
                {DATA[1].items.map((t) => (
                  <Bullet key={t}>{t}</Bullet>
                ))}
              </ul>
            </div>

            {/* Right column groups */}
            <div>
              <h3 className="text-white font-semibold text-lg">Tech Parks</h3>
              <ul className="mt-4">
                {DATA[2].items.map((t) => (
                  <Bullet key={t}>{t}</Bullet>
                ))}
              </ul>

              <h3 className="mt-10 text-white font-semibold text-lg">Hospitals</h3>
              <ul className="mt-4">
                {DATA[3].items.map((t) => (
                  <Bullet key={t}>{t}</Bullet>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ====== VIDEO (FULL WIDTH) ====== */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <div className="relative w-[92vw] max-w-[1200px] mx-auto overflow-hidden">
          {/* 16:9 ratio */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {ytId && (
              <iframe
                title="Project Video"
                className="absolute inset-0 h-full w-full opacity-100"
                src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1&autohide=1&playsinline=1${
                  play ? "&autoplay=1" : ""
                }`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {!play && (
              <button
                onClick={() => setPlay(true)}
                className="absolute inset-0 flex items-center justify-center"
                aria-label="Play video"
              >
                <span className="relative inline-flex items-center justify-center h-24 w-24 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/80 hover:scale-105 transition">
                  <span
                    className="ml-1 inline-block"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "12px solid transparent",
                      borderBottom: "12px solid transparent",
                      borderLeft: "20px solid white",
                    }}
                    aria-hidden
                  />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ====== CTA BAR (BOTTOM) ====== */}
      <div className="w-full">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-10">
          <div
            className="w-full rounded-2xl px-6 sm:px-10 py-8 sm:py-10 flex items-center justify-between gap-6 flex-wrap"
            style={{ backgroundColor: BG }}
          >
            <div className="min-w-[220px]">
              <span
                className="inline-block rounded-md px-3 py-1 text-xs font-semibold tracking-wider"
                style={{ color: "#e9edef", background: BG_BADGE }}
              >
                SLV DEVELOPERS
              </span>
              <h3 className="mt-4 text-white text-4xl sm:text-5xl font-semibold">
                Download Brochure
              </h3>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="ml-auto rounded-xl px-6 sm:px-7 py-3 sm:py-3.5 text-white text-base sm:text-lg font-semibold shadow-md hover:opacity-95"
              style={{ backgroundColor: ACCENT }}
            >
              Get Brochure
            </button>
          </div>
        </div>
      </div>

      {/* ---- Modal ---- */}
      <BrochureModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        brochureUrl={BROCHURE_URL}
      />
    </section>
  );
}
