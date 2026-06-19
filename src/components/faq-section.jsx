"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Apakah hasil deteksi akurat?",
    a: "DeteksiAI menggunakan 8 metrik heuristik untuk menganalisis pola tulisan. Hasil bersifat indikatif dengan tingkat akurasi yang baik, namun tidak 100% sempurna. Untuk deteksi yang lebih akurat, kami sarankan menggunakan kombinasi dengan alat lain.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Ya! Semua analisis dilakukan 100% di browser Anda (client-side). Tidak ada teks yang dikirim ke server manapun. Kami tidak menyimpan, melacak, atau membagikan data Anda.",
  },
  {
    q: "Apakah mendukung Bahasa Indonesia?",
    a: "Ya, DeteksiAI dioptimalkan untuk teks berbahasa Indonesia dan Inggris. Metrik kami telah disesuaikan untuk mengenali pola tulisan AI dalam kedua bahasa tersebut.",
  },
  {
    q: "Apakah gratis?",
    a: "Ya, DeteksiAI gratis dan tidak memerlukan API key. Anda bisa langsung menggunakannya tanpa perlu daftar atau login.",
  },
];

export default function FaqSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Pertanyaan Umum
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Jawaban untuk pertanyaan yang sering diajukan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
        >
          <Accordion className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
