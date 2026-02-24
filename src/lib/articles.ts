import glob from 'fast-glob'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { estimateReadingTimeMinutes } from '@/lib/readingTime'

interface Article {
  title: string
  description: string
  author: string
  date: string
  tags: string[]
  tracks?: string[]
  readingTimeMinutes: number
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let { article } = (await import(`../app/articles/${articleFilename}`)) as {
    default: React.ComponentType
    article: Omit<Article, 'readingTimeMinutes'>
  }
  const fullPath = path.join(process.cwd(), 'src/app/articles', articleFilename)
  const source = await readFile(fullPath, 'utf8')
  const readingTimeMinutes = estimateReadingTimeMinutes(source)

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
    readingTimeMinutes,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

export async function getAllTags(): Promise<
  Array<{ tag: string; count: number }>
> {
  let articles = await getAllArticles()
  let tagCounts = new Map<string, number>()

  for (let article of articles) {
    for (let tag of article.tags ?? []) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    }
  }

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, z) => z.count - a.count)
}

export async function getArticlesByTag(
  tag: string,
): Promise<ArticleWithSlug[]> {
  let articles = await getAllArticles()
  return articles.filter((article) => (article.tags ?? []).includes(tag))
}

export async function getArticlesByTrack(
  slug: string,
): Promise<ArticleWithSlug[]> {
  let articles = await getAllArticles()
  return articles.filter((article) => article.tracks?.includes(slug))
}
