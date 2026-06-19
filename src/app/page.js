import Link from "next/link";
import { HiSparkles, HiShieldCheck, HiPencilAlt } from "react-icons/hi";

const features = [
  {
    icon: HiSparkles,
    title: "Deteksi AI",
    desc: "Analisis teks dengan 8 metrik berbeda untuk mendeteksi apakah tulisan dibuat oleh AI atau manusia.",
  },
  {
    icon: HiPencilAlt,
    title: "Humanizer",
    desc: "Ubah tulisan yang kaku dan khas AI menjadi lebih alami seperti tulisan manusia.",
  },
  {
    icon: HiShieldCheck,
    title: "100% Privasi",
    desc: "Semua analisis dilakukan di browser Anda. Tidak ada data yang dikirim ke server manapun.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <section className="mb-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-200 dark:shadow-violet-900/30">
          <span className="text-2xl font-bold text-white">D</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Deteksi & Perbaiki
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
            Tulisan AI
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
          Ketahui apakah sebuah artikel atau tulisan dibuat oleh AI, lalu dapatkan saran
          perbaikan agar terdengar lebih alami dan manusiawi.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/analyzer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition-all hover:scale-105 hover:shadow-xl dark:shadow-violet-900/30"
          >
            <HiSparkles size={18} />
            Analisis Tulisan
          </Link>
          <Link
            href="/humanizer"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            <HiPencilAlt size={18} />
            Humanizer
          </Link>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="mb-8 text-center text-2xl font-bold text-zinc-900 dark:text-white">
          Cara Kerja
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-300">
              1
            </div>
            <h3 className="mb-2 font-semibold text-zinc-800 dark:text-zinc-200">Paste Teks</h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Tempelkan artikel atau tulisan yang ingin Anda analisis.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-300">
              2
            </div>
            <h3 className="mb-2 font-semibold text-zinc-800 dark:text-zinc-200">Analisis</h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              8 metrik heuristik akan memeriksa pola khas AI vs manusia.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-violet-600 dark:bg-violet-900/30 dark:text-violet-300">
              3
            </div>
            <h3 className="mb-2 font-semibold text-zinc-800 dark:text-zinc-200">Hasil + Perbaikan</h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Lihat skor deteksi dan dapatkan versi yang lebih natural.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-zinc-900 dark:text-white">
          Fitur
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300">
                  <Icon size={20} />
                </div>
                <h3 className="mb-1 font-semibold text-zinc-800 dark:text-zinc-200">{f.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
