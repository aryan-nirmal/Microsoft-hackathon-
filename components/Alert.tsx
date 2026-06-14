import React from 'react'

interface AlertProps {
  type?: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
}

export default function Alert({ type = 'info', title, message }: AlertProps) {
  const colors = {
    info: 'border-blue-500 bg-blue-500/10',
    warning: 'border-amber-500 bg-amber-500/10',
    error: 'border-rose-500 bg-rose-500/10',
    success: 'border-emerald-500 bg-emerald-500/10'
  }

  const textColors = {
    info: 'text-blue-400',
    warning: 'text-amber-400',
    error: 'text-rose-400',
    success: 'text-emerald-400'
  }

  return (
    <div className={`border rounded-lg p-4 ${colors[type]}`}>
      <h4 className={`font-semibold ${textColors[type]}`}>{title}</h4>
      <p className="text-slate-300 text-sm mt-1">{message}</p>
    </div>
  )
}
