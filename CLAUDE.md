# CLAUDE.md

## Project Overview

Personal blog and portfolio site for Jody LeCompte. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and MDX for content authoring.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 via PostCSS, `@tailwindcss/typography` for prose
- **Content**: MDX (`.mdx` files as pages) with `remark-gfm` and `@mapbox/rehype-prism`
- **UI**: Headless UI (`@headlessui/react`), `next-themes` for dark mode
- **Utilities**: `fast-glob` for article discovery, `feed` + `cheerio` for RSS generation

## Common Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Home page (hero, latest articles, work history)
│   ├── providers.tsx     # ThemeProvider + AppContext (client component)
│   ├── articles/         # Blog articles
│   │   ├── page.tsx      # Articles list
│   │   └── [slug]/page.mdx  # Individual articles (MDX)
│   ├── about/page.tsx    # About page
│   ├── projects/page.tsx # Projects showcase
│   ├── thank-you/        # Post-form-submission page
│   ├── feed.xml/         # RSS feed route
│   └── not-found.tsx     # 404 page
├── components/           # Reusable UI components
├── lib/
│   ├── articles.ts       # Article discovery and metadata loading
│   └── formatDate.ts     # Date formatting utility
├── styles/
│   ├── tailwind.css      # Global styles and Prism import
│   └── prism.css         # Syntax highlighting
└── images/               # Static images (avatar, etc.)
```

## Adding a New Article

Create a new directory under `src/app/articles/` and add a `page.mdx` file with this structure:

```mdx
import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  author: 'Jody LeCompte',
  date: 'YYYY-MM-DD',
  title: 'Article Title',
  description: 'One-sentence description for cards and RSS.',
}

export const metadata = {
  title: article.title,
  description: article.description,
}

export default (props) => <ArticleLayout article={article} {...props} />

## Content starts here
```

The slug is derived automatically from the directory name. Articles are sorted by `date` (newest first).

## Component Patterns

**Path alias**: `@/*` maps to `src/*`.

**Compound components** — `Card` uses sub-components:
```tsx
<Card as="article">
  <Card.Title href={url}>{title}</Card.Title>
  <Card.Eyebrow as="time">{date}</Card.Eyebrow>
  <Card.Description>{desc}</Card.Description>
  <Card.Cta>Read article</Card.Cta>
</Card>
```

**Polymorphic `as` prop** — many components (Card, Section, Container) accept an `as` prop to change the rendered element.

**Layout components**:
- `SimpleLayout` — title + intro + slot content (used by Articles, Projects pages)
- `ArticleLayout` — full article wrapper with back button and metadata
- `Prose` — applies `prose dark:prose-invert` typography classes

## Styling Conventions

- Tailwind CSS v4 utility-first; no CSS modules.
- Color palette: **Zinc** (neutrals), **Teal** (accent/links).
- Dark mode: `dark:` Tailwind variants + `next-themes`; prose uses `prose-invert`.
- Typography theme is in `typography.ts` — defines all prose color variables for light/dark.
- Class names sorted by Prettier via `prettier-plugin-tailwindcss`.

## Code Style

Enforced by Prettier (`prettier.config.js`):
- Single quotes
- No semicolons
- Tailwind class sorting

## Key Implementation Notes

- **Article discovery** (`src/lib/articles.ts`): uses `fast-glob` at runtime to find all `*/page.mdx` files; dynamic imports pull the exported `article` metadata object. No build-time config needed — drop in a new MDX directory and it appears automatically.
- **RSS feed** (`src/app/feed.xml/route.ts`): fetches rendered HTML, parses with `cheerio`, and returns XML. Cached with `s-maxage=31556952`.
- **Header scroll animation**: CSS custom properties are updated on scroll to animate the avatar on the home page. Logic lives in `src/components/Header.tsx`.
- **AppContext** (`src/app/providers.tsx`): tracks `previousPathname` for the "back" link in `ArticleLayout`.
