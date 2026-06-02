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
        }}
      >
        {label}
      </button>
      {open && (
        <div
          style={{
            marginTop: '0.6rem',
            color: 'var(--muted)',
            fontSize: '0.9em',
            lineHeight: '1.7',
            maxWidth: '560px',
          }}
        >
          {children}
        </div>
      )}
    </li>
  )
}
