export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} DeteksiAI. Dibuat dengan &hearts;
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Tidak memerlukan API key &mdash; 100% client-side
          </p>
        </div>
      </div>
    </footer>
  );
}
