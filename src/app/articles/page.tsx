import { type Metadata } from 'next'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { formatReadingTime } from '@/lib/readingTime'

function Article({ article }: { article: ArticleWithSlug }) {
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
          <span>{formatDate(article.date)}</span>
          <span>{formatReadingTime(article.readingTimeMinutes)}</span>
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        {article.tags && article.tags.length > 0 && (
          <div className="relative z-10 mt-3 flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500 hover:bg-teal-50 hover:text-teal-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 max-md:hidden"
      >
        {formatDate(article.date)} <span aria-hidden="true">·</span>{' '}
        {formatReadingTime(article.readingTimeMinutes)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Writing about building software, learning things, and figuring stuff out.',
}

export default async function ArticlesIndex() {
  let articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Writing about building software, learning things, and figuring stuff out."
      intro="A collection of tutorials, project write-ups, experiments, and general reflections from building and maintaining software."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
