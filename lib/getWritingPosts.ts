import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type WritingPost = {
  slug: string
  title: string
  date: string     // formatted for display: "April 30, 2026"
  isoDate: string  // ISO string for sorting: "2026-04-30"
}

export function getWritingPosts(): WritingPost[] {
  const writingDir = path.join(process.cwd(), 'app', 'writing')

  if (!fs.existsSync(writingDir)) return []

  const entries = fs.readdirSync(writingDir, { withFileTypes: true })
  const posts: Array<WritingPost & { rawDate: Date }> = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const mdxPath = path.join(writingDir, entry.name, 'page.mdx')
    if (!fs.existsSync(mdxPath)) continue

    const raw = fs.readFileSync(mdxPath, 'utf8')
    const { data } = matter(raw)

    if (!data.title || !data.date) continue

    const rawDate = new Date(data.date)
    posts.push({
      slug: entry.name,
      title: String(data.title),
      rawDate,
      isoDate: rawDate.toISOString().split('T')[0],
      date: rawDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    })
  }

  return posts
    .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
    .map(({ rawDate: _raw, ...post }) => post)
}
