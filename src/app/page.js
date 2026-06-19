"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Scan, Lightbulb, FileText, ArrowRight, History, Upload, Download,
  X, Clock, Trash2, Star, CheckCircle,
} from "lucide-react";
import { analyzeText } from "@/lib/detector";
import { humanizeText } from "@/lib/humanizer";
import { analyzeSuggestions } from "@/lib/suggestions";
import { saveHistory, getHistory, deleteHistoryItem, clearHistory, formatDate } from "@/lib/history";
import ModeToggle from "@/components/mode-toggle";
import TextHighlighter from "@/components/text-highlighter";
import CompareView from "@/components/compare-view";
import SuggestionItem from "@/components/suggestion-item";

const sampleText = `Artificial intelligence has revolutionized the way we approach problem-solving in the modern era. It is important to note that AI technologies have fundamentally transformed various industries, from healthcare to finance. The landscape of machine learning continues to evolve at a rapid pace, with groundbreaking innovations emerging on a daily basis. Furthermore, the integration of AI into everyday applications has become increasingly seamless. It is crucial to consider the ethical implications of these advancements. In conclusion, AI represents a paradigm shift that will undoubtedly shape our future in profound ways.`;

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [humanized, setHumanized] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [tab, setTab] = useState("hasil");
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleAnalyze = useCallback(() => {
    if (!text.trim() || text.trim().length < 20) return;
    setLoading(true);
    setTimeout(() => {
      const res = analyzeText(text);
      setResult(res);
      const h = humanizeText(text);
      setHumanized(h);
      const sug = analyzeSuggestions(text);
      setSuggestions(sug);
      setSelectedSentence(null);
      setTab("hasil");
      setLoading(false);
      saveHistory({
        text: text.slice(0, 200),
        score: res.overallScore,
        category: res.category,
        humanized: h.slice(0, 200),
        words: res.stats.words,
      });
    }, 400);
  }, [text]);

  const handlePasteSample = useCallback(() => {
    setText(sampleText);
    setResult(null);
    setHumanized("");
    setSuggestions([]);
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  const handleClear = useCallback(() => {
    setText("");
    setResult(null);
    setHumanized("");
    setSuggestions([]);
    setSelectedSentence(null);
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setText(ev.target?.result?.toString() || "");
      setResult(null);
      setHumanized("");
      setSuggestions([]);
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  const openHistory = useCallback(() => {
    setHistory(getHistory());
    setShowHistory(true);
  }, []);

  const loadHistoryItem = useCallback((item) => {
    setText(item.text.length > 50 ? sampleText : item.text);
    setShowHistory(false);
  }, []);

  function getScoreColor(s) {
    if (s >= 70) return "text-red-500";
    if (s >= 40) return "text-amber-500";
    return "text-emerald-500";
  }

  function getBarColor(s) {
    if (s >= 70) return "bg-red-500";
    if (s >= 40) return "bg-amber-500";
    return "bg-emerald-500";
  }

  function getConfidenceLabel(s) {
    if (s >= 80) return "Sangat Tinggi";
    if (s >= 60) return "Tinggi";
    if (s >= 40) return "Sedang";
    if (s >= 20) return "Rendah";
    return "Sangat Rendah";
  }

  function getConfidenceColor(s) {
    if (s >= 60) return "text-red-500";
    if (s >= 40) return "text-amber-500";
    return "text-emerald-500";
  }

  const handleExport = useCallback(() => {
    if (!result) return;
    const lines = [
      "=== LAPORAN DETEKSI AI ===",
      `Tanggal: ${new Date().toLocaleDateString("id-ID")}`,
      `Skor AI: ${result.overallScore}%`,
      `Kategori: ${result.category}`,
      `Total Kata: ${result.stats.words}`,
      `Kalimat: ${result.stats.sentences}`,
      "",
      "=== TEKS ASLI ===",
      text,
      "",
      "=== HASIL HUMANIZER ===",
      humanized,
      "",
      "=== SARAN PER-KALIMAT ===",
      ...suggestions.map(
        (s, i) =>
          `\n${i + 1}. [AI ${s.score}%] ${s.original}\n   → ${s.suggestion || "(tidak perlu diubah)"}`
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `deteksiai-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [result, text, humanized, suggestions]);

  if (!showApp) {
    return (
      <div className="relative flex h-screen overflow-hidden bg-slate-50 dark:bg-zinc-950">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 size-[600px] rounded-full bg-primary/20 blur-[150px]" />
          <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-secondary/10 blur-[150px]" />
        </div>

        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-border/40 bg-background/30 px-6 py-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm font-bold tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">D</span>
            DeteksiAI
          </div>
          <ModeToggle />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground"
          >
            <Sparkles className="size-4 text-primary" />
            AI Detector & Humanizer Bahasa Indonesia
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Deteksi & Humanisasi
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tulisan AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground"
          >
            Ketahui apakah tulisan dibuat AI, dapatkan saran perbaikan per-kalimat, dan ubah jadi lebih alami.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button
              onClick={() => setShowApp(true)}
              className="inline-flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              <Sparkles className="size-5" />
              Mulai Analisis
              <ArrowRight className="size-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>Dipercaya ratusan pengguna Indonesia</span>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-slate-50 dark:bg-zinc-950">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-[500px] rounded-full bg-primary/15 blur-[150px]" />
        <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-secondary/10 blur-[150px]" />
      </div>

      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-border/40 bg-background/30 px-4 py-2 backdrop-blur-md sm:px-6">
        <button
          onClick={() => setShowApp(false)}
          className="flex items-center gap-2 text-sm font-bold tracking-tight hover:opacity-80"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">D</span>
          <span className="hidden sm:inline">DeteksiAI</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={openHistory}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Riwayat"
          >
            <History className="size-4" />
          </button>
          {result && (
            <button
              onClick={handleExport}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Export"
            >
              <Download className="size-4" />
            </button>
          )}
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {text.length > 0 ? `${text.split(/\s+/).filter(Boolean).length} kata` : ""}
          </span>
          <ModeToggle />
        </div>
      </div>

      {/* Main grid */}
      <div className="mt-11 grid h-[calc(100vh-44px)] w-full grid-cols-1 gap-3 p-3 md:grid-cols-2 md:grid-rows-2 md:gap-4 md:p-4">
        {/* Card 1: Input */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-background/60 shadow-lg shadow-primary/5 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-border/30 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FileText className="size-4 text-primary" />
              Input Tulisan
            </div>
            <div className="flex items-center gap-1.5">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.doc,.docx"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                title="Upload file"
              >
                <Upload className="inline size-3.5" />
                <span className="ml-1 hidden sm:inline">Upload</span>
              </button>
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
                setResult(null); setHumanized(""); setSuggestions([]);
              }
            }}
            placeholder="Tempelkan tulisan di sini (min. 20 karakter)..."
            className="min-h-0 flex-1 resize-none border-0 bg-transparent px-4 py-3 text-sm leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none sm:px-5"
          />
          <div className="flex items-center justify-between border-t border-border/30 px-4 py-3 sm:px-5">
            <span className="text-xs text-muted-foreground">
              {text.length.toLocaleString()} karakter
            </span>
            <button
              onClick={handleAnalyze}
              disabled={!text.trim() || text.trim().length < 20 || loading}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {loading ? "Menganalisis..." : "Analisis"}
            </button>
          </div>
        </div>

        {/* Card 2: Hasil */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-background/60 shadow-lg shadow-primary/5 backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-border/30 px-4 py-3 text-sm font-semibold sm:px-5">
            <Scan className="size-4 text-primary" />
            Hasil Analisis
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 sm:px-5">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 pt-8">
                <div className="size-8 animate-spin rounded-full border-3 border-primary/20 border-t-primary" />
                <p className="text-sm text-muted-foreground">Menganalisis teks...</p>
              </div>
            ) : result ? (
              <>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-red-500/10 p-4 text-center">
                    <p className={`text-3xl font-bold ${getScoreColor(result.overallScore)}`}>
                      {result.overallScore}%
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Skor AI</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-500/10 p-4 text-center">
                    <p className="text-3xl font-bold text-emerald-500">
                      {100 - result.overallScore}%
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Skor Human</p>
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
                <div className="mb-4 flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                  <span className="text-xs text-muted-foreground">Tingkat Keyakinan</span>
                  <span className={`text-sm font-bold ${getConfidenceColor(result.overallScore)}`}>
                    {getConfidenceLabel(result.overallScore)}
                  </span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                  <div className="rounded-lg bg-muted/30 p-2">
                    <p className="font-bold text-foreground">{result.stats.words}</p>
                    <p>Kata</p>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-2">
                    <p className="font-bold text-foreground">{result.stats.sentences}</p>
                    <p>Kalimat</p>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-2">
                    <p className="font-bold text-foreground">{result.readability.score}</p>
                    <p>{result.readability.ease}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center pt-8 text-center text-sm text-muted-foreground">
                <Scan className="mb-2 size-8 text-primary/30" />
                <p>Masukkan teks dan tekan</p>
                <p className="font-semibold text-primary">Analisis</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Humanizer */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-background/60 shadow-lg shadow-primary/5 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-border/30 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-primary" />
              Humanizer
            </div>
            {humanized && (
              <div className="flex gap-1 rounded-lg bg-muted/50 p-0.5">
                <button
                  onClick={() => setTab("hasil")}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    tab === "hasil" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Hasil
                </button>
                <button
                  onClick={() => setTab("banding")}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    tab === "banding" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Bandingkan
                </button>
              </div>
            )}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 pt-8">
                <div className="size-8 animate-spin rounded-full border-3 border-primary/20 border-t-primary" />
                <p className="text-sm text-muted-foreground">Memproses...</p>
              </div>
            ) : humanized && tab === "hasil" ? (
              <p className="text-sm leading-relaxed text-foreground/90">{humanized}</p>
            ) : humanized && tab === "banding" ? (
              <CompareView original={text} humanized={humanized} suggestions={suggestions} />
            ) : (
              <div className="flex flex-col items-center justify-center pt-8 text-center text-sm text-muted-foreground">
                <Sparkles className="mb-2 size-8 text-primary/30" />
                <p>Versi natural akan muncul</p>
                <p>setelah analisis selesai</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 4: Saran Perbaikan */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-background/60 shadow-lg shadow-primary/5 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-border/30 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Lightbulb className="size-4 text-primary" />
              Saran Perbaikan
            </div>
            {suggestions.length > 0 && (
              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                {suggestions.length} kalimat
              </span>
            )}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 pt-8">
                <div className="size-8 animate-spin rounded-full border-3 border-primary/20 border-t-primary" />
                <p className="text-sm text-muted-foreground">Menganalisis kalimat...</p>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-3">
                {suggestions.map((s, i) => (
                  <SuggestionItem key={i} {...s} />
                ))}
              </div>
            ) : result ? (
              <div className="flex flex-col items-center justify-center pt-8 text-center text-sm text-muted-foreground">
                <CheckCircle className="mb-2 size-8 text-emerald-500" />
                <p>Tidak ada kalimat yang perlu diperbaiki</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-8 text-center text-sm text-muted-foreground">
                <Lightbulb className="mb-2 size-8 text-primary/30" />
                <p>Saran akan muncul</p>
                <p>setelah teks dianalisis</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setShowHistory(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-4 w-full max-w-lg rounded-2xl border border-border/50 bg-background shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border/30 px-5 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Clock className="size-4 text-primary" />
                  Riwayat Analisis
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { clearHistory(); setHistory([]); }}
                    className="rounded-lg px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    Hapus Semua
                  </button>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto p-5">
                {history.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">Belum ada riwayat</p>
                ) : (
                  <div className="space-y-2">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => loadHistoryItem(item)}
                        className="cursor-pointer rounded-xl border border-border/30 p-3 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${getScoreColor(item.score)}`}>
                              {item.score}%
                            </span>
                            <span className="text-xs text-muted-foreground">{item.category}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{formatDate(item.timestamp)}</span>
                        </div>
                        <p className="mt-1 truncate text-xs text-muted-foreground">{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

