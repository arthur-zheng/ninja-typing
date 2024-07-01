export default function LetterCard({
  letter,
  color,
}: {
  letter: string;
  color: string;
}) {
  if (!letter) {
    return <pre>{"~"}</pre>;
  }
  return <pre style={{ color: color, fontSize: "3.5em" }}>{letter}</pre>;
}
