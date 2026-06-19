"use client";

export default function CompareView({ original, humanized, suggestions }) {
  function getSentences(text) {
    return text.match(/[^.!?]+[.!?]+/g) || [text];
  }

  const origSentences = getSentences(original);
  const humSentences = getSentences(humanized);
  const maxLen = Math.max(origSentences.length, humSentences.length);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Teks Asli
        </p>
        <div className="space-y-2">
          {origSentences.map((s, i) => {
            const sug = suggestions?.find((sug) => sug.original === s.trim());
            const hasIssue = sug && sug.score >= 40;
            return (
              <div
                key={i}
                className={`rounded-lg border px-3 py-2 text-sm leading-relaxed ${
                  hasIssue
                    ? "border-red-500/30 bg-red-500/10"
                    : "border-border/50"
                }`}
              >
                {s}
                {hasIssue && (
                  <span className="ml-2 text-xs font-semibold text-red-500">
                    AI {sug.score}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Hasil Humanizer
        </p>
        <div className="space-y-2">
          {humSentences.map((s, i) => {
            const origSug = suggestions?.find(
              (sug) => sug.original === origSentences[i]?.trim()
            );
            const changed = origSug && origSug.suggestion;
            return (
              <div
                key={i}
                className={`rounded-lg border px-3 py-2 text-sm leading-relaxed ${
                  changed
                    ? "border-emerald-500/30 bg-emerald-500/10"
                    : "border-border/50"
                }`}
              >
                {s}
                {changed && (
                  <span className="ml-2 text-xs font-semibold text-emerald-500">
                    Diubah
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
