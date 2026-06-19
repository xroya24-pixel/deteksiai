"use client";

import { useState, useCallback, useRef } from "react";
import { analyzeText } from "@/lib/detector";
import { humanizeText, getHumanizerStats } from "@/lib/humanizer";
import {
  HiSparkles,
  HiClipboardCopy,
  HiClipboardList,
  HiTrash,
  HiOutlineDocumentText,
  HiCheckCircle,
  HiArrowRight,
  HiExclamation,
} from "react-icons/hi";

const sampleText = `Artificial intelligence has revolutionized the way we approach problem-solving in the modern era. It is important to note that AI technologies have fundamentally transformed various industries, from healthcare to finance. The landscape of machine learning continues to evolve at a rapid pace, with groundbreaking innovations emerging on a daily basis. Furthermore, the integration of AI into everyday applications has become increasingly seamless. It is crucial to consider the ethical implications of these advancements. In conclusion, AI represents a paradigm shift that will undoubtedly shape our future in profound ways.`;

function countWords(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function countChars(text) {
  return text.length;
}

export default function HumanizerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const handleHumanize = useCallback(() => {
    if (!input.trim() || input.trim().length < 10) return;
    setLoading(true);
    setTimeout(() => {
      const result = humanizeText(input);
      const s = getHumanizerStats(input, result);
      setOutput(result);
      setStats(s);
      setLoading(false);
    }, 300);
  }, [input]);

  const handleCopy = useCallback((text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handlePasteSample = useCallback(() => {
    setInput(sampleText);
    setOutput("");
    setStats(null);
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setStats(null);
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const analysis = input.trim().length >= 20 ? analyzeText(input) : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">
          Humanizer
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Ubah tulisan yang kaku dan khas AI menjadi lebih alami
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <HiOutlineDocumentText size={18} />
            Teks Asli
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePasteSample}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-violet-600 transition-colors hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-900/20"
            >
              Contoh Teks
            </button>
            <button
              onClick={handleClear}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              <HiTrash size={14} className="inline" /> Hapus
            </button>
          </div>
        </div>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (output && e.target.value !== input) {
              setOutput("");
              setStats(null);
            }
          }}
          placeholder="Tempelkan tulisan yang ingin dibuat lebih natural..."
          className="min-h-[200px] w-full resize-y border-0 bg-transparent px-4 py-3 text-sm leading-relaxed text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-0 dark:text-zinc-200 dark:placeholder-zinc-500"
        />
        <div className="flex items-center justify-between border-t border-zinc-100 px-4 py-2 dark:border-zinc-800">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {input.length.toLocaleString()} karakter | {countWords(input)} kata
          </span>
          <button
            onClick={handleHumanize}
            disabled={!input.trim() || input.trim().length < 10 || loading}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Memproses...
              </>
            ) : (
              <>
                <HiSparkles size={16} />
                Humanize
              </>
            )}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-violet-200 border-t-violet-600" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Memproses teks...</p>
          </div>
        </div>
      )}

      {output && !loading && (
        <div className="mt-6 space-y-6">
          {analysis && (
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="border-b border-zinc-100 px-6 py-3 dark:border-zinc-800">
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Deteksi Awal
                </h3>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    analysis.overallScore >= 60
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      : analysis.overallScore >= 40
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                  }`}>
                    <HiExclamation size={14} />
                    Skor AI: {analysis.overallScore}% - {analysis.category}
                  </div>
                  <span className="text-xs text-zinc-400">
                    Setelah di-humanize, skor biasanya turun 20-40%
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <HiCheckCircle size={18} className="text-emerald-500" />
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Hasil Humanizer
                </h2>
              </div>
              <button
                onClick={() => handleCopy(output)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                {copied ? "Tersalin!" : <><HiClipboardCopy size={14} className="inline" /> Salin</>}
              </button>
            </div>

            <div className="px-6 py-4">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                {output}
              </p>
            </div>

            {stats && (
              <div className="border-t border-zinc-100 px-6 py-4 dark:border-zinc-800">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-center dark:border-zinc-800 dark:bg-zinc-800/50">
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      -{stats.phrasesChanged}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Frasa AI diubah</p>
                  </div>
                  <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-center dark:border-zinc-800 dark:bg-zinc-800/50">
                    <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                      {countWords(output)}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Kata hasil</p>
                  </div>
                  <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-center dark:border-zinc-800 dark:bg-zinc-800/50">
                    <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                      {countChars(output).toLocaleString()}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Karakter</p>
                  </div>
                  <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-center dark:border-zinc-800 dark:bg-zinc-800/50">
                    <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
                      {stats.sentenceChanges > 0 ? `+${stats.sentenceChanges}` : stats.sentenceChanges}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Perubahan kalimat</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => handleCopy(input)}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <HiClipboardList size={16} />
              Salin Teks Asli
            </button>
            <button
              onClick={() => {
                setInput(output);
                setOutput("");
                setStats(null);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <HiArrowRight size={16} />
              Gunakan Hasil
            </button>
          </div>
        </div>
      )}

      {!output && !loading && input.trim().length > 0 && input.trim().length < 10 && (
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Minimal 10 karakter untuk diproses
          </p>
        </div>
      )}

      {!output && !loading && input.trim().length >= 10 && (
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Tekan tombol <span className="font-semibold text-violet-600 dark:text-violet-400">Humanize</span> untuk memproses
          </p>
        </div>
      )}

      <div className="mt-12">
        <h3 className="mb-4 text-center text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          APA YANG DIUBAH?
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h4 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">Frasa AI Diganti</h4>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              "Utilize" &rarr; "use", "leverage" &rarr; "manfaatkan", dll.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h4 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">Variasi Kalimat</h4>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Memecah kalimat panjang & menambah variasi awalan kalimat.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h4 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">Kontraksi</h4>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              "it is" &rarr; "it's", "cannot" &rarr; "can't", lebih natural.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
