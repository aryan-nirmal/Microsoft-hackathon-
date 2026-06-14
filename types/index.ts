export type PlanInput = {
  goal: string
  budget: string
  timeline: string
  experience: 'Beginner' | 'Intermediate' | 'Expert'
  details?: string
}

export type AnalysisReport = {
  failureProbability: number
  confidenceScore: number
  summary: string
  criticalRisks: string[]
  mediumRisks: string[]
  hiddenAssumptions: string[]
  mitigationPlan: string[]
  nextActions: string[]
}
