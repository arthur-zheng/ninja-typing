import React, { useEffect, useState } from "react";
import TypingField from "./TypingField";
import { useRouter } from "next/navigation";
import { Container } from "./Container";
import { useWords } from "@/components/hooks/WordsContext";
import { Word } from "@/components/types/Word";

export default function TypingExersiceSegment() {
  const router = useRouter();
  const { leveledWords, getRandomSubset, fetchWords } = useWords();
  const [wordsData, setWordsData] = useState<Word[]>([]);

  useEffect(() => {
    const setup = async () => {
      await fetchWords();
      console.log("wordsData", wordsData);
      setWordsData(getRandomSubset());
    };

    setup();
  }, [leveledWords]);

  return (
    <Container>
      {wordsData.length > 0 ? (
        <TypingField
          wordsData={wordsData}
          onFinish={() => router.push("/score")}
        />
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}
