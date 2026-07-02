"use client";

import { useEffect, useRef } from "react";

export function AnimatedWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "·∘○◯◌●◉";
    const fontSize = 14;
    // Decorativo: DPR limitato, 30fps e griglia più rada su schermi piccoli
    // (vedi animated-sphere per il perché)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const spacing = window.innerWidth < 768 ? 26 : 20;
    const frameMs = 1000 / 30;
    let time = 0;
    let running = false;
    let width = 0;
    let height = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Atlante dei glifi: pre-renderizzati una volta, copiati con drawImage +
    // globalAlpha invece di una fillText per cella a ogni frame.
    const cell = fontSize * 2;
    const atlas = document.createElement("canvas");
    atlas.width = cell * 2 * chars.length;
    atlas.height = cell * 2;
    const atlasCtx = atlas.getContext("2d");
    if (!atlasCtx) return;
    atlasCtx.font = `${fontSize * 2}px monospace`;
    atlasCtx.textAlign = "center";
    atlasCtx.textBaseline = "middle";
    atlasCtx.fillStyle = "rgb(0, 0, 0)";
    for (let i = 0; i < chars.length; i++) {
      atlasCtx.fillText(chars[i], i * cell * 2 + cell, cell);
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    let last = -Infinity;

    const render = (now = 0) => {
      if (running) frameRef.current = requestAnimationFrame(render);
      if (now - last < frameMs) return;
      last = now;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = (x + 0.5) * (width / cols);
          const py = (y + 0.5) * (height / rows);

          // Multiple wave interference
          const wave1 = Math.sin(x * 0.2 + time * 2) * Math.cos(y * 0.15 + time);
          const wave2 = Math.sin((x + y) * 0.1 + time * 1.5);
          const wave3 = Math.cos(x * 0.1 - y * 0.1 + time * 0.8);

          const combined = (wave1 + wave2 + wave3) / 3;
          const normalized = (combined + 1) / 2;

          const charIndex = Math.floor(normalized * (chars.length - 1));

          ctx.globalAlpha = 0.15 + normalized * 0.5;
          ctx.drawImage(
            atlas,
            charIndex * cell * 2,
            0,
            cell * 2,
            cell * 2,
            px - cell / 2,
            py - cell / 2,
            cell,
            cell
          );
        }
      }
      ctx.globalAlpha = 1;

      // Incremento doppio rispetto a 60fps per mantenere la stessa velocità
      time += 0.06;
    };

    const start = () => {
      if (running) return;
      running = true;
      frameRef.current = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
    };

    let observer: IntersectionObserver | null = null;
    if (prefersReduced) {
      render(); // draw a single static frame, no animation loop
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) start();
          else stop();
        },
        { threshold: 0 }
      );
      observer.observe(canvas);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
      observer?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
