"use client";

import { ArrowRight, Check } from "lucide-react";
import { useContactModal } from "@/components/contact/contact-modal-provider";

const plans = [
  {
    name: "Landing Page",
    description: "Una pagina che converte, perfetta per lanci e campagne",
    price: 500,
    features: [
      "Sito one-page su misura",
      "Design responsive (mobile, tablet, desktop)",
      "Copywriting della sezione principale",
      "Form di contatto integrato",
      "Ottimizzazione SEO di base",
      "Collegamento ai social",
      "Integrazione Google Analytics",
      "2 revisioni incluse",
      "Pubblicazione e messa online",
    ],
    cta: "Richiedi la landing",
    popular: false,
  },
  {
    name: "Sito vetrina",
    description: "Il sito vetrina ideale per professionisti e piccole attività",
    price: 1000,
    features: [
      "Sito fino a 3 pagine (Home, Chi siamo, Contatti/Servizi)",
      "Tutto ciò che è incluso nella Landing Page",
      "Design personalizzato per ogni pagina",
      "Copywriting completo dei contenuti",
      "SEO avanzata su tutte le pagine",
      "Form avanzati e prenotazioni online",
      "Integrazione mappe e WhatsApp",
      "4 revisioni incluse",
    ],
    cta: "Richiedi il sito",
    popular: true,
  },
  {
    name: "Sito completo",
    description: "Il progetto completo, dalla strategia al sito su misura",
    price: 1500,
    features: [
      "Sito completo multi-pagina (illimitate)",
      "Tutto ciò che è incluso nel Sito vetrina",
      "Strategia e architettura dei contenuti",
      "Ottimizzazione performance e Core Web Vitals",
      "SEO tecnica completa + dati strutturati",
      "Predisposizione multilingua",
      "Animazioni e interazioni avanzate",
      "Consegna prioritaria + revisioni illimitate",
    ],
    cta: "Parliamo del progetto",
    popular: false,
  },
];

const maintenanceTiers = [
  { name: "Base", price: 29 },
  { name: "Pro", price: 59 },
  { name: "Full", price: 99 },
];

const maintenanceRows: { label: string; values: (boolean | string)[] }[] = [
  { label: "Revisioni / mese", values: ["1", "3", "Illimitate"] },
  { label: "Aggiornamenti contenuti e plugin", values: [true, true, true] },
  { label: "Gestione hosting", values: [true, true, true] },
  { label: "Aggiornamenti sicurezza", values: [false, true, true] },
  { label: "Report performance", values: [false, "Mensile", "Mensile + call"] },
  { label: "Supporto", values: ["Email e telefono", "Prioritario", "Dedicato"] },
];

export function PricingSection() {
  const { open } = useContactModal();

  return (
    <section id="prezzi" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
            Pacchetti
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Prezzi chiari,
            <br />
            <span className="text-stroke">nessuna sorpresa</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Tre pacchetti per ogni esigenza, con prezzo fisso a progetto. Scegli poi il
            piano di manutenzione che preferisci per mantenere il sito sempre aggiornato.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative p-8 lg:p-12 bg-background ${
                plan.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  Più richiesto
                </span>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl text-foreground mt-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-foreground/10">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl lg:text-6xl text-foreground">
                    €{plan.price.toLocaleString("it-IT")}
                  </span>
                  <span className="text-muted-foreground">una tantum</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={open}
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                  plan.popular
                    ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Maintenance table */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
            {/* Header — stacked on mobile, aside on desktop */}
            <div className="text-center lg:text-left mb-6 lg:mb-0 lg:w-52 lg:shrink-0 lg:pt-2">
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-2">
                Manutenzione
              </span>
              <h3 className="font-display text-xl md:text-2xl text-foreground">
                Scegli come mantenere il sito
              </h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto lg:mx-0">
                Piani mensili opzionali, disattivabili in ogni momento.
              </p>
            </div>

            <div className="relative overflow-x-auto lg:flex-1">
              <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-px bg-foreground/10 min-w-[460px]">
                {/* Header row */}
                <div className="bg-background px-3 py-2 flex items-center">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Cosa include
                  </span>
                </div>
                {maintenanceTiers.map((tier) => (
                  <div key={tier.name} className="bg-background px-3 py-2 text-center">
                    <span className="block font-mono text-[10px] tracking-widest text-foreground uppercase">
                      {tier.name}
                    </span>
                    <span className="block font-mono text-[10px] text-muted-foreground mt-0.5">
                      €{tier.price}/mese
                    </span>
                  </div>
                ))}

                {/* Body rows */}
                {maintenanceRows.map((row) => (
                  <div key={row.label} className="contents">
                    <div className="bg-background px-3 py-2 flex items-center">
                      <span className="text-xs text-muted-foreground">{row.label}</span>
                    </div>
                    {row.values.map((value, i) => (
                      <div
                        key={i}
                        className="bg-background px-3 py-2 flex items-center justify-center text-center"
                      >
                        {value === true ? (
                          <Check className="w-3.5 h-3.5 text-foreground" />
                        ) : value === false ? (
                          <span className="text-muted-foreground/40">—</span>
                        ) : (
                          <span className="text-xs text-foreground">{value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
