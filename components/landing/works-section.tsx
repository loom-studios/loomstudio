"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useContactModal } from "@/components/contact/contact-modal-provider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─────────────────────────────────────────────────────────────
// MODIFICA QUI: per ogni progetto imposta l'immagine di copertina.
// Lascia `image: ""` per mostrare il placeholder.
//   - image: percorso del file (es. "/works/progetto-1.jpg") o URL
// ─────────────────────────────────────────────────────────────
interface Work {
  title: string;
  category: string;
  year: string;
  image: string;
}

const works: Work[] = [
  {
    title: ".titan",
    category: "Gym brand",
    year: "2025",
    image: "/gym.webp",
  },
  {
    title: "soho",
    category: "Fashion design",
    year: "2025",
    image: "/soho.webp",
  },
  {
    title: "kerbites",
    category: "Fast food",
    year: "2026",
    image: "/burger.webp",
  },
  {
    title: ".ok-",
    category: "Energy drink",
    year: "2026",
    image: "/ok-drink.webp",
  },
];

function WorkCard({ work, index }: { work: Work; index: number }) {
  return (
    <a
      href="#contatti"
      data-animate="card"
      className={`group block ${index % 2 === 1 ? "lg:mt-24" : ""}`}
    >
      {/* Cover */}
      <div className="work-cover relative aspect-[4/3] border border-foreground/10 overflow-hidden bg-foreground/[0.03] mb-6">
        <div className="work-media absolute inset-0">
          {work.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={work.image}
              alt={work.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            // Placeholder: sostituiscilo impostando `image` nei dati in alto
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <span className="font-display text-5xl text-foreground/20">
                0{index + 1}
              </span>
              <span className="text-xs font-mono tracking-wide">Placeholder progetto</span>
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl lg:text-3xl font-display mb-1 group-hover:translate-x-1 transition-transform duration-300">
            {work.title}
          </h3>
          <p className="text-sm text-muted-foreground">{work.category}</p>
        </div>
        <span className="font-mono text-sm text-muted-foreground shrink-0 pt-1">
          {work.year}
        </span>
      </div>
    </a>
  );
}

export function WorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { open } = useContactModal();

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);

      // Header: etichetta, titolo e link
      gsap.from(q("[data-animate='header'] .header-item"), {
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

      // Cards: rivelazione in stagger dal basso
      gsap.from(q("[data-animate='card']"), {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: q("[data-animate='grid']"),
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="progetti"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          data-animate="header"
          className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <span className="header-item inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Lavori
            </span>
            <h2 className="header-item text-4xl lg:text-6xl font-display tracking-tight">
              Progetti selezionati,
              <br />
              <span className="text-muted-foreground">realizzati con cura.</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={open}
            className="header-item inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors group shrink-0"
          >
            Inizia il tuo progetto
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Grid */}
        <div
          data-animate="grid"
          className="grid md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-12"
        >
          {works.map((work, index) => (
            <WorkCard key={work.title} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
