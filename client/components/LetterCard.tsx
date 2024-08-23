import { heyComicFont } from "@/components/fonts";

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
    <div
      className={`${heyComicFont.className} flex flex-col items-center justify-center gap-2`}
    >
      <div style={{ color: color }} className="text-8xl">
        {color === "red" && letter === " " ? "_" : letter}
      </div>
      {isCurrent && <div className="current-dot"></div>}
    </div>
  );
}
