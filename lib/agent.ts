import { AnalysisReport, PlanInput } from '@/types'
import { sampleMock } from './mock'
import { analyzeWithAzureFoundry } from './ai/azureAgent'
import { getConfig } from './config'

/**
 * analyzePlan: top-level abstraction. Will use Azure Foundry when configured,
 * otherwise falls back to local mock heuristics. This keeps the API stable
 * while allowing easy replacement with real Azure calls.
 */
export async function analyzePlan(input: PlanInput): Promise<AnalysisReport> {
  const cfg = getConfig()

  if (cfg.AZURE_FOUNDRY_ENDPOINT && cfg.AZURE_FOUNDRY_API_KEY) {
    try {
      return await analyzeWithAzureFoundry(input)
    } catch (err) {
      // Log and fall back to local heuristic mock
      console.error('Azure Foundry analysis failed, falling back to mock:', err)
    }
  }

  // Fallback: preserve previous mocked behavior for local development.
  const base = { ...sampleMock }
  if (parseInt(input.budget || '0') < 5000) base.failureProbability += 8
  if ((input.timeline || '').toLowerCase().includes('week')) base.failureProbability += 6
  if (input.experience === 'Expert') base.confidenceScore += 6
  base.failureProbability = Math.min(98, Math.max(2, base.failureProbability))
  base.confidenceScore = Math.min(99, Math.max(30, base.confidenceScore))
  return base
}
