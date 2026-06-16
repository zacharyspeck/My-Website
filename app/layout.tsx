import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Zachary Speck',
  description:
    'Zachary Speck — technology, finance, and the space where the two meet. Reading, building, and meeting as many people as possible.',
  metadataBase: new URL('https://zacharyspeck.com'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Zachary Speck',
    description: 'Zachary Speck — technology, finance, and the space where the two meet.',
    url: 'https://zacharyspeck.com',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Zachary Speck' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zachary Speck',
    description: 'Zachary Speck — technology, finance, and the space where the two meet.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}})();`,
          }}
        />
      </head>
      <body className="bg-bg text-fg min-h-screen">{children}</body>
    </html>
  )
}
