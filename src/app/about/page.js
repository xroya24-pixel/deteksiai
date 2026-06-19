import { HiShieldCheck, HiCode, HiChartBar } from "react-icons/hi";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">
          Tentang DeteksiAI
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Deteksi tulisan AI secara gratis & 100% privat
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">Apa itu DeteksiAI?</h2>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            DeteksiAI adalah alat gratis untuk mendeteksi apakah sebuah tulisan dibuat oleh AI atau manusia.
            Kami menggunakan pendekatan heuristik dengan 8 metrik berbeda untuk menganalisis pola tulisan,
            tanpa memerlukan API key atau koneksi ke server manapun.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">Bagaimana Cara Deteksi?</h2>
          <p className="mb-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
            Kami menganalisis teks berdasarkan 8 metrik berikut:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Perplexity", desc: "Mengukur seberapa mudah ditebak kata-kata dalam teks. AI cenderung menggunakan kata yang umum." },
              { label: "Burstiness", desc: "Variasi panjang kalimat. Manusia menulis dengan variasi panjang yang lebih alami." },
              { label: "Keseragaman Kalimat", desc: "AI cenderung menghasilkan kalimat dengan panjang yang seragam." },
              { label: "Keragaman Kata", desc: "Rasio kata unik vs total. AI sering menggunakan kosakata yang lebih berulang." },
              { label: "Frasa AI", desc: "Deteksi frasa klise yang sering muncul di tulisan AI." },
              { label: "Kata Transisi", desc: "AI sering overuse kata seperti 'however', 'furthermore', dll." },
              { label: "Variasi Awal Kalimat", desc: "AI sering memulai kalimat dengan kata yang sama." },
              { label: "Panjang Kata", desc: "AI cenderung menggunakan kata yang lebih panjang dan formal." },
            ].map((m, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <HiChartBar className="mt-0.5 shrink-0 text-violet-500" size={18} />
                <div>
                  <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{m.label}</h4>
                  <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">Privasi</h2>
          <div className="flex items-start gap-3">
            <HiShieldCheck className="mt-0.5 shrink-0 text-emerald-500" size={24} />
            <div>
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                Semua analisis dilakukan 100% di browser Anda (client-side). Tidak ada teks yang dikirim
                ke server manapun. Kami tidak menyimpan, melacak, atau membagikan data Anda.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">Keterbatasan</h2>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            DeteksiAI menggunakan pendekatan heuristik (statistik / pola), bukan AI classifier
            sungguhan. Hasilnya bersifat indikatif dan tidak 100% akurat. Untuk deteksi yang lebih
            akurat, gunakan API berbayar seperti GPTZero atau Originality.ai.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <HiCode className="mx-auto mb-3 text-violet-500" size={24} />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Dibuat dengan Next.js & Tailwind CSS &middot; 100% open source
          </p>
        </section>
      </div>
    </div>
  );
}
