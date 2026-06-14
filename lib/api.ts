// API error handler with retry logic
export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

export async function apiCall<T>(
  url: string,
  options: RequestInit = {},
  retries: number = 3
): Promise<T> {
  let lastError: APIError | undefined
  
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options)
        throw new APIError(res.status, `API error: ${res.status}`)
      }
      return await res.json()
    } catch (e) {
      lastError = e as APIError
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
      }
    }
  }
  
  throw lastError || new Error('API call failed')
}
