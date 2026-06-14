export async function generateReport(data: any): Promise<string> {
  const lines = [
    '# Pre-Mortem Analysis Report',
    `Generated: ${new Date().toLocaleString()}`,
    '',
    '## Executive Summary',
    data.summary,
    '',
    `### Key Metrics`,
    `- Failure Probability: ${data.failureProbability}%`,
    `- AI Confidence: ${data.confidenceScore}%`,
    '',
    '## Critical Risks',
    ...data.criticalRisks.map((r: string) => `- ${r}`),
    '',
    '## Medium Risks',
    ...data.mediumRisks.map((r: string) => `- ${r}`),
    '',
    '## Hidden Assumptions',
    ...data.hiddenAssumptions.map((a: string) => `- ${a}`),
    '',
    '## Mitigation Plan',
    ...data.mitigationPlan.map((m: string) => `- ${m}`),
    '',
    '## Next Actions',
    ...data.nextActions.map((a: string) => `- ${a}`)
  ]

  return lines.join('\n')
}

export function downloadReport(data: any, filename: string = 'report.md') {
  generateReport(data).then(content => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  })
}
