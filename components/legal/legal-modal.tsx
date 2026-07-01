"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { LegalBlock, LegalDocument } from "./legal-content";

type LegalModalProps = {
  document: LegalDocument | null;
  onOpenChange: (open: boolean) => void;
};

// Un solo componente modal, riutilizzato per Privacy / Termini / Cookie.
export function LegalModal({ document, onOpenChange }: LegalModalProps) {
  const open = document !== null;
  const bodyRef = React.useRef<HTMLDivElement>(null);

  // Manteniamo l'ultimo documento visualizzato così che il contenuto resti
  // presente durante l'animazione di chiusura (quando `document` torna null).
  const [rendered, setRendered] = React.useState<LegalDocument | null>(document);
  React.useEffect(() => {
    if (document) setRendered(document);
  }, [document]);

  // Riporta lo scroll in cima ogni volta che si apre un nuovo documento.
  React.useEffect(() => {
    if (document && bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [document]);

  const doc = document ?? rendered;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "duration-300 data-[state=closed]:duration-200"
          )}
        />

        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "fixed left-1/2 top-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col",
            "max-h-[calc(100dvh-2rem)] overflow-hidden",
            "border border-foreground bg-background shadow-2xl outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            "data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-bottom-2",
            "duration-300 data-[state=closed]:duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
          )}
        >
          {/* Angoli decorativi — coerenti con la modal di contatto */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-12 w-12 border-b border-l border-foreground/10" />
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-12 w-12 border-r border-t border-foreground/10" />

          {/* Header fisso */}
          <div className="relative shrink-0 border-b border-foreground/10 px-8 py-7 lg:px-10">
            <DialogPrimitive.Close
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              aria-label="Chiudi"
            >
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>

            <div className="pr-10">
              <span className="mb-3 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span className="h-px w-8 bg-foreground/30" />
                {doc?.eyebrow}
              </span>
              <DialogPrimitive.Title className="font-display text-3xl leading-[1.05] tracking-tight lg:text-4xl">
                {doc?.title}
              </DialogPrimitive.Title>
              {doc && (
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
                  Ultimo aggiornamento: {doc.updated}
                </p>
              )}
            </div>
          </div>

          {/* Corpo scrollabile */}
          <div ref={bodyRef} className="overflow-y-auto px-8 py-7 lg:px-10">
            {doc && (
              <>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {renderText(doc.intro)}
                </p>

                <div className="mt-8 space-y-8">
                  {doc.sections.map((section, index) => (
                    <section key={section.heading}>
                      <h3 className="font-display text-lg tracking-tight lg:text-xl">
                        <span className="text-muted-foreground/50">{index + 1}.</span>{" "}
                        {section.heading}
                      </h3>
                      <div className="mt-3 space-y-3">
                        {section.blocks.map((block, i) => (
                          <Block key={i} block={block} />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.kind === "list") {
    return (
      <ul className="space-y-2">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="relative pl-5 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-foreground/40"
          >
            {renderText(item)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-sm leading-relaxed text-muted-foreground">
      {renderText(block.text)}
    </p>
  );
}

// Rende cliccabili email e URL presenti nel testo, mantenendo il contenuto
// come semplici stringhe nel file dei dati.
const LINK_RE = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

function renderText(text: string): React.ReactNode {
  const parts = text.split(LINK_RE);
  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline decoration-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground"
        >
          {part}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(part)) {
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className="text-foreground underline decoration-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground"
        >
          {part}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
