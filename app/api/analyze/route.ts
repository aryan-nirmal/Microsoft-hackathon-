import { NextResponse } from 'next/server'
import { analyzePlan } from '@/lib/agent'
import type { PlanInput } from '@/types'

export async function POST(req: Request) {
  try {
    const body = await req.json() as PlanInput
    if (!body || !body.goal || !body.budget || !body.timeline) {
      return NextResponse.json({ error: 'Missing required fields: goal, budget, timeline' }, { status: 400 })
    }
    const result = await analyzePlan(body)
    return NextResponse.json(result)
  } catch (err) {
    console.error('Analyze API error', err)
    return NextResponse.json({ error: 'Failed to analyze' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
