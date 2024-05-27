import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

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
  description:
    'I’m Jody LeCompte, an unapologetically nerdy software developer from South Louisiana.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I’m Jody LeCompte, an unapologetically nerdy software developer from South Louisiana.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I was introduced to web development at an extremely early age by my dad, who
              taught me the basics of HTML and helped me to build my Pokemon themed website.
              I was hooked instantly.
            </p>
            <p>
              Fast forward a couple of years, I was introduced to NeoPets by some school friends
              and realized how small my fishbowl was. My understanding was limited to boxes
              of boxes and changing their color, and an exceptionally masterful use of marquee.
              How is this login working? How does the site remember how many neopoints I have?
              What does a .phtml extension mean?
            </p>
            <p>
              This lead me to discover PHP and things snowballed from there. I spent my teenage
              years soaking up as much knowledge as I could and preferred building and creating
              to most other activities. In an extremely ironic twist, a friend I made on NeoPets
              years before contacted me about a PHP gig which officially launched my professional
              career.
            </p>
            <p>
              Today, I'm quickly approaching my ten year anniversary in the industry and I've
              had the privilege of working with some really great and talented people along the way
              and work in a multitude of technology and stack options. I love learning new things
              and experimenting with new technology, but most of my work the last few years has been
              centered around JavaScript technologies and writing full-stack software in TypeScript,
              React or Angular, and Node.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/jody_lecompte" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href="https://github.com/jodyleompte" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/jodylecompte" icon={LinkedInIcon} className="mt-4">
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
