import { useState, useEffect } from "react";
import axios from "axios";
import { Word, Words } from "@/components/types/Word";

const removeCapitalizationInSingleWord = (word: string) => {
  if (word.indexOf(" ") !== -1) {
    return word;
  }

  return word.toLocaleLowerCase();
};

export const useFetchWords = () => {
  const [wordsData, setWordsData] = useState<Words>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get<{ [key: string]: Word }>(
          "http://localhost:8000/words"
        );
        // map -> array
        setWordsData(
          Object.values(response.data).map((wordObject) => ({
            ...wordObject,
            word: removeCapitalizationInSingleWord(wordObject.word),
          }))
        );
      } catch (error: any) {
        console.error("Error fetching words:", error);
        setError(error?.message || "An error occurred while fetching words");
      }
    };
    fetchWords();
  }, []);

  return { wordsData, error };
};
