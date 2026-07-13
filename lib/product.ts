export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "RegexForge",
  slug: "regexforge",
  tagline: "Describe the pattern, get a working regex.",
  description: "Turn a plain-English description into a correct regular expression for your language, with a part-by-part explanation and edge cases called out.",
  toolTitle: "Build a regex",
  resultLabel: "Your regex",
  ctaLabel: "Forge regex",
  features: [
  "NL description to regex",
  "Pick your language flavor",
  "Part-by-part explanation",
  "Edge cases called out"
],
  inputs: [
  {
    "key": "description",
    "label": "What should it match?",
    "type": "textarea",
    "placeholder": "e.g. a US phone number like (415) 555-2671 or 415-555-2671"
  },
  {
    "key": "language",
    "label": "Language / flavor",
    "type": "select",
    "options": [
      "JavaScript",
      "Python",
      "Go",
      "PCRE",
      "Rust"
    ]
  },
  {
    "key": "samples",
    "label": "Test strings (optional)",
    "type": "textarea",
    "placeholder": "e.g. 415-555-2671 (match)\\ncall me maybe (no match)"
  }
] as InputField[],
  systemPrompt: "You are a regular-expression expert. Given a plain-English description, a target language flavor, and optional test strings, produce a correct regex in a fenced block, then explain each significant part, and list 2-3 edge cases the user must consider. Prefer readable, anchored patterns. In demo (mock) mode, return a realistic sample regex and explanation following exactly this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "10 forges/mo"
  },
  {
    "tier": "Pro",
    "price": "$19/mo",
    "desc": "Unlimited, save history"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const d = (inputs['description'] || '').trim()
  const lang = inputs['language'] || 'JavaScript'
  const s = (inputs['samples'] || '').trim()
  if (!d) return 'Describe what the regex should match.'
  let out = 'REGEX (' + lang + ')\n\n'
  out += '/\(\!?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/\n\n'
  out += 'Explanation:\n'
  out += '  \(\d{3}\)?        optional area code in parentheses\n'
  out += '  [-.\s]?          separator: dash, dot, or space\n'
  out += '  \d{3}            3-digit prefix\n'
  out += '  \d{4}            4-digit line number\n\n'
  out += 'Edge cases:\n'
  out += '  - International formats (+1 ...) are not matched.\n'
  out += '  - Missing separators ("4155552671") are not matched.\n'
  if (s) out += '\nYour test strings would be evaluated against the pattern above.\n'
  out += '\n--- (Mock demo. Paste your description for a tailored regex.)'
  return out
}
}
