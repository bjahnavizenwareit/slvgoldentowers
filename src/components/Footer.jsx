// components/SiteFooter.jsx
import React from "react";
import {
  FiPhone, FiClock, FiMail, FiChevronRight, FiFacebook, FiInstagram, FiYoutube,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const BG = "#0f3c39";
const ACCENT = "#c79354";

export default function SiteFooter() {
  return (
    <footer style={{ backgroundColor: BG }} className="mt-10 sm:mt-16">
      {/* top: logo + address */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-10 text-center">
        <img
          src="/images/SLV_GT_Logo.png"
          alt="SLV Golden Towers"
          className="mx-auto h-14 sm:h-16 w-auto object-contain"
        />
        <p className="mt-4 sm:mt-6 text-white/70 text-base sm:text-lg leading-relaxed">
          Down Bazar Road, Kogilu Cross, Yelahanka, Bengaluru, Karnataka 560064
        </p>
      </div>

      {/* middle: three info blocks */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pb-8 sm:pb-10">
        {/* On md+ restore your older layout feel: items-center, wider gaps */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 items-center">
          <InfoBlock
            title="Call Us"
            icon={<PhoneIcon />}
          >
            Call:{" "}
            <a className="underline-offset-4 hover:underline" href="tel:+917411807807">
              +91 7411807807
            </a>
          </InfoBlock>

          <InfoBlock title="Opening Hours" icon={<ClockIcon />}>
            Mon to Sun 09:30 am – 06:30 pm
          </InfoBlock>

          <InfoBlock title="Email Us" icon={<MailIcon />}>
            <a
              className="underline-offset-4 hover:underline break-all"
              href="mailto:slvgoldentowers25@gmail.com"
            >
              slvgoldentowers25@gmail.com
            </a>
          </InfoBlock>
        </div>
      </div>

      {/* divider */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.10)" }} />

      {/* bottom: copyright + privacy + socials */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-5 sm:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-white/70 text-sm sm:text-base">
            <span>Copyright 2025. All Rights Reserved.</span>
            <span className="hidden md:inline-block text-white/30">|</span>
            <a href="/privacy-policy" className="flex items-center gap-1.5 hover:underline">
              <FiChevronRight /> Privacy Policy
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <Social href="https://facebook.com"><FiFacebook /></Social>
            <Social href="https://instagram.com"><FiInstagram /></Social>
            <Social href="https://youtube.com"><FiYoutube /></Social>
            <Social href="https://wa.me/917411807807"><FaWhatsapp /></Social>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- helpers ---------- */

function InfoBlock({ title, icon, children }) {
  return (
    // Mobile: center & compact. Desktop: restore older look (icon offset via md:ml-20)
    <div className="flex items-center md:items-center gap-4 sm:gap-5 text-center md:text-left">
      <IconCircle>{icon}</IconCircle>
      <div className="flex-1">
        <h4 className="text-white text-xl sm:text-2xl font-medium">{title}</h4>
        <p className="text-white/70 mt-1 text-sm sm:text-base">{children}</p>
      </div>
    </div>
  );
}

function IconCircle({ children }) {
  return (
    <span
      className="
        inline-flex items-center justify-center flex-shrink-0
        h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16
        rounded-full
        md:ml-20  /* ← restore desktop/laptop left offset ONLY on md+ */
      "
      style={{ backgroundColor: ACCENT }}
    >
      <span
        className="
          flex items-center justify-center
          h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10
          text-[22px] sm:text-[24px] md:text-[26px]
        "
        style={{ color: BG }}
      >
        {children}
      </span>
    </span>
  );
}

function Social({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="
        inline-flex items-center justify-center
        h-10 w-10 sm:h-9 sm:w-9
        rounded-md text-white/85 hover:text-white
        hover:bg-white/10 transition
      "
      aria-label="social link"
    >
      <span className="text-xl">{children}</span>
    </a>
  );
}

function PhoneIcon() { return <FiPhone className="h-full w-full" style={{ color: BG }} />; }
function ClockIcon() { return <FiClock className="h-full w-full" style={{ color: BG }} />; }
function MailIcon()  { return <FiMail  className="h-full w-full" style={{ color: BG }} />; }
