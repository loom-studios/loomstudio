"use client";

import * as React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type MagneticButtonProps = React.ComponentProps<"button"> & {
  /** How far the button follows the cursor (px of pull at the edges). */
  strength?: number;
};

/**
 * A button that is magnetically attracted to the cursor while hovered and
 * springs back to its resting position on leave. Motion is disabled when the
 * user prefers reduced motion.
 */
export function MagneticButton({
  className,
  children,
  strength = 0.4,
  ...props
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const xTo = React.useRef<((value: number) => void) | null>(null);
  const yTo = React.useRef<((value: number) => void) | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      xTo.current = gsap.quickTo(el, "x", {
        duration: 0.9,
        ease: "elastic.out(1, 0.4)",
      });
      yTo.current = gsap.quickTo(el, "y", {
        duration: 0.9,
        ease: "elastic.out(1, 0.4)",
      });
    },
    { scope: ref }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el || !xTo.current || !yTo.current) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    xTo.current(relX * strength);
    yTo.current(relY * strength);
  };

  const handleMouseLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </button>
  );
}
