'use client'

import { useState } from 'react'

export default function ExpandableItem({
  label,
  children,
}: {
  label: React.ReactNode
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          font: 'inherit',
          color: 'inherit',
          cursor: 'pointer',
          textAlign: 'left',
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: '0.4em',
        }}
      >
        {label}
        <span
          style={{
            color: 'var(--muted)',
            fontSize: '0.65em',
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.02em',
            userSelect: 'none',
            lineHeight: 1,
            position: 'relative',
            top: '-0.05em',
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div
          style={{
            marginTop: '0.7rem',
            color: 'var(--muted)',
            fontSize: '0.9em',
            lineHeight: '1.7',
          }}
        >
          {children}
        </div>
      )}
    </li>
  )
}
