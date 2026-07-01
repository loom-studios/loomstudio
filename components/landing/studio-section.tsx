"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);


const studioImage = "/studiochisiamo.jpg";

const values = [
  {
    title: "Su misura",
    description: "Niente template. Ogni progetto nasce dalle esigenze reali del brand e prende forma da zero.",
  },
  {
    title: "Cura del dettaglio",
    description: "Dalla prima bozza all'ultimo pixel, ci ossessioniamo per ciò che fa davvero la differenza.",
  },
  {
    title: "Collaborazione",
    description: "Lavoriamo fianco a fianco con te, con un dialogo costante e trasparente in ogni fase.",
  },
];

export function StudioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);

      // Header: etichetta + titolo
      gsap.from(q("[data-animate='header'] > *"), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: q("[data-animate='header']"),
          start: "top 80%",
        },
      });

      // Immagine: entra da sinistra con leggero clip
      gsap.from(q("[data-animate='image']"), {
        xPercent: -8,
        opacity: 0,
        scale: 1.05,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q("[data-animate='image']"),
          start: "top 85%",
        },
      });

      // Parallax sull'immagine durante lo scroll
      gsap.to(q("[data-animate='image'] .placeholder"), {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: q("[data-animate='image']"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Paragrafi di testo
      gsap.from(q("[data-animate='text'] > p"), {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: q("[data-animate='text']"),
          start: "top 80%",
        },
      });

      // Valori: stagger dal basso
      gsap.from(q("[data-animate='value']"), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: q("[data-animate='values']"),
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div data-animate="header" className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Studio
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight max-w-4xl">
            Chi siamo
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-start">
          {/* Image */}
          <div data-animate="image">
            <div className="relative aspect-[4/5] border border-foreground/10 overflow-hidden bg-foreground/[0.03]">
              {studioImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={studioImage}
                  alt="Loom Studio"
                  className="w-full h-full object-cover"
                />
              ) : (
                // Placeholder: sostituiscilo impostando `studioImage` in alto
                <div className="placeholder w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground scale-110">
                  <span className="font-display text-5xl text-foreground/20">Loom</span>
                  <span className="text-xs font-mono tracking-wide">Placeholder immagine</span>
                </div>
              )}
            </div>
          </div>

          {/* Text */}
          <div className="lg:pt-8">
            <div data-animate="text">
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
                Siamo Loom Studio, un piccolo collettivo di designer e sviluppatori
                ossessionati dai dettagli. Intrecciamo strategia, design e codice per
                dare forma a esperienze digitali che lasciano il segno.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                Crediamo che un grande progetto nasca dall'ascolto: capire chi sei,
                dove vuoi andare e cosa ti rende unico. Da lì costruiamo tutto il resto,
                con cura artigianale e tecnologia di livello.
              </p>
            </div>

            {/* Values */}
            <div data-animate="values" className="space-y-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  data-animate="value"
                  className="flex gap-6"
                >
                  <span className="font-mono text-sm text-muted-foreground shrink-0 pt-1">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-display mb-2">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
