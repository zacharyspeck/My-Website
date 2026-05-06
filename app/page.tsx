import { getWritingPosts } from '@/lib/getWritingPosts'
import ThemeToggle from '@/components/ThemeToggle'

type WritingItem = {
  key: string
  title: string
  date: string
  isoDate: string
  href: string
  isExternal?: boolean
}

export default function Home() {
  const mdxPosts = getWritingPosts()

  const allWriting: WritingItem[] = [
    ...mdxPosts.map((p) => ({
      key: p.slug,
      title: p.title,
      date: p.date,
      isoDate: p.isoDate,
      href: `/writing/${p.slug}/`,
    })),
    {
      key: 'veeva-long',
      title: 'Veeva Systems (NYSE: VEEV) — Long',
      date: 'April 15, 2026',
      isoDate: '2026-04-15',
      href: '/veeva-systems-long.pdf',
      isExternal: true,
    },
  ].sort((a, b) => b.isoDate.localeCompare(a.isoDate))

  return (
    <main className="max-w-content mx-auto px-6 py-16 md:py-20">

      {/* Name + Bio */}
      <section>
        <h1 className="font-serif text-3xl font-normal mb-5 text-fg">Zachary Speck</h1>
        <p>
          I&apos;m a sophomore at Barrett, the Honors College at Arizona State University, studying
          finance and AI in business. I&apos;m interested in technology, investing, and what happens
          when those collide. Right now I&apos;m reading, writing, and trying to immerse myself in
          the technology scene as much as I can.
        </p>
      </section>

      {/* Now */}
      <section className="mt-16">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-5">Now</h2>
        <ul className="list-none p-0 m-0 space-y-2">
          <li>
            Incoming Summer 2027 Investment Banking Analyst at{' '}
            <a href="https://www.moelis.com/" target="_blank" rel="noopener noreferrer">
              Moelis &amp; Company
            </a>
          </li>
          <li>
            Incoming Summer 2026 Growth Equity Analyst at{' '}
            <a href="https://www.ftvcapital.com/" target="_blank" rel="noopener noreferrer">
              FTV Capital
            </a>
          </li>
          <li>
            Private Equity Analyst Intern at{' '}
            <a href="https://www.cavecreekcapital.com/" target="_blank" rel="noopener noreferrer">
              Cave Creek Capital Management
            </a>
          </li>
          <li>
            President of{' '}
            <a href="https://wpcarey.asu.edu/finance-degrees/investment-banking-scholars" target="_blank" rel="noopener noreferrer">
              Investment Banking Industry Scholars
            </a>{' '}
            at ASU
          </li>
          <li>
            Head of Internal Development at the{' '}
            <a href="https://www.azmicrocredit.org/" target="_blank" rel="noopener noreferrer">
              Arizona Microcredit Initiative
            </a>
          </li>
          <li>
            Vice President of the{' '}
            <a href="https://www.avicasu.com/" target="_blank" rel="noopener noreferrer">
              Applied Value Investing Club
            </a>{' '}
            at ASU
          </li>
        </ul>
      </section>

      {/* Previously */}
      <section className="mt-16">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-5">Previously</h2>
        <ul className="list-none p-0 m-0 space-y-2">
          <li>
            Investment Banking Summer Analyst at{' '}
            <a href="https://www.columbiawestcap.com/" target="_blank" rel="noopener noreferrer">
              Columbia West Capital
            </a>
          </li>
          <li>
            Investment Banking Analyst Intern at{' '}
            <a href="https://ardentadvisorygroup.com/" target="_blank" rel="noopener noreferrer">
              Ardent Advisory Group
            </a>
          </li>
        </ul>
      </section>

      {/* Writing */}
      <section className="mt-16">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-5">Writing</h2>
        <ul className="list-none p-0 m-0 space-y-3">
          {allWriting.map((item) => (
            <li key={item.key} className="flex items-baseline gap-3 flex-wrap">
              <a
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
              >
                {item.title}
              </a>
              <span className="text-muted text-sm">{item.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Other */}
      <section className="mt-16">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-5">Other</h2>
        <ul className="list-none p-0 m-0 space-y-2">
          <li>
            <a
              href="https://r6.tracker.network/r6siege/profile/xbl/mind%20regress/overview"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rainbow Six Siege
            </a>
            {' '}(4× Champion)
          </li>
          <li>Solo hiking</li>
          <li>Stephen King novels</li>
          <li>Vinyl</li>
          <li>Classical piano</li>
          <li>Live music</li>
          <li>NFL</li>
          <li>Podcasts</li>
          <li>Lifting</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-border">
        <p className="text-muted text-sm">
          <a href="https://x.com/zachspeck" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          {' · '}
          <a
            href="https://www.linkedin.com/in/zacharyspeck/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          {' · '}
          <a
            href="https://substack.com/@zacharyspeck"
            target="_blank"
            rel="noopener noreferrer"
          >
            Substack
          </a>
          {' · '}
          <a href="mailto:zdspeck@asu.edu">Email</a>
        </p>
        <p className="text-muted text-xs mt-2">All views my own.</p>
        <div className="mt-3">
          <ThemeToggle />
        </div>
      </footer>
    </main>
  )
}
