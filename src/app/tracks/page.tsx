import { type Metadata } from 'next'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllTracks } from '@/lib/tracks'
import { getArticlesByTrack } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Tracks',
  description: 'Curated learning paths through related articles.',
}

export default async function TracksIndex() {
  const tracks = await getAllTracks()
  const tracksWithCounts = await Promise.all(
    tracks.map(async (track) => {
      const articles = await getArticlesByTrack(track.slug)
      return { ...track, count: articles.length }
    }),
  )

  return (
    <SimpleLayout
      title="Curated learning tracks."
      intro="Structured sequences of articles that guide you through a topic from start to finish."
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {tracksWithCounts.map((track) => (
          <Card key={track.slug} as="article">
            <Card.Title href={`/tracks/${track.slug}`}>
              {track.title}
            </Card.Title>
            <Card.Description>{track.description}</Card.Description>
            <Card.Cta>
              {track.count} {track.count === 1 ? 'post' : 'posts'}
            </Card.Cta>
          </Card>
        ))}
      </div>
    </SimpleLayout>
  )
}
