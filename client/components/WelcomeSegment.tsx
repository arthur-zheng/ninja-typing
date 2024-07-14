import React, { useState, useEffect } from "react";
import TypingField from "@/components/TypingField";
import { Flex, Text, Heading } from "gestalt";
import { Words } from "@/components/types/Word";
import { useRouter } from "next/navigation";
import { Container } from "./Container";

const WelcomeSegment = () => {
  const router = useRouter();
  const [words] = useState<Words>([{ word: "go" }]);

  return (
    <Container>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Heading>Ninja Typing</Heading>
        <Text weight="bold">
          Hey Welcome Ninja, Ready for some training? Type below:
        </Text>
        <TypingField
          wordsData={words}
          onFinish={() => router.push("/typing")}
        />
      </Flex>
    </Container>
  );
};

export default WelcomeSegment;
