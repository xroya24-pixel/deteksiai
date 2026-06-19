"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    name: "Rina Amelia",
    role: "Mahasiswa",
    content:
      "Sangat membantu untuk mengecek tugas sebelum dikumpulkan. Hasil deteksinya akurat dan humanizer-nya bener-bener berguna.",
    rating: 5,
  },
  {
    name: "Bambang Surya",
    role: "Content Writer",
    content:
      "Humanizer bikin tulisan AI jadi lebih nyaman dibaca. Cocok buat yang sering pakai AI buat draft konten.",
    rating: 5,
  },
  {
    name: "Dewi Lestari",
    role: "Dosen",
    content:
      "Alat yang bagus buat ngecek apakah mahasiswa pakai AI. Metriknya detail dan jelas. Sangat direkomendasikan!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Apa Kata Pengguna?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Ribuan pengguna telah merasakan manfaat DeteksiAI.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="h-full border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className="mb-3 flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
