import Link from 'next/link'

import { BackButton } from '@/components/BackButton'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { TrackHeader } from '@/components/TrackHeader'
import { type ArticleWithSlug } from '@/lib/articles'
import { getTrack } from '@/lib/tracks'
import { formatDate } from '@/lib/formatDate'

export async function ArticleLayout({
  article,
  children,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
}) {
  const track = article.track ? await getTrack(article.track) : null

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <BackButton />
          {track && <TrackHeader track={track} />}
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {article.title}
              </h1>
              <time
                dateTime={article.date}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(article.date)}</span>
              </time>
              {article.tags && article.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="relative z-10 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-teal-50 hover:text-teal-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>
            <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
