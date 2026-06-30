"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    title: "Aurora Beauty",
    category: "Branding · E-commerce",
    year: "2025",
    image: "",
  },
  {
    title: "Nordic Coffee",
    category: "Web Design · Sviluppo",
    year: "2024",
    image: "",
  },
  {
    title: "Studio Vela",
    category: "Branding · Sito web",
    year: "2024",
    image: "",
  },
  {
    title: "Mono Architects",
    category: "Web Design · Sviluppo",
    year: "2023",
    image: "",
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
        <div className="work-media absolute inset-0 scale-110">
          {work.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={work.image}
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;

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

      // Parallax sul media di ogni copertina
      q("[data-animate='card']").forEach((card: Element) => {
        const media = card.querySelector(".work-media");
        if (!media) return;
        gsap.fromTo(
          media,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

          <a
            href="#contatti"
            className="header-item inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors group shrink-0"
          >
            Inizia il tuo progetto
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
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
