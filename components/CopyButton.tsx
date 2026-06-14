'use client'
import React from 'react'

export default function CopyButton({ payload }: { payload: any }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
      alert('Report copied to clipboard')
    } catch (e) { alert('Copy failed') }
  }
  return <button onClick={copy} className="px-3 py-2 rounded-md border">Copy Report</button>
}
