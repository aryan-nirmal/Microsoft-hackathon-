import React from 'react'

interface BadgeProps {
  text: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md'
}

export default function Badge({ text, variant = 'secondary', size = 'md' }: BadgeProps) {
  const variants = {
    primary: 'bg-indigo-600 text-white',
    secondary: 'bg-slate-700 text-slate-200',
    outline: 'border border-slate-600 text-slate-300'
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
  }

  return (
    <span className={`rounded-full ${variants[variant]} ${sizes[size]} font-medium inline-block`}>
      {text}
    </span>
  )
}
