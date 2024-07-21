import React, { createContext, useContext, useState, useEffect } from "react";
import { useLevel } from "./LevelContext";
import { Word } from "@/components/types/Word";

interface WordsContextType {
  leveledWords: { [key: string]: Word[] };
  getRandomSubset: (size?: number) => Word[];
  fetchWords: () => Promise<void>;
}

// Create Words Context
const WordsContext = createContext<WordsContextType>({
  leveledWords: {},
  getRandomSubset: () => [],
  fetchWords: async () => {},
});

// Hook to use Words Context
export const useWords = () => {
  return useContext(WordsContext);
};

// Words Provider Component
export const WordsProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: Store words for multiple levels
  const { level } = useLevel();
  const [leveledWords, setLeveledWords] = useState<{ [key: string]: Word[] }>(
    {}
  );
  // TODO: History
  // const [usedWords, setUsedWords] = useState<string[]>([]);

  useEffect(() => {
    fetchWords();
  }, [level]);

  const fetchWords = async () => {
    if (level === null || leveledWords[level]) return;
    console.log("before fetching:", leveledWords);
    const response = await fetch(`http://localhost:8000/words/${level}`);
    const data = await response.json();
    console.log(`after: fetching:`, data);
    setLeveledWords((leveledWords) => ({
      ...leveledWords,
      [level]: data,
    }));
  };

  const getRandomSubset: () => Word[] = (size = 10) => {
    if (
      level === null ||
      !leveledWords[level] ||
      leveledWords[level].length === 0
    ) {
      return [];
    }
    const shuffledWords = [...leveledWords[level]].sort(
      () => 0.5 - Math.random()
    );
    console.log("randomSubset", shuffledWords.slice(0, size));
    return shuffledWords.slice(0, size);
  };

  return (
    <WordsContext.Provider
      value={{ leveledWords, getRandomSubset, fetchWords }}
    >
      {children}
    </WordsContext.Provider>
  );
};
