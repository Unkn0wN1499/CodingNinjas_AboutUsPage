"use client";

import React from 'react';
import Image from "next/image";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import dummyImage from '../assets/dummy.avif';

export type Speaker = {
  id: string;
  name: string;
  category: string;
  blurb: string;
  description: string;
  image?: string;
  color: string;
  accent: string;
};

const ASSET_VERSION = 'v1';

const CandidateCard = ({
  speaker,
  index
}: {
  speaker: Speaker;
  index: number;
}): React.ReactElement => {
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

  // const dummyImage = require('../assets/dummy.avif');

  return (
    <motion.div
      ref={cardRef}
      className={`speaker-card relative reveal ${visible ? 'visible' : ''}`}
      style={{ '--offset': `${offsetPx}px`, width: 320, height: 420 } as React.CSSProperties & Record<'--offset', string>}
      onMouseEnter={() => positionIdle()}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, rotateY: 60, scale: 0.7 },
        visible: {
          opacity: 1,
          rotateY: 0,
          scale: 1,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], type: "spring", bounce: 0.45 }
        }
      }}
    >
      <div className="category-badge font-bold text-orange-500 text-sm mb-2">{speaker.category}</div>
      <div
        className={`panel relative ${speaker.color} group ${enableCursor ? 'custom-cursor' : ''}`}
        onMouseMove={enableCursor ? handleMove : undefined}
        onMouseLeave={enableCursor ? deactivate : undefined}
        style={{ width: '100%', height: 260, overflow: 'hidden', borderRadius: 16 }}
      >
        <div className="image-wrapper cursor-none" style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image
            src={dummyImage}
            alt={speaker.name}
            fill
            sizes="320px"
            className="object-cover portrait-image rounded-t-xl"
            priority={false}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
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
      <div className="desc-box p-4 bg-black/80 rounded-b-xl" style={{ minHeight: 120 }}>
        <p className="blurb font-bold mb-2 text-[13px] tracking-wide uppercase text-orange-500">{speaker.blurb}</p>
        <p className="text-[13px] leading-relaxed text-black font-medium">{speaker.description}</p>
      </div>
    </motion.div>
  );
};

export default CandidateCard;
