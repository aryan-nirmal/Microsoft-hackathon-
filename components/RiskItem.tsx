import React from 'react'
import Card from './Card'
import Badge from './Badge'

interface RiskItemProps {
  title: string
  description?: string
  severity?: 'critical' | 'medium' | 'low'
  mitigation?: string
}

export default function RiskItem({ title, description, severity = 'medium', mitigation }: RiskItemProps) {
  const severityMap = {
    critical: { color: 'bg-rose-600', label: 'Critical' },
    medium: { color: 'bg-amber-500', label: 'Medium' },
    low: { color: 'bg-emerald-500', label: 'Low' }
  }

  const s = severityMap[severity]

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{title}</h4>
            <Badge text={s.label} variant="secondary" size="sm" />
          </div>
          {description && <p className="text-slate-400 text-sm mt-2">{description}</p>}
          {mitigation && (
            <div className="mt-3 p-3 bg-slate-700/50 rounded text-sm">
              <p className="text-slate-300"><strong>Mitigation:</strong> {mitigation}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
