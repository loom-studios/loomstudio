"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedWave } from "./animated-wave";
import { useContactModal } from "@/components/contact/contact-modal-provider";
import { useLegalModal } from "@/components/legal/legal-modal-provider";
import type { LegalKey } from "@/components/legal/legal-content";

type FooterLink = { name: string; href?: string; legalKey?: LegalKey };

const footerLinks: Record<string, FooterLink[]> = {
  Navigazione: [
    { name: "Studio", href: "#studio" },
    { name: "Servizi", href: "#servizi" },
    { name: "Progetti", href: "#progetti" },
    { name: "Contatti", href: "#contatti" },
    { name: "Prezzi", href: "#prezzi" },
  ],
  Legale: [
    { name: "Privacy", legalKey: "privacy" },
    { name: "Termini", legalKey: "termini" },
    { name: "Cookie", legalKey: "cookie" },
  ],
};

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Behance", href: "#" },
];

export function FooterSection() {
  const { open: openContact } = useContactModal();
  const { open: openLegal } = useLegalModal();

  return (
    <footer className="relative border-t border-foreground/10">
      {/* Sfondo onda animata */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Footer principale */}
        <div className="py-16 lg:py-24">
          <div className="flex flex-col md:flex-row md:items-start gap-12 lg:gap-20">
            {/* Colonna brand */}
            <div className="max-w-xs">
              <a href="#" className="inline-flex items-center mb-6">
                <img
                  src="/logo.webp"
                  alt="Loom Studio"
                  width={1774}
                  height={887}
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-auto"
                />
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                Lo studio creativo per chi vuole distinguersi. Progettiamo,
                sviluppiamo e facciamo crescere il tuo brand online.
              </p>

              {/* CTA */}
              <Button
                onClick={openContact}
                className="bg-foreground hover:bg-foreground/90 text-background rounded-full px-6 mb-8"
              >
                Inizia un progetto
              </Button>

              {/* Link social */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Colonne di link */}
            <div className="flex flex-wrap gap-12 lg:gap-16">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h3 className="text-sm font-medium mb-6">{title}</h3>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.name}>
                        {link.legalKey ? (
                          <button
                            type="button"
                            onClick={() => openLegal(link.legalKey!)}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                          >
                            {link.name}
                          </button>
                        ) : (
                          <a
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                          >
                            {link.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferiore */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Loom Studio. Tutti i diritti riservati.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Disponibili per nuovi progetti
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
