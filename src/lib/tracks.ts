import glob from 'fast-glob'

export interface TrackWithSlug {
  title: string
  description: string
  slug: string
}

async function importTrack(trackFilename: string): Promise<TrackWithSlug> {
  let { track } = (await import(`../app/tracks/${trackFilename}`)) as {
    default: React.ComponentType
    track: TrackWithSlug
  }

  return {
    ...track,
    slug: trackFilename.replace(/(\/page)?\.mdx$/, ''),
  }
}

export async function getAllTracks(): Promise<TrackWithSlug[]> {
  let trackFilenames = await glob('*/page.mdx', {
    cwd: './src/app/tracks',
  })

  return Promise.all(trackFilenames.map(importTrack))
}

export async function getTrack(slug: string): Promise<TrackWithSlug | null> {
  let tracks = await getAllTracks()
  return tracks.find((t) => t.slug === slug) ?? null
}
