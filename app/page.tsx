import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import Card from '@/components/Card'

export default function Home() {
  return (
    <section className="space-y-12">
      <header className="pt-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold leading-tight">Predict Failure Before It Happens</h1>
            <p className="text-slate-300 mt-3 max-w-xl">An AI reasoning agent that identifies hidden risks, flawed assumptions, and critical failure points before you execute your plan.</p>
            <div className="mt-6">
              <Link href="/analyze" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg">Analyze My Plan <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="hidden md:block w-80 h-52 glass rounded-xl p-6">
            <h3 className="text-lg font-medium">Example</h3>
            <p className="text-slate-300 mt-2">Launch an invite-only social app for designers. Budget: $10k. Timeline: 3 months.</p>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        <Card title="Failure Probability Analysis">Gauge the chance your plan fails with a probabilistic model.</Card>
        <Card title="Hidden Assumption Detection">Surface unseen assumptions that could sink the project.</Card>
        <Card title="Risk Identification">List critical and medium risks with severity badges.</Card>
        <Card title="Mitigation Planning">Actionable steps to reduce risk and increase odds of success.</Card>
      </div>

      <section className="mt-8 glass rounded-xl p-6">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <ol className="mt-4 space-y-2 text-slate-300">
          <li>1. Describe your plan</li>
          <li>2. AI performs a pre-mortem analysis</li>
          <li>3. Receive a risk report and action plan</li>
        </ol>
      </section>
    </section>
  )
}
