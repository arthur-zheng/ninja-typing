import { Flex } from "gestalt";

export default function LetterCard({
  letter,
  color,
  isCurrent,
}: {
  letter: string;
  color: string;
  isCurrent: boolean;
}) {
  if (!letter) {
    return <pre>🚫</pre>;
  }
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <pre style={{ color: color, fontSize: "4em" }}>
        {color === "red" && letter === " " ? "_" : letter}
      </pre>
      {isCurrent && <div className="current-dot"></div>}
    </Flex>
  );
}
