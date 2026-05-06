import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: [
          'Iowan Old Style',
          'Charter',
          'Bitstream Charter',
          'Georgia',
          'ui-serif',
          'serif',
        ],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        link: 'var(--link)',
        border: 'var(--border)',
      },
      maxWidth: {
        content: '660px',
      },
    },
  },
  plugins: [],
}

export default config
