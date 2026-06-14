import './globals.css'
import React from 'react'
import { Metadata } from 'next'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'PreMortem AI',
  description: 'Predict failure before it happens. PreMortem AI.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gradient-to-b from-[#0b1020] via-[#081028] to-[#0b1220] text-slate-100 antialiased">
        <div className="min-h-screen max-w-5xl mx-auto px-6">
          <Header />
          <main className="py-10">{children}</main>
        </div>
      </body>
    </html>
  )
}
