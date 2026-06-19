const STORAGE_KEY = "deteksiai_history";
const MAX_ITEMS = 10;

export function saveHistory(entry) {
  const history = getHistory();
  const newEntry = {
    id: Date.now().toString(36),
    timestamp: Date.now(),
    text: entry.text,
    score: entry.score,
    category: entry.category,
    humanized: entry.humanized || "",
    words: entry.words || 0,
  };
  history.unshift(newEntry);
  if (history.length > MAX_ITEMS) history.pop();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {}
}

export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteHistoryItem(id) {
  const history = getHistory().filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {}
}

export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function formatDate(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return "baru saja";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}
