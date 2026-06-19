const AI_PHRASES = [
  "delve into", "it's worth noting", "in the realm of", "landscape of",
  "a myriad of", "in today's digital age", "in an increasingly",
  "the intersection of", "at its core", "it is important to",
  "it is crucial to", "it is essential to", "when it comes to",
  "in the context of", "as we navigate", "in the ever-evolving",
  "foster a", "fostering a", "transformative", "revolutionize",
  "game-changer", "cutting-edge", "state-of-the-art", "groundbreaking",
  "leverage", "synergy", "paradigm", "holistic", "streamline",
  "facilitate", "utilize", "implement", "comprehensive", "robust",
  "scalable", "dynamic", "innovative", "seamless", "optimize",
  "accelerate", "amplify", "elevate", "unlock", "empower",
  "navigate", "navigating", "thriving", "flourishing",
  "tapestry", "testament", "arguably", "undoubtedly",
  "in essence", "in summary", "to summarize", "notably",
  "significantly", "particularly", "fundamentally",
  "a deep dive", "deep dive into", "unpack the",
  "the power of", "the future of", "the role of",
  "as of my last", "as an AI", "I don't have access",
  "my knowledge cutoff", "I cannot provide",
  "there are several", "there are many", "there are various",
  "one such", "such as", "including but not limited to",
  "in order to", "due to the fact that", "in spite of",
  "in the event that", "on a daily basis", "a number of",
  "the majority of", "the fact that", "the extent to which",
  "the degree to which", "the way in which",
  "not only... but also", "both... and",
  "as well as", "in addition to", "furthermore",
  "moreover", "consequently", "additionally",
  "it can be argued", "it could be argued", "it may be",
  "it might be", "it is possible that", "it is likely that",
  "this suggests that", "this indicates that", "this implies that",
  "this highlights", "this underscores", "this emphasizes",
  "in conclusion", "to conclude", "ultimately",
  "overall", "in general", "generally speaking",
  "on the other hand", "on the contrary", "in contrast",
  "conversely", "alternatively",
  "in other words", "that is to say", "to put it simply",
  "put simply", "simply put",
  "having said that", "that being said", "with that in mind",
  "be that as it may", "nonetheless", "nevertheless",
  "notwithstanding", "regardless",
  "first and foremost", "last but not least",
  "in the first place", "in the second place",
  "additionally", "furthermore", "moreover",
  "by the same token", "in the same vein",
  "along the same lines", "in a similar vein",
  "tidak dapat dipungkiri", "perlu diketahui", "perlu dicatat",
  "perlu diingat", "penting untuk", "sangat penting untuk",
  "dapat disimpulkan", "sebagaimana kita ketahui",
  "berdasarkan hasil analisis", "berdasarkan hasil penelitian",
  "dengan kata lain", "hal ini disebabkan oleh",
  "hal ini menunjukkan bahwa", "hal ini berarti bahwa",
  "hal ini mengindikasikan bahwa", "hal ini memperlihatkan bahwa",
  "dari hasil di atas", "berdasarkan uraian di atas",
  "seperti yang telah disebutkan", "seperti yang telah dijelaskan",
  "seperti yang kita ketahui", "seperti yang kita lihat",
  "tidak terkecuali", "pada era digital ini",
  "di era globalisasi", "di era modern ini",
  "pada zaman sekarang", "di masa sekarang",
  "dalam rangka", "dalam upaya", "dalam hal ini",
  "dalam konteks ini", "dalam perkembangannya",
  "seiring dengan perkembangan", "seiring berjalannya waktu",
  "tidak jarang", "seringkali", "pada umumnya",
  "pada dasarnya", "pada hakikatnya", "pada intinya",
  "secara keseluruhan", "secara umum", "secara khusus",
  "secara tidak langsung", "secara langsung",
  "merupakan salah satu", "merupakan bagian dari",
  "berbagai macam", "berbagai jenis", "berbagai bentuk",
  "sejumlah", "beberapa", "banyak hal",
  "salah satunya adalah", "salah satu contohnya",
  "oleh karena itu", "oleh sebab itu", "dengan demikian",
  "maka dari itu", "dari sini dapat dilihat",
  "dari penjelasan di atas", "berdasarkan pemaparan di atas",
  "terlihat bahwa", "terbukti bahwa", "terbukti bahwa",
  "telah banyak penelitian", "telah banyak studi",
  "menurut para ahli", "menurut penelitian terdahulu",
  "dalam dunia pendidikan", "dalam dunia kesehatan",
  "dalam kehidupan sehari-hari", "di kehidupan sehari-hari",
  "memberikan dampak yang signifikan",
  "berperan penting dalam", "memegang peranan penting",
  "mengalami peningkatan yang signifikan",
  "mengalami perkembangan yang pesat",
  "menjadi perhatian utama", "menjadi fokus utama",
  "sangatlah penting", "sangat diperlukan", "perlu adanya",
];

const DIRECTION_WORDS = [
  "above", "below", "earlier", "later", "previously",
  "subsequently", "thereafter", "herein", "therein",
  "hereby", "thereby", "herewith", "whereby",
  "aforementioned", "aforesaid", "foregoing",
];

function tokenize(text) {
  return text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];
}

function getSentences(text) {
  return text.split(/[.!?]+/).filter(s => s.trim().length > 0);
}

function getPhraseDensity(text) {
  const lower = text.toLowerCase();
  let count = 0;
  for (const phrase of AI_PHRASES) {
    const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = lower.match(re);
    if (matches) count += matches.length;
  }
  const words = tokenize(text);
  return words.length > 0 ? (count / words.length) * 100 : 0;
}

function getPerplexityScore(text) {
  const words = tokenize(text);
  if (words.length < 5) return 50;

  const wordFreq = {};
  for (const w of words) wordFreq[w] = (wordFreq[w] || 0) + 1;

  const totalWords = words.length;
  let logProbSum = 0;
  let unkCount = 0;

  for (let i = 0; i < words.length; i++) {
    const context = i > 0 ? words[i - 1] : null;
    const word = words[i];

    let prob;
    if (context && wordFreq[context] > 1) {
      const bigramCount = words.filter((w, idx) => idx > 0 && words[idx - 1] === context && w === word).length;
      prob = bigramCount > 0 ? bigramCount / (wordFreq[context] - 1) : wordFreq[word] / totalWords;
    } else {
      prob = wordFreq[word] / totalWords;
    }

    prob = Math.max(prob, 0.0001);
    if (prob < 0.001) unkCount++;
    logProbSum += Math.log(prob);
  }

  const avgLogProb = logProbSum / words.length;
  const perplexity = Math.exp(-avgLogProb);

  const unkRatio = unkCount / words.length;
  const noveltyBonus = unkRatio * 30;

  const rawScore = Math.min(100, Math.max(0, (perplexity / 500) * 100 + noveltyBonus));
  return Math.round(rawScore * 10) / 10;
}

function getBurstinessScore(text) {
  const sentences = getSentences(text);
  if (sentences.length < 3) return 0;

  const lengths = sentences.map(s => tokenize(s).length);
  const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((sum, l) => sum + Math.pow(l - avg, 2), 0) / lengths.length;
  const stdDev = Math.sqrt(variance);

  const cv = avg > 0 ? stdDev / avg : 0;

  if (cv > 0.9) return 10;
  if (cv > 0.8) return 20;
  if (cv > 0.7) return 35;
  if (cv > 0.6) return 50;
  if (cv > 0.5) return 65;
  if (cv > 0.4) return 75;
  if (cv > 0.3) return 85;
  return 95;
}

function getSentenceUniformityScore(text) {
  const sentences = getSentences(text);
  if (sentences.length < 3) return 0;

  const lengths = sentences.map(s => tokenize(s).length);
  const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((sum, l) => sum + Math.pow(l - avg, 2), 0) / lengths.length;

  const perfectUniformity = variance < 2 ? 95 : variance < 5 ? 80 : variance < 10 ? 65 : variance < 20 ? 45 : 25;

  const avgLenScore = avg > 25 ? 60 : avg > 20 ? 50 : avg > 15 ? 40 : avg > 10 ? 50 : 70;

  const avgLen = Math.round(avg * 10) / 10;
  const stdDev = Math.round(Math.sqrt(variance) * 10) / 10;

  return {
    score: Math.round((perfectUniformity + avgLenScore) / 2),
    avgLength: avgLen,
    stdDev: stdDev,
  };
}

function getLexicalDiversityScore(text) {
  const words = tokenize(text);
  if (words.length < 10) return { score: 50, ttr: 0 };

  const unique = new Set(words);
  const ttr = unique.size / words.length;

  let score;
  if (ttr > 0.75) score = 15;
  else if (ttr > 0.65) score = 30;
  else if (ttr > 0.55) score = 50;
  else if (ttr > 0.45) score = 65;
  else if (ttr > 0.35) score = 80;
  else score = 90;

  return { score, ttr: Math.round(ttr * 100) / 100 };
}

function getTransitionWordScore(text) {
  const transitions = [
    "however", "therefore", "furthermore", "moreover", "consequently",
    "additionally", "nevertheless", "nonetheless", "conversely",
    "alternatively", "accordingly", "subsequently", "hence", "thus",
    "thereby", "indeed", "notably", "specifically", "particularly",
    "importantly", "significantly", "primarily", "essentially",
    "ultimately", "overall", "firstly", "secondly", "thirdly",
    "finally", "lastly", "meanwhile", "furthermore", "besides",
    "likewise", "similarly", "otherwise", "instead", "rather",
    "oleh karena itu", "oleh sebab itu", "dengan demikian",
    "maka dari itu", "oleh karenanya", "sementara itu",
    "selain itu", "di samping itu", "tidak hanya itu",
    "lebih lanjut", "lebih jauh", "dalam hal ini",
    "pada sisi lain", "di satu sisi", "di sisi lain",
    "pertama", "kedua", "ketiga", "pertama-tama",
    "pertama sekali", "yang pertama", "yang kedua",
    "selanjutnya", "berikutnya", "kemudian", "lalu",
    "akhirnya", "terakhir", "sebagai kesimpulan",
    "kesimpulannya", "intinya", "pada akhirnya",
    "pada intinya", "secara keseluruhan",
    "dengan kata lain", "dengan demikian",
    "meskipun demikian", "walaupun demikian",
    "namun demikian", "akan tetapi", "namun", "tetapi",
    "tapi", "sayangnya", "justru", "sebaliknya",
    "di samping itu", "lagi pula", "apalagi", "tambahan pula",
  ];

  const words = tokenize(text);
  if (words.length < 20) return 0;

  const totalTransitions = words.filter(w => transitions.includes(w)).length;
  const ratio = totalTransitions / words.length;

  if (ratio > 0.15) return 90;
  if (ratio > 0.12) return 80;
  if (ratio > 0.10) return 70;
  if (ratio > 0.08) return 55;
  if (ratio > 0.06) return 40;
  if (ratio > 0.04) return 25;
  return 10;
}

function getRepetitionScore(text) {
  const words = tokenize(text);
  if (words.length < 20) return 0;

  const triGrams = {};
  let totalTriGrams = 0;

  for (let i = 0; i < words.length - 2; i++) {
    const tg = words.slice(i, i + 3).join(' ');
    triGrams[tg] = (triGrams[tg] || 0) + 1;
    totalTriGrams++;
  }

  let repeats = 0;
  for (const [gram, count] of Object.entries(triGrams)) {
    if (count > 1) repeats += count - 1;
  }

  const ratio = totalTriGrams > 0 ? repeats / totalTriGrams : 0;
  return Math.round(Math.min(100, ratio * 200));
}

function getSentenceStartVariety(text) {
  const sentences = getSentences(text);
  if (sentences.length < 5) return 0;

  const starters = sentences.map(s => {
    const tokens = tokenize(s);
    return tokens.length > 0 ? tokens[0] : '';
  }).filter(Boolean);

  const uniqueStarters = new Set(starters);
  const variety = uniqueStarters.size / starters.length;

  if (variety > 0.8) return 10;
  if (variety > 0.7) return 25;
  if (variety > 0.6) return 40;
  if (variety > 0.5) return 55;
  if (variety > 0.4) return 70;
  if (variety > 0.3) return 80;
  return 90;
}

function getAvgWordLengthScore(text) {
  const words = tokenize(text);
  if (words.length < 5) return 0;

  const avgLen = words.reduce((sum, w) => sum + w.length, 0) / words.length;

  if (avgLen > 6) return 75;
  if (avgLen > 5.5) return 60;
  if (avgLen > 5) return 45;
  if (avgLen > 4.5) return 30;
  return 15;
}

function getFleschReadingEase(text) {
  const sentences = getSentences(text);
  if (sentences.length < 2) return { score: 50, ease: "Rata-rata" };

  const words = tokenize(text);
  const syllables = words.reduce((sum, w) => {
    let syl = 0;
    const word = w.toLowerCase();
    for (const vowel of ['a', 'e', 'i', 'o', 'u', 'y']) {
      syl += (word.match(new RegExp(vowel, 'g')) || []).length;
    }
    syl = Math.max(1, syl);
    return sum + syl;
  }, 0);

  const wordCount = words.length;
  const sentenceCount = sentences.length;

  const score = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount);
  const clampedScore = Math.max(0, Math.min(100, score));

  let ease;
  if (clampedScore > 90) ease = "Sangat Mudah";
  else if (clampedScore > 80) ease = "Mudah";
  else if (clampedScore > 70) ease = "Cukup Mudah";
  else if (clampedScore > 60) ease = "Standar";
  else if (clampedScore > 50) ease = "Cukup Sulit";
  else if (clampedScore > 30) ease = "Sulit";
  else ease = "Sangat Sulit";

  return { score: Math.round(clampedScore), ease, readabilityScore: clampedScore };
}

export function getReadability(text) {
  return getFleschReadingEase(text);
}

export function analyzeText(text) {
  if (!text || text.trim().length < 20) {
    return {
      overallScore: 0,
      needsMoreText: true,
      details: {},
      readability: { score: 50, ease: "Rata-rata" },
    };
  }

  const perplexity = getPerplexityScore(text);
  const burstiness = getBurstinessScore(text);
  const uniformity = getSentenceUniformityScore(text);
  const lexicalDiversity = getLexicalDiversityScore(text);
  const phraseDensity = getPhraseDensity(text);
  const transitionScore = getTransitionWordScore(text);
  const repetitionScore = getRepetitionScore(text);
  const varietyScore = getSentenceStartVariety(text);
  const avgWordLenScore = getAvgWordLengthScore(text);
  const readability = getFleschReadingEase(text);

  const phraseScore = Math.min(100, phraseDensity * 5);

  const weights = {
    perplexity: 0.20,
    uniformity: 0.15,
    lexicalDiversity: 0.15,
    phraseScore: 0.15,
    transitionScore: 0.10,
    repetitionScore: 0.08,
    varietyScore: 0.07,
    avgWordLenScore: 0.05,
    burstiness: 0.05,
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const overallScore = Math.round(
    ((perplexity * weights.perplexity) +
    (uniformity.score * weights.uniformity) +
    (lexicalDiversity.score * weights.lexicalDiversity) +
    (phraseScore * weights.phraseScore) +
    (transitionScore * weights.transitionScore) +
    (repetitionScore * weights.repetitionScore) +
    (varietyScore * weights.varietyScore) +
    (avgWordLenScore * weights.avgWordLenScore) +
    (burstiness * weights.burstiness)) / totalWeight
  );

  const category =
    overallScore >= 80 ? "Kemungkinan Besar AI" :
    overallScore >= 60 ? "Kemungkinan AI" :
    overallScore >= 40 ? "Ragu-ragu" :
    overallScore >= 20 ? "Kemungkinan Manusia" :
    "Kemungkinan Besar Manusia";

  const sentenceData = getSentences(text);
  const wordCount = tokenize(text).length;

  return {
    overallScore,
    category,
    needsMoreText: false,
    details: {
      perplexity: {
        score: perplexity,
        label: "Perplexity (Variasi Kata)",
        description: "Mengukur seberapa 'terprediksi' teks. AI cenderung pakai kata yang umum dan mudah ditebak.",
        detail: perplexity < 30 ? "Rendah — sangat khas AI" : perplexity < 50 ? "Cukup rendah — agak khas AI" : perplexity < 70 ? "Sedang" : "Tinggi — khas tulisan manusia",
        color: perplexity > 60 ? "green" : perplexity > 40 ? "yellow" : "red",
      },
      uniformity: {
        score: uniformity.score,
        label: "Keseragaman Kalimat",
        description: "AI cenderung menghasilkan kalimat dengan panjang yang seragam. Manusia bervariasi.",
        detail: `Std Dev: ${uniformity.stdDev} kata, Rata-rata: ${uniformity.avgLength} kata`,
        color: uniformity.score < 40 ? "green" : uniformity.score < 65 ? "yellow" : "red",
      },
      lexicalDiversity: {
        score: lexicalDiversity.score,
        label: "Keragaman Kata",
        description: "Rasio kata unik vs total kata. TTR: ${lexicalDiversity.ttr}",
        detail: lexicalDiversity.ttr > 0.65 ? "Tinggi — variatif" : lexicalDiversity.ttr > 0.45 ? "Sedang" : "Rendah — cenderung repetitif",
        color: lexicalDiversity.score < 40 ? "green" : lexicalDiversity.score < 70 ? "yellow" : "red",
      },
      phraseDensity: {
        score: phraseScore,
        label: "Frasa AI",
        description: "Deteksi frasa klise AI (Indonesia & Inggris) seperti 'delve into', 'tidak dapat dipungkiri', dll.",
        detail: `${phraseDensity.toFixed(1)}% dari total kata adalah frasa AI`,
        color: phraseScore < 30 ? "green" : phraseScore < 60 ? "yellow" : "red",
      },
      transitionScore: {
        score: transitionScore,
        label: "Kata Transisi",
        description: "Frekuensi kata transisi (however, oleh karena itu, selain itu, dll). AI sering overuse.",
        detail: transitionScore < 30 ? "Alami" : transitionScore < 60 ? "Cukup" : "Berlebihan — khas AI",
        color: transitionScore < 30 ? "green" : transitionScore < 60 ? "yellow" : "red",
      },
      repetition: {
        score: repetitionScore,
        label: "Pengulangan",
        description: "Mendeteksi pola frasa yang berulang. AI sering mengulang struktur yang sama.",
        detail: repetitionScore < 30 ? "Rendah" : repetitionScore < 60 ? "Sedang" : "Tinggi",
        color: repetitionScore < 30 ? "green" : repetitionScore < 60 ? "yellow" : "red",
      },
      variety: {
        score: varietyScore,
        label: "Variasi Awal Kalimat",
        description: "AI sering memulai kalimat dengan kata yang itu-itu saja.",
        detail: varietyScore < 30 ? "Variatif" : varietyScore < 60 ? "Cukup" : "Monoton",
        color: varietyScore < 30 ? "green" : varietyScore < 60 ? "yellow" : "red",
      },
      wordLength: {
        score: avgWordLenScore,
        label: "Panjang Kata",
        description: "AI cenderung menggunakan kata-kata yang lebih panjang dan formal.",
        detail: avgWordLenScore < 30 ? "Alami" : avgWordLenScore < 60 ? "Cukup" : "Cenderung formal",
        color: avgWordLenScore < 30 ? "green" : avgWordLenScore < 60 ? "yellow" : "red",
      },
    },
    readability,
    stats: {
      words: wordCount,
      sentences: sentenceData.length,
      chars: text.length,
      avgSentenceLength: sentenceData.length > 0 ? Math.round(wordCount / sentenceData.length * 10) / 10 : 0,
    },
  };
}
