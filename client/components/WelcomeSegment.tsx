import React, { useState, useEffect } from "react";
import TypingField from "@/components/TypingField";
import { Flex, Text, Heading } from "gestalt";
import { Words } from "@/components/types/Word";
import { useRouter } from "next/navigation";
import { Container } from "./Container";
// import { useFetchWords } from "@/components/hooks/useFetchWords";
import { comicAndyFont } from "@/components/fonts";
import Image from "next/image";

const WELCOME_WORD = [{ word: "Go" }];

const WelcomeSegment = () => {
  const router = useRouter();
  const [words] = useState<Words>();

  return (
    <Container>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <h1 className={`${comicAndyFont.className} text-9xl mb-4`}>
          NINJA TYPING!
        </h1>
        <Image
          src="/hero.png"
          width={200}
          height={250}
          alt="a ninja in zen mode, in front of a keyboard"
        />

        <p className="text-2xl mt-4">
          Ready for some training, Ninja? Type below:
        </p>
        <TypingField
          wordsData={WELCOME_WORD}
          onFinish={() => router.push("/typing")}
        />
      </Flex>
    </Container>
  );
};

export default WelcomeSegment;
