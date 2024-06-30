"use client";

import { Box, Text, Flex } from "gestalt";
import { useEffect, useState } from "react";
import axios from "axios";
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

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get<Words>("http://localhost:8000/words");
        console.log(response.data);
        setWordsData(response.data);
        if (typeof response.data === "object") {
          setWordsList(Object.keys(response.data));
        }
      } catch (error: any) {
        console.error("Error fetching words:", error);
        setError(error?.message || "An error occurred while fetching words");
      }
    };

    fetchWords();
  }, []);

  return (
    <Flex
      height="100vh"
      width="100vw"
      justifyContent="center"
      direction="column"
      alignItems="center"
      gap={4}
    >
      <Text>
        {wordIndex}/{wordsList.length}
      </Text>
      {error ? (
        <Text color="error">Error: {error}</Text>
      ) : Object.keys(wordsList).length > 0 ? (
        <Text>{wordsList[wordIndex]}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </Flex>
  );
}
