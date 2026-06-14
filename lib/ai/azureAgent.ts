import { AnalysisReport, PlanInput } from '@/types'
import { getConfig } from '@/lib/config'
import { sampleMock } from '@/lib/mock'

/**
 * Minimal Azure Foundry integration layer.
 * - Builds a prompt from the PlanInput
 * - Optionally enriches prompt with Foundry IQ documents (if configured)
 * - Calls the Azure Foundry agent endpoint and maps response to AnalysisReport
 *
 * Replace fetch logic with SDK calls if desired.
 */
export async function analyzeWithAzureFoundry(input: PlanInput): Promise<AnalysisReport> {
  const cfg = getConfig()
  if (!cfg.AZURE_FOUNDRY_ENDPOINT || !cfg.AZURE_FOUNDRY_API_KEY) {
    throw new Error('Azure Foundry not configured')
  }

  // Attempt to retrieve contextual knowledge from Foundry IQ (optional)
  let foundryContext = ''
  if (cfg.FOUNDRY_IQ_ENDPOINT && cfg.FOUNDRY_IQ_KEY) {
    try {
      const iq = await retrieveFoundryIQ(input.goal)
      if (iq) foundryContext = `\n\nFoundry IQ Context:\n${iq}`
    } catch (e) {
      console.warn('Foundry IQ retrieval failed:', e)
    }
  }

  const prompt = buildPrompt(input) + foundryContext

  const payload = {
    // agent contract is intentionally simple: replace with real contract later
    input: {
      prompt,
      metadata: { budget: input.budget, timeline: input.timeline, experience: input.experience }
    }
  }

  const res = await fetch(cfg.AZURE_FOUNDRY_ENDPOINT + '/agent/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cfg.AZURE_FOUNDRY_API_KEY}`
    },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    const t = await res.text()
    throw new Error(`Foundry API error: ${res.status} ${t}`)
  }

  const body = await res.json()

  // Expect a structured response; defensive mapping to our AnalysisReport
  if (body && body.analysis) {
    const a = body.analysis
    return {
      failureProbability: Number(a.failureProbability ?? a.failure ?? sampleMock.failureProbability),
      confidenceScore: Number(a.confidenceScore ?? 70),
      summary: String(a.summary ?? sampleMock.summary),
      criticalRisks: a.criticalRisks ?? sampleMock.criticalRisks,
      mediumRisks: a.mediumRisks ?? sampleMock.mediumRisks,
      hiddenAssumptions: a.hiddenAssumptions ?? sampleMock.hiddenAssumptions,
      mitigationPlan: a.mitigationPlan ?? sampleMock.mitigationPlan,
      nextActions: a.nextActions ?? sampleMock.nextActions
    }
  }

  // Fallback: try to derive from free text
  if (body && body.output && typeof body.output === 'string') {
    // Very lightweight parsing: if the agent sent JSON, try parse
    try {
      const parsed = JSON.parse(body.output)
      return {
        failureProbability: Number(parsed.failureProbability ?? sampleMock.failureProbability),
        confidenceScore: Number(parsed.confidenceScore ?? 70),
        summary: parsed.summary ?? sampleMock.summary,
        criticalRisks: parsed.criticalRisks ?? sampleMock.criticalRisks,
        mediumRisks: parsed.mediumRisks ?? sampleMock.mediumRisks,
        hiddenAssumptions: parsed.hiddenAssumptions ?? sampleMock.hiddenAssumptions,
        mitigationPlan: parsed.mitigationPlan ?? sampleMock.mitigationPlan,
        nextActions: parsed.nextActions ?? sampleMock.nextActions
      }
    } catch (e) {
      console.warn('Failed to parse free-text agent output, returning sample mock', e)
      return sampleMock
    }
  }

  throw new Error('Unexpected Foundry response shape')
}

function buildPrompt(input: PlanInput) {
  return `Perform a pre-mortem analysis for the following plan. Provide a JSON object with keys: failureProbability (0-100), confidenceScore (0-100), summary, criticalRisks (array), mediumRisks (array), hiddenAssumptions (array), mitigationPlan (array), nextActions (array).\n\nPlan:\nGoal: ${input.goal}\nBudget: ${input.budget}\nTimeline: ${input.timeline}\nExperience: ${input.experience}\nDetails: ${input.details ?? ''}`
}

async function retrieveFoundryIQ(query?: string) {
  const cfg = getConfig()
  if (!cfg.FOUNDRY_IQ_ENDPOINT || !cfg.FOUNDRY_IQ_KEY) return null
  try {
    const res = await fetch(cfg.FOUNDRY_IQ_ENDPOINT + '/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cfg.FOUNDRY_IQ_KEY}`
      },
      body: JSON.stringify({ query: query ?? '' })
    })
    if (!res.ok) {
      console.warn('Foundry IQ query failed', await res.text())
      return null
    }
    const json = await res.json()
    // adapt to expected IQ shape; return concatenated text
    if (Array.isArray(json.results)) {
      return json.results.map((r: any) => r.text || JSON.stringify(r)).join('\n---\n')
    }
    if (json.text) return json.text
    return JSON.stringify(json)
  } catch (e) {
    console.warn('Foundry IQ fetch error', e)
    return null
  }
}
