const colorMap = {
  red: { bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-800", dot: "bg-red-500", text: "text-red-700 dark:text-red-300" },
  yellow: { bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800", dot: "bg-amber-500", text: "text-amber-700 dark:text-amber-300" },
  green: { bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800", dot: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-300" },
};

export default function ResultCard({ title, score, description, detail, color = "yellow" }) {
  const c = colorMap[color] || colorMap.yellow;

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{title}</h4>
        <div className="flex items-center gap-1.5">
          <div className={`h-2 w-2 rounded-full ${c.dot}`} />
          <span className={`text-sm font-bold ${c.text}`}>{score}/100</span>
        </div>
      </div>
      <p className="mb-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{description}</p>
      {detail && <p className={`text-xs font-medium ${c.text}`}>{detail}</p>}
    </div>
  );
}
