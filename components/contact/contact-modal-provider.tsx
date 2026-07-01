"use client";

import * as React from "react";

import { ContactModal } from "./contact-modal";

type ContactModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ContactModalContext = React.createContext<ContactModalContextValue | null>(
  null
);

export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const value = React.useMemo<ContactModalContextValue>(
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      isOpen,
    }),
    [isOpen]
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={isOpen} onOpenChange={setIsOpen} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = React.useContext(ContactModalContext);
  if (!context) {
    throw new Error(
      "useContactModal deve essere usato dentro <ContactModalProvider>"
    );
  }
  return context;
}
