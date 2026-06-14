export function validatePlanInput(input: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!input.goal || input.goal.trim().length === 0) {
    errors.push('Goal is required')
  }
  if (input.goal && input.goal.length > 1000) {
    errors.push('Goal must be less than 1000 characters')
  }

  if (!input.budget || input.budget.trim().length === 0) {
    errors.push('Budget is required')
  }
  if (input.budget && isNaN(parseInt(input.budget))) {
    errors.push('Budget must be a valid number')
  }

  if (!input.timeline || input.timeline.trim().length === 0) {
    errors.push('Timeline is required')
  }

  if (!input.experience) {
    errors.push('Experience level is required')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
