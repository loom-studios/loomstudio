"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, ChevronDown, Loader2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { MagneticButton } from "./magnetic-button";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const planOptions = ["Landing Page", "Sito vetrina", "Sito completo"];

const schema = z.object({
  name: z.string().min(2, "Inserisci il tuo nome"),
  email: z.string().email("Inserisci un'email valida"),
  phone: z.union([
    z.literal(""),
    z
      .string()
      .regex(/^[+\d][\d\s()./-]{5,}$/, "Inserisci un numero valido"),
  ]),
  plan: z.string().min(1, "Seleziona un piano"),
  message: z.string(),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "submitting" | "success" | "error";

type ContactModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [status, setStatus] = React.useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", plan: "", message: "" },
  });

  // Fresh state every time the modal is opened.
  React.useEffect(() => {
    if (open) {
      setStatus("idle");
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (values: FormValues) => {
    if (!ACCESS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Nuova richiesta da ${values.name} — Loom Studio`,
          from_name: "Loom Studio — Sito web",
          name: values.name,
          email: values.email,
          phone: values.phone,
          piano: values.plan,
          message: values.message,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
            "fixed left-1/2 top-1/2 z-[100] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2",
            "max-h-[calc(100dvh-2rem)] overflow-y-auto",
            "border border-foreground bg-background p-8 lg:p-10 shadow-2xl outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            "data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-bottom-2",
            "duration-300 data-[state=closed]:duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
          )}
        >
          {/* Decorative corners — coerenti con la sezione CTA */}
          <div className="pointer-events-none absolute right-0 top-0 h-12 w-12 border-b border-l border-foreground/10" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-12 border-r border-t border-foreground/10" />

          {/* Close X */}
          <DialogPrimitive.Close
            className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            aria-label="Chiudi"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>

          {status === "success" ? (
            <SuccessPanel onClose={() => onOpenChange(false)} />
          ) : (
            <>
              <div className="mb-8">
                <span className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="h-px w-8 bg-foreground/30" />
                  Iniziamo
                </span>
                <DialogPrimitive.Title className="font-display text-3xl leading-[1.05] tracking-tight lg:text-4xl">
                  Parlaci del tuo progetto
                </DialogPrimitive.Title>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Compila il form e ti risponderemo entro 24 ore con i prossimi
                  passi.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5"
              >
                <Field label="Nome" error={errors.name?.message}>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Il tuo nome"
                    className={inputClass}
                    {...register("name")}
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email" error={errors.email?.message}>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="nome@email.com"
                      className={inputClass}
                      {...register("email")}
                    />
                  </Field>

                  <Field label="Telefono (facoltativo)" error={errors.phone?.message}>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="+39 ..."
                      className={inputClass}
                      {...register("phone")}
                    />
                  </Field>
                </div>

                <Field label="Piano" error={errors.plan?.message}>
                  <div className="relative">
                    <select
                      defaultValue=""
                      className={cn(inputClass, "appearance-none pr-10")}
                      {...register("plan")}
                    >
                      <option value="" disabled>
                        Seleziona un piano
                      </option>
                      {planOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </Field>

                <Field label="Messaggio (facoltativo)" error={errors.message?.message}>
                  <textarea
                    rows={4}
                    placeholder="Raccontaci l'idea, gli obiettivi e i tempi..."
                    className={cn(inputClass, "resize-none")}
                    {...register("message")}
                  />
                </Field>

                {status === "error" && (
                  <p className="text-sm text-destructive">
                    Qualcosa è andato storto. Riprova o scrivici a
                    info@loom-studio.it.
                  </p>
                )}

                <MagneticButton
                  type="submit"
                  disabled={status === "submitting"}
                  className="group mt-1 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground text-base font-medium text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      Invia richiesta
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </MagneticButton>
              </form>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

const inputClass =
  "w-full border border-foreground/15 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-foreground focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}

function SuccessPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-foreground">
        <Check className="h-7 w-7" />
      </div>
      <DialogPrimitive.Title className="font-display text-3xl tracking-tight lg:text-4xl">
        Grazie!
      </DialogPrimitive.Title>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
        Abbiamo ricevuto la tua richiesta. Ti risponderemo entro 24 ore
        all'indirizzo che ci hai lasciato.
      </p>
      <button
        onClick={onClose}
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-foreground px-8 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
      >
        Chiudi
      </button>
    </div>
  );
}
