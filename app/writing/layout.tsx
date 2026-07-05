export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-reading mx-auto px-6 py-16 md:py-20">
      <nav className="mb-12">
        <a href="/" className="text-muted text-sm hover:text-fg" style={{ transition: 'color 0.15s' }}>
          ← Zachary Speck
        </a>
      </nav>
      <article className="prose-content">{children}</article>
    </main>
  )
}
