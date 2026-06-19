"use client";

import { useState, useCallback, useRef } from "react";
import { analyzeText, getReadability } from "@/lib/detector";
import ResultCard from "@/components/ResultCard";
import { HiSparkles, HiClipboardCopy, HiTrash, HiOutlineDocumentText } from "react-icons/hi";
import Link from "next/link";

const sampleText = `Artificial intelligence has revolutionized the way we approach problem-solving in the modern era. It is important to note that AI technologies have fundamentally transformed various industries, from healthcare to finance. The landscape of machine learning continues to evolve at a rapid pace, with groundbreaking innovations emerging on a daily basis. Furthermore, the integration of AI into everyday applications has become increasingly seamless. It is crucial to consider the ethical implications of these advancements. In conclusion, AI represents a paradigm shift that will undoubtedly shape our future in profound ways.`;

export default function AnalyzerPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  const handleAnalyze = useCallback(() => {
    if (!text.trim() || text.trim().length < 20) return;
    setLoading(true);
    setTimeout(() => {
      const res = analyzeText(text);
      setResult(res);
      setLoading(false);
    }, 300);
  }, [text]);

  const handleCopyResult = useCallback(() => {
    if (!result) return;
    const summary = `DeteksiAI - Hasil Analisis\n` +
      `Skor AI: ${result.overallScore}/100\n` +
      `Kategori: ${result.category}\n` +
      `Kata: ${result.stats.words} | Kalimat: ${result.stats.sentences}\n` +
      `Readability: ${result.readability.ease} (${result.readability.score})\n\n`;

    const details = Object.entries(result.details).map(([key, val]) =>
      `${val.label}: ${val.score}/100 - ${val.detail}`
    ).join("\n");

    navigator.clipboard.writeText(summary + details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  const handlePasteSample = useCallback(() => {
    setText(sampleText);
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  const handleClear = useCallback(() => {
    setText("");
    setResult(null);
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  const readability = text.trim().length >= 20 ? getReadability(text) : null;

  function getBarColor(score) {
    if (score >= 60) return "bg-red-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-emerald-500";
  }

  function getCategoryClass(score) {
    if (score >= 60) return "text-red-700 bg-red-100";
    if (score >= 40) return "text-amber-700 bg-amber-100";
    return "text-emerald-700 bg-emerald-100";
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900">
          Analisis Tulisan
        </h1>
        <p className="text-zinc-500">
          Tempelkan teks untuk mendeteksi apakah dibuat oleh AI
        </p>
      </div>

      <div className="mb-6 border border-zinc-200 bg-white">
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">
            <HiOutlineDocumentText size={18} />
            Masukkan Teks
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePasteSample}
              className="rounded px-3 py-1.5 text-xs font-medium text-violet-600 hover:bg-violet-50"
            >
              Contoh Teks
            </button>
            <button
              onClick={handleClear}
              className="rounded px-3 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-100"
            >
              <HiTrash size={14} className="inline" /> Hapus
            </button>
          </div>
        </div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (result && e.target.value !== text) setResult(null);
          }}
          placeholder="Tempelkan artikel atau tulisan di sini (min. 20 karakter)..."
          className="min-h-[200px] w-full resize-y border-0 bg-transparent px-4 py-3 text-sm leading-relaxed text-zinc-800 placeholder-zinc-400 focus:outline-none"
        />
        <div className="flex items-center justify-between border-t border-zinc-100 px-4 py-2">
          <span className={`text-xs ${text.length === 0 ? "text-zinc-400" : text.length < 20 ? "text-red-500" : "text-zinc-500"}`}>
            {text.length.toLocaleString()} karakter | {text.split(/\s+/).filter(Boolean).length} kata
            {text.length > 0 && text.length < 20 && " (min. 20 karakter)"}
            {readability && (
              <span className="ml-3 text-zinc-400">
                Readability: {readability.ease} ({readability.score})
              </span>
            )}
          </span>
          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || text.trim().length < 20 || loading}
            className="inline-flex items-center gap-2 rounded bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Menganalisis...
              </>
            ) : (
              <>
                <HiSparkles size={16} />
                Analisis
              </>
            )}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-violet-200 border-t-violet-600" />
            <p className="text-sm text-zinc-500">Menganalisis teks...</p>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-6">
          <div className="border border-zinc-200 bg-white">
            <div className="border-b border-zinc-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900">
                  Hasil Analisis
                </h2>
                <button
                  onClick={handleCopyResult}
                  className="rounded px-3 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-100"
                >
                  {copied ? "Tersalin!" : <><HiClipboardCopy size={14} className="inline" /> Salin</>}
                </button>
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getCategoryClass(result.overallScore)}`}>
                    {result.category}
                  </span>
                </div>

                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-zinc-700">Skor AI</span>
                  <span className="font-bold text-zinc-800">{result.overallScore}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-100">
                  <div
                    className={`h-full transition-all ${getBarColor(result.overallScore)}`}
                    style={{ width: `${result.overallScore}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-zinc-500">
                  Berdasarkan analisis dari 8 metrik berbeda, teks ini memiliki kemiripan
                  dengan pola tulisan AI sebesar {result.overallScore}%.
                </p>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="border border-zinc-100 bg-zinc-50 p-3 text-center">
                  <p className="text-lg font-bold text-zinc-800">{result.stats.words}</p>
                  <p className="text-xs text-zinc-500">Kata</p>
                </div>
                <div className="border border-zinc-100 bg-zinc-50 p-3 text-center">
                  <p className="text-lg font-bold text-zinc-800">{result.stats.sentences}</p>
                  <p className="text-xs text-zinc-500">Kalimat</p>
                </div>
                <div className="border border-zinc-100 bg-zinc-50 p-3 text-center">
                  <p className="text-lg font-bold text-zinc-800">{result.stats.avgSentenceLength}</p>
                  <p className="text-xs text-zinc-500">{result.stats.sentences === 1 ? "Kata/kalimat" : "Rata-rata kata"}</p>
                </div>
                <div className="border border-zinc-100 bg-zinc-50 p-3 text-center">
                  <p className="text-lg font-bold text-zinc-800">{result.readability.score}</p>
                  <p className="text-xs text-zinc-500">Readability: {result.readability.ease.split(' ')[0]}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-zinc-200 bg-white">
            <div className="border-b border-zinc-100 px-6 py-4">
              <h2 className="text-lg font-bold text-zinc-900">
                Detail Metrik
              </h2>
            </div>
            <div className="grid gap-4 px-6 py-6 sm:grid-cols-2">
              {Object.entries(result.details).map(([key, val]) => (
                <ResultCard
                  key={key}
                  title={val.label}
                  score={val.score}
                  description={val.description}
                  detail={val.detail}
                />
              ))}
            </div>
          </div>

          {result.overallScore >= 40 && (
            <div className="border border-amber-200 bg-amber-50 p-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="mb-1 font-semibold text-amber-800">
                    Ingin diperbaiki?
                  </h3>
                  <p className="text-sm text-amber-600">
                    Gunakan Humanizer untuk mengubah teks ini agar lebih alami.
                  </p>
                </div>
                <Link
                  href="/humanizer"
                  className="inline-flex items-center gap-2 rounded bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  <HiSparkles size={16} />
                  Humanizer
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {!result && !loading && text.trim().length >= 20 && (
        <div className="border border-zinc-200 bg-white p-8 text-center">
          <p className="text-zinc-500">
            Tekan tombol <span className="font-semibold text-violet-600">Analisis</span> untuk memulai
          </p>
        </div>
      )}
    </div>
  );
}
