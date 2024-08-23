import React from "react";
import { Box } from "gestalt";
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
  const wordOrSentense = word.indexOf(" ") === -1 ? word.toLowerCase() : word;

  if (!word) {
    return <></>;
  }
  return (
    <Box display="flex" alignItems="start">
      {wordOrSentense.split("").map((char, index) => {
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
