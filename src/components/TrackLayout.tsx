import Link from 'next/link'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { type ArticleWithSlug } from '@/lib/articles'
import { getArticlesByTrack } from '@/lib/articles'
import { type TrackWithSlug } from '@/lib/tracks'
import { formatDate } from '@/lib/formatDate'

function TrackArticle({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 max-md:hidden"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export async function TrackLayout({
  track,
  children,
}: {
  track: TrackWithSlug
  children: React.ReactNode
}) {
  const articles = await getArticlesByTrack(track.slug)

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {track.title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {track.description}
        </p>
      </header>
      <div className="mt-16 sm:mt-20">
        <Prose data-mdx-content>{children}</Prose>
        {articles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              Posts in this track
            </h2>
            <div className="mt-8 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
              <div className="flex max-w-3xl flex-col space-y-16">
                {articles.map((article) => (
                  <TrackArticle key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
