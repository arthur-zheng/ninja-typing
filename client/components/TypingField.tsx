"use client";

import React from "react";
import { useEffect, useState } from "react";
import WordCard from "@/components/WordCard";
import DebuggingZone from "@/components/_debuggingZone";
import { isIgnoredKey } from "@/utils/keys";
import { Words } from "@/components/types/Word";

/*
 * The main component that listens to user input and renders the word
 */
export default function TypingField({
  wordsData,
  onFinish,
}: {
  wordsData: Words;
  onFinish: () => void;
}) {
  const [words, setWords] = useState<Words>([]);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [typingStream, setTypingStream] = useState<string[]>([]);

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
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    // 下一词
    if (words[wordIndex] && charIndex >= words[wordIndex].word.length) {
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
        word={words[wordIndex]?.word}
        imageUrl={wordsData[wordIndex]?.image_url || ""}
        letterIndex={charIndex}
        typingStream={typingStream}
      />
      <DebuggingZone
        wordsList={words}
        wordIndex={`${wordIndex}/${words.length}`}
        charIndex={charIndex}
        typingStream={typingStream}
      />
    </>
  );
}
