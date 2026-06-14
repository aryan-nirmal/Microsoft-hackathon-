import React from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="glass rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        {icon && <div className="text-slate-500">{icon}</div>}
      </div>
    </div>
  )
}
