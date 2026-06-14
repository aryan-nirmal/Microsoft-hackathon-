import React from 'react'

export default function Card({ children, title, className = '' }: any) {
  return (
    <div className={`glass rounded-xl p-5 shadow-sm ${className}`}>
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  )
}
