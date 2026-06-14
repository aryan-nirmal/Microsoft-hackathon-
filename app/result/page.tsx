import React from 'react'
import Card from '@/components/Card'
import ProgressRing from '@/components/ProgressRing'
import RiskBadge from '@/components/RiskBadge'
import CopyButton from '@/components/CopyButton'

function decodeReport(q: string | null) {
  if (!q) return null
  try {
    const decoded = atob(decodeURIComponent(q))
    return JSON.parse(decoded)
  } catch (e) { 
    console.error('Decode error:', e)
    return null 
  }
}

export default async function ResultPage({ searchParams }: { searchParams?: Promise<{ report?: string }> }) {
  const params = await (searchParams ?? Promise.resolve({}))
  const report = decodeReport(params?.report ?? null)
  if (!report) {
    return <div className="text-slate-400">No report found. Run an analysis first.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <div>
          <h1 className="text-2xl font-semibold">Pre-mortem Report</h1>
          <p className="text-slate-300 mt-1">AI Confidence: {report.confidenceScore}%</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <CopyButton payload={report} />
          <button className="px-4 py-2 border rounded-md">Download (coming)</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="flex flex-col items-center justify-center">
          <ProgressRing percent={report.failureProbability} size={140} />
          <div className="mt-3 text-slate-300">Failure Probability</div>
        </Card>

        <Card className="md:col-span-2">
          <h3 className="text-lg font-medium">Executive Summary</h3>
          <p className="text-slate-300 mt-2">{report.summary}</p>
          <div className="mt-4">
            <h4 className="font-semibold">Recommended Next Actions</h4>
            <ol className="list-decimal ml-5 mt-2 text-slate-300 space-y-1">
              {report.nextActions.map((a: string, i: number) => <li key={i}>{a}</li>)}
            </ol>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <h4 className="font-semibold">Critical Risks</h4>
          <ul className="mt-3 space-y-2">
            {report.criticalRisks.map((r: string, i: number) => <li key={i} className="flex items-center justify-between"><span>{r}</span><RiskBadge severity="critical" /></li>)}
          </ul>
        </Card>

        <Card>
          <h4 className="font-semibold">Medium Risks</h4>
          <ul className="mt-3 space-y-2">
            {report.mediumRisks.map((r: string, i: number) => <li key={i} className="flex items-center justify-between"><span>{r}</span><RiskBadge severity="medium" /></li>)}
          </ul>
        </Card>

        <Card>
          <h4 className="font-semibold">Hidden Assumptions</h4>
          <ul className="mt-3 space-y-2 text-slate-300">
            {report.hiddenAssumptions.map((h: string, i: number) => <li key={i}>• {h}</li>)}
          </ul>
        </Card>
      </div>

      <Card>
        <h4 className="font-semibold">Mitigation Plan</h4>
        <ol className="list-decimal ml-5 mt-2 text-slate-300 space-y-1">
          {report.mitigationPlan.map((m: string, i: number) => <li key={i}>{m}</li>)}
        </ol>
      </Card>
    </div>
  )
}
