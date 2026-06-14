import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <label className="block">
      {label && <div className="text-sm text-slate-300 mb-1">{label}</div>}
      <input
        className={`w-full p-3 rounded-md bg-transparent border transition ${
          error
            ? 'border-rose-500 focus:border-rose-400'
            : 'border-slate-700 focus:border-indigo-500'
        } focus:outline-none`}
        {...props}
      />
      {error && <p className="text-rose-400 text-sm mt-1">{error}</p>}
    </label>
  )
}
