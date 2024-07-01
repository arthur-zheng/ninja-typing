import React from "react";
import { Box, Text } from "gestalt";
import LetterCard from "./LetterCard";

export default function WordCard({
  word,
  image_url,
  letterIndex,
  typingStream,
}: Readonly<{
  word: string;
  image_url: string;
  letterIndex: number;
  typingStream: string[];
}>) {
  if (!word) {
    return <Text>{"loading"}</Text>;
  }
  return (
    <Box display="flex" alignItems="center">
      {word.split("").map((char, index) => {
        let color = "#ddd";
        if (index < typingStream.length) {
          color = typingStream[index] === char ? "black" : "red";
        }

        return (
          <LetterCard key={index} color={color} letter={char}></LetterCard>
        );
      })}
    </Box>
  );
}
