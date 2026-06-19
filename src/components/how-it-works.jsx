"use client";

import { motion } from "framer-motion";
import { FileText, Search, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const steps = [
  {
    icon: FileText,
    title: "Tempel Tulisan",
    description: "Salin dan tempelkan teks yang ingin Anda analisis.",
    step: "01",
  },
  {
    icon: Search,
    title: "Analisis AI",
    description: "Sistem memeriksa teks menggunakan 8 metrik heuristik.",
    step: "02",
  },
  {
    icon: CheckCircle2,
    title: "Dapatkan Hasil",
    description: "Lihat skor deteksi dan dapatkan versi yang lebih natural.",
    step: "03",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Cara Kerja
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Cukup tiga langkah sederhana untuk mendeteksi dan memperbaiki tulisan AI.
          </p>
        </motion.div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-16 hidden h-0.5 w-[calc(100%-4rem)] -translate-x-1/2 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 md:block" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative"
              >
                <Card className="border-border/50 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="size-7 text-primary" />
                    </div>
                    <div className="mb-1 text-xs font-semibold text-primary">
                      Langkah {step.step}
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
