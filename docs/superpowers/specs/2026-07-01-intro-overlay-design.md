# Intro di brand — Overlay di apertura

**Data:** 2026-07-01
**Stato:** approvato, pronto per l'implementazione

## Obiettivo

Mostrare una breve intro di brand all'apertura del sito Loom Studio: un video
(`public/loading-video.mp4`, ~102 KB) su sfondo bianco, mostrato una sola volta
per sessione del browser. Serve a dare carattere allo studio, non a coprire un
vero tempo di caricamento (la landing è statica e leggera).

## Requisiti

- **Frequenza:** una volta per sessione del browser (`sessionStorage`).
- **Sfondo:** `#fefefe`, cioè il colore di sfondo reale del video (campionato dai
  frame). Non bianco puro `#ffffff`: quella differenza di 1 livello renderebbe
  visibile il bordo del rettangolo video. Non derivato dal tema.
- **Video:** piccolo e centrato, **non** a tutto schermo. Larghezza proporzionale
  al viewport ma sempre contenuta, tramite `clamp(120px, 30vw, 260px)`, così scala
  con il dispositivo restando compatto sia su desktop che su mobile. Attributi
  `autoPlay muted playsInline` (obbligatori per l'autoplay dei browser).
- **Chiusura:** automatica alla fine del video (`onEnded`), con fade-out (~500ms)
  che rivela il sito. Nessun pulsante "salta" visibile.
- **Rete di sicurezza:** `onError` sul video e un timeout massimo (~8s) forzano
  comunque la chiusura, così la pagina non resta mai bloccata dietro un video
  fermo (es. autoplay negato su mobile in risparmio energetico).
- **Accessibilità:** se l'utente ha `prefers-reduced-motion: reduce`, l'intro non
  viene mostrata (il sito è subito visibile).
- **Scroll:** bloccato mentre l'overlay è visibile, ripristinato alla chiusura.
- **Niente flash del sito:** all'apertura si vede subito l'overlay, mai il sito
  per primo. Vedi "Architettura no-flash".

## Architettura

### Architettura no-flash

`sessionStorage` è leggibile solo lato client: se l'overlay fosse montato solo
dopo l'hydration, per un istante si vedrebbe il sito prima dell'intro. Per evitarlo
l'overlay è **già nell'HTML iniziale (SSR)** ma la sua visibilità è decisa da CSS,
non da React:

1. `app/layout.tsx`: un `<style>` **inline** (non in `globals.css`, così è sempre
   servito e render-blocking anche se il dev server non ricompila i CSS): `#loom-intro
   { display: none }` di default; visibile solo con `html.intro-active #loom-intro
   { display: flex }`. `html.intro-active` blocca anche lo scroll. Così chi ha già
   visto l'intro (o usa reduced-motion) non la vede mai, nemmeno per un frame.
2. `app/layout.tsx`: uno **script inline** all'inizio del `<body>` (eseguito prima
   del primo paint) aggiunge `intro-active` su `<html>` solo se
   `sessionStorage['loom-intro-seen']` è assente **e** non c'è
   `prefers-reduced-motion`. `<html>` ha `suppressHydrationWarning` perché la classe
   viene aggiunta fuori da React.

### Componente: `components/intro/intro-overlay.tsx`

Client component (`"use client"`) che renderizza **sempre** lo stesso markup (nessun
mismatch di hydration) e gestisce solo la fine:

1. Markup: `<div id="loom-intro" fixed inset-0 z-[200] flex center bg-[#fefefe]
   transition-opacity>` con dentro il `<video>` (`clamp(120px, 30vw, 260px)`,
   `autoPlay muted playsInline`). Il video parte in autoplay direttamente dall'HTML.
2. Al montaggio: se `html` non ha `intro-active` → non fa nulla. Altrimenti arma il
   timeout di sicurezza (e chiude subito se il video è già finito prima dell'hydration).
3. `onEnded` / `onError` / timeout → `close()`: imposta `sessionStorage`, avvia il
   fade-out (opacità → 0), poi rimuove `intro-active` (nasconde l'overlay e sblocca
   lo scroll via CSS).

### Integrazione: `app/layout.tsx`

Il layout resta un server component. Contiene lo script inline e monta `IntroOverlay`
come primo elemento del `<body>`, sopra i provider.

## Test manuali

- Prima visita → si vede subito l'overlay (mai il sito prima), il video va a fine
  e sfuma; il sito diventa usabile.
- Niente flash: al primo paint il sito non è visibile sotto l'overlay.
- Reload nella stessa sessione → nessuna intro, nessun flash dell'overlay.
- Nuova sessione (o `sessionStorage` svuotato) → l'intro riappare.
- `prefers-reduced-motion: reduce` attivo → intro saltata, sito subito visibile.
- Video in errore / autoplay bloccato → l'overlay si chiude comunque via timeout.
- Verifica responsive: il video resta piccolo e centrato su desktop e mobile.

## Fuori scope

- Audio (l'autoplay richiede muto).
- Pulsante "salta" visibile.
- Riproduzione a ogni navigazione interna o a ogni visita.
