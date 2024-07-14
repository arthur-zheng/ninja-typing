import React from "react";
import TypingField from "./TypingField";
import { useFetchWords } from "@/components/hooks/useFetchWords";
import { useRouter } from "next/navigation";
import { Container } from "./Container";

export default function TypingExersiceSegment() {
  const router = useRouter();
  const { wordsData, error } = useFetchWords();
  return (
    <Container>
      <TypingField
        wordsData={wordsData}
        onFinish={() => router.push("/score")}
      />
    </Container>
  );
}
