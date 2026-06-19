"use client";

import { AlertTriangle, CheckCircle, FileText, Sparkles } from "lucide-react";

export default function SuggestionItem({ original, score, issues, suggestion }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-4 transition-all hover:shadow-sm">
      {/* Original */}
      <div className="mb-2 flex items-start gap-3">
        <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-relaxed text-foreground/90">{original}</p>
        </div>
      </div>

      {/* Score badge */}
      <div className="mb-2 ml-7">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            score >= 70
              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
              : score >= 40
              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
          }`}
        >
          <AlertTriangle className="size-3" />
          AI {score}%
        </span>
      </div>

      {/* Issues */}
      {issues.length > 0 && (
        <div className="mb-2 ml-7 space-y-1">
          {issues.map((issue, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-amber-400 shrink-0" />
              {issue.label}
            </div>
          ))}
        </div>
      )}

      {/* Suggestion */}
      {suggestion && suggestion !== original && (
        <div className="ml-7 flex items-start gap-3 rounded-lg bg-emerald-500/10 px-3 py-2">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-emerald-500" />
          <div>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Saran Perbaikan
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">
              {suggestion}
            </p>
          </div>
        </div>
      )}

      {/* No suggestion needed */}
      {(!suggestion || suggestion === original) && issues.length === 0 && (
        <div className="ml-7 flex items-center gap-2 text-xs text-emerald-500">
          <CheckCircle className="size-3" />
          Tidak ada masalah
        </div>
      )}
    </div>
  );
}
