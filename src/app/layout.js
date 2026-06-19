import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DeteksiAI - Deteksi & Humanisasi Tulisan AI",
  description:
    "Ketahui apakah sebuah tulisan dibuat oleh AI, lalu ubah menjadi lebih alami, profesional, dan mudah dipahami manusia.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-screen overflow-hidden">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
