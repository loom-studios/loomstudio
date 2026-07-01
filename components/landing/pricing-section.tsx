"use client";

import { useState } from "react";
import { ArrowRight, Check, Plus } from "lucide-react";
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
    maintenance: {
      price: 29,
      features: [
        "1 revisione al mese",
        "Aggiornamenti contenuti e plugin",
        "Backup e monitoraggio uptime",
        "Supporto via email",
      ],
    },
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
    maintenance: {
      price: 59,
      features: [
        "3 revisioni al mese",
        "Aggiornamenti contenuti, plugin e sicurezza",
        "Backup settimanali e monitoraggio",
        "Report mensile delle performance",
        "Supporto prioritario via email",
      ],
    },
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
    maintenance: {
      price: 99,
      features: [
        "Revisioni illimitate",
        "Aggiornamenti completi e gestione hosting",
        "Backup giornalieri e monitoraggio 24/7",
        "Ottimizzazione SEO continuativa",
        "Report mensile + call di confronto",
        "Supporto prioritario dedicato",
      ],
    },
  },
];

export function PricingSection() {
  const [withMaintenance, setWithMaintenance] = useState<Record<string, boolean>>({});
  const { open } = useContactModal();

  const toggleMaintenance = (name: string) =>
    setWithMaintenance((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
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
            Tre pacchetti per ogni esigenza, con prezzo fisso a progetto. Aggiungi la
            manutenzione opzionale per mantenere il sito sempre aggiornato.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {plans.map((plan, idx) => {
            const active = !!withMaintenance[plan.name];
            return (
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
                      €{(active ? plan.price + plan.maintenance.price : plan.price).toLocaleString("it-IT")}
                    </span>
                    <span className="text-muted-foreground">
                      {active ? "una tantum + mese" : "una tantum"}
                    </span>
                  </div>
                  {active && (
                    <p className="mt-2 text-xs font-mono text-muted-foreground">
                      €{plan.price.toLocaleString("it-IT")} progetto + €
                      {plan.maintenance.price}/mese manutenzione
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Maintenance add-on */}
                <div className="mb-10 border-t border-foreground/10 pt-6">
                  <button
                    onClick={() => toggleMaintenance(plan.name)}
                    className={`w-full flex items-center justify-between gap-3 text-left transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <Plus
                        className={`w-4 h-4 transition-transform ${active ? "rotate-45" : ""}`}
                      />
                      Manutenzione opzionale
                    </span>
                    <span className="font-mono text-xs whitespace-nowrap">
                      +€{plan.maintenance.price}/mese
                    </span>
                  </button>

                  {active && (
                    <ul className="space-y-3 mt-5">
                      {plan.maintenance.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

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
            );
          })}
        </div>

      </div>
    </section>
  );
}
