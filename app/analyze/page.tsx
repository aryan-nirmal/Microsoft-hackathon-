'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card'
import LoadingSpinner from '@/components/LoadingSpinner'
import { samplePlans } from '@/lib/samplePlans'

export default function AnalyzePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ goal: '', budget: '', timeline: '', experience: 'Intermediate', details: '' })
  const [error, setError] = useState<string | null>(null)

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!form.goal || !form.budget || !form.timeline) {
      setError('Please fill in Goal, Budget, and Timeline')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) {
        const err = await res.text()
        setError(`API error: ${res.status} ${err}`)
        setLoading(false)
        return
      }
      const data = await res.json()
      const encoded = encodeURIComponent(btoa(JSON.stringify(data)))
      router.push(`/result?report=${encoded}`)
    } catch (err) {
      console.error('Submission error:', err)
      setError('Analysis failed. Check console for details.')
    } finally { setLoading(false) }
  }

  function useSample(p: any) {
    setForm({ goal: p.goal, budget: p.budget, timeline: p.timeline, experience: p.experience, details: p.details })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Analyze My Plan</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <div className="text-sm text-slate-300">Goal / Idea</div>
              <textarea value={form.goal} onChange={e => update('goal', e.target.value)} className="mt-1 w-full p-3 rounded-md bg-transparent border border-slate-700" rows={4} />
            </label>

            <div className="grid md:grid-cols-3 gap-3">
              <label className="block">
                <div className="text-sm text-slate-300">Budget</div>
                <input value={form.budget} onChange={e => update('budget', e.target.value)} className="mt-1 w-full p-3 rounded-md bg-transparent border border-slate-700" />
              </label>
              <label className="block">
                <div className="text-sm text-slate-300">Timeline</div>
                <input value={form.timeline} onChange={e => update('timeline', e.target.value)} className="mt-1 w-full p-3 rounded-md bg-transparent border border-slate-700" />
              </label>
              <label className="block">
                <div className="text-sm text-slate-300">Experience Level</div>
                <select value={form.experience} onChange={e => update('experience', e.target.value)} className="mt-1 w-full p-3 rounded-md bg-transparent border border-slate-700">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
              </label>
            </div>

            <label className="block">
              <div className="text-sm text-slate-300">Additional Details</div>
              <textarea value={form.details} onChange={e => update('details', e.target.value)} className="mt-1 w-full p-3 rounded-md bg-transparent border border-slate-700" rows={3} />
            </label>

            {error && <div className="text-rose-400">{error}</div>}

            <div className="flex items-center gap-3">
              <button type="submit" className="px-5 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow">{loading ? <LoadingSpinner /> : 'Run Analysis'}</button>
              <button type="button" onClick={() => { setForm({ goal: '', budget: '', timeline: '', experience: 'Intermediate', details: '' }); setError(null) }} className="px-4 py-2 rounded-md border">Reset</button>
            </div>
          </form>
        </Card>

        <aside className="space-y-4">
          <Card>
            <h4 className="font-medium">Sample Plans</h4>
            <div className="mt-3 space-y-2">
              {samplePlans.map((p) => (
                <button key={p.id} onClick={() => useSample(p)} className="w-full text-left p-3 rounded-md border border-slate-700">{p.title}</button>
              ))}
            </div>
          </Card>

          <Card>
            <h4 className="font-medium">Need inspiration?</h4>
            <p className="text-slate-300 text-sm">Use a sample plan or paste your idea to get a fast pre-mortem analysis.</p>
          </Card>
        </aside>
      </div>
    </div>
  )
}
