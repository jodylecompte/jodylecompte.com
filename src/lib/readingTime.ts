const WORDS_PER_MINUTE = 225

function mdxToPlainText(source: string) {
  return source
    .replace(/^import\s.+$/gm, ' ')
    .replace(/^export\s.+$/gm, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#>*_~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function estimateReadingTimeMinutes(source: string) {
  const plainText = mdxToPlainText(source)
  const words = plainText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) ?? []

  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE))
}

export function formatReadingTime(minutes: number) {
  return `${minutes} min read`
}
