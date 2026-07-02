"use client";

import { useEffect, useRef } from "react";

export function AnimatedSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
    const fontSize = 12;
    // Decorativo: DPR limitato e 30fps. Su mobile un DPR 3 moltiplicherebbe
    // per 9 i pixel del backing store; meno punti su schermi piccoli.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const step = window.innerWidth < 768 ? 0.2 : 0.15;
    const frameMs = 1000 / 30;
    let time = 0;
    let running = false;
    let width = 0;
    let height = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Atlante dei glifi: ogni carattere è pre-renderizzato una volta (a 2x) e
    // poi copiato con drawImage + globalAlpha — molto più economico di una
    // fillText per punto a ogni frame.
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

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.525;

      const points: { x: number; y: number; z: number; charIndex: number }[] = [];

      // Generate sphere points
      for (let phi = 0; phi < Math.PI * 2; phi += step) {
        for (let theta = 0; theta < Math.PI; theta += step) {
          const x = Math.sin(theta) * Math.cos(phi + time * 0.5);
          const y = Math.sin(theta) * Math.sin(phi + time * 0.5);
          const z = Math.cos(theta);

          // Rotate around Y axis
          const rotY = time * 0.3;
          const newX = x * Math.cos(rotY) - z * Math.sin(rotY);
          const newZ = x * Math.sin(rotY) + z * Math.cos(rotY);

          // Rotate around X axis
          const rotX = time * 0.2;
          const newY = y * Math.cos(rotX) - newZ * Math.sin(rotX);
          const finalZ = y * Math.sin(rotX) + newZ * Math.cos(rotX);

          const depth = (finalZ + 1) / 2;
          const charIndex = Math.floor(depth * (chars.length - 1));

          points.push({
            x: centerX + newX * radius,
            y: centerY + newY * radius,
            z: finalZ,
            charIndex,
          });
        }
      }

      // Sort by z for depth
      points.sort((a, b) => a.z - b.z);

      // Draw points
      points.forEach((point) => {
        ctx.globalAlpha = 0.2 + (point.z + 1) * 0.4;
        ctx.drawImage(
          atlas,
          point.charIndex * cell * 2,
          0,
          cell * 2,
          cell * 2,
          point.x - cell / 2,
          point.y - cell / 2,
          cell,
          cell
        );
      });
      ctx.globalAlpha = 1;

      // Incremento doppio rispetto a 60fps per mantenere la stessa velocità
      time += 0.04;
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
