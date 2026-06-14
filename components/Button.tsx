import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90',
    secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600',
    outline: 'border border-slate-600 text-slate-300 hover:border-slate-500'
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      className={`rounded-md font-medium transition ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  )
}
