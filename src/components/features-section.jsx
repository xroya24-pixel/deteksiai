"use client";

import { motion } from "framer-motion";
import { Scan, Sparkles, BarChart3, Languages } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: Scan,
    title: "Deteksi AI",
    description: "Mendeteksi kemungkinan tulisan AI dengan 8 metrik heuristik akurat.",
  },
  {
    icon: Sparkles,
    title: "Humanizer",
    description: "Membuat tulisan lebih natural, seolah ditulis oleh manusia sungguhan.",
  },
  {
    icon: BarChart3,
    title: "Analisis Detail",
    description: "Menjelaskan bagian mana yang terindikasi AI beserta alasannya.",
  },
  {
    icon: Languages,
    title: "Bahasa Indonesia",
    description: "Dioptimalkan untuk teks berbahasa Indonesia dan Inggris.",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function FeaturesSection() {
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
            Mengapa Memilih DeteksiAI?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Alat deteksi dan humanisasi tulisan AI yang cepat, akurat, dan 100% gratis.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={item}>
                <Card className="group h-full border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
