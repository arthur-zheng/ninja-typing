import React from "react";
import { Box, Text } from "gestalt";
import LetterCard from "./LetterCard";

export default function WordCard({
  word,
  imageUrl,
  letterIndex,
  typingStream,
}: Readonly<{
  word: string;
  imageUrl: string;
  letterIndex: number;
  typingStream: string[];
}>) {
  if (!word) {
    return <Text>{"..."}</Text>;
  }
  return (
    <Box display="flex" alignItems="start">
      {word.split("").map((char, index) => {
        let color = "#ddd";
        if (index < typingStream.length) {
          color = typingStream[index] === char ? "black" : "red";
        }

        return (
          <>
            {imageUrl && <img src={imageUrl} alt="" />}
            <LetterCard
              key={index}
              color={color}
              letter={char}
              isCurrent={index === letterIndex}
            />
          </>
        );
      })}
    </Box>
  );
}
