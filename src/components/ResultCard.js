export default function ResultCard({ title, score, description, detail }) {
  return (
    <div className="border border-zinc-200 p-3">
      <div className="mb-1 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-zinc-800">{title}</h4>
        <span className="text-sm font-bold text-zinc-600">{score}/100</span>
      </div>
      <p className="mb-1 text-xs text-zinc-500">{description}</p>
      {detail && <p className="text-xs font-medium text-zinc-600">{detail}</p>}
    </div>
  );
}
