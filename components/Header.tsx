import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className="py-6 flex items-center gap-6">
      <Link href="/" className="text-xl font-bold">PreMortem AI</Link>
      <nav className="ml-auto flex items-center gap-3 text-slate-300">
        <Link href="/analyze" className="px-3 py-2 rounded-md border">Analyze</Link>
        <a className="px-3 py-2 rounded-md border">Docs</a>
      </nav>
    </header>
  )
}
