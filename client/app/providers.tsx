"use client";

import { PerfProvider } from "@/components/hooks/PerfContext";
import { LevelProvider } from "@/components/hooks/LevelContext";
import { WordsProvider } from "@/components/hooks/WordsContext";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LevelProvider>
      <WordsProvider>
        <PerfProvider>{children}</PerfProvider>
      </WordsProvider>
    </LevelProvider>
  );
}
