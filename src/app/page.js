import Link from "next/link";
import { HiSparkles, HiPencilAlt } from "react-icons/hi";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-32">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
        Deteksi & Perbaiki
        <span className="block text-violet-600">Tulisan AI</span>
      </h1>
      <p className="mx-auto mb-8 max-w-xl text-lg text-zinc-500">
        Ketahui apakah sebuah tulisan dibuat oleh AI, lalu dapatkan saran
        perbaikan agar terdengar lebih alami dan manusiawi.
      </p>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/analyzer"
          className="inline-flex items-center gap-2 rounded bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700"
        >
          <HiSparkles size={18} />
          Analisis Tulisan
        </Link>
        <Link
          href="/humanizer"
          className="inline-flex items-center gap-2 rounded border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
        >
          <HiPencilAlt size={18} />
          Humanizer
        </Link>
      </div>
    </div>
  );
}
