import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description: 'I’m Jody LeCompte. I live in Louisiana and like to build stuff',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I’m Jody LeCompte. I live in Louisiana, where I like to build stuff.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’m a senior software engineer with a background in modernizing
              legacy systems and building durable, scalable platforms. Over the
              years, I’ve worked across the full stack, helping teams transition
              from brittle, ad-hoc architectures into well-structured systems
              with clear boundaries, predictable deployments, and faster
              developer workflows. I care deeply about code quality,
              maintainability, and the long-term health of the systems people
              depend on.
            </p>
            <p>
              Most of my recent work has focused on large TypeScript and Angular
              codebases, cloud-native infrastructure, and monorepo architecture.
              I’ve led migrations from legacy technologies into modern
              frameworks, redesigned CI/CD pipelines, and helped standardize
              development practices across multiple teams. I enjoy tackling
              messy problems - especially the kind that sit at the intersection
              of product, infrastructure, and developer experience.
            </p>
            <p>
              What motivates me most is making complex systems simpler to
              understand and easier to work with. I believe good engineering is
              less about clever tricks and more about clarity, consistency, and
              thoughtful tradeoffs. Whether I’m refactoring a critical service,
              improving performance, or designing internal tooling, my goal is
              always the same: reduce friction and make the system more
              resilient over time.
            </p>
            <p>
              Outside of work, I enjoy hands-on projects that let me build and
              fix real things, from mechanical restoration projects to learning
              new tools and techniques. I’m drawn to craftsmanship in all its
              forms - software included - and I’m always looking for
              opportunities to learn, improve, and create work I’m proud to
              stand behind.
            </p>{' '}
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://github.com/jodylecompte"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/jodylecompte"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:jody@jodylecompte.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              jody@jodylecompte.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
