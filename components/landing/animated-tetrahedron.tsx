"use client";

import { useEffect, useRef } from "react";

export function AnimatedTetrahedron() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
    const fontSize = 18;
    // Decorativo: DPR limitato e 30fps (vedi animated-sphere per il perché)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const frameMs = 1000 / 30;
    let time = 0;
    let running = false;
    let width = 0;
    let height = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Atlante dei glifi: pre-renderizzati una volta, copiati con drawImage +
    // globalAlpha invece di una fillText per punto a ogni frame.
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

    // Tetrahedron vertices
    const vertices = [
      { x: 0, y: 1, z: 0 },           // Top
      { x: -0.943, y: -0.333, z: -0.5 }, // Bottom left back
      { x: 0.943, y: -0.333, z: -0.5 },  // Bottom right back
      { x: 0, y: -0.333, z: 1 },         // Bottom front
    ];

    // Edges connecting vertices
    const edges = [
      [0, 1], [0, 2], [0, 3], // Top to bottom vertices
      [1, 2], [2, 3], [3, 1], // Bottom triangle
    ];

    // Faces for filling with points
    const faces = [
      [0, 1, 2], // Back face
      [0, 2, 3], // Right face
      [0, 3, 1], // Left face
      [1, 3, 2], // Bottom face
    ];

    const rotateY = (point: { x: number; y: number; z: number }, angle: number) => ({
      x: point.x * Math.cos(angle) - point.z * Math.sin(angle),
      y: point.y,
      z: point.x * Math.sin(angle) + point.z * Math.cos(angle),
    });

    const rotateX = (point: { x: number; y: number; z: number }, angle: number) => ({
      x: point.x,
      y: point.y * Math.cos(angle) - point.z * Math.sin(angle),
      z: point.y * Math.sin(angle) + point.z * Math.cos(angle),
    });

    const rotateZ = (point: { x: number; y: number; z: number }, angle: number) => ({
      x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
      y: point.x * Math.sin(angle) + point.y * Math.cos(angle),
      z: point.z,
    });

    let last = -Infinity;

    const render = (now = 0) => {
      if (running) frameRef.current = requestAnimationFrame(render);
      if (now - last < frameMs) return;
      last = now;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      // Vertices sit up to ~1.118 units from the center, so during a full 3D
      // rotation a corner can project that far along either screen axis. Keep
      // the scale low enough that the widest rotation still fits inside the
      // canvas (1.118 * scale + glyph margin <= half the canvas), otherwise the
      // tetrahedron gets clipped at the edges as it spins.
      const scale = Math.min(width, height) * 0.3;

      const points: { x: number; y: number; z: number; charIndex: number }[] = [];

      // Generate points along edges
      edges.forEach(([i, j]) => {
        const v1 = vertices[i];
        const v2 = vertices[j];

        for (let t = 0; t <= 1; t += 0.05) {
          let point = {
            x: v1.x + (v2.x - v1.x) * t,
            y: v1.y + (v2.y - v1.y) * t,
            z: v1.z + (v2.z - v1.z) * t,
          };

          // Apply rotations
          point = rotateY(point, time * 0.4);
          point = rotateX(point, time * 0.3);
          point = rotateZ(point, time * 0.2);

          const depth = (point.z + 1.5) / 3;
          const charIndex = Math.floor(depth * (chars.length - 1));

          points.push({
            x: centerX + point.x * scale,
            y: centerY - point.y * scale,
            z: point.z,
            charIndex: Math.min(charIndex, chars.length - 1),
          });
        }
      });

      // Generate points on faces for a filled look
      faces.forEach(([i, j, k]) => {
        const v1 = vertices[i];
        const v2 = vertices[j];
        const v3 = vertices[k];

        for (let u = 0; u <= 1; u += 0.12) {
          for (let v = 0; v <= 1 - u; v += 0.12) {
            const w = 1 - u - v;
            let point = {
              x: v1.x * u + v2.x * v + v3.x * w,
              y: v1.y * u + v2.y * v + v3.y * w,
              z: v1.z * u + v2.z * v + v3.z * w,
            };

            // Apply rotations
            point = rotateY(point, time * 0.4);
            point = rotateX(point, time * 0.3);
            point = rotateZ(point, time * 0.2);

            const depth = (point.z + 1.5) / 3;
            const charIndex = Math.floor(depth * (chars.length - 1));

            points.push({
              x: centerX + point.x * scale,
              y: centerY - point.y * scale,
              z: point.z,
              charIndex: Math.min(charIndex, chars.length - 1),
            });
          }
        }
      });

      // Sort by z for depth
      points.sort((a, b) => a.z - b.z);

      // Draw points
      points.forEach((point) => {
        const alpha = 0.15 + (point.z + 1.5) * 0.25;
        ctx.globalAlpha = Math.min(alpha, 0.9);
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
      time += 0.03;
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
