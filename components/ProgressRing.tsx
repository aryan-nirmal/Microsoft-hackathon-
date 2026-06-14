import React from 'react'

export default function ProgressRing({ percent = 50, size = 120 }: { percent?: number, size?: number }) {
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="transparent" />
      <circle cx={size/2} cy={size/2} r={radius} stroke="url(#g1)" strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" fill="transparent" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-white font-semibold" style={{ fontSize: size * 0.18 }}>{percent}%</text>
    </svg>
  )
}
