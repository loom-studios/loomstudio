"use client";

import * as React from "react";

import { LegalModal } from "./legal-modal";
import { LEGAL_DOCUMENTS, type LegalKey } from "./legal-content";

type LegalModalContextValue = {
  open: (key: LegalKey) => void;
  close: () => void;
  activeKey: LegalKey | null;
};

const LegalModalContext = React.createContext<LegalModalContextValue | null>(
  null
);

export function LegalModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeKey, setActiveKey] = React.useState<LegalKey | null>(null);

  const value = React.useMemo<LegalModalContextValue>(
    () => ({
      open: (key: LegalKey) => setActiveKey(key),
      close: () => setActiveKey(null),
      activeKey,
    }),
    [activeKey]
  );

  return (
    <LegalModalContext.Provider value={value}>
      {children}
      <LegalModal
        document={activeKey ? LEGAL_DOCUMENTS[activeKey] : null}
        onOpenChange={(open) => {
          if (!open) setActiveKey(null);
        }}
      />
    </LegalModalContext.Provider>
  );
}

export function useLegalModal() {
  const context = React.useContext(LegalModalContext);
  if (!context) {
    throw new Error(
      "useLegalModal deve essere usato dentro <LegalModalProvider>"
    );
  }
  return context;
}
