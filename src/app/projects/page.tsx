import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

const projects = [
  {
    name: 'Greek Alphabet Trainer',
    description:
      'Quick and adaptive quizes to master the Greek alphabet quickly before beginning language study.',
    links: [
      { href: 'https://greekalphabettrainer.com', label: 'Live' },
      {
        href: 'https://github.com/jodylecompte/greekalphabettrainer.com',
        label: 'GitHub',
      },
    ],
  },
  {
    name: 'Solas Bible Plan',
    description:
      'A one-year reading plan and plan progress tracking app for reading the entire English Bible and all major reformation creeds, confessons, and catechisms.',
    links: [
      { href: 'https://solas.jodylecompte.com', label: 'Live' },
      {
        href: 'https://github.com/jodylecompte/solas-council-bible-plan',
        label: 'GitHub',
      },
    ],
  },
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I’ve built',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I've built"
      intro="This page collects projects I’ve built, maintained, and continue to iterate on as I learn and explore new ideas. It’s not exhaustive, and it’s not static, but it reflects the work I care about. Where projects are open source, feel free to dig into the code or help improve them."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              {project.name}
            </h2>

            <Card.Description>{project.description}</Card.Description>

            <div className="relative z-10 mt-6 space-y-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center text-sm font-medium text-zinc-400 transition-colors hover:text-teal-500 dark:text-zinc-200"
                >
                  <LinkIcon className="h-5 w-5 flex-none" />
                  <span className="ml-2">{link.label}</span>
                </a>
              ))}
            </div>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
