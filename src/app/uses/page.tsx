import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'Tools I Use to Do What I Do',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Tools I Use to Do What I Do"
      intro="No affilitate links, no sponsorships, just the tools and software that I use for my day job as well as my side projects."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="16” MacBook Pro, M2 Pro, 16GB RAM (2022) - Work">
            I still thought my M1 Pro was fantastic when I switched jobs and was upgraded to this machine. Almost a year
            later now and I still regret ever doubting the Mac ARM was a good move.
          </Tool>
          <Tool title="13” MacBook Air, M3, 16GB RAM (2023) - Personal">
            My side projects and freelancing are much less demanding on resources than my day job and the new MacBook Airs
            are magnitudes better than the older Intel-based ones. It's a great trade off between power and portability.
            <b> Warning: the midnight blue shows every, single fingerprint. Even the ones you haven't left yet.</b>
          </Tool>
          <Tool title="Apple Magic Mouse">
            Gave the TouchPad a try but ultimately settled on a traditional mouse. Bottom-charging memes aside, this
            thing Just Works(TM), and that's what I need a majority of the time.
          </Tool>
          <Tool title="Keychron K4 with MX Browns">
            I was team Mx Blues for most of my career, but switched to browns because they were less sharp in meetings
            or recordings. Still miss blues. Keykron K4 is a great entry-level keyboard and one of few with Mac
            settings and both Windows and Mac key caps included.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="JetBrains IDEs">
            Mostly WebStorm, but which ever of their IDEs makes the most sense. Was a hardcore Atom then VSCode user for
            years but got sucked back into JetBrains ecosystem back where things began with PHPStorm at my first job. Bullish
            on the newer "IDE for any language" experiments that they are doing.
          </Tool>
          <Tool title="DataGrip">
            DataGrip, also from JetBrains, is the easiest way for me to be able to stay productive when switching between
            a number of database engines between day job and beyond.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="Figma">
            I'm not a designer, and I don't play one on TV, but Figma is still the easiest tool for me to create
            rough ideas, flowcharts, or wireframes to demonstrate or map out an idea.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Obsidian MD">
            Fair forewarning, I am an Obsidian shill. A more recent addition to my workflow, I started using Obsidian
            to take notes and learn to be a more active learner and maximize the use of my time and I got hooked. Now
            I use Obsidian for everything from work to bible study.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
