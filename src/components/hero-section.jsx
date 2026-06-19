"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pt-36 lg:px-8">
      {/* Background blur */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -right-40 top-20 size-80 rounded-full bg-secondary/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 size-60 -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground"
            >
              <Sparkles className="size-4 text-primary" />
              AI Detector & Humanizer Indonesia
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              Deteksi & Humanisasi
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Tulisan AI
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground lg:mx-0"
            >
              Ketahui apakah sebuah tulisan dibuat oleh AI, lalu ubah menjadi
              lebih alami, profesional, dan mudah dipahami manusia.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/analyzer">
                  <Sparkles className="size-5" />
                  Mulai Analisis
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <Link href="/humanizer">
                  <Play className="size-5" />
                  Lihat Demo
                </Link>
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>Dipercaya ratusan pengguna Indonesia</span>
            </motion.div>
          </div>

          {/* Right: Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <Card className="relative overflow-hidden border-border/50 bg-background/60 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                <CardContent className="p-0">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Hasil Analisis</h3>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      Real-time
                    </span>
                  </div>

                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-red-500/10 p-4 text-center">
                      <p className="text-2xl font-bold text-red-500">87%</p>
                      <p className="text-xs text-muted-foreground">AI Score</p>
                    </div>
                    <div className="rounded-lg bg-emerald-500/10 p-4 text-center">
                      <p className="text-2xl font-bold text-emerald-500">13%</p>
                      <p className="text-xs text-muted-foreground">Human Score</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                      <span>Kemungkinan AI</span>
                      <span>87%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-700" />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      Rekomendasi:
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "Variasikan struktur kalimat",
                        "Tambahkan opini pribadi",
                        "Kurangi repetisi kata",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500/20">
                            <svg
                              className="size-3 text-emerald-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
