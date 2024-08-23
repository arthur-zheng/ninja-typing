"use client";

import React from "react";
import { useEffect, useState } from "react";
import WordCard from "@/components/WordCard";
import DebuggingZone from "@/components/_debuggingZone";
import { isIgnoredKey } from "@/utils/keys";
import { Word } from "@/components/types/Word";
import { usePerf } from "@/components/hooks/PerfContext";

/*
 * The main component that listens to user input and renders the word
 */
export default function TypingField({
  wordsData,
  onFinish,
}: {
  wordsData: Word[];
  onFinish: () => void;
}) {
  const [words, setWords] = useState<Word[]>([]);
  // Typing related
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [typingStream, setTypingStream] = useState<string[]>([]);
  // Perf related
  const [startTime, setStartTime] = useState<number | null>(null);
  const { setWpm } = usePerf();

  useEffect(() => {
    setWords(wordsData);
  }, [wordsData]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (isIgnoredKey(e.key)) {
        return;
      }
      if (e.key === "Backspace" || e.key === "Delete") {
        setCharIndex((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
        setTypingStream((prev) => prev.slice(0, -1));
      } else {
        setTypingStream((prev) => [...prev, e.key]);
        setCharIndex((prev) => prev + 1);
      }
      if (startTime === null) {
        setStartTime(Date.now());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    // 下一词
    if (words[wordIndex] && charIndex >= words[wordIndex].word.length) {
      // calculate wps
      const endTime = Date.now();
      if (startTime !== null) {
        const durationInSeconds = (endTime - startTime) / 1000;
        const wps = words[wordIndex].word.length / durationInSeconds;
        setWpm(Math.floor(wps / 60));
        setStartTime(null); // Reset start time for the next word
      }

      if (wordIndex + 1 >= words.length) {
        onFinish();
      }
      setWordIndex((prev) => prev + 1);
      setCharIndex(0);
      setTypingStream([]);
    }
  }, [charIndex, words, wordIndex]);

  return (
    <>
      <WordCard
        key={wordIndex}
        word={words[wordIndex]?.word || ""}
        imageUrl={wordsData[wordIndex]?.image_url || ""}
        letterIndex={charIndex}
        typingStream={typingStream}
      />
      {/* <DebuggingZone
        wordsList={words}
        wordIndex={`${wordIndex}/${words.length}`}
        charIndex={charIndex}
        typingStream={typingStream}
      /> */}
    </>
  );
}
