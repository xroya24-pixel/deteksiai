"use client";

function getSentences(text) {
  return text.match(/[^.!?]+[.!?]+/g) || [text];
}

function getScoreColor(score) {
  if (score >= 70) return "bg-red-500/15 border-red-500/30 text-red-700 dark:text-red-300";
  if (score >= 40) return "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300";
  return "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300";
}

function getLabel(score) {
  if (score >= 70) return "AI";
  if (score >= 40) return "?";
  return "";
}

export default function TextHighlighter({ text, suggestions, onSentenceClick, selectedIndex }) {
  const sentences = getSentences(text);

  return (
    <div className="space-y-2">
      {sentences.map((s, i) => {
        const sug = suggestions?.find((sug) => sug.original === s.trim());
        const score = sug ? sug.score : 0;
        const color = getScoreColor(score);
        const isSelected = selectedIndex === i;

        return (
          <div
            key={i}
            onClick={() => onSentenceClick?.(i)}
            className={`cursor-pointer rounded-lg border px-3 py-2 text-sm leading-relaxed transition-all ${
              isSelected ? "ring-2 ring-primary" : ""
            } ${score >= 40 ? color : ""}`}
          >
            <span>{s}</span>
            {score >= 40 && (
              <span className="ml-2 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-semibold">
                {getLabel(score)} {score}%
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
