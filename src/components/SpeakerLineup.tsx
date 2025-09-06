"use client";

import Image from "next/image";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface Speaker {
  id: string;
  name: string;
  category: string; // e.g. Animation, Design
  blurb: string; // short line near name pill
  description: string; // longer paragraph in white box
  image?: string; // optional image path
  color: string; // base color class
  accent: string; // darker outline color
}

// Simple asset versioning to help dev cache busting (append ?v=...)
const ASSET_VERSION = 'v1';

// NOTE: Replace placeholder text/images with real content.
const speakers: Speaker[] = [
  {
    id: "1",
    name: "Cassie Evans",
    category: "Animation",
    blurb: "Creative Leader",
    description:
      "Our CSS/JS creative codemaster is here to animate stories between magic & ambitious goals. We're confident you'll walk away with secrets you can show on the weekend.",
    image: "/speakers/cassie.jpg",
    color: "bg-amber-500",
    accent: "outline-amber-700"
  },
  {
    id: "2",
    name: "Elon Tse",
    category: "Developer",
    blurb: "Vision & Code",
    description:
      "Oh look, we've only gone and secured the revered frontend co-founder of Clamo & Webflow's superbrain. We can't wait to learn from Elg!",
    image: "/speakers/elon.jpg",
    color: "bg-orange-500",
    accent: "outline-orange-700"
  },
  {
    id: "3",
    name: "Stephanie Bruce",
    category: "Design",
    blurb: "Experience Drive",
    description:
      "Dives want to work with her; designers want to be her. Steph has this grounding warmth with her shattering work ethic and joyful mentoring. We're excited she'll be sharing her expert freelancer growth tips!",
    image: "/speakers/stephanie.jpg",
    color: "bg-pink-500",
    accent: "outline-pink-700"
  },
  {
    id: "4",
    name: "Ross Fletcher",
    category: "Animation",
    blurb: "Motion Practice",
    description:
      "We've all wanted to animate something cool with SVG, and Ross is here to show you how with his ridiculously fun and slick style.",
    image: "/speakers/ross.jpg",
    color: "bg-amber-500",
    accent: "outline-amber-700"
  }
];

// Utility to build an irregular outline using pseudo elements
const SpeakerCard = ({ speaker, index }: { speaker: Speaker; index: number }) => {
  // Detect coarse pointers (touch) to disable custom cursor
  const [enableCursor, setEnableCursor] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const set = () => setEnableCursor(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  const [cursor, setCursor] = useState<{x:number;y:number;active:boolean;following:boolean}>({x:0,y:0,active:true,following:false});
  const [imgError, setImgError] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const controls = useAnimation();

  // Gentle smoothing of cursor position
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const targetX = e.clientX - rect.left;
    const targetY = e.clientY - rect.top;
    setCursor(c => ({...c, active:true, following:true}));
    if (!cursorRef.current) return;
    cursorRef.current.style.setProperty('--cursor-x', `${targetX}px`);
    cursorRef.current.style.setProperty('--cursor-y', `${targetY}px`);
    cursorRef.current.style.transform = `translate(var(--cursor-x), var(--cursor-y))`;
  }, []);

  const positionIdle = useCallback(() => {
    if (!cursorRef.current || !cardRef.current) return;
    const panel = cardRef.current.querySelector('.panel') as HTMLElement | null;
    if (!panel) return;
    const pw = panel.clientWidth;
    const ph = panel.clientHeight;
    // Idle near lower-left region inside the panel, matching reference
    const idleX = pw * 0.35;
    const idleY = ph * 0.78;
    cursorRef.current.style.setProperty('--cursor-x', `${idleX}px`);
    cursorRef.current.style.setProperty('--cursor-y', `${idleY}px`);
    cursorRef.current.style.transform = `translate(var(--cursor-x), var(--cursor-y))`;
  }, []);

  const deactivate = useCallback(() => {
    positionIdle();
    setCursor(c => ({...c, following:false}));
  }, [positionIdle]);

  // Reveal animation via IntersectionObserver
  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(en => { if (en.isIntersecting) { setVisible(true); controls.start("visible"); io.disconnect(); } });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controls]);

  const offsetPx = (index % 3 === 1 ? 40 : index % 3 === 2 ? 10 : 0) + (index > 2 ? 30 : 0); // stagger pattern

  const initials = useMemo(() => speaker.name.split(" ").map(w => w[0]).join(""), [speaker.name]);

  // Fallback data URI (soft neutral gradient) — SSR-safe (Vercel)
  const fallbackSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400'><defs><linearGradient id='g' x1='0' x2='0' y1='0' y2='1'><stop stop-color='#f8e7c2'/><stop offset='1' stop-color='#f1d49f'/></linearGradient></defs><rect fill='url(#g)' width='300' height='400'/><text x='50%' y='54%' font-size='90' font-family='Arial' dy='.35em' text-anchor='middle' fill='#222' font-weight='700'>${initials}</text></svg>`;
  const fallbackData = `data:image/svg+xml;base64,${
    typeof window === 'undefined' ? Buffer.from(fallbackSvg).toString('base64') : btoa(fallbackSvg)
  }`;

  return (
    <motion.div
      ref={cardRef}
  className={`speaker-card relative reveal ${visible ? 'visible' : ''}`}
  style={{ '--offset': `${offsetPx}px` } as React.CSSProperties & Record<'--offset', string>}
      onMouseEnter={() => positionIdle()}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, rotateY: 60, scale: 0.7 },
        visible: {
          opacity: 1,
          rotateY: 0,
          scale: 1,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], type: "spring", bounce: 0.45 }
        }
      }}
    >
      <div className="category-badge">{speaker.category}</div>
      <div
        className={`panel relative ${speaker.color} group ${enableCursor ? 'custom-cursor' : ''}`}
        onMouseMove={enableCursor ? handleMove : undefined}
        onMouseLeave={enableCursor ? deactivate : undefined}
      >
        {/* Portrait / image area */}
  <div className="image-wrapper cursor-none">
          <div className="portrait-shell group/portrait">
            <Image
              src={((speaker.image && !imgError) ? `${speaker.image}?v=${ASSET_VERSION}` : fallbackData)}
              alt={speaker.name}
              fill
              sizes="240px"
              className="object-cover portrait-image"
              priority={false}
              onError={() => setImgError(true)}
            />
            {/* Dual stroke outline */}
            <svg className="outline-layer" viewBox="0 0 300 400" aria-hidden>
              <polygon points="40,12 260,12 288,200 248,388 42,388 14,210" fill="none" stroke="#161616" strokeWidth="3" />
              <polygon points="52,24 270,24 294,200 256,380 54,380 26,210" fill="none" stroke="#161616" strokeWidth="1.5" opacity=".55" />
            </svg>
          </div>
        </div>
  {/* Decorative corner boxes */}
  <span className="corner-box tl" aria-hidden></span>
  <span className="corner-box tr" aria-hidden></span>
  <span className="corner-box bl" aria-hidden></span>
  <span className="corner-box br" aria-hidden></span>
        {/* Custom follow cursor */}
        {enableCursor && cursor.active && (
          <div className="card-cursor" ref={cursorRef} aria-hidden data-following={cursor.following}>
            <span className="cursor-label">{speaker.name}</span>
          </div>
        )}
      </div>
      <div className="desc-box">
        <p className="blurb font-semibold mb-2 text-[11px] tracking-wide uppercase text-neutral-900">{speaker.blurb}</p>
        <p className="text-[11px] leading-relaxed text-neutral-700">{speaker.description}</p>
      </div>
  </motion.div>
  );
};

const SpeakerLineup = () => {
  return (
    <section className="speaker-section relative py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Cards grid only (intro block removed) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20">
          {speakers.map((sp, i) => (
            <SpeakerCard key={sp.id} speaker={sp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakerLineup;
