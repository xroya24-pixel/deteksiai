import Link from "next/link";

const footerLinks = {
  Produk: [
    { href: "/analyzer", label: "Analisis" },
    { href: "/humanizer", label: "Humanizer" },
  ],
  Perusahaan: [
    { href: "/about", label: "Tentang" },
    { href: "#", label: "Kontak" },
  ],
  Legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="mb-4 flex items-center gap-2 text-xl font-bold"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                D
              </span>
              DeteksiAI
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Deteksi dan humanisasi tulisan AI secara gratis & 100% privat.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DeteksiAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
