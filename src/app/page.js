"use client";

import { useState, useCallback, useRef } from "react";
import { analyzeText, getReadability } from "@/lib/detector";
import { humanizeText, getHumanizerStats } from "@/lib/humanizer";
import { Sparkles, Scan, Lightbulb, FileText } from "lucide-react";
import ModeToggle from "@/components/mode-toggle";

const tips = [
  "Variasikan panjang kalimat",
  "Kurangi pengulangan kata",
  "Tambahkan opini pribadi",
  "Gunakan transisi antar paragraf",
  "Gunakan bahasa lebih alami",
];

const sampleText = `Artificial intelligence has revolutionized the way we approach problem-solving in the modern era. It is important to note that AI technologies have fundamentally transformed various industries, from healthcare to finance. The landscape of machine learning continues to evolve at a rapid pace, with groundbreaking innovations emerging on a daily basis. Furthermore, the integration of AI into everyday applications has become increasingly seamless. It is crucial to consider the ethical implications of these advancements. In conclusion, AI represents a paradigm shift that will undoubtedly shape our future in profound ways.`;

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [humanized, setHumanized] = useState("");
  const textareaRef = useRef(null);

  const handleAnalyze = useCallback(() => {
    if (!text.trim() || text.trim().length < 20) return;
    setLoading(true);
    setTimeout(() => {
      const res = analyzeText(text);
      setResult(res);
      const h = humanizeText(text);
      setHumanized(h);
      setLoading(false);
    }, 300);
  }, [text]);

  const handlePasteSample = useCallback(() => {
    setText(sampleText);
    setResult(null);
    setHumanized("");
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  const handleClear = useCallback(() => {
    setText("");
    setResult(null);
    setHumanized("");
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  function getScoreColor(score) {
    if (score >= 70) return "text-red-500";
    if (score >= 40) return "text-amber-500";
    return "text-emerald-500";
  }

  function getBarColor(score) {
    if (score >= 70) return "bg-red-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-emerald-500";
  }

  function getConfidenceLabel(score) {
    if (score >= 80) return "Sangat Tinggi";
    if (score >= 60) return "Tinggi";
    if (score >= 40) return "Sedang";
    if (score >= 20) return "Rendah";
    return "Sangat Rendah";
  }

  function getConfidenceColor(score) {
    if (score >= 60) return "text-red-500";
    if (score >= 40) return "text-amber-500";
    return "text-emerald-500";
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-slate-50 dark:bg-zinc-950">
      {/* Glow effects */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-[500px] rounded-full bg-primary/15 blur-[150px]" />
        <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-secondary/10 blur-[150px]" />
      </div>

      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-border/40 bg-background/30 px-6 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2 text-sm font-bold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            D
          </span>
          DeteksiAI
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {text.length > 0
              ? `${text.split(/\s+/).filter(Boolean).length} kata`
              : ""}
          </span>
          <ModeToggle />
        </div>
      </div>

      {/* Main grid */}
      <div className="mt-11 grid h-[calc(100vh-44px)] w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 md:grid-rows-2">
        {/* Card 1: Input */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-background/60 shadow-lg shadow-primary/5 backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between border-b border-border/30 px-5 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FileText className="size-4 text-primary" />
              Input Tulisan
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePasteSample}
                className="rounded-lg px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Contoh
              </button>
              <button
                onClick={handleClear}
                className="rounded-lg px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Hapus
              </button>
            </div>
          </div>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (result && e.target.value !== text) {
                setResult(null);
                setHumanized("");
              }
            }}
            placeholder="Tempelkan tulisan di sini (min. 20 karakter)..."
            className="min-h-0 flex-1 resize-none border-0 bg-transparent px-5 py-3 text-sm leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none"
          />
          <div className="flex items-center justify-between border-t border-border/30 px-5 py-3">
            <span className="text-xs text-muted-foreground">
              {text.length.toLocaleString()} karakter
            </span>
            <button
              onClick={handleAnalyze}
              disabled={
                !text.trim() || text.trim().length < 20 || loading
              }
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {loading ? "Menganalisis..." : "Mulai Analisis"}
            </button>
          </div>
        </div>

        {/* Card 2: Hasil Analisis */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-background/60 shadow-lg shadow-primary/5 backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-2 border-b border-border/30 px-5 py-3 text-sm font-semibold">
            <Scan className="size-4 text-primary" />
            Hasil Analisis
          </div>
          <div className="flex min-h-0 flex-1 flex-col justify-center px-5 py-4">
            {loading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="size-8 animate-spin rounded-full border-3 border-primary/20 border-t-primary" />
                <p className="text-sm text-muted-foreground">
                  Menganalisis teks...
                </p>
              </div>
            ) : result ? (
              <>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-red-500/10 p-4 text-center">
                    <p
                      className={`text-3xl font-bold ${getScoreColor(result.overallScore)}`}
                    >
                      {result.overallScore}%
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      AI Score
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-500/10 p-4 text-center">
                    <p className="text-3xl font-bold text-emerald-500">
                      {100 - result.overallScore}%
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Human Score
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>Kemungkinan AI</span>
                    <span>{result.overallScore}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${getBarColor(result.overallScore)}`}
                      style={{ width: `${result.overallScore}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                  <span className="text-xs text-muted-foreground">
                    Confidence Level
                  </span>
                  <span
                    className={`text-sm font-bold ${getConfidenceColor(result.overallScore)}`}
                  >
                    {getConfidenceLabel(result.overallScore)}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                <Scan className="mx-auto mb-2 size-8 text-primary/30" />
                <p>Masukkan teks dan tekan</p>
                <p className="font-semibold text-primary">Mulai Analisis</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Humanizer */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-background/60 shadow-lg shadow-primary/5 backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-2 border-b border-border/30 px-5 py-3 text-sm font-semibold">
            <Sparkles className="size-4 text-primary" />
            Humanizer
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            {loading ? (
              <div className="flex flex-col items-center gap-3 pt-8">
                <div className="size-8 animate-spin rounded-full border-3 border-primary/20 border-t-primary" />
                <p className="text-sm text-muted-foreground">
                  Memproses...
                </p>
              </div>
            ) : humanized ? (
              <p className="text-sm leading-relaxed text-foreground/90">
                {humanized}
              </p>
            ) : (
              <div className="pt-8 text-center text-sm text-muted-foreground">
                <Sparkles className="mx-auto mb-2 size-8 text-primary/30" />
                <p>Versi natural akan muncul</p>
                <p>setelah analisis selesai</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 4: Saran Perbaikan */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-background/60 shadow-lg shadow-primary/5 backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-2 border-b border-border/30 px-5 py-3 text-sm font-semibold">
            <Lightbulb className="size-4 text-primary" />
            Saran Perbaikan
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            {result ? (
              <ul className="space-y-3">
                {tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                      <svg
                        className="size-3 text-emerald-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="pt-8 text-center text-sm text-muted-foreground">
                <Lightbulb className="mx-auto mb-2 size-8 text-primary/30" />
                <p>Saran akan muncul</p>
                <p>setelah teks dianalisis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
