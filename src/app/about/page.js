export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="mb-6 text-center text-3xl font-bold text-zinc-900">
        Tentang DeteksiAI
      </h1>
      <div className="space-y-6">
        <section className="border border-zinc-200 p-5">
          <h2 className="mb-2 text-lg font-bold text-zinc-900">Apa itu DeteksiAI?</h2>
          <p className="text-sm leading-relaxed text-zinc-600">
            DeteksiAI adalah alat gratis untuk mendeteksi apakah sebuah tulisan dibuat oleh AI atau manusia.
            Kami menggunakan 8 metrik heuristik untuk menganalisis pola tulisan, tanpa memerlukan API key
            atau koneksi ke server.
          </p>
        </section>
        <section className="border border-zinc-200 p-5">
          <h2 className="mb-2 text-lg font-bold text-zinc-900">Privasi</h2>
          <p className="text-sm leading-relaxed text-zinc-600">
            Semua analisis dilakukan 100% di browser Anda (client-side). Tidak ada data yang dikirim
            ke server manapun.
          </p>
        </section>
        <section className="border border-zinc-200 p-5">
          <h2 className="mb-2 text-lg font-bold text-zinc-900">Keterbatasan</h2>
          <p className="text-sm leading-relaxed text-zinc-600">
            DeteksiAI menggunakan pendekatan heuristik (statistik / pola), bukan AI classifier sungguhan.
            Hasil bersifat indikatif dan tidak 100% akurat.
          </p>
        </section>
      </div>
    </div>
  );
}
