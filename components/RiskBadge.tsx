import React from 'react'

export default function RiskBadge({ severity = 'medium' }: { severity?: 'critical' | 'medium' | 'low' }) {
  const map: any = {
    critical: 'bg-rose-600 text-white',
    medium: 'bg-amber-500 text-black',
    low: 'bg-emerald-500 text-black'
  }
  return <span className={`px-2 py-1 rounded-full text-xs ${map[severity]}`}>{severity}</span>
}
