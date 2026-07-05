import { getWritingPosts } from '@/lib/getWritingPosts'
import ThemeToggle from '@/components/ThemeToggle'
import ExpandableItem from '@/components/ExpandableItem'

type WritingItem = {
  key: string
  title: string
  date: string
  isoDate: string
  href: string
  isExternal?: boolean
}

const CONCERTS = [
  '10/8/18: Drake, Migos',
  '10/20/19: Tyler the Creator',
  '4/10/20: Tech N9ne',
  '2/27/22: Tame Impala, Fitz and the Tantrums, The War on Drugs',
  '4/28/22: Interpol',
  '5/1/22: Car Seat Headrest, Bartees Strange',
  '6/18/22: Calexico',
  '8/27/22: Earl Sweatshirt, Circle Jerks, Mac DeMarco',
  '8/28/22: The Strokes, Beach House, Idles, Turnstile, Deafheaven, Descendents',
  '11/1/22: Mother Mother, Vundabar',
  '4/28/23: OFF!',
  '5/11/23: Death Grips',
  '6/9/23: wakeupf1lthy, Whole Lotta Rage',
  '7/7/23: First Friday',
  '7/17/23: Thank You Scientist, Rivers of Nihil, Between the Buried and Me',
  '10/26/23: Travis Scott, Teezo Touchdown',
  '12/1/23: The Menzingers, Cloud Nothings, Microwave',
  '3/15/24: Circle Jerks, Descendents, Adolescents',
  '4/8/24: Danny Brown',
  '4/30/24: METZ, Gouge Away',
  '5/22/24: Cloud Nothings',
  '6/20/24: Hot Water Music, Quicksand',
  '6/29/24: Death to All, Cryptopsy',
  '7/16/24: Ken Carson, 2hollis',
  '8/20/24: Flo Milli',
  '3/12/25: Tyler the Creator, Lil Yachty',
  '3/30/25: Refused, Quicksand',
  '9/6/25: Negative Approach, Gorilla Biscuits, Circle Jerks',
  '3/17/26: Machine Girl, Show Me the Body, Lustsickpuppy',
  '5/12/26: The Armed, Converge, Poison the Well',
  '5/22/26: February, Reversal of Man',
  '5/23/26: Portraits of Past',
]

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
      title: 'Veeva Systems (NYSE: VEEV), Long',
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
          My name is Zach. I love technology, finance, and the space where the two meet. Right now I&apos;m reading, learning, and meeting as many people as I can, because life is too short not to spend it making an impact on the world.
        </p>
      </section>

      {/* Now */}
      <section className="mt-16">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-5">Now</h2>
        <ul className="list-none p-0 m-0 space-y-2">
          <li>
            Incoming Investment Banking Summer Analyst at{' '}
            <a href="https://www.moelis.com/" target="_blank" rel="noopener noreferrer">
              Moelis &amp; Company
            </a>
          </li>
          <li>
            Growth &amp; Sales at{' '}
            <a href="https://www.greenboard.com" target="_blank" rel="noopener noreferrer">
              Greenboard
            </a>
            {' '}(YC, General Catalyst backed)
          </li>
          <li>
            Growth Equity at{' '}
            <a href="https://www.ftvcapital.com/" target="_blank" rel="noopener noreferrer">
              FTV Capital
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
            Supporting founders at the{' '}
            <a href="https://www.azmicrocredit.org/" target="_blank" rel="noopener noreferrer">
              Arizona Microcredit Initiative
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

      {/* Projects */}
      <section className="mt-16">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-5">Projects</h2>
        <ul className="list-none p-0 m-0 space-y-2">
          <li>
            <a href="https://thegreenroomfm.vercel.app/" target="_blank" rel="noopener noreferrer">
              The Green Room
            </a>
            , a concert finder I built
          </li>
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
            {' '}(4&times; Champion)
          </li>
          <ExpandableItem label="Solo hiking">
            <div style={{ marginTop: '0.2rem' }}>
              <img
                src="/delta-lake.jpg"
                alt="Delta Lake, the Tetons"
                style={{ width: '100%', display: 'block', marginBottom: '0.45rem' }}
              />
              <span style={{ fontSize: '0.85em' }}>Delta Lake, the Tetons</span>
            </div>
          </ExpandableItem>
          <ExpandableItem label="Stephen King novels">
            <p style={{ margin: 0 }}>
              I&apos;ve read almost his whole catalogue. My favorites are It, The Dark Tower: The Drawing of the Three, and Misery.
            </p>
          </ExpandableItem>
          <li>Vinyl Collection ($30K)</li>
          <ExpandableItem label="Live music">
            <p style={{ margin: '0 0 0.6rem' }}>
              I&apos;ve seen countless artists. Here are the ones over the years I still remember clearly to this day.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {CONCERTS.map((entry) => (
                <span key={entry}>{entry}</span>
              ))}
            </div>
          </ExpandableItem>
          <ExpandableItem label="Working out">
            <p style={{ margin: 0 }}>
              I lost 100 pounds in 8 months, mostly to prove to myself that I could. It became my benchmark for what&apos;s possible. Now whenever something feels out of reach, I think back to it.
            </p>
          </ExpandableItem>
          <li>Coffee (ex-barista)</li>
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
          <a
            href="https://github.com/zacharyspeck"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
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
