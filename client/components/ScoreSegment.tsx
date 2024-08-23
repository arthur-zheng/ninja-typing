"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "./Container";
import { Heading, Flex, Text } from "gestalt";
import TypingField from "./TypingField";
import { usePerf } from "@/components/hooks/PerfContext";

export default function ScoreSegment() {
  const router = useRouter();
  const { wpm } = usePerf();

  useEffect(() => {
    // TODO: Calculate WPS
    console.log("wpm", wpm);
  });

  return (
    <Container>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <h1 className={`text-8xl`}>Result</h1>
        <p className="text-4xl mb-10">Average WPM: {wpm}</p>
        <TypingField
          wordsData={[{ word: "ok" }]}
          onFinish={() => router.push("/typing")}
        />
      </Flex>
    </Container>
  );
}
