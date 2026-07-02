import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { ContactModalProvider } from '@/components/contact/contact-modal-provider'
import { LegalModalProvider } from '@/components/legal/legal-modal-provider'
import { IntroOverlay } from '@/components/intro/intro-overlay'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: "Loom Studio | Agenzia di Web Design",
  description:
    "Loom Studio è un'agenzia specializzata in web design, sviluppo web e progettazione di esperienze digitali. Realizziamo siti web moderni, veloci, responsive e ottimizzati per aiutare aziende e professionisti a crescere online.",
  keywords: [
    "Loom Studio",
    "web design",
    "sviluppo web",
    "realizzazione siti web",
    "agenzia web",
    "UI/UX design",
    "Next.js",
    "React",
    "branding",
    "SEO",
    "siti web professionali",
    "sviluppo frontend"
  ],
  authors: [{ name: "Loom Studio" }],
  creator: "Loom Studio",
  publisher: "Loom Studio",
  applicationName: "Loom Studio",
  metadataBase: new URL("https://loom-studio.it"), // Sostituisci con il tuo dominio
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Loom Studio | Agenzia di Web Design",
    description:
      "Creiamo siti web moderni, performanti e curati nei minimi dettagli, progettati per distinguere il tuo brand e generare risultati concreti.",
    url: "https://loom-studio.it", // Sostituisci con il tuo dominio
    siteName: "Loom Studio",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loom Studio | Agenzia di Web Design",
    description:
      "Realizziamo siti web premium con design moderno, prestazioni elevate e un'esperienza utente di alto livello.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {/* CSS critico dell'intro: inline (non in globals.css) così è sempre
            servito e render-blocking. Nasconde l'overlay di default; lo mostra
            e blocca lo scroll solo quando <html> ha `intro-active`. */}
        <style>{`#loom-intro{display:none}html.intro-active #loom-intro{display:flex}html.intro-active,html.intro-active body{overflow:hidden}`}</style>
        {/* Prima del primo paint: mostra l'intro (aggiunge `intro-active`)
            solo se non è già stata vista in sessione e senza reduced-motion.
            Evita il flash del sito prima dell'overlay. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=sessionStorage.getItem('loom-intro-seen');var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!s&&!r){document.documentElement.classList.add('intro-active');}}catch(e){}})();",
          }}
        />
        <IntroOverlay />
        <ContactModalProvider>
          <LegalModalProvider>
            {children}
          </LegalModalProvider>
        </ContactModalProvider>
      </body>
    </html>
  )
}
