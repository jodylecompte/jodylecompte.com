import Link from 'next/link'

import { type TrackWithSlug } from '@/lib/tracks'

export function TrackHeader({ track }: { track: TrackWithSlug }) {
  return (
    <div className="mb-8 rounded-2xl border-l-4 border-teal-500 bg-teal-50 px-6 py-4 dark:bg-teal-900/20">
      <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
        Part of a track
      </p>
      <Link
        href={`/tracks/${track.slug}`}
        className="mt-1 block text-lg font-semibold text-zinc-800 hover:text-teal-600 dark:text-zinc-100 dark:hover:text-teal-400"
      >
        {track.title}
      </Link>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {track.description}
      </p>
    </div>
  )
}
