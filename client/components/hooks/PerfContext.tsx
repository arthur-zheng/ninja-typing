// PerfContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PerfContextType {
  wpm: number;
  setWpm: (wpm: number) => void;
}

const PerfContext = createContext<PerfContextType | undefined>(undefined);

export const usePerf = (): PerfContextType => {
  const context = useContext(PerfContext);
  if (!context) {
    throw new Error("usePerf must be used within a PerfProvider");
  }
  return context;
};

export const PerfProvider = ({ children }: { children: ReactNode }) => {
  const [wpm, setWpm] = useState<number>(0);

  return (
    <PerfContext.Provider value={{ wpm, setWpm }}>
      {children}
    </PerfContext.Provider>
  );
};
