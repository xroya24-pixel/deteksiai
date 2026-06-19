const AI_PHRASE_REPLACEMENTS = [
  { from: /delve into/gi, to: "explore" },
  { from: /delve deeper into/gi, to: "look deeper into" },
  { from: /it's worth noting that/gi, to: "interestingly" },
  { from: /it is worth noting that/gi, to: "interestingly" },
  { from: /it is important to note that/gi, to: "keep in mind that" },
  { from: /it is crucial to/gi, to: "we need to" },
  { from: /it is essential to/gi, to: "it's important to" },
  { from: /in the realm of/gi, to: "in" },
  { from: /the landscape of/gi, to: "" },
  { from: /in the landscape of/gi, to: "in" },
  { from: /a myriad of/gi, to: "many" },
  { from: /myriad of/gi, to: "many" },
  { from: /in today's digital age/gi, to: "today" },
  { from: /in an increasingly/gi, to: "in a" },
  { from: /the intersection of/gi, to: "how" },
  { from: /at its core/gi, to: "basically" },
  { from: /when it comes to/gi, to: "for" },
  { from: /in the context of/gi, to: "within" },
  { from: /as we navigate/gi, to: "as we deal with" },
  { from: /in the ever-evolving/gi, to: "in the changing" },
  { from: /transformative/gi, to: "game-changing" },
  { from: /groundbreaking/gi, to: "impressive" },
  { from: /cutting-edge/gi, to: "modern" },
  { from: /state-of-the-art/gi, to: "top" },
  { from: /leverage/gi, to: "use" },
  { from: /synergy/gi, to: "teamwork" },
  { from: /paradigm/gi, to: "model" },
  { from: /holistic/gi, to: "big-picture" },
  { from: /streamline/gi, to: "simplify" },
  { from: /facilitate/gi, to: "help" },
  { from: /utilize/gi, to: "use" },
  { from: /implement/gi, to: "put in place" },
  { from: /comprehensive/gi, to: "thorough" },
  { from: /robust/gi, to: "strong" },
  { from: /scalable/gi, to: "growable" },
  { from: /dynamic/gi, to: "lively" },
  { from: /innovative/gi, to: "new" },
  { from: /seamless/gi, to: "smooth" },
  { from: /optimize/gi, to: "improve" },
  { from: /accelerate/gi, to: "speed up" },
  { from: /amplify/gi, to: "boost" },
  { from: /elevate/gi, to: "raise" },
  { from: /unlock/gi, to: "tap into" },
  { from: /empower/gi, to: "help" },
  { from: /navigate (the|this|these)/gi, to: "handle $1" },
  { from: /foster a/gi, to: "build a" },
  { from: /fostering a/gi, to: "building a" },
  { from: /a testament to/gi, to: "proof of" },
  { from: /arguably/gi, to: "probably" },
  { from: /undoubtedly/gi, to: "clearly" },
  { from: /in essence/gi, to: "basically" },
  { from: /in summary/gi, to: "in short" },
  { from: /to summarize/gi, to: "to wrap up" },
  { from: /notably/gi, to: "in particular" },
  { from: /significantly/gi, to: "a lot" },
  { from: /fundamentally/gi, to: "at heart" },
  { from: /a deep dive into/gi, to: "a close look at" },
  { from: /deep dive into/gi, to: "close look at" },
  { from: /unpack the/gi, to: "break down the" },
  { from: /the power of/gi, to: "what" },
  { from: /the future of/gi, to: "where" },
  { from: /the role of/gi, to: "how" },
  { from: /in order to/gi, to: "to" },
  { from: /due to the fact that/gi, to: "because" },
  { from: /in spite of/gi, to: "despite" },
  { from: /in the event that/gi, to: "if" },
  { from: /on a daily basis/gi, to: "daily" },
  { from: /a number of/gi, to: "several" },
  { from: /the majority of/gi, to: "most" },
  { from: /the extent to which/gi, to: "how much" },
  { from: /the degree to which/gi, to: "how" },
  { from: /the way in which/gi, to: "how" },
  { from: /as well as/gi, to: "and" },
  { from: /in addition to/gi, to: "besides" },
  { from: /furthermore/gi, to: "also" },
  { from: /moreover/gi, to: "plus" },
  { from: /consequently/gi, to: "so" },
  { from: /additionally/gi, to: "also" },
  { from: /it can be argued that/gi, to: "some might say" },
  { from: /it could be argued that/gi, to: "one could argue" },
  { from: /this suggests that/gi, to: "this hints that" },
  { from: /this indicates that/gi, to: "this shows" },
  { from: /this implies that/gi, to: "this hints" },
  { from: /this highlights/gi, to: "this points to" },
  { from: /this underscores/gi, to: "this backs up" },
  { from: /this emphasizes/gi, to: "this drives home" },
  { from: /in conclusion/gi, to: "to wrap up" },
  { from: /to conclude/gi, to: "in short" },
  { from: /ultimately/gi, to: "in the end" },
  { from: /overall,/gi, to: "all in all," },
  { from: /on the other hand/gi, to: "but then again" },
  { from: /on the contrary/gi, to: "actually" },
  { from: /in contrast/gi, to: "by contrast" },
  { from: /conversely/gi, to: "then again" },
  { from: /alternatively/gi, to: "or" },
  { from: /in other words/gi, to: "simply" },
  { from: /that is to say/gi, to: "i.e." },
  { from: /to put it simply/gi, to: "long story short" },
  { from: /put simply/gi, to: "basically" },
  { from: /simply put/gi, to: "in plain terms" },
  { from: /having said that/gi, to: "even so" },
  { from: /that being said/gi, to: "still" },
  { from: /with that in mind/gi, to: "so" },
  { from: /be that as it may/gi, to: "either way" },
  { from: /nonetheless/gi, to: "still" },
  { from: /nevertheless/gi, to: "even so" },
  { from: /notwithstanding/gi, to: "despite that" },
  { from: /regardless/gi, to: "no matter what" },
  { from: /first and foremost/gi, to: "first off" },
  { from: /last but not least/gi, to: "finally" },
  { from: /in the first place/gi, to: "first" },
  { from: /in the second place/gi, to: "second" },
  { from: /by the same token/gi, to: "similarly" },
  { from: /in the same vein/gi, to: "likewise" },
  { from: /along the same lines/gi, to: "similarly" },
  { from: /in a similar vein/gi, to: "similarly" },
  { from: /tapestry/gi, to: "mix" },
  { from: /thriving/gi, to: "doing well" },
  { from: /flourishing/gi, to: "growing" },
  { from: /revolutionize/gi, to: "change" },
  { from: /game-changer/gi, to: "big deal" },
  { from: /one such/gi, to: "one" },
  { from: /including but not limited to/gi, to: "like" },
  { from: /there are several/gi, to: "there are a few" },
  { from: /there are many/gi, to: "there are lots of" },
  { from: /there are various/gi, to: "there are different" },
  { from: /it is possible that/gi, to: "maybe" },
  { from: /it is likely that/gi, to: "odds are" },
  { from: /it may be/gi, to: "maybe" },
  { from: /it might be/gi, to: "could be" },
];

const SENTENCE_STARTERS = [
  "You know,",
  "Here's the thing:",
  "The way I see it,",
  "Honestly,",
  "To be honest,",
  "Believe it or not,",
  "As it turns out,",
  "The thing is,",
  "Funny enough,",
  "Interestingly,",
  "Sure,",
  "Look,",
  "See,",
  "Well,",
  "I mean,",
  "Actually,",
  "In my experience,",
  "From what I can tell,",
  "If you ask me,",
  "Truth be told,",
  "Let's be real:",
  "At the end of the day,",
  "When you think about it,",
  "Come to think of it,",
  "Not gonna lie,",
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function replaceAIPhrases(text) {
  let result = text;
  for (const { from, to } of AI_PHRASE_REPLACEMENTS) {
    result = result.replace(from, to);
  }
  return result;
}

function varySentenceStarters(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  if (sentences.length < 4) return text;

  const startIndexes = [];
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i].trim();
    if (s.length > 30 && !SENTENCE_STARTERS.some(st => s.toLowerCase().startsWith(st.toLowerCase().split(',')[0]))) {
      startIndexes.push(i);
    }
  }

  if (startIndexes.length === 0) return text;

  const numToChange = Math.min(Math.max(1, Math.floor(startIndexes.length / 3)), 3);
  const shuffled = startIndexes.sort(() => Math.random() - 0.5).slice(0, numToChange);

  for (const idx of shuffled) {
    const s = sentences[idx].trim();
    const firstLetter = s[0];
    const rest = s.slice(1);
    const starter = randomItem(SENTENCE_STARTERS);
    const starterFirst = starter[0];
    const isLower = firstLetter === firstLetter.toLowerCase();

    if (isLower) {
      sentences[idx] = `${starter} ${rest}`;
    } else {
      const restLowered = rest[0] ? rest[0].toLowerCase() + rest.slice(1) : rest;
      sentences[idx] = `${starter} ${starterFirst === starterFirst.toUpperCase() ? starterFirst + starter.slice(1) + ' ' + firstLetter.toLowerCase() + restLowered : starter + ' ' + restLowered}`;
    }
  }

  return sentences.join(' ');
}

function breakLongSentences(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const result = [];

  for (const s of sentences) {
    const trimmed = s.trim();
    const words = trimmed.split(/\s+/);

    if (words.length > 25 && trimmed.includes(',')) {
      const parts = trimmed.split(/(?<=,) /);
      if (parts.length >= 2) {
        const mid = Math.floor(parts.length / 2);
        const first = parts.slice(0, mid).join(' ').replace(/[,.]$/, '');
        const second = parts.slice(mid).join(' ');
        result.push(`${first}. ${second.charAt(0).toUpperCase() + second.slice(1)}`);
        continue;
      }
    }
    result.push(trimmed);
  }

  return result.join(' ');
}

function addContractions(text) {
  const contractions = [
    [/\bI am\b/g, "I'm"],
    [/\byou are\b/g, "you're"],
    [/\bhe is\b/g, "he's"],
    [/\bshe is\b/g, "she's"],
    [/\bit is\b/g, "it's"],
    [/\bwe are\b/g, "we're"],
    [/\bthey are\b/g, "they're"],
    [/\bis not\b/g, "isn't"],
    [/\bare not\b/g, "aren't"],
    [/\bwas not\b/g, "wasn't"],
    [/\bwere not\b/g, "weren't"],
    [/\bhas not\b/g, "hasn't"],
    [/\bhave not\b/g, "haven't"],
    [/\bhad not\b/g, "hadn't"],
    [/\bwill not\b/g, "won't"],
    [/\bwould not\b/g, "wouldn't"],
    [/\bshould not\b/g, "shouldn't"],
    [/\bcould not\b/g, "couldn't"],
    [/\bmight not\b/g, "mightn't"],
    [/\bcannot\b/g, "can't"],
    [/\bdo not\b/g, "don't"],
    [/\bdoes not\b/g, "doesn't"],
    [/\bdid not\b/g, "didn't"],
    [/\bis not\b/g, "isn't"],
    [/\bone is\b/g, "one's"],
    [/\bthere is\b/g, "there's"],
    [/\bthere are\b/g, "there're"],
    [/\bthat is\b/g, "that's"],
    [/\bwho is\b/g, "who's"],
    [/\bwhat is\b/g, "what's"],
    [/\bwhere is\b/g, "where's"],
    [/\bwhy is\b/g, "why's"],
    [/\bhow is\b/g, "how's"],
  ];

  let result = text;
  const halfPoint = Math.floor(contractions.length / 2);
  const useContractions = contractions.slice(0, halfPoint + Math.floor(Math.random() * halfPoint));

  for (const [from, to] of useContractions) {
    result = result.replace(from, to);
  }
  return result;
}

function removeRedundantTransitions(text) {
  const redundant = [
    /\bhowever,\s*/gi, /\btherefore,\s*/gi, /\bfurthermore,\s*/gi,
    /\bmoreover,\s*/gi, /\bconsequently,\s*/gi, /\badditionally,\s*/gi,
    /\bnevertheless,\s*/gi, /\bnonetheless,\s*/gi, /\bconversely,\s*/gi,
  ];

  let result = text;
  const maxRemovals = Math.min(3, Math.floor(text.split(/\s+/).length / 50) + 1);
  let removals = 0;

  for (const pattern of redundant) {
    if (removals >= maxRemovals) break;
    if (pattern.test(result)) {
      result = result.replace(pattern, (match) => {
        if (removals < maxRemovals) {
          removals++;
          return '';
        }
        return match;
      });
    }
  }

  return result;
}

export function humanizeText(text, options = {}) {
  if (!text || text.trim().length < 10) return text;

  const {
    useStarters = true,
    useContractions = true,
    useBreakLong = true,
    useRemoval = true,
  } = options;

  let result = text;

  result = replaceAIPhrases(result);

  if (useRemoval) result = removeRedundantTransitions(result);
  if (useBreakLong) result = breakLongSentences(result);
  if (useContractions) result = addContractions(result);
  if (useStarters) result = varySentenceStarters(result);

  return result.trim();
}

export function getHumanizerStats(original, humanized) {
  const origWords = original.split(/\s+/).filter(Boolean).length;
  const humWords = humanized.split(/\s+/).filter(Boolean).length;
  const origChars = original.length;
  const humChars = humanized.length;

  const origSentences = original.match(/[^.!?]+[.!?]+/g) || [];
  const humSentences = humanized.match(/[^.!?]+[.!?]+/g) || [];

  let changes = 0;
  for (const repl of AI_PHRASE_REPLACEMENTS) {
    if (repl.from.test(original)) {
      const matches = original.match(repl.from);
      if (matches) changes += matches.length;
    }
  }

  return {
    wordsReduction: origWords - humWords,
    charsReduction: origChars - humChars,
    phrasesChanged: changes,
    sentenceChanges: Math.abs(origSentences.length - humSentences.length),
  };
}
