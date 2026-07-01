import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { ContactModalProvider } from '@/components/contact/contact-modal-provider'
import { LegalModalProvider } from '@/components/legal/legal-modal-provider'
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
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
    <html lang="en">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ContactModalProvider>
          <LegalModalProvider>
            {children}
          </LegalModalProvider>
        </ContactModalProvider>
      </body>
    </html>
  )
}
