"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Container } from "./Container";
import { Heading, Flex } from "gestalt";
import TypingField from "./TypingField";

export default function ScoreSegment() {
  const router = useRouter();
  return (
    <Container>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Heading>Result</Heading>
        <TypingField
          wordsData={[{ word: "go" }]}
          onFinish={() => router.push("/typing")}
        />
      </Flex>
    </Container>
  );
}
