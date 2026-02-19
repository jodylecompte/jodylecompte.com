import { type Metadata } from 'next'
import Link from 'next/link'

import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllTags } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse all topics covered across articles.',
}

export default async function TagsIndex() {
  const tags = await getAllTags()

  return (
    <SimpleLayout
      title="Browse by topic."
      intro="All tags used across articles, sorted by how frequently they appear."
    >
      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="flex items-center gap-1.5 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-teal-50 hover:text-teal-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
          >
            <span>#{tag}</span>
            <span className="rounded-full bg-zinc-200 px-1.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </SimpleLayout>
  )
}
