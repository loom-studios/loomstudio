"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────
// Intro di brand: video (sfondo #fefefe) mostrato una volta per
// sessione all'apertura del sito, piccolo e centrato.
//
// NIENTE flash del sito: l'overlay è già presente nell'HTML iniziale
// (SSR) col video in autoplay, ma nascosto via CSS (#loom-intro
// { display:none }). Lo script inline in app/layout.tsx aggiunge la
// classe `intro-active` su <html> PRIMA del primo paint, solo se
// l'intro va mostrata (non già vista e senza prefers-reduced-motion).
// Così il sito non compare mai prima del video.
//
// Questo componente client gestisce solo la FINE: fade-out a video
// concluso (o via timeout di sicurezza) e memoria in sessione. La
// chiave `loom-intro-seen` è condivisa con lo script inline.
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "loom-intro-seen";
const SAFETY_TIMEOUT_MS = 8000; // chiude comunque se il video non finisce
const FADE_MS = 500; // deve combaciare con `duration-500`

export function IntroOverlay() {
  const [closing, setClosing] = useState(false);
  const closedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Se lo script inline non ha attivato l'intro (già vista o
    // reduced-motion), l'overlay resta nascosto: niente da gestire.
    if (!document.documentElement.classList.contains("intro-active")) return;

    // Il video parte in autoplay già dall'HTML: se per qualche motivo è
    // già finito prima dell'hydration, chiudi subito.
    if (videoRef.current?.ended) {
      close();
      return;
    }

    const safety = window.setTimeout(close, SAFETY_TIMEOUT_MS);
    return () => window.clearTimeout(safety);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function close() {
    if (closedRef.current) return;
    closedRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignora
    }
    setClosing(true); // avvia il fade-out (opacità → 0)
    window.setTimeout(() => {
      // Rimuove la classe: nasconde l'overlay e sblocca lo scroll (via CSS)
      document.documentElement.classList.remove("intro-active");
    }, FADE_MS);
  }

  return (
    <div
      id="loom-intro"
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#fefefe] transition-opacity duration-500"
      style={{ opacity: closing ? 0 : 1 }}
    >
      <video
        ref={videoRef}
        src="/loading-video.mp4"
        autoPlay
        muted
        playsInline
        onEnded={close}
        onError={close}
        className="h-auto"
        style={{ width: "clamp(120px, 30vw, 260px)" }}
      />
    </div>
  );
}
