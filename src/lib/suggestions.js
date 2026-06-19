const AI_PHRASES = [
  "delve into", "it's worth noting", "landscape of", "a myriad of",
  "it is important to", "it is crucial to", "it is essential to",
  "leverage", "synergy", "paradigm", "holistic", "streamline",
  "facilitate", "utilize", "comprehensive", "robust", "innovative",
  "seamless", "optimize", "transformative", "groundbreaking",
  "in conclusion", "furthermore", "moreover", "consequently",
  "tidak dapat dipungkiri", "perlu diketahui", "perlu dicatat",
  "perlu diingat", "penting untuk", "sangat penting untuk",
  "dapat disimpulkan", "sebagaimana kita ketahui",
  "berdasarkan hasil analisis", "dengan kata lain",
  "hal ini disebabkan oleh", "hal ini menunjukkan bahwa",
  "seperti yang telah disebutkan", "seperti yang telah dijelaskan",
  "pada era digital ini", "di era globalisasi", "di era modern ini",
  "pada zaman sekarang", "dalam rangka", "dalam upaya",
  "seiring dengan perkembangan", "pada dasarnya", "pada intinya",
  "secara keseluruhan", "oleh karena itu", "oleh sebab itu",
  "dengan demikian", "maka dari itu", "berperan penting dalam",
  "memegang peranan penting", "sangatlah penting", "sangat diperlukan",
];

const ID_PUNCTUATION_ISSUES = [
  { pattern: /,/g, label: "Koma berlebihan" },
  { pattern: /;/g, label: "Semicolon berlebihan" },
  { pattern: /\(/g, label: "Terlalu banyak tanda kurung" },
  { pattern: /:/g, label: "Tanda titik dua berlebihan" },
];

function getSentences(text) {
  return text.match(/[^.!?]+[.!?]+/g) || [text];
}

function tokenize(text) {
  return text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];
}

function findAIPhrases(sentence) {
  const lower = sentence.toLowerCase();
  const found = [];
  for (const phrase of AI_PHRASES) {
    const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    if (re.test(lower)) {
      found.push(phrase);
    }
  }
  return found;
}

function checkPunctuation(sentence) {
  const issues = [];
  for (const { pattern, label } of ID_PUNCTUATION_ISSUES) {
    const matches = sentence.match(pattern);
    if (matches && matches.length > 2) {
      issues.push({ type: "punctuation", label, count: matches.length });
    }
  }
  return issues;
}

function checkFormality(sentence) {
  const issues = [];
  const words = sentence.split(/\s+/);
  const longWords = words.filter(w => w.length > 10 && /[a-zA-Z]/.test(w));
  if (longWords.length > 0) {
    issues.push({
      type: "formality",
      label: `Kata terlalu formal: "${longWords.slice(0, 3).join('", "')}"`,
    });
  }
  return issues;
}

function estimateSentenceScore(sentence) {
  const phrases = findAIPhrases(sentence);
  const punctIssues = checkPunctuation(sentence);
  const formalIssues = checkFormality(sentence);
  const tokens = tokenize(sentence);
  const wordCount = tokens.length;

  let score = 0;
  if (phrases.length > 0) score += Math.min(40, phrases.length * 15);
  if (punctIssues.length > 0) score += Math.min(15, punctIssues.length * 8);
  if (formalIssues.length > 0) score += 10;
  if (wordCount > 30) score += 10;
  if (wordCount < 3) score = 0;

  const allIssues = [...phrases.map(p => ({ type: "phrase", label: `Frasa AI: "${p}"` })), ...punctIssues, ...formalIssues];
  if (wordCount > 30) allIssues.push({ type: "length", label: "Kalimat terlalu panjang" });
  if (wordCount < 5 && wordCount > 1) allIssues.push({ type: "stub", label: "Kalimat terlalu pendek/kurang konteks" });

  return { score: Math.min(100, Math.round(score)), issues: allIssues, wordCount };
}

function getFormalitySuggestion(sentence) {
  const replacements = {
    "merupakan": "adalah",
    "sehingga": "jadi",
    "sebagaimana": "seperti",
    "sehubungan dengan": "tentang",
    "seiring dengan": "bersama",
    "oleh karena itu": "makanya",
    "dengan demikian": "jadi",
    "maka dari itu": "jadi",
    "berdasarkan": "dari",
    "memerlukan": "butuh",
    "memiliki": "punya",
    "terdapat": "ada",
    "menggunakan": "pake",
    "mengalami": "nurun/naik",
    "melakukan": "ngerjain",
    "merupakan salah satu": "termasuk",
    "tidak dapat dipungkiri": "memang",
    "dapat disimpulkan": "simpelnya",
    "oleh sebab itu": "makanya",
  };
  let result = sentence;
  for (const [formal, casual] of Object.entries(replacements)) {
    const re = new RegExp(formal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    result = result.replace(re, casual);
  }
  return result;
}

export function analyzeSentence(sentence) {
  const cleanSentence = sentence.trim();
  if (!cleanSentence || cleanSentence.length < 5) {
    return { original: cleanSentence, score: 0, issues: [], suggestion: cleanSentence };
  }

  const { score, issues, wordCount } = estimateSentenceScore(cleanSentence);

  if (score < 30) {
    return {
      original: cleanSentence,
      score,
      issues: [],
      suggestion: null,
      wordCount,
    };
  }

  let suggestion = getFormalitySuggestion(cleanSentence);
  if (suggestion === cleanSentence) {
    suggestion = cleanSentence;
  }

  return { original: cleanSentence, score, issues, suggestion, wordCount };
}

export function analyzeSuggestions(text) {
  if (!text || text.trim().length < 20) return [];
  const sentences = getSentences(text);
  return sentences.map(s => analyzeSentence(s)).filter(s => s.score >= 30);
}
