"use client";

import React from "react";
import { Box, Text, Flex } from "gestalt";
import { useEffect, useState } from "react";
import axios from "axios";
import WordCard from "@/components/WordCard";
import DebuggingZone from "@/components/_debuggingZone";
import { isIgnoredKey } from "@/utils/keys.tsx";

import "gestalt/dist/gestalt.css";

type Word = {
  word: string;
  image_url: string;
  complexity: number;
};

type Words = Word[];

export default function Home() {
  const [wordsData, setWordsData] = useState<Words>([]);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [wordsList, setWordsList] = useState<string[]>([]);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [typingStream, setTypingStream] = useState<string[]>([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get<Words>("http://localhost:8000/words");
        console.log(response.data);
        setWordsData(response.data);
        if (typeof response.data === "object") {
          setWordsList(
            Object.keys(response.data).map((word) =>
              word.indexOf(" ") > 0 ? word : word.toLowerCase()
            )
          );
        }
      } catch (error: any) {
        console.error("Error fetching words:", error);
        setError(error?.message || "An error occurred while fetching words");
      }
    };
    fetchWords();
  }, []);

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
    if (wordsList[wordIndex] && charIndex >= wordsList[wordIndex].length) {
      setWordIndex((prev) => (prev + 1 >= wordsList.length ? 0 : prev + 1));
      setCharIndex(0);
      setTypingStream([]);
    }
  }, [charIndex]);

  return (
    <Flex
      height="100vh"
      width="100vw"
      justifyContent="center"
      direction="column"
      alignItems="center"
      gap={4}
    >
      <WordCard
        word={wordsList[wordIndex]}
        // image_url={wordsData[wordIndex].image_url}
        image_url=""
        letterIndex={charIndex}
        typingStream={typingStream}
      />
      <DebuggingZone
        wordsList={wordsList}
        wordIndex={`${wordIndex}/${wordsList.length}`}
        charIndex={charIndex}
        typingStream={typingStream}
      />
    </Flex>
  );
}
